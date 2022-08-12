import { Router } from "express";
import { createPost, getPost, getPosts } from "../controllers/postController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import postSchema from "../schemas/postSchema.js";


const postRouter = Router();

postRouter.post("/posts", validateSchema(postSchema), verifyToken, createPost);
postRouter.get("/posts", getPosts);
postRouter.get("posts/:id", getPost);

export default postRouter;