import express from 'express';
import {signIn} from '../controllers/userController.js'
const router = express.Router();

router.post('/', signIn);

export default router;