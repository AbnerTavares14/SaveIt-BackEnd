import authRepository from "../repositories/authRepository.js";
import postRepository from "../repositories/postRepository.js";
import * as handlerError from "../middlewares/handlerErrorsMiddleware.js"

export interface CreatePost {
    picture: string;
    userId: number
};

async function create(picture: string, userId: number) {
    await postRepository.insert({ picture, userId });
}

async function getPost(postId: number) {
    const post = await postRepository.getPostById(postId);
    if (!post) {
        throw handlerError.notFoundError();
    }
    return post;
}

async function getAllPosts() {
    const posts = await postRepository.getPosts();
    return posts;
}

async function getPostsByUser(id: number) {
    const posts = await postRepository.getPostByUser(id);
    return posts;
}

async function rankingByLikes() {
    const posts = await postRepository.getPostsOrderByLikes();
    return posts;
}

const postService = {
    create,
    getPost,
    getAllPosts,
    getPostsByUser,
    rankingByLikes
}

export default postService;