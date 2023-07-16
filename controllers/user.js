import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

//Login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("User not Found", 404));
        
        //user found now checking password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            sendCookie(user, res, `Welcome Back ${user.name}`, 200);
        }
        else {
            next(new ErrorHandler("Incorrect Password", 400))
        }
    } catch (error) {
        next(error);
    }
}

//Register function
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User Already Exists ", 400));

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "User Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
}

//Get details
export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        message: "User details",
        user: req.user,
    })
}

//logout
export const logout = async (req, res ,next) => {
    try {
        res.status(200).cookie("token", " ", {
            maxAge: 0,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "logout"
        })
    } catch (error) {
        next(error);
    }
}
