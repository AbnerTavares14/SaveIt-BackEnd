import { Request, Response } from "express";
import postService from "../services/postService.js";
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from "express-fileupload";

export async function createPost(req: Request, res: Response) {
    const file = req.files.picture as UploadedFile;
    const result = await cloudinary.uploader.upload(file?.tempFilePath, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
        folder: "uploads"
    });
    const userId = res.locals.id;
    const { description } = req.body;
    await postService.create(result.url, userId, result.public_id, description);
    res.sendStatus(201);
}

export async function getPosts(req: Request, res: Response) {
    const posts = await postService.getAllPosts();
    res.send(posts);
}

export async function getPost(req: Request, res: Response) {
    const { id } = req.params;
    const post = await postService.getPost(+id);
    res.send(post);
}

export async function getPostsByUser(req: Request, res: Response) {
    const { userId } = req.params;
    const posts = await postService.getPostsByUser(+userId);
    res.send(posts);
}

export async function rankingByLikes(req: Request, res: Response) {
    const posts = await postService.rankingByLikes();
    res.send(posts);
}

export async function publishImage(req: Request, res: Response) {
    const file = req.files.picture as UploadedFile;
    const { id } = res.locals;
    const result = await cloudinary.uploader.upload(file?.tempFilePath, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
        folder: "uploads"
    });
    await postService.uploadImages(id, result.url);
    res.send(result.url);
}

export async function getImage(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.id;
    const image = await postService.getImage(+id, userId);
    res.send(image);
}

export async function deletePost(req: Request, res: Response) {
    const { id } = req.params;
    await postService.remove(+id);
    res.sendStatus(204);
}
