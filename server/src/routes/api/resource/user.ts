import { Router } from 'express';
import accessTokenCheck from '../../../middlewares/accessTokenCheck.js';
import { sqlGetUserWithAccessToken } from '../../../utils/sqlAcount.js';

const router = Router();

/**
 * get all information about current logged in user
 */
router.get('/@me', accessTokenCheck, async (req, res) => {
    /**
     * get info from sql
     */
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    if (!userInfo) return res.sendStatus(401);

    /**
     * prevent password from getting sent
     */
    userInfo.password = '';
    res.json(userInfo);
});

export default router;
