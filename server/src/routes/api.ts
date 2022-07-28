import { Router } from 'express';

import authRouter from './api/auth.js';
import resourceRouter from './api/resouce.js';

const router = Router();

router.use(authRouter);
router.use(resourceRouter);

export default router;
