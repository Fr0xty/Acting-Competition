import { AddEventData } from 'acting-comp';
import pool from './sqlPool.js';

export const sqlAddEvent = async (eventData: AddEventData) => {
    try {
        await pool.execute(`
            INSERT INTO event (name, description, register_deadline, event_deadline)
            VALUES ('${eventData.name}', '${eventData.description}', '${eventData.register_deadline}', '${eventData.event_deadline}');
        `);
    } catch {}
};

export const sqlGetEvents = async (userType: 'admin' | 'participant' | 'judge', userId: string) => {
    try {
        if (userType === 'participant') {
            // TODO
        }

        /**
         * admin & judge
         */
        const [rows, _] = await pool.query(`
            SELECT * FROM event;
        `);
        return rows;
    } catch {}
};