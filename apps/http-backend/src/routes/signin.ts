import { SignInSchema } from "@repo/common/types";
import { prisma } from "@repo/db/singleton";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export async function signin(req: Request, res: Response) {
    const parsedData = SignInSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({
            msg: "Incorrect Inputs!"
        });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: parsedData.data?.email
            }
        });

        if (!user) {
            res.status(404).json({
                msg: "User not found!"
            });
            return;
        }

        if (parsedData.data?.password && user?.password) {
            const userPassword = await bcrypt.compare(parsedData.data.password, user.password);

            if (userPassword) {
                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET || "DEMO_SECRET",
                    {expiresIn: "7d"}
                );
                
                res.cookie("jwt", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });

                console.log(res.getHeaders());

                res.json({
                    msg: "Loged In successfully!"
                });
            } else {
                res.status(401).json({
                    msg: "Invalid credentials!"
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            err: "Internal server error!" + error
        });
    }
}
