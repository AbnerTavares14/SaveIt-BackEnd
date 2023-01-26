import { Request, Response } from "express";
import postService from "../services/postService.js";
import { imageUpload } from "../middlewares/multer.js";
import path from "path";



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
    const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;
    await postService.uploadImages(filename, mimetype, BigInt(size), filepath);
    res.json({ success: true, filename });
}

export async function getImage(req: Request, res: Response) {
    const { filename } = req.params;
    const image = await postService.getImage(filename);
    res.type(image.type).sendFile(image.fullFilePath);


    // const dirname = path.resolve();
    // const fullFilePath = path.join(dirname, 'uploads/' + filename);
    // return res.sendFile(fullFilePath);
}