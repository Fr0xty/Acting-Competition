import 'dotenv/config';

import JWT from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { Response } from 'express';
import { sqlRemoveUserOAuthTokens, sqlStoreUserOAuthTokens } from './sqlOAuthToken.js';

/**
 * set 2 oauth tokens as cookies
 * refresh token: long lived cookie
 * access token: session cookie
 */
export const setOAuthToken = async (userType: 'admin' | 'participant' | 'judge', userId: string, res: Response) => {
    /**
     * generate unique random key
     */
    const refreshTokenKey = `r${userType[0]}${userId}${Date.now()}${randomBytes(16).toString('hex')}`;
    const accessTokenKey = `a${userType[0]}${userId}${Date.now()}${randomBytes(16).toString('hex')}`;

    /**
     * store into database
     */
    await revokeOAuthTokens(userType, userId, res);
    await sqlStoreUserOAuthTokens(userType, userId, refreshTokenKey, accessTokenKey);

    /**
     * send cookies
     */
    res.cookie('rt', JWT.sign(refreshTokenKey, process.env.JWT_SECRET!), {
        httpOnly: true,
        signed: true,
        sameSite: true,
        maxAge: 5 * 365 * 24 * 60 * 60 * 1000,
    });

    res.cookie('at', JWT.sign(accessTokenKey, process.env.JWT_SECRET!), {
        httpOnly: true,
        signed: true,
        sameSite: true,
    });
};

/**
 * revoke valid & invalid oauth tokens from database & cookies
 */
export const revokeOAuthTokens = async (userType: 'admin' | 'participant' | 'judge', userId: string, res: Response) => {
    /**
     * remove from database
     */
    await sqlRemoveUserOAuthTokens(userType, userId);

    /**
     * remove from client
     */
    res.clearCookie('at').clearCookie('rt');
};
