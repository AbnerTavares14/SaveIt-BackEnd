import prisma from "../config/db.js";
import { CreateUser, CreateSession } from "../services/authService.js";

async function insert(data: CreateUser) {
    return await prisma.users.create({ data });
}

async function getUserByEmail(email: string) {
    return await prisma.users.findFirst({
        where: {
            email
        }
    });
}

async function login(data: CreateSession) {
    return await prisma.sessions.create({ data });
}

async function getUserById(id: number) {
    return prisma.users.findFirst({
        where: { id },
        select: {
            id: true,
            picture: true,
            username: true,
            email: true
        }
    });
}

const authRepository = {
    insert,
    getUserByEmail,
    login,
    getUserById
};

export default authRepository;