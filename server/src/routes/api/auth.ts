import { Router } from 'express';

const router = Router();

import accountRouter from './auth/account.js';
import sessionRouter from './auth/session.js';

router.use(accountRouter);
router.use(sessionRouter);

export default router;
