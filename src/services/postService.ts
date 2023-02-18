import postRepository from "../repositories/postRepository.js";
import * as handlerError from "../middlewares/handlerErrorsMiddleware.js"
import imageRepository from "../repositories/imageRepository.js";
import { Avatar } from "@prisma/client";
import path from "path";
import userFactory from "../../tests/factories/userFactory.js";
import authRepository from "../repositories/authRepository.js";
import { v2 as cloudinary } from 'cloudinary';

export interface CreatePost {
    picture: string;
    userId: number;
    public_id: string;
    description?: string;
};

export type CreateImage = Omit<Avatar, "id">;

async function create(picture: string, userId: number, public_id: string, description?: string) {
    await postRepository.insert({ picture, userId, public_id, description });
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

async function uploadImages(id: number, url: string) {
    const user = await authRepository.getUserById(id);
    if (!user) {
        throw handlerError.notFoundError();
    }
    const data: CreateImage = { userId: id, url };
    await imageRepository.saveImage(data);
}

async function getImage(id: number, userId: number) {
    const image = await imageRepository.findImageByUserId(userId, id);
    return image;
}

async function remove(id: number, userId: number) {
    const post = await postRepository.getPostById(id);

    if (!post) {
        throw handlerError.notFoundError();
    }

    if (post.userId !== userId) {
        throw handlerError.unauthorized();
    }

    const result = await cloudinary.uploader.destroy(post?.public_id);
    console.log(result);
    await postRepository.removePost(id);
}

const postService = {
    create,
    getPost,
    getAllPosts,
    getPostsByUser,
    rankingByLikes,
    uploadImages,
    getImage,
    remove
}

export default postService;