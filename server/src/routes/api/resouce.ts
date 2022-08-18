import { Router } from 'express';

const router = Router();

import eventRouter from './resource/event.js';
import userRouter from './resource/user.js';
import itemRouter from './resource/item.js';
import marksRouter from './resource/marks.js';

router.use(eventRouter);
router.use(userRouter);
router.use(itemRouter);
router.use(marksRouter);

export default router;
