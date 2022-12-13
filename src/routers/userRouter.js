import express from 'express';
import singIn from '../controllers/userController.js'
const router = express.Router();

router.post('/', singIn);

export default router;