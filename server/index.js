import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import messageRouter from './routes/message.route.js';
<<<<<<< HEAD
import { app, server } from "./SocketIo/server.js";
=======
import { app, server } from './SocketIO/server.js';
>>>>>>> 1ffa86429a97ce6e4c3a25e089084db5e07f6cd2

dotenv.config();

app.use(express.json());
app.use(cookieParser());
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
