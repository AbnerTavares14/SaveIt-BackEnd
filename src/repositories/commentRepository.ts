import prisma from "../config/db.js";
import { CreateComment } from "../services/commentService.js";

async function create(data: CreateComment) {
    return prisma.comment.create({ data });
}

async function getCommentsByPostId(postId: number) {
    return prisma.comment.findMany({
        where: {
            postId
        },
        select: {
            id: true,
            userId: true,
            comment: true,
            createdAt: true,
            users: {
                select: {
                    username: true,
                    picture: true
                }
            }
        }
    });
}

const commentRepository = {
    create,
    getCommentsByPostId
};

export default commentRepository;