import { Request, Response } from "express";
import postService from "../services/postService.js";


export async function createPost(req: Request, res: Response) {
    const { picture } = req.body;
    const userId = res.locals.id;
    await postService.create(picture, userId);
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