import { Router } from "express";
import { signup } from "./routes/signup";
import { signin } from "./routes/signin";

const router = Router();

router.post("/signup", signup);
router.post("/", signin)