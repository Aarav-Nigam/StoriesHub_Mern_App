import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from './Routes/posts.js'
import userRouter from './Routes/user.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
        origin:'*',
}));
// app.use((req, res, next) => {
//         res.setHeader("Access-Control-Allow-Origin", "*");
//         res.header(
//                 "Access-Control-Allow-Headers",
//                 "Origin, X-Requested-With, Content-Type, Accept"
//         );
//         next();
// });
dotenv.config();
mongoose.set('strictQuery', false)
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URI)
        .then(() => {
                app.listen(PORT, () => {
                        console.log(`Server is listening at port ${PORT}`)
                })
        })
        .catch((err) => { console.log(`${err} !!! Can't Connect !!!`) })
app.use('/api/posts', postRouter);
app.use('/api/user', userRouter)