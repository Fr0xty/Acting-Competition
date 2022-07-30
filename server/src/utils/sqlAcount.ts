import { UserSignupFormData } from 'acting-comp';
import pool from './sqlPool.js';

export const createSQLUser = async (userType: 'admin' | 'participant' | 'judge', userFormData: UserSignupFormData) => {
    try {
        await pool.execute(`
            INSERT INTO ${userType}
            VALUES (
                ${userFormData.ic_number},
                ${userFormData.name},
                ${userFormData.phone_number},
                ${userFormData.password}
            );
        `);
    } catch {
        throw new Error('User already exists, please login.');
    }
};
