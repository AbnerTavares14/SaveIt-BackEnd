import { Router } from 'express';
import { create, getComments } from '../controllers/commentController.js';
import validateSchema from '../middlewares/validateSchema.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import commentSchema from '../schemas/commentSchema.js';

const commentRouter = Router();

commentRouter.post("/comment/:id", validateSchema(commentSchema), verifyToken, create);
commentRouter.get("/comment/:id", getComments);

export default commentRouter;