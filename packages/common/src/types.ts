import { z } from "zod"

export const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(30),
    name: z.string().max(30),
});

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(30),
});

export const CreateRoomSchema = z.object({
    name: z.string()
});