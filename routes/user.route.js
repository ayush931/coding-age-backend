import { Router } from "express";
import { loginController, userController } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.post("/register", userController)
userRouter.post("/login", loginController)

export default userRouter
