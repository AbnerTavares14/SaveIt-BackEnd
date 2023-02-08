import { Router } from "express";
import { createPost, deletePost, getImage, getPost, getPosts, getPostsByUser, publishImage, rankingByLikes } from "../controllers/postController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import postSchema from "../schemas/postSchema.js";



const postRouter = Router();

postRouter.get("/posts", getPosts);
postRouter.get("/posts/:id", getPost);
postRouter.post("/posts", verifyToken, createPost);
postRouter.get("/posts/user/:userId", getPostsByUser);
postRouter.get("/posts/ranking", rankingByLikes);
postRouter.post('/image', verifyToken, publishImage);
postRouter.get("/image/:id", verifyToken, getImage);
postRouter.delete("/posts/:id", verifyToken, deletePost);

export default postRouter;