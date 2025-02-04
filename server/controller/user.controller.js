import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const { fullname, email, password, confirmpassword } = req.body;
    try {
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User(
            {
                fullname,
                email,
                password: hashPassword,
                confirmpassword
            }
        );
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
