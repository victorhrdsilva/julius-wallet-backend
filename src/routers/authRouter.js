import express from 'express';
import create from '../controllers/authController.js'
const router = express.Router();

router.post('/sing-up', create);

export default router;