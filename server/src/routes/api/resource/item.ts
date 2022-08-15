import { Router } from 'express';
import accessTokenCheck from '../../../middlewares/accessTokenCheck.js';
import { sqlGetUserWithAccessToken } from '../../../utils/sqlAcount.js';
import { sqlAddEventItem, sqlGetEventItems } from '../../../utils/sqlItem.js';
import { validateEventItemData } from '../../../utils/validate.js';

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

router.post('/add-item', accessTokenCheck, async (req, res) => {
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    if (!userInfo) return res.sendStatus(401);
    if (userInfo.userType !== 'admin') return res.sendStatus(403);

    /**
     * validate item info
     */
    const eventItemData = req.body;
    const error = await validateEventItemData(eventItemData);
    if (error) return res.status(400).json(error);

    /**
     * add item into database
     */
    await sqlAddEventItem(eventItemData);
    res.sendStatus(200);
});

export default router;
