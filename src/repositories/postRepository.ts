import prisma from "../config/db.js";
import { CreatePost } from "../services/postService.js";

async function insert(data: CreatePost) {
    return prisma.posts.create({ data });
}

async function getPostById(id: number) {
    const post = await prisma.posts.findUnique({
        where: {
            id
        }
    });
    return post;
}

async function getPosts() {
    return prisma.posts.findMany({
        select: {
            id: true,
            userId: true,
            picture: true,
            likes: true,
            description: true,
            users: {
                select: {
                    username: true,
                    picture: true
                }
            },
            Comment: {
                select: {
                    comment: true,
                    users: {
                        select: {
                            username: true,
                            picture: true,
                        }
                    }
                }
            }
        }
    });
}

async function getPostByUser(id: number) {
    return prisma.posts.findMany({
        where: {
            userId: id
        },
        orderBy: {
            likes: 'desc'
        },
        select: {
            id: true,
            userId: true,
            picture: true,
            likes: true,
            users: {
                select: {
                    username: true,
                    picture: true
                }
            }
        }
    });
}

async function getPostsOrderByLikes() {
    return prisma.posts.findMany({
        orderBy: {
            likes: 'desc'
        },
        select: {
            id: true,
            userId: true,
            picture: true,
            likes: true,
            users: {
                select: {
                    username: true,
                    picture: true
                }
            }
        }
    });
}

async function removePost(id: number) {
    return prisma.posts.delete({
        where: {
            id
        }
    });
}

const postRepository = {
    insert,
    getPostById,
    getPosts,
    getPostByUser,
    getPostsOrderByLikes,
    removePost
};

export default postRepository;