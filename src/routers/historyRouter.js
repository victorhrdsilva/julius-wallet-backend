import express from 'express';
import {getHistory} from '../controllers/historyController.js'
import {verifySession} from '../middlewares/authorization.middleware.js'

const router = express.Router();

router.use(verifySession);

router.post('/history', getHistory);

export default router;