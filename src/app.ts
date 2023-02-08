import express from "express";

import "express-async-errors";
import cors from "cors";
import router from "./routes/index.js";
import handleErrorsMiddleware from "./middlewares/handlerErrorsMiddleware.js";
import fileUpload from 'express-fileupload';

import { v2 as cloudinary } from 'cloudinary';


const app = express();
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 }
}));

cloudinary.config({
    cloud_name: 'dg9xjqvms',
    api_key: '822227861981357',
    api_secret: 'OdvoDcPzhKoguvvv4KNvVX82bXI'
});

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleErrorsMiddleware);

export default app;