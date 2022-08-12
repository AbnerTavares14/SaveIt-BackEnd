import { Request, Response } from "express";
import authService from "../services/authService.js";


export async function signUp(req: Request, res: Response) {
    console.log("entrou aqui")
    const { email, password, username, picture } = req.body;
    await authService.createUser(email, password, username, picture);
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