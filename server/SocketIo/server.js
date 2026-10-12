import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = http.createServer(app);
const frontendUrl = process.env.FRONTEND_URL;

const allowedOrigins = [
    frontendUrl,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
].filter(Boolean);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const users = {};

export const getReceiverSocketId = (receiverId) => users[receiverId];

io.on("connection", (socket) => {

    const userId = socket.handshake.query.userId;

    if (userId) {
        users[userId] = socket.id;
    }

    io.emit("onlineUsers", Object.keys(users));
    socket.on("disconnect", () => {
        for (const [key, value] of Object.entries(users)) {
            if (value === socket.id) {
                delete users[key];
                break;
            }
        }
        io.emit("onlineUsers", Object.keys(users));
    });
});

export { app, io, server };
