import { Router } from "express";
import express from "express"
import { signup } from "./routes/signup";
import { signin } from "./routes/signin";
import { createRoom } from "./routes/createRoom";
import authMiddleware from "./middlewares/authMiddleware";

const app = express();
const router = Router();
app.use(express.json());

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/create-room", authMiddleware, createRoom);

app.use("/", router);

app.listen(4000);