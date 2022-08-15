import prisma from "../config/db.js";
import { Like } from "../services/likeService.js";

async function create(data: Like) {
    await prisma.posts.update({
        where: {
            id: data.postId
        },
        data: {
            likes: { increment: 1 }
        }
    });
    return prisma.likesPosts.create({ data });
}

async function getLike(postId: number, userId: number) {
    return prisma.likesPosts.findFirst({
        where: {
            userId,
            postId
        }
    });
}

async function removeLike(id: number, postId: number) {
    await prisma.posts.update({
        where: {
            id: postId
        },
        data: {
            likes: { decrement: 1 }
        }
    });
    return prisma.likesPosts.delete({
        where: {
            id
        }
    });
}

const likeRepository = {
    create,
    getLike,
    removeLike
};

export default likeRepository;