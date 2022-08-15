import { faker } from "@faker-js/faker";

function generateBody() {
    const username = faker.name.firstName();
    const email = faker.internet.email();
    const picture = faker.image.animals();
    const password = faker.random.alphaNumeric(6);
    const confirmPassword = password;
    return { username, email, password, confirmPassword, picture };
}

function generateFailBody() {
    const username = faker.name.firstName();
    const email = faker.internet.email();
    const picture = faker.image.animals();
    const password = faker.random.alphaNumeric(6);
    const confirmPassword = faker.random.alphaNumeric(6);
    return { username, email, password, confirmPassword, picture };
}

const userFactory = {
    generateBody,
    generateFailBody
};

export default userFactory;