import { NextFunction, Request, Response } from "express";

export const roleBased = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    if (!roles.includes(user.role)) {
      return res.status(403).json({ status: "error", message: "Forbidden" });
    }
    next();
  };
};

export default roleBased;
