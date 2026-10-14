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
    "https://real-time-chat-ashen.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
].filter(Boolean);

const isAllowedOrigin = (origin) => {
    if (!origin) return true;
    const cleanOrigin = origin.replace(/\/$/, "");
    if (allowedOrigins.some((allowed) => allowed && cleanOrigin === allowed.replace(/\/$/, ""))) {
        return true;
    }
    if (cleanOrigin.endsWith(".vercel.app")) return true;
    if (process.env.NODE_ENV !== "production") return true;
    return false;
};

const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            if (isAllowedOrigin(origin)) {
                return callback(null, true);
            }
            return callback(null, false);
        },
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
