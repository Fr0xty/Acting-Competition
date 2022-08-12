import pool from './sqlPool.js';

export const sqlGetUserList = async () => {
    const [rows, _] = await pool.query(`
        SELECT admin_id as user_id, name, phone_number, CASE WHEN TRUE THEN 'admin' END user_type 
        FROM admin

        UNION

        SELECT participant_id as user_id, name, phone_number, CASE WHEN TRUE THEN 'participant' END user_type 
        FROM participant

        UNION
        
        SELECT judge_id as user_id, name, phone_number, CASE WHEN TRUE THEN 'judge' END user_type 
        FROM judge;
    `);

    return rows;
};
