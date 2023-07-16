import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

//Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }
    //user found now checking password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        sendCookie(user, res, `Welcome Back ${user.name}`, 200);
    }
    else {
        res.status(400).json({
            success: false,
            message: "Incorrect Password"
        })
    }
}

//Register function
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(404).json({
            success: false,
            message: "User Already Exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    sendCookie(user, res, "User Registered Successfully", 201);
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
export const logout = async (req, res) => {
    res.status(200).cookie("token", " ", {
        maxAge:0
    }).json({
        success: true,
        message: "logout"
    })
}
