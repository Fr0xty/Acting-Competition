import 'dotenv/config';
import JWT from 'jsonwebtoken';
import { Request, Response } from 'express';
import { checkAccessTokenExpiry } from '../utils/sqlOAuthToken.js';

/**
 * if request has no valid access token: sendStatus(401)
 * else: req.accessToken = the decrypted access token
 */
export default async (req: Request, res: Response) => {
    const { at: encryptedAccessToken } = req.signedCookies;
    if (!encryptedAccessToken) return res.sendStatus(401);

    /**
     * verify jwt signature
     */
    try {
        const decryptedAccessToken = JWT.verify(encryptedAccessToken, process.env.JWT_SECRET!).toString();

        /**
         * check token expiry
         */
        const valid = await checkAccessTokenExpiry(decryptedAccessToken);
        if (!valid) return res.sendStatus(401);

        /**
         * success
         */
        req.accessToken = decryptedAccessToken.toString();
    } catch {
        /**
         * invalid
         */
        res.sendStatus(401);
    }
};
