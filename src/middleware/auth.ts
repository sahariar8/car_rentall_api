import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import {JwtPayload } from "jsonwebtoken";


const auth = () =>{
    return async (req: Request, res: Response, next: NextFunction) => {
        const bearerToken = await req.headers.authorization;
       
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
            console.log(decoded);
            req.user = decoded;
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