import { SQLUserInfo, UserSignupFormData } from 'acting-comp';
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
