import { z } from "zod"

export const signUpSchema = z.object({
    email: z.string().email("Invalid email").max(50, "Email can't have more than 50 characters!"),
    password: z.string().min(8, "Password must have at least 8 characters!").max(50, "Password cannot have more the 50 characters!"),
    name: z.string().min(3, "Name must have at least 3 characters!").max(50, "Name cannot have more than 50 characters!")
});

export const signInSchema = z.object({
    email: z.string().email("Invalid email").max(50, "Email can't have more than 50 characters!"),
    password: z.string().min(8, "Password must be al least 8 characters!").max(50, "Password cannot have more the 50 characters!"),
});