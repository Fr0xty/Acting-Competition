import { Router } from 'express';
import accessTokenCheck from '../../../middlewares/accessTokenCheck.js';
import { sqlGetUserWithAccessToken } from '../../../utils/sqlAcount.js';
import { sqlGetEventItems } from '../../../utils/sqlItem.js';

const router = Router();

/**
 * get all items for an event
 */
router.get('/items', accessTokenCheck, async (req, res) => {
    /**
     * only admin can access
     */
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    if (!userInfo) return res.sendStatus(401);
    if (userInfo.userType !== 'admin') return res.sendStatus(403);

    /**
     * get event id from query string
     */
    const { 'event-id': eventId } = req.query;
    if (!eventId) return res.status(400).send('No "event-id" query string provided.');

    const items = await sqlGetEventItems(eventId!.toString());
    res.json(items);
});

export default router;
