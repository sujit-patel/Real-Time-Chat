import express from "express";
import { getallusers, login, logout, signup } from "../controller/user.controller.js"
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getallusers", secureRoute, getallusers);

export default router;