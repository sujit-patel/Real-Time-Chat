import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import userRoute from "./routes/user.route.js"
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4001;
const URL = process.env.MONGODB_URL;


mongoose.connect(URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
});
