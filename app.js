import { config } from "dotenv";
import express from "express"
import UserRouter from "./routes/user.js"
import cookieParser from "cookie-parser";

//dotenv configuration
config({
    path:"./data/config.env",
})

export const app=express();

//using Middlewares
app.use(express.json());
app.use(cookieParser());

//Using Routes
app.use("/api/v1",UserRouter);

app.get("/",(req,res)=>{
    res.send("Working")
})
