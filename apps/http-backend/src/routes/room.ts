import { prisma } from "@repo/db/singleton";
import { Request, Response } from "express";

export async function room(req: Request, res:Response) {
    try {
        const roomId = Number(req.params.roomId);
        
        if (!roomId) {
            res.status(404).json({
                err: "Couldn't find the roomId!"
            })
        }

        const shapes = prisma.chat.findMany({
            where: {
                roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 100
        });

        if (!shapes) {
            res.status(403).json({
                err: "This room doesn't exit!"
            });
            return;
        }

        res.json({
            shapes
        });
    } catch (error) {
        console.log(error);
        res.json({
            err: "Error on the server" + error
        });
    }
}