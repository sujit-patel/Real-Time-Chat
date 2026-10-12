import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndCookie from "../jwt/tokenGenerate.js";

// DAILY LIMIT SETTINGS (Set to null or remove later if not needed)
const MAX_DAILY_REGISTRATIONS = 10;

// User Signup
export const signup = async (req, res) => {
    try {
        const { fullname, email, password, confirmpassword, profilePic } = req.body;

        // Daily registration limit check (Max 10 users per day)
        if (MAX_DAILY_REGISTRATIONS) {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const todayUsersCount = await User.countDocuments({
                createdAt: { $gte: startOfDay, $lte: endOfDay },
            });

            if (todayUsersCount >= MAX_DAILY_REGISTRATIONS) {
                return res.status(400).json({
                    message: `Daily registration limit reached (Max ${MAX_DAILY_REGISTRATIONS} users per day). Please try tomorrow.`,
                });
            }
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname,
            email,
            password: hashPassword,
            profilePic: profilePic || "",
        });
        await newUser.save();

        if (newUser) {
            const token = createTokenAndCookie(newUser._id, res);
            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                    profilePic: newUser.profilePic || "",
                },
                token,
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
                const token = createTokenAndCookie(user._id, res);
                return res.status(200).json({
                    message: "Login successful",
                    user: {
                        _id: user._id,
                        fullname: user.fullname,
                        email: user.email,
                        profilePic: user.profilePic || "",
                    },
                    token,
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
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
        });
        return res.status(200).json({ message: "User logged out successfully." });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

// Update Profile Picture
export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: profilePic || "" },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        return res.status(500).json({ message: "Internal Server Error" });
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
