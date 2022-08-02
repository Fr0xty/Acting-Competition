import 'dotenv/config';
import JWT from 'jsonwebtoken';
import { Router } from 'express';
import { checkRefreshTokenVadility } from '../../../utils/sqlOAuthToken.js';
import { setOAuthToken } from '../../../utils/cookie.js';
import { sqlGetUserWithRefreshToken } from '../../../utils/sqlAcount.js';

const router = Router();

/**
 * get a fresh access token
 */
router.post('/refresh-token', async (req, res) => {
    const { rt: encryptedRefreshToken } = req.signedCookies;
    if (!encryptedRefreshToken) return res.sendStatus(400);

    try {
        /**
         * decrypt
         */
        const decryptedRefreshToken = JWT.verify(encryptedRefreshToken, process.env.JWT_SECRET!).toString();

        /**
         * check if token is valid
         */
        const refreshTokenValid = await checkRefreshTokenVadility(decryptedRefreshToken);
        if (!refreshTokenValid) return res.sendStatus(400);

        /**
         * refresh the tokens
         */
        const userInfo = await sqlGetUserWithRefreshToken(decryptedRefreshToken);
        await setOAuthToken(
            userInfo!.user_type!,
            userInfo![`${userInfo?.user_type as 'admin' | 'participant' | 'judge'}_id`]!,
            res
        );

        /**
         * success
         */
        res.sendStatus(200);
    } catch {
        return res.sendStatus(400);
    }
});

/**
 * reset user's session
 */
router.post('/reset-session', async (req, res) => {
    res.clearCookie('at').clearCookie('rt').redirect('/');
});

export default router;
