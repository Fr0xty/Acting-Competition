import { Router } from 'express';
import accessTokenCheck from '../../../middlewares/accessTokenCheck.js';
import { sqlGetUserWithAccessToken } from '../../../utils/sqlAcount.js';
import {
    sqlAddEvent,
    sqlGetEventAvailableJudges,
    sqlGetEventInfo,
    sqlGetEvents,
    sqlJoinEvent,
} from '../../../utils/sqlEvent.js';
import { validateEventData } from '../../../utils/validate.js';

const router = Router();

/**
 * for admins to add new events into the database
 */
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

/**
 * get events to be viewed
 */
router.get('/get-events', accessTokenCheck, async (req, res) => {
    console.log('called');

    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);

    const events = await sqlGetEvents(userInfo!.userType!, userInfo!.userId!);
    res.json(events);
});

/**
 * get specific event details and users
 */
router.get('/get-event', accessTokenCheck, async (req, res) => {
    /**
     * get event id from query string
     */
    const { 'event-id': eventId } = req.query;
    if (!eventId) return res.status(400).send('Missing "event-id" query string.');

    /**
     * get event details and users
     */
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    const eventInfo = await sqlGetEventInfo(userInfo!.userType, userInfo!.userId, eventId.toString());
    if (!eventInfo) return res.status(404).send('No event found with "event-id" provided.');

    res.json(eventInfo);
    console.log(eventInfo);
});

/**
 * get judges with no item for specified event
 */
router.get('/event-available-judges', accessTokenCheck, async (req, res) => {
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    if (!userInfo) return res.sendStatus(401);
    if (userInfo.userType !== 'admin') return res.sendStatus(403);

    /**
     * get event-id query string
     */
    const { 'event-id': eventId } = req.query;
    if (!eventId) return res.status(400).send('Missing "event-id" query string.');

    const judges = await sqlGetEventAvailableJudges(eventId.toString());
    res.json(judges);
});

router.post('/join-event', accessTokenCheck, async (req, res) => {
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    if (!userInfo) return res.sendStatus(401);
    if (userInfo.userType !== 'participant') return res.sendStatus(403);

    /**
     * get event-id query string
     */
    const { 'event-id': eventId } = req.query;
    if (!eventId) return res.status(400).send('Missing "event-id" query string.');

    await sqlJoinEvent(userInfo.userId, eventId.toString());
    res.sendStatus(200);
});

export default router;
