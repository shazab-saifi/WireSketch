import { prisma } from "@repo/db/singleton";
import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const wss = new WebSocketServer({ port: 8080 });
console.log(process.env.JWT_SECRET)

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "DEMO_SECRET");

        if (typeof decoded === "string") {
            return null
        }
        
        if (!decoded || !decoded.userId) {
            return null;
        }

        return decoded.userId;
    } catch (error) {
        console.log(error);
        return null;
    }
}

interface User{
    userId: string;
    rooms: string[]
    ws: WebSocket
}

const users: User[] = [];

wss.on("connection", async (ws, req) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            ws.close(1000, "Unauthorized, jwt token must be provided the headers!");
            return;
        }

        const userId = checkUser(token);

        if (!userId) {
            ws.close();
            return;
        }

        users.push({
            userId,
            rooms: [],
            ws
        });

        ws.on("message", async (data) => {
            let parsedData;

            if (typeof data !== "string") {
                parsedData = JSON.parse(data.toString());
            }else{
                parsedData = JSON.parse(data);
            }

            if (parsedData.type === "join_room") {
                const user = users.find(x => x.ws === ws);
                user?.rooms.push(parsedData.roomId);
            }

            if (parsedData.type === "leave_room") {
                const user = users.find(x => x.ws === ws);
                if (!user) {
                    return;
                }
                user.rooms = user.rooms.filter(x => x === parsedData.roomId)
            }

            if (parsedData.type === "chat") {
                const roomId = parsedData.roomId;
                const message = parsedData.message;

                await prisma.chat.create({
                    data: {
                        message,
                        userId,
                        roomId: Number(roomId)
                    }
                });

                users.forEach(user => {
                    if (user.rooms.includes(roomId)) {
                        user.ws.send(JSON.stringify({
                            roomId,
                            type: "chat",
                            message
                        }));
                    }
                })
            }
        });
        
    } catch (error) {
        console.error(error);
    }
});