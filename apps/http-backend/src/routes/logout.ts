import { Request, Response } from "express";

export function logout(req: Request, res: Response) {
    res.clearCookie("token", {path: "/"});
    res.redirect("/signin");
}