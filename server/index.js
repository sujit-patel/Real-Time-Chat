import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import userRoute from "./routes/user.route.js"

const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5001;
const URL = process.env.MONGODB_URL;


mongoose.connect(URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Connection Error:", error));

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
});
