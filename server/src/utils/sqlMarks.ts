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

export const sqlApproveMarks = async (eventId: string, participantId: string, adminId: string) => {
    try {
        /**
         * fill empty column admin_id
         */
        await pool.execute(`
            UPDATE marks
            SET admin_id = '${adminId}'
            WHERE event_id = '${eventId}' AND participant_id = '${participantId}';
        `);

        /**
         * set total marks for event user
         */
        const [marksRows, _] = (await pool.query(`
            SELECT marks FROM marks
            WHERE event_id = '${eventId}' AND participant_id = '${participantId}';
        `)) as [any[], any];

        const totalMarks = marksRows.reduce((sum, row) => sum + row.marks, 0);

        await pool.execute(`
            UPDATE event_user
            SET total_marks = ${totalMarks}
            WHERE event_id = '${eventId}' AND participant_id = '${participantId}';
        `);

        /**
         * recalculate placements
         */
        const [eventUserRows, __] = (await pool.query(`
            SELECT * FROM event_user
            WHERE (event_id = '${eventId}' AND total_marks IS NOT NULL)
            ORDER BY total_marks DESC;
        `)) as [any[], any];

        eventUserRows.forEach(async (user, i) => {
            await pool.execute(`
                UPDATE event_user
                SET placement = ${++i}
                WHERE (event_id = '${eventId}' AND participant_id = '${user.participant_id}');
            `);
        });
    } catch {}
};
