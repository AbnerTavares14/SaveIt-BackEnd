import { Router } from "express";
import { getUser, login, signUp } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema.js";
import loginSchema from "../schemas/loginSchema.js";
import userSchema from "../schemas/userSchema.js";
// import upload from "../middlewares/multer.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(userSchema), signUp);
authRouter.post("/login", validateSchema(loginSchema), login);
authRouter.get("/user/:id", getUser);

export default authRouter;