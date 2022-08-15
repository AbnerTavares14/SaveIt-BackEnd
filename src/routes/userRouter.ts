import { Router } from "express";
import { searchUsers } from "../controllers/userController.js";
// import { verifyToken } from "../middlewares/verifyToken.js";

const userRouter = Router();

userRouter.get("/users", searchUsers);

export default userRouter;