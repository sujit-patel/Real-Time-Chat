import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndCookie from "../jwt/tokenGenerate.js";

// User Signup
export const signup = async (req, res) => {
    try {
        const { fullname, email, password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname, email, password: hashPassword });
        await newUser.save();

        if (newUser) {
            createTokenAndCookie(newUser._id, res);
            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                },
            });
        }
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// User Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                createTokenAndCookie(user._id, res);
                return res.status(201).json({
                    message: "Login successful",
                    user: {
                        _id: user._id,
                        fullname: user.fullname,
                        email: user.email,
                    },
                });
            } else {
                return res.status(400).json({ message: "Invalid password." });
            }
        } else {
            return res.status(400).json({ message: "Email is not registered. Please sign up." });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// User Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ message: "User logged out successfully." });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// All Users
export const getallusers = async (req, res) => {
    try {
        const loggedUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedUser } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
