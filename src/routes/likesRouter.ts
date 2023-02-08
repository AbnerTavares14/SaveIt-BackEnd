import { Router } from "express";
import { checkIftheUserHasAlreadyLiked, like } from "../controllers/likeController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const likesRouter = Router();

likesRouter.post("/like/:id", verifyToken, like);
likesRouter.get("/like/:id", verifyToken, checkIftheUserHasAlreadyLiked);

export default likesRouter;