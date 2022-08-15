import prisma from "../../src/config/db.js";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import app from "../../src/app.js";
import userFactory from "../factories/userFactory.js";
import authRepository from "../../src/repositories/authRepository.js";
import scenarioFactory from "../factories/scenarioFactory.js";

const api = supertest(app);

beforeEach(async () => {
    await authRepository.reset();
});

describe("POST register and authentication", () => {
    it("return status 201", async () => {
        const body = userFactory.generateBody();
        const { status } = await api.post("/signup").send(body);
        expect(status).toEqual(201);
    });

    it("return status 422", async () => {
        const body = userFactory.generateFailBody();
        const { status } = await api.post("/signup").send(body);
        expect(status).toEqual(422);
    });

    it("return user", async () => {
        const bodyLogin = await scenarioFactory.createUser();
        const { body } = await api.post("/login").send(bodyLogin);
        expect(body.token).not.toBeNull();
        expect(body.id).not.toBeNull();
    });

    it("return status 422", async () => {
        const { status } = await api.post("/login").send({ email: "asdas@sas.com", password: "sadad21" });
        expect(status).toEqual(422);
    });
});

describe("Publish post", () => {
    it("return status 201", async () => {
        const bodyLogin = await scenarioFactory.createUser();
        const picture = faker.image.animals();
        const result = await api.post("/login").send(bodyLogin);
        const { status } = await api.post("/posts").send({ picture }).set("Authorization", result.body.token);
        expect(status).toEqual(201);
    });

    it("return status 401", async () => {
        const bodyLogin = await scenarioFactory.createUser();
        const picture = faker.image.animals();
        const result = await api.post("/login").send(bodyLogin);
        const { status } = await api.post("/posts").send({ picture });
        expect(status).toEqual(401);
    });

    it("return status 422", async () => {
        const bodyLogin = await scenarioFactory.createUser();
        const result = await api.post("/login").send(bodyLogin);
        const { status } = await api.post("/posts").send().set("Authorization", result.body.token);
        expect(status).toEqual(422);
    });

    it("return length three equal three", async () => {
        const scenario = await scenarioFactory.scenarioThreePosts();
        const { body } = await api.get("/posts");
        console.log(body[0].id)
        console.log(scenario)
        expect(body.length).toEqual(3);
        expect(body[0].id).toEqual(scenario.posts[0].id);
        expect(body[0].userId).toEqual(scenario.posts[0].userId);
        expect(body[0].picture).toEqual(scenario.posts[0].picture);
        expect(body[1].id).toEqual(scenario.posts[1].id);
        expect(body[1].userId).toEqual(scenario.posts[1].userId);
        expect(body[1].picture).toEqual(scenario.posts[1].picture);
        expect(body[2].id).toEqual(scenario.posts[2].id);
        expect(body[2].userId).toEqual(scenario.posts[2].userId);
        expect(body[2].picture).toEqual(scenario.posts[2].picture);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});