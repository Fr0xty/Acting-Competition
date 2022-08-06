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
