import { Router } from "express";
import { userRegistrationController } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.post("/register", upload.single('avatar'), userRegistrationController)

export default userRouter