import { prisma } from "@repo/db/singleton";
import { Request, Response } from "express";

export async function room(req: Request, res:Response) {
    try {
        const roomId = Number(req.params.roomId);
        console.log(roomId);

        const shapes = prisma.chat.findMany({
            where: {
                roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 100
        });

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