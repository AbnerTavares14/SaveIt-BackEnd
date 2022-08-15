import { users } from "@prisma/client";
import { join } from "@prisma/client/runtime";
import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
    picture: Joi.string().required()
});

export default userSchema;