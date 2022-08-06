import { Router } from 'express';

const router = Router();

import eventRouter from './resource/event.js';
import userRouter from './resource/user.js';

router.use(eventRouter);
router.use(userRouter);

export default router;
