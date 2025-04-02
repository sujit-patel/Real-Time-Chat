import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import messageRouter from './routes/message.route.js';
import { app, server } from './SocketIo/server.js';

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5001;

try {
  // mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connect(URL, { useUnifiedTopology: true });
  console.log('MongoDB Connected');
} catch (error) {
  console.log('MongoDB Connection Error:', error);
}

app.use('/api/user', userRoute);
app.use('/api/message', messageRouter);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
