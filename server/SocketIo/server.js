import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4000",
        methods: ["GET", "POST"],
    },
});

const users = {};

export const getReceiverSocketId = (receiverId) => users[receiverId];

io.on("connection", (socket) => {
    // console.log("New Client Connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
        users[userId] = socket.id;
        // console.log("User Connected:", users);
    }

    io.emit("onlineUsers", Object.keys(users));
    socket.on("disconnect", () => {
        // console.log("Client Disconnected:", socket.id);
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

// git push origin HEAD --force
