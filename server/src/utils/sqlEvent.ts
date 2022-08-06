import pool from './sqlPool.js';

export const sqlGetEvents = async () => {
    const [rows, _] = await pool.query(`
        SELECT * FROM event
    `);
};
