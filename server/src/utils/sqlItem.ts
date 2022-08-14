import pool from './sqlPool.js';

export const sqlGetEventItems = async (eventId: string) => {
    const [rows, _] = await pool.query(`
        SELECT 
            item.item_id,
            item.name,
            item.full_marks,
            judge.name as judge_name

        FROM item LEFT JOIN judge
        ON item.judge_id = judge.judge_id

        WHERE item.event_id = '${eventId}';
    `);
    return rows;
};
