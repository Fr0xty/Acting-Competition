import pool from './sqlPool.js';

export const sqlGetUserList = async () => {
    const [rows, _] = await pool.query(`
        SELECT admin_id as user_id, name, phone_number, 'admin' AS user_type 
        FROM admin

        UNION

        SELECT judge_id as user_id, name, phone_number, 'judge' AS user_type 
        FROM judge

        UNION

        SELECT participant_id as user_id, name, phone_number, 'participant' AS user_type 
        FROM participant;
        
        
    `);

    return rows;
};
