import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

const adminOrSelf = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = await req.headers.authorization;
    const { userId } = req.params;

    console.log(bearerToken);
    if (!bearerToken) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }
    const secret = config.jwtSecret;
    const token = bearerToken.split(" ")[1];

    try {
      const decoded = jwt.verify(token as string, secret) as JwtPayload;
      req.user = decoded;
      console.log(decoded,"sa");
      console.log(roles[0]);
      const targetUserId = Number(userId);

      // ✅ Admin can do anything
      if (decoded.role === roles[0]) {
        return next();
      }

      // ✅ User can update only themselves
      if (decoded.id === targetUserId) {
        return next();
      }

      // ❌ Otherwise forbidden
      return res.status(403).json({
        status: "error",
        message: "Forbidden",
      });
    } catch (err: any) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized:Invalid token",
      });
    }
  };
};

export default adminOrSelf;
