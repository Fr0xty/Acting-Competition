import { SubmitMarksData } from 'acting-comp';
import pool from './sqlPool.js';

export const sqlAddMarks = async (eventId: string, judgeItemId: string, submitMarksData: SubmitMarksData) => {
    try {
        await pool.execute(`
            INSERT INTO marks (marks, participant_id, event_id, item_id)
            VALUES (
                '${submitMarksData.marks}',
                '${submitMarksData.participant_id}',
                '${eventId}',
                '${judgeItemId}'
            );
        `);
    } catch {}
};
