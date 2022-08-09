import { Router } from 'express';
import accessTokenCheckFunction from '../../../utils/accessTokenCheckFunction.js';
import { setOAuthToken } from '../../../utils/cookie.js';
import { sqlCreateUser, sqlGetUser, sqlGetUserWithAccessToken } from '../../../utils/sqlAcount.js';
import { validateloginForm, validateSignupForm } from '../../../utils/validate.js';

const router = Router();

/**
 * create a new user in database
 */
router.post('/signup', async (req, res, next) => {
    const userType = req.query['user-type']?.toString();

    /**
     * validate user type query string
     */
    if (!userType) return res.status(400).json({ field: null, message: 'Missing "user-type" query string.' });
    if (!['admin', 'judge', 'participant'].includes(userType))
        return res.status(400).json({ field: null, message: 'Invalid user type.' });

    /**
     * privilege user types: admin & judge
     * - only admins are allowed to create these accounts
     */
    if (['admin', 'judge'].includes(userType)) {
        await accessTokenCheckFunction(req, res);
        if (!req.accessToken) return;

        const userInfo = await sqlGetUserWithAccessToken(req.accessToken);
        if (userInfo?.userType !== 'admin')
            return res
                .status(403)
                .json({ field: null, message: 'You do not have permission. Sign up as a participant instead.' });
    }

    /**
     * validate form data in body
     */
    const userFormData: any = req.body;
    const error = await validateSignupForm(userFormData);
    if (error) return res.status(400).json(error);

    /**
     * create user in database
     */
    try {
        await sqlCreateUser(userType as 'admin' | 'participant' | 'judge', userFormData);
    } catch (e: any) {
        return res.status(400).json({ field: null, message: e.message });
    }

    /**
     * success
     */
    res.sendStatus(200);
});

/**
 * validate user info with database + assign oauth cookies if success
 */
router.post('/login', async (req, res) => {
    /**
     * validate user type query string
     */
    const userType = req.query['user-type']?.toString();
    if (!userType) return res.status(400).json({ field: null, message: 'Missing "user-type" query string.' });
    if (!['admin', 'judge', 'participant'].includes(userType))
        return res.status(400).json({ field: null, message: 'Invalid user type.' });

    /**
     * validate form data in body
     */
    const userFormData: any = req.body;
    const error = await validateloginForm(userFormData);
    if (error) return res.status(400).json(error);

    /**
     * validate user in database
     */
    const userInfo = await sqlGetUser(userType as 'admin' | 'participant' | 'judge', userFormData.ic_number);
    if (!userInfo) return res.status(404).json({ field: null, message: 'User does not exist.' });

    /**
     * success, give oauth cookies
     */
    await setOAuthToken(
        userType as 'admin' | 'participant' | 'judge',
        userInfo.admin_id || userInfo.participant_id || userInfo.judge_id!,
        res
    );

    res.sendStatus(200);
});

export default router;
