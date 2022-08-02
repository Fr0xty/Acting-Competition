import pool from './sqlPool.js';

/**
 * store refresh and access token into database
 * @param userType
 * @param userId
 * @param refreshToken
 * @param accessToken
 */
export const sqlStoreUserOAuthTokens = async (
    userType: 'admin' | 'participant' | 'judge',
    userId: string,
    refreshToken: string,
    accessToken: string
) => {
    try {
        await pool.execute(`
            INSERT INTO oauth_token (
                ${userType}_id,
                user_type,
                refresh_token,
                access_token,
                refresh_token_expires,
                access_token_expires
            )
            VALUES (
                '${userId}',
                '${userType}',
                '${refreshToken}',
                '${accessToken}',
                '${new Date(new Date().setFullYear(new Date().getFullYear() + 5))
                    .toISOString()
                    .slice(0, 19)
                    .replace('T', ' ')}',
                '${new Date(new Date().setDate(new Date().getDay() + 1)).toISOString().slice(0, 19).replace('T', ' ')}'
            );
        `);
    } catch (err) {
        console.log(err);
    }
};

/**
 * remove user's valid oauth tokens from database
 * @param userType
 * @param userId
 */
export const sqlRemoveUserOAuthTokens = async (userType: 'admin' | 'participant' | 'judge', userId: string) => {
    try {
        await pool.execute(`
            DELETE FROM oauth_token
            WHERE (user_type = '${userType}' AND ${userType}_id = '${userId}');
        `);
    } catch (err) {
        console.log(err);
    }
};

/**
 * check if access token is valid from database: not expired and exists
 * @param accessToken user's oauth access token
 * @returns whether it is valid
 */
export const checkAccessTokenVadility = async (accessToken: string): Promise<boolean> => {
    try {
        const [rows, _] = (await pool.query(`
            SELECT * FROM oauth_token
            WHERE (access_token = '${accessToken}' AND access_token_expires > NOW());
        `)) as any[];
        if (rows.length) return true;
    } catch (err) {
        console.log(err);
    }
    return false;
};

/**
 * check if refresh token is valid from database: not expired and exists
 * @param refreshToken user's oauth refresh token
 * @returns whether it is valid
 */
export const checkRefreshTokenVadility = async (refreshToken: string): Promise<boolean> => {
    try {
        const [rows, _] = (await pool.query(`
            SELECT * FROM oauth_token
            WHERE (refresh_token = '${refreshToken}' AND refresh_token_expires > NOW());
        `)) as any[];
        if (rows.length) return true;
    } catch (err) {
        console.log(err);
    }
    return false;
};
