import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import mongo from './db/db.js';

let db = await mongo();

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => console.log(`App running in port: 5000`));