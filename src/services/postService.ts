import postRepository from "../repositories/postRepository.js";
import * as handlerError from "../middlewares/handlerErrorsMiddleware.js"
import imageRepository from "../repositories/imageRepository.js";
import { image } from "@prisma/client";
import path from "path";

export interface CreatePost {
    picture: string;
    userId: number
};

export type CreateImage = Omit<image, "id">;

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

async function uploadImages(filename: string, mimetype: string, size: bigint, filepath: string) {
    console.log(filepath);
    const data: CreateImage = { filename, mimetype, filepath, size };
    await imageRepository.saveImage(data);
}

async function getImage(filename: string) {
    const image = await imageRepository.findImage(filename);
    if (image) {
        const dirname = path.resolve();
        const fullFilePath = path.join(dirname, image.filepath);
        return { type: image.mimetype, fullFilePath };
    } else {
        throw handlerError.notFoundError();
    }
}

const postService = {
    create,
    getPost,
    getAllPosts,
    getPostsByUser,
    rankingByLikes,
    uploadImages,
    getImage
}

export default postService;