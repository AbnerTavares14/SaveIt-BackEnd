import { Router } from "express";
import authRouter from "./authRouter.js";
import commentRouter from "./commentRouter.js";
import likesRouter from "./likesRouter.js";
import postRouter from "./postRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(likesRouter);
router.use(userRouter);
router.use(commentRouter);

export default router;