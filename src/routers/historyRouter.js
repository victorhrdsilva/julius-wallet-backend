import express from 'express';
import authorizationMiddleware from '../middlewares/authorization.middleware.js'

const router = express.Router();

router.use(authorizationMiddleware)

router.post('/home', create);

export default router;