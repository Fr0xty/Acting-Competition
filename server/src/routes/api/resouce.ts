import { Router } from 'express';

const router = Router();

import userRouter from './resource/user.js';

router.use(userRouter);

export default router;
