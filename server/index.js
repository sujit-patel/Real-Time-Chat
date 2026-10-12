import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import messageRouter from './routes/message.route.js';
import { app, server } from './SocketIo/server.js';

dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        return callback(null, origin || true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

const URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5001;

try {
  // mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
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
