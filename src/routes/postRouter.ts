import { Router } from "express";
import { createPost, getImage, getPost, getPosts, getPostsByUser, publishImage, rankingByLikes } from "../controllers/postController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import postSchema from "../schemas/postSchema.js";
import { imageUpload } from "../middlewares/multer.js";


const postRouter = Router();

postRouter.get("/posts", getPosts);
postRouter.get("/posts/:id", getPost);
postRouter.post("/posts", validateSchema(postSchema), verifyToken, createPost);
postRouter.get("/posts/user/:userId", getPostsByUser);
postRouter.get("/posts/ranking", rankingByLikes);
postRouter.post('/image', imageUpload.single('image'), publishImage);
postRouter.get("/image/:filename", getImage);

export default postRouter;