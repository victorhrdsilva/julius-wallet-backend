import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routers/authRouter.js'
import authRouter from './routers/authRouter.js'

import mongo from './db/db.js';

let db = await mongo();

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//Auth routers
app.use(authRouter);

// User router
app.use(userRouter);

app.listen(5000, () => console.log(`App running in port: 5000`));