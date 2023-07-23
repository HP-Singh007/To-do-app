import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

//new Task
export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user
        })

        res.status(201).json({
            success: true,
            message: "Task created"
        });
    } catch (error) {
        next(error);
    }
}

//Get Task
export const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user });

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error);
    }
}

export const updateTaskDetails = async(req,res,next)=>{
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new ErrorHandler("No Task Found", 404));

        const {title,description} = req.body;

        task.title=title;
        task.description=description;
        await task.save();
        
        res.json({
            success:true,
            message:"Task Updated"
        })
        
    } catch (error) {
        next(error);
    }
}

//Update Tasks
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new ErrorHandler("No Task Found", 404));

        task.isCompleted = !(task.isCompleted);
        await task.save();
        res.status(200).json({
            success: true,
            message: "Task Updated"
        })
    } catch (error) {
        next(error);
    }
}

//Delete Tasks
export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new ErrorHandler("No Task Found", 404));
        task.deleteOne();
        res.status(200).json({
            success: true,
            message: "Task Deleted"
        })
    } catch (error) {
        next(error);
    }
}
