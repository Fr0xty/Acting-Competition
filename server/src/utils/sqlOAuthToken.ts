import pool from './sqlPool.js';

/**
 * store oauth
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
