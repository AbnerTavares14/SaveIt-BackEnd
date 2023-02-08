import prisma from "../config/db.js";
import { CreateImage } from "../services/postService.js";

async function saveImage(data: CreateImage) {
    return prisma.avatar.create({ data });
}

async function findImageByUserId(userId: number, id: number) {
    return prisma.avatar.findFirst({
        where: {
            userId,
            id
        }
    });
}

const imageRepository = {
    saveImage,
    findImageByUserId
};

export default imageRepository;