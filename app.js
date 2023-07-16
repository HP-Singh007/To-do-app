import { config } from "dotenv";
import express from "express"
import UserRouter from "./routes/user.js"
import TaskRouter from "./routes/task.js"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"

//dotenv configuration
config({
    path: "./data/config.env",
})

export const app = express();

//using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["process.env.FRONTEND_URL"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

//Using Routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/tasks", TaskRouter);

app.get("/", (req, res) => {
    res.send("Working")
})

//using error Middleware
app.use(errorMiddleware)
