import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { unauthorized } from "./handlerErrorsMiddleware.js";

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");
    if (!token) {
        throw unauthorized();
    }
    let user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
        res.locals.id = user.id;
        next();
    }
}