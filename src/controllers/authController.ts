import { Request, Response } from "express";
import authService from "../services/authService.js";
import { v2 as cloudinary } from 'cloudinary';

export async function signUp(req: Request, res: Response) {
    const { email, password, username } = req.body;
    const file = req.files.picture;
    const result = await cloudinary.uploader.upload(file?.tempFilePath, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
        folder: "uploads"
    });
    await authService.createUser(email, password, username, result.url, result.public_id);
    res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    res.send(user);
}

export async function getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await authService.getUser(+id);
    res.send(user);
}