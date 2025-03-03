import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4000",
        methods: ["GET", "POST"],
    },
});

const users = {};

// real time message
export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
};

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        users[userId] = socket.id;
        console.log("Welcome users:", users);
    }

    // online users
    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
        if (userId) {
            delete users[userId];
            io.emit("getOnlineUsers", Object.keys(users));
        }
    });
});

export { app, io, server };
