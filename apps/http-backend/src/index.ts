import { Router } from "express";
import express from "express"
import { signup } from "./routes/signup";
import { signin } from "./routes/signin";

const app = express();
const router = Router();
app.use(express.json());

router.post("/signup", signup);
router.post("/signin", signin);

app.use(router);

app.listen(4000);