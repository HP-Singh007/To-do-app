import express from "express";
import { deleteTask, getTasks, newTask, updateTask ,updateTaskDetails} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/my", isAuthenticated, getTasks);

router.post("/update/:id",isAuthenticated,updateTaskDetails);

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export default router;