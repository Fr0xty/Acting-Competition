import 'dotenv/config';
import JWT from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { checkAccessTokenVadility } from '../utils/sqlOAuthToken.js';

/**
 * if request has no valid access token: sendStatus(401)
 * else: req.accessToken = the decrypted access token
 */
export default async (req: Request, res: Response, next: NextFunction) => {
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
        const valid = await checkAccessTokenVadility(decryptedAccessToken);
        if (!valid) return res.sendStatus(401);

        /**
         * success
         */
        req.accessToken = decryptedAccessToken.toString();
        next();
    } catch {
        /**
         * invalid
         */
        res.sendStatus(401);
    }
};
