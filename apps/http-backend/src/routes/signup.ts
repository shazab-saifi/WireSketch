import { SignUpSchema } from "@repo/common/types";
import { Request, Response } from "express";
import { prisma } from "@repo/db/singleton"
import bcrypt from "bcrypt"

export async function signup(req: Request, res: Response) {
    const parsedData = SignUpSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.json({
            msg: "Incorrect Inputs!" + parsedData.error
        });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
        const user = await prisma.user.create({
            data: {
                email: parsedData.data.email,
                password: hashedPassword,
                name: parsedData.data.name,
                authtype: "crednetials"
            }
        });

        res.json({
            user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            err: "Internal server error!" + error
        });
    }
}