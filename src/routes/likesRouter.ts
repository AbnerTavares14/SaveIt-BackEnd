import { Router } from "express";
import { like, unlike } from "../controllers/likeController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const likesRouter = Router();

likesRouter.post("/like/:id", verifyToken, like);
likesRouter.post("/unlike/:id", verifyToken, unlike);

export default likesRouter;