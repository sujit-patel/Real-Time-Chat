import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = http.createServer(app);
const frontendUrl = process.env.FRONTEND_URL;

const io = new Server(server, {
    cors: {
        origin: frontendUrl,
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
