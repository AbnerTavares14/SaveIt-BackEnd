import { Request, Response } from "express";
import commentService from "../services/commentService.js";

export async function create(req: Request, res: Response) {
    const { comment } = req.body;
    if (!comment) {
        res.sendStatus(422);
    }
    const { id: postId } = req.params;
    const userId = res.locals.id;
    await commentService.createComment(comment, +postId, userId);
    res.sendStatus(201);
}

export async function getComments(req: Request, res: Response) {
    const { id: postId } = req.params;
    const comments = await commentService.getComments(+postId);
    res.send(comments);
}