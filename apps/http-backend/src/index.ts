import { Router } from "express";
import express from "express"
import { signup } from "./routes/signup";
import { signin } from "./routes/signin";
import { createRoom } from "./routes/createRoom";
import authMiddleware from "./middlewares/authMiddleware";
import { room } from "./routes/room";

const app = express();
const router = Router();
app.use(express.json());

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/create-room", authMiddleware, createRoom);
router.get("/room:roomId", room);

app.use("/", router);

app.listen(4000);