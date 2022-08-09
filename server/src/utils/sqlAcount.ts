import { OAuthTableReturn, SQLUserInfo, UserAccountInfo, UserSignupFormData } from 'acting-comp';
import pool from './sqlPool.js';

/**
 * create a new row for user
 * @param userType user type of the account
 * @param userFormData form of user account info to signup with
 */
export const sqlCreateUser = async (userType: 'admin' | 'participant' | 'judge', userFormData: UserSignupFormData) => {
    try {
        await pool.execute(`
            INSERT INTO ${userType}
            VALUES (
                '${userFormData.ic_number}',
                '${userFormData.name}',
                '${userFormData.phone_number}',
                '${userFormData.password}'
            );
        `);
    } catch {
        throw new Error('User already exists, please login.');
    }
};

/**
 * get user info from database
 * @param userType user type of the account
 * @param userId form of user account info
 * @returns null if doesn't exist, user info if exists
 */
export const sqlGetUser = async (
    userType: 'admin' | 'participant' | 'judge',
    userId: string
): Promise<null | SQLUserInfo> => {
    try {
        const [rows, _] = (await pool.query(`
            SELECT * FROM ${userType}
            WHERE (${userType}_id = '${userId}');
        `)) as [SQLUserInfo[], any];

        if (rows.length) return rows[0];
    } catch {}
    return null;
};

/**
 * get user's info with access token
 * @param accessToken user's oauth access token
 */
export const sqlGetUserWithAccessToken = async (accessToken: string): Promise<UserAccountInfo | undefined> => {
    try {
        const [oauthTokenTableRows, _] = (await pool.query(`
            SELECT * FROM oauth_token
            WHERE (access_token = '${accessToken}');
        `)) as [OAuthTableReturn[], any];

        const user = oauthTokenTableRows[0];

        const [userTableRows, __] = (await pool.query(`
            SELECT * FROM ${user.user_type}
            WHERE (${user.user_type}_id = '${user[`${user.user_type}_id`]}');
        `)) as [SQLUserInfo[], any];

        return {
            userType: user.user_type,
            userId: user[`${user.user_type}_id`]!,
            name: userTableRows[0].name,
            phoneNumber: userTableRows[0].phone_number,
            password: userTableRows[0].password,
        };
    } catch (err) {
        console.log(err);
    }
};

/**
 * get user's oauth info with refresh token
 * @param refreshToken user's oauth refresh token
 */
export const sqlGetUserWithRefreshToken = async (refreshToken: string): Promise<OAuthTableReturn | undefined> => {
    try {
        const [oauthTokenTableRows, _] = (await pool.query(`
            SELECT * FROM oauth_token
            WHERE (refresh_token = '${refreshToken}');
        `)) as [OAuthTableReturn[], any];

        return oauthTokenTableRows[0];
    } catch {}
};
