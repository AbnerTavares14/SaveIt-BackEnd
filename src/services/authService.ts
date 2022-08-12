import { sessions, users } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import authRepository from "../repositories/authRepository.js";
import * as handlerError from "../middlewares/handlerErrorsMiddleware.js";


export interface CreateUser {
    email: string;
    username: string;
    password: string;
    picture: any
}

export type CreateSession = Omit<sessions, "id">;

async function createUser(email: string, password: string, username: string, picture: any) {
    const user = await authRepository.getUserByEmail(email);

    if (user) {
        throw handlerError.conflict();
    }

    const salt = 10;
    const encryptPassword = bcrypt.hashSync(password, salt);
    const dataUser: CreateUser = { email, username, password: encryptPassword, picture };
    await authRepository.insert(dataUser);
}

async function login(email: string, password: string) {
    const user = await authRepository.getUserByEmail(email);

    if (!user) {
        throw handlerError.unprocessableEntity();
    }

    if (bcrypt.compareSync(password, user.password)) {
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user.id }, secretKey);
        const data: CreateSession = { token, userId: user.id };
        await authRepository.login(data);
        return { token, id: user.id };
    } else {
        throw handlerError.unauthorized();
    }
}

async function getUser(id: number) {
    const user = await authRepository.getUserById(id);
    if (!user) {
        throw handlerError.notFoundError();
    }
    return user;
}


const authService = {
    createUser,
    login,
    getUser
};

export default authService;