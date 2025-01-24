import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: string
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"]!;

    if (!token) {
        res.status(403).json({
            err: "Token not found!"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWR_SECRET!) as JwtPayload;

        if (typeof decoded !== "object" || decoded === null || !("id" in decoded)) {
            res.status(403).json({
                err: "Invalid token!"
            });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({
            err: "Invalid token!"
        });
    }
}