import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import tokenAndCookie from "../jwt/tokenGenerate.js"

// signup part 
export const signup = async (req, res) => {
    const { fullname, email, password, confirmpassword } = req.body;
    const userExists = await User.findOne({ email });
    try {
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User(
            {
                fullname,
                email,
                password: hashPassword
                // confirmpassword
            }
        );
        await newUser.save();
        if (newUser) {
            tokenAndCookie(newUser._id, res);
            res.status(201).json({
                message: "User registered successfully", newUser: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error ", error });
    }
};

// login part
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                tokenAndCookie(user._id, res);
                res.status(201).json({
                    message: "Login Successfuly...", user: {
                        _id: user._id,
                        fullname: user.fullname,
                        email: user.email
                    },
                });
            } else {
                res.status(400).json({ message: "Password Is Invalid..." });
            }
        } else {
            res.status(400).json({ message: "Email is Note Registered plase Signup Plase..." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "User Logout Successfully..." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error });
    }
}