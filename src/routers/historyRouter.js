import express from 'express';
import {getHistory, newHistory} from '../controllers/historyController.js'
import {verifySession} from '../middlewares/authorization.middleware.js'

const router = express.Router();

router.use(verifySession);

router.get('/history', getHistory);

router.post('/history', newHistory);

export default router;