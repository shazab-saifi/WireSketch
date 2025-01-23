import { SignUpSchema } from "@repo/common/types";
import { Request, Response } from "express";
import { prisma } from "@repo/db/singleton"

export async function signup(req: Request, res: Response) {
    const parsedData = SignUpSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.json({
            msg: "Incorrect Inputs!"
        });
        return;
    }

    try {
        const email = parsedData.data.email;
        const password = parsedData.data.password;
        const name = parsedData.data.name;

        await prisma.user.create({
            data: {
                email,
                password,
                name
            }
        });

        res.json({
            msg: "You've signed up"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            err: "Internal server error!" + error
        });
    }
}