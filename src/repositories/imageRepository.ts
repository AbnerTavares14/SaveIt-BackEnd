import prisma from "../config/db.js";
import { CreateImage } from "../services/postService.js";

async function saveImage(data: CreateImage) {
    return prisma.image.create({ data });
}

async function findImage(filename: string) {
    return prisma.image.findFirst({
        where: {
            filename
        }
    });
}

const imageRepository = {
    saveImage,
    findImage
};

export default imageRepository;