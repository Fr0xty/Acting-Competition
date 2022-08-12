import { Router } from 'express';
import accessTokenCheck from '../../../middlewares/accessTokenCheck.js';
import { sqlGetUserWithAccessToken } from '../../../utils/sqlAcount.js';
import { sqlGetUserList } from '../../../utils/sqlUser.js';

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

/**
 * get list of all users
 */
router.get('/user-list', accessTokenCheck, async (req, res) => {
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    if (!userInfo) return res.sendStatus(401);
    if (userInfo.userType !== 'admin') return res.sendStatus(403);

    const userList = await sqlGetUserList();
    res.json(userList);
});

export default router;
