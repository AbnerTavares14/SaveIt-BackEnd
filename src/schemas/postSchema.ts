import { posts } from "@prisma/client";
import Joi from "joi";

const postSchema = Joi.object<posts>({
    picture: Joi.string().required()
});

export default postSchema;