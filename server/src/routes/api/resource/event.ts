import { Router } from 'express';
import accessTokenCheck from '../../../middlewares/accessTokenCheck';

const router = Router();

router.get('/get-events', accessTokenCheck, async (req, res) => {});

export default router;
