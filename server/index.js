import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT || 4001;
const URL = process.env.MONGODB_URL;

try {
  mongoose.connect(URL);
  console.log('MongoDB Connected');
} catch (error) {
  console.log('MongoDB Connection Error:', error); 
}

app.use('/api/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
