import prisma from "../config/db.js";
import { CreatePost } from "../services/postService.js";

async function insert(data: CreatePost) {
    return prisma.posts.create({ data });
}

async function getPostById(id: number) {
    return prisma.posts.findUnique({
        where: {
            id
        }
    });
}

async function getPosts() {
    return prisma.posts.findMany();
}

const postRepository = {
    insert,
    getPostById,
    getPosts
};

export default postRepository;