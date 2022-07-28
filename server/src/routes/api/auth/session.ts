import { Router } from 'express';

const router = Router();

/**
 * get a fresh access token
 */
router.post('/refresh-token', async (req, res) => {});

/**
 * reset user's session
 */
router.post('/reset-session', async (req, res) => {});

export default router;
