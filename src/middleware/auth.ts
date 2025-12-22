import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import {JwtPayload } from "jsonwebtoken";


const auth = (...roles: string[]) =>{
    return async (req: Request, res: Response, next: NextFunction) => {
        const bearerToken = await req.headers.authorization;
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
            const decoded = jwt.verify(token as string,secret) as JwtPayload;
            req.user = decoded;
            console.log(decoded);
            console.log(roles[0]);
            if(decoded.role !== roles[0] ){
                return res.status(403).json({
                    status: "error",
                    message: "Forbidden",
                });
            }
           
            next();
        } catch (error) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized:Invalid token",
            });
        }
    };
}

export default auth;