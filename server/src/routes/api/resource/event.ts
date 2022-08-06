import { Router } from 'express';
import accessTokenCheck from '../../../middlewares/accessTokenCheck.js';
import { sqlGetUserWithAccessToken } from '../../../utils/sqlAcount.js';
import { sqlAddEvent } from '../../../utils/sqlEvent.js';
import { validateEventData } from '../../../utils/validate.js';

const router = Router();

router.post('/add-event', accessTokenCheck, async (req, res) => {
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    if (userInfo?.userType !== 'admin') return res.sendStatus(403);

    const formData = req.body;
    if (!formData) return res.status(400).send('Please provide form data.');

    const error = await validateEventData(formData);
    if (error) return res.status(400).send(error.message);

    await sqlAddEvent(formData);
    res.sendStatus(200);
});

export default router;
