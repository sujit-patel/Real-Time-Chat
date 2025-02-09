import jwt from "jsonwebtoken";

const tokenAndCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "1d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/", 
        maxAge: 1 * 24 * 60 * 60 * 1000, 
    });

    return token; 
};

export default tokenAndCookie;
