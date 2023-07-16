import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

router.post("/users/new",register);

router.post("/users/login",login);

router.get("/users/me",isAuthenticated,getMyProfile);

router.get("/users/logout",logout)
export default router;