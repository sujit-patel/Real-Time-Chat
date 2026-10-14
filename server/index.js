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
  const inAllowedList = allowedOrigins.some(
    (allowed) => allowed && cleanOrigin === allowed.replace(/\/$/, "")
  );
  if (inAllowedList) return true;
  // Allow all Vercel deployment preview / production URLs
  if (cleanOrigin.endsWith(".vercel.app")) return true;
  // In development, allow all origins
  if (process.env.NODE_ENV !== "production") return true;
  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Root Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Real Time Chat Backend Server is running!" });
});

const URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5001;

mongoose
  .connect(URL)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error);
  });

app.use('/api/user', userRoute);
app.use('/api/message', messageRouter);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
