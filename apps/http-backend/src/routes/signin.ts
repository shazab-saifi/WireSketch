import { SignInSchema } from "@repo/common/types";
import { prisma } from "@repo/db/singleton";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config();

export async function signin(req: Request, res: Response) {
    const parsedData = SignInSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            msg: "Incorrect Inputs!"
        });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: parsedData.data?.email
            }
        });

        if (parsedData.data?.password && user?.password) {
            const userPassword = await bcrypt.compare(parsedData.data.password, user.password);

            if (userPassword) {
                const token = jwt.sign({
                    id: user.id
                }, process.env.JWT_SECRET!);

                res.json({
                    token
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.json({
            err: "Internal server error!" + error
        });
    }
}