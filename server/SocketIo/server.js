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

//real time message
export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
}

const users = {};
io.on("connection", (socket) => {
    console.log("New Client Connected", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId) {
        users[userId] = socket.id;
        console.log("Welcome : ", users);
    } else {
        console.log("User ID not provided.");
    }

    io.emit("getOnline", Object.keys(users));
    socket.on("disconnect", () => {
        console.log("Client Disconnected", socket.id);
        delete users[userId];
        io.emit("getOnline", Object.keys(users));
    });
});

export { app, io, server };