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

async function getUserByUsername(username: string) {
    return prisma.users.findMany({
        where: {
            username: {
                contains: username
            }
        },
        select: {
            username: true,
            id: true,
            picture: true
        }
    });
}

async function reset() {
    await prisma.users.deleteMany();
}

const authRepository = {
    insert,
    getUserByEmail,
    login,
    getUserById,
    getUserByUsername,
    reset
};

export default authRepository;