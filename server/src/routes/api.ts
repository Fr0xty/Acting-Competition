import { Router } from 'express';

import authRouter from './api/auth.js';
import resourceRouter from './api/resouce.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/resource', resourceRouter);

export default router;
