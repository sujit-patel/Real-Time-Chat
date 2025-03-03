import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import messageRouter from './routes/message.route.js';
import { app, server } from "./SocketIo/server.js";

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5001;
const URL = process.env.MONGODB_URL;

try {
  mongoose.connect(URL);
  console.log('MongoDB Connected');
} catch (error) {
  console.log('MongoDB Connection Error:', error);
}

app.use('/api/user', userRoute);
app.use('/api/message', messageRouter);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
