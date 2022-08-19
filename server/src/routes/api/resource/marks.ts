import { Router } from 'express';
import accessTokenCheck from '../../../middlewares/accessTokenCheck.js';
import { sqlGetUserWithAccessToken } from '../../../utils/sqlAcount.js';
import { sqlCheckEventUserFullyGraded, sqlGetEventJudgeItem } from '../../../utils/sqlItem.js';
import { sqlAddMarks, sqlApproveMarks } from '../../../utils/sqlMarks.js';
import { validateApproveMarksData, validateSubmitMarksData } from '../../../utils/validate.js';

const router = Router();

router.post('/submit-marks', accessTokenCheck, async (req, res) => {
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    if (userInfo?.userType !== 'judge') return res.sendStatus(403);

    /**
     * get event id from query string
     */
    const { 'event-id': eventId } = req.query;
    if (!eventId) return res.status(400).send('Missing "event-id" query string.');

    /**
     * get assigned item for requesting judge
     */
    const judgeItem = await sqlGetEventJudgeItem(userInfo.userId, eventId.toString());

    /**
     * validate
     */
    const marksForm = req.body;
    const error = await validateSubmitMarksData(marksForm, judgeItem[0].full_marks);
    if (error) return res.status(400).send(error.message);

    /**
     * insert into database
     */
    await sqlAddMarks(eventId.toString(), judgeItem[0].item_id, marksForm);
    return res.sendStatus(200);
});

router.post('/approve-marks', accessTokenCheck, async (req, res) => {
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    if (!userInfo) return res.sendStatus(401);
    if (userInfo.userType !== 'admin') return res.sendStatus(403);

    /**
     * validate body
     */
    const approveMarksForm = req.body;
    const error = await validateApproveMarksData(approveMarksForm);
    if (error) return res.status(400).send(error.message);

    /**
     * if user's items are not all graded, reject
     */
    const isUserFullyGraded = await sqlCheckEventUserFullyGraded(
        approveMarksForm.participant_id,
        approveMarksForm.event_id
    );
    if (!isUserFullyGraded) return res.status(400).send('Participant is not fully graded yet.');

    /**
     * approve marks
     */
    await sqlApproveMarks(approveMarksForm.event_id, approveMarksForm.participant_id, userInfo.userId);
    res.sendStatus(200);
});

export default router;
