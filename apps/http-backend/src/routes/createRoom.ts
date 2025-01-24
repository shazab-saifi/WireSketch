import { CreateRoomSchema } from "@repo/common/types";
import { prisma } from "@repo/db/singleton";
import { Request, Response } from "express";

export async function createRoom(req: Request, res: Response) {
    const parsedData = CreateRoomSchema.safeParse(req.body);

    if (!parsedData) {
        res.status(400).json({
            msg: "Incorrect Inputs!"
        });
        return;
    }

    try {
        const adminId = req.userId!;
        if (parsedData.data?.name) {
            await prisma.room.create({
                data: {
                    adminId,
                    slug: parsedData.data.name
                }
            })
        }
    } catch (error) {
        console.error(error);
        res.json({
            msg: "Internal server error" + error
        });
    }
}