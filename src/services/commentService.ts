import postRepository from "../repositories/postRepository.js";
import * as handlerError from "../middlewares/handlerErrorsMiddleware.js";
import commentRepository from "../repositories/commentRepository.js";

export interface CreateComment {
    comment: string;
    userId: number;
    postId: number;
}

async function createComment(comment: string, postId: number, userId: number) {
    const post = await postRepository.getPostById(postId);

    if (!post) {
        throw handlerError.notFoundError();
    }

    await commentRepository.create({ comment, userId, postId });
}

async function getComments(postId: number) {
    const post = await postRepository.getPostById(postId);
    const comments = await commentRepository.getCommentsByPostId(postId);
    if (!post) {
        throw handlerError.notFoundError();
    }

    return comments;
}

const commentService = {
    createComment,
    getComments
};

export default commentService;