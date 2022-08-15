import { Request, Response } from "express";
import userService from "../services/userService.js";


export async function searchUsers(req: Request, res: Response) {
    const search = req.query.search as string;
    if (!search) {
        return res.sendStatus(422);
    }
    const users = await userService.getUsersByUsername(search);
    res.send(users);
}