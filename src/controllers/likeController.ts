import { Request, Response } from "express";
import likeService from "../services/likeService.js";

export async function like(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.id;
    await likeService.like(+id, userId);
    res.sendStatus(200);
}

export async function checkIftheUserHasAlreadyLiked(req: Request, res: Response) {
    const { id } = req.params;
    const userId = res.locals.id;
    const like = await likeService.verifyIfUserLiked(userId, +id);
    res.send(like);
}