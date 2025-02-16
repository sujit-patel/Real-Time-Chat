import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        console.log("Decoded Token User ID:", decoded.userId);

        const user = await User.findById(decoded.userId).select("-password");
        console.log("User Found:", user);
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in secureRoute:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default secureRoute;
