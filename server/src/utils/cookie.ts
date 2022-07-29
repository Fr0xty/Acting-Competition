import 'dotenv/config';

import JWT from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { Response } from 'express';

/**
 * long lived cookie
 */
export const setRefreshToken = async (res: Response) => {
    const token = randomBytes(32).toString('hex');

    res.cookie('rt', JWT.sign(token, process.env.JWT_SECRET!));
};

/**
 * session cookie
 */
export const setAccessToken = async (res: Response) => {
    const token = randomBytes(32).toString('hex');

    res.cookie('at', JWT.sign(token, process.env.JWT_SECRET!));
};

/**
 * remove all oauth related cookies
 */
export const resetOAuthTokens = async (res: Response) => {};
