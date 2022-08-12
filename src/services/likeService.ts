import postRepository from "../repositories/postRepository.js";
import * as handlerError from "../middlewares/handlerErrorsMiddleware.js";
import { likesPosts } from "@prisma/client";
import likeRepository from "../repositories/likeRepository.js";

export type Like = Omit<likesPosts, "id">;

async function like(postId: number, userId: number) {
    const post = await postRepository.getPostById(postId);
    if (!post) {
        throw handlerError.notFoundError();
    }
    await likeRepository.create({ userId, postId });
}

async function unlike(postId: number, userId: number) {
    const post = await postRepository.getPostById(postId);
    const { id } = await likeRepository.getLike(postId, userId);
    if (!post) {
        throw handlerError.notFoundError();
    }
    if (!like) {
        throw handlerError.notFoundError();
    }
    await likeRepository.removeLike(id, postId);
}

const likeService = {
    like,
    unlike
};

export default likeService;