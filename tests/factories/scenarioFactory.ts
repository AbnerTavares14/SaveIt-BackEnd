import { faker } from "@faker-js/faker";
import prisma from "../../src/config/db.js";
import authRepository from "../../src/repositories/authRepository";
import authService from "../../src/services/authService";
import postService from "../../src/services/postService";
import userFactory from "./userFactory";
import supertest from "supertest";
import app from "../../src/app";
const api = supertest(app);

async function createUser() {
    const body = userFactory.generateBody();
    await authService.createUser(body.email, body.password, body.username, body.picture);
    return { email: body.email, password: body.password };
}

async function createPosts() {
    const bodyLogin = await scenarioFactory.createUser();
    const result = await api.post("/login").send(bodyLogin);
    const picture = faker.image.animals();
    const { body } = await api.post("/posts").send({ picture }).set("Authorization", result.body.token);
    return body;
}

async function scenarioThreePosts() {
    const post1 = await createPosts();
    const post2 = await createPosts();
    const post3 = await createPosts();

    return { posts: [post1, post2, post3] };
}

const scenarioFactory = {
    createUser,
    createPosts,
    scenarioThreePosts
};

export default scenarioFactory;