import { Request, Response } from "express";
import likeService from "../services/likeService.js";

export async function like(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.id;
    await likeService.like(+id, userId);
    res.sendStatus(201);
}

export async function unlike(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.id;
    await likeService.unlike(+id, userId);
    res.sendStatus(201);
}