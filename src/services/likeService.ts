import postRepository from "../repositories/postRepository.js";
import * as handlerError from "../middlewares/handlerErrorsMiddleware.js";
import { likesPosts } from "@prisma/client";
import likeRepository from "../repositories/likeRepository.js";

export type Like = Omit<likesPosts, "id">;

async function like(postId: number, userId: number) {
    const post = await postRepository.getPostById(postId);
    const like = await likeRepository.getLike(postId, userId);
    if (like) {
        return await likeRepository.removeLike(like.id, postId);
    }
    if (!post) {
        throw handlerError.notFoundError();
    }
    await likeRepository.create({ userId, postId });
}

async function verifyIfUserLiked(userId: number, postId: number) {
    const like = await likeRepository.getLike(postId, userId);
    if (!like) {
        return false;
    }
    return true;
}

// async function unlike(postId: number, userId: number) {
//     const post = await postRepository.getPostById(postId);
//     const like = await likeRepository.getLike(postId, userId);
//     if (!post) {
//         throw handlerError.notFoundError();
//     }
//     if (!like) {
//         throw handlerError.notFoundError();
//     }
//     await likeRepository.removeLike(like.id, postId);
// }

const likeService = {
    like,
    verifyIfUserLiked
};

export default likeService;