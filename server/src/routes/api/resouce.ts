import { Router } from 'express';

const router = Router();

import eventRouter from './resource/event.js';
import userRouter from './resource/user.js';
import itemRouter from './resource/item.js';

router.use(eventRouter);
router.use(userRouter);
router.use(itemRouter);

export default router;
