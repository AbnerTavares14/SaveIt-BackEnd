import authRepository from "../repositories/authRepository.js";


async function getUsersByUsername(search: string) {
    const users = await authRepository.getUserByUsername(search);
    return users;
}

const userService = {
    getUsersByUsername
};

export default userService;