import { Router } from "express";
import express from "express";
import { signup } from "./routes/signup";
import { signin } from "./routes/signin";
import { createRoom } from "./routes/createRoom";
import authMiddleware from "./middlewares/authMiddleware";
import { room } from "./routes/room";
import passport from "passport";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import "./passport-config";

dotenv.config();

const app = express();
const router = Router();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type"]
}))

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/create-room", authMiddleware, createRoom);
router.get("/room/:roomId", room);

router.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const { user, token } = req.user as any;

        if (!token) {
            res.status(404).json({
                msg: "Authentication failed!"
            });
        }

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.redirect(process.env.FRONTEND_URL!);
    }
)

app.use("/", router);

app.listen(4000);