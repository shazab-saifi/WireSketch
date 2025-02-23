import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
    id: string
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        res.status(403).json({
            err: "Token not found!"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({
            err: "Invalid token!"
        });
    }
}