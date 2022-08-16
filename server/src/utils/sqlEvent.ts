import { AddEventData, EventTableReturnRow } from 'acting-comp';
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
            const [rows, _] = await pool.query(`
                SELECT event.*, event_user.participant_id, event_user.placement, event_user.total_marks 
                
                FROM event LEFT JOIN event_user
                ON event.event_id = event_user.event_id
                
                WHERE (event_user.participant_id = ${userId} or event_user.participant_id is null);
            `);
            return rows;
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

export const sqlGetEventInfo = async (userType: 'admin' | 'participant' | 'judge', userId: string, eventId: string) => {
    const [eventDetailRows, _] = (await pool.query(`
        SELECT * FROM event
        WHERE event_id = ${eventId};
    `)) as [EventTableReturnRow[], any];

    if (!eventDetailRows.length) return null;
    const eventDetail = eventDetailRows[0];

    const [eventUserRows, __] = await pool.query(`
        SELECT 
            ${userType !== 'participant' ? 'participant.participant_id,' : ''}
            participant.name,
            ${userType !== 'participant' ? 'participant.phone_number,' : ''}
            event_user.placement,
            event_user.total_marks
                
        FROM event_user LEFT JOIN participant
        ON event_user.participant_id = participant.participant_id
        
        WHERE event_user.event_id = ${eventId};
    `);

    return {
        eventDetail,
        eventUsers: eventUserRows,
    };
};

export const sqlGetEventAvailableJudges = async (eventId: string) => {
    const [rows, _] = await pool.query(`
        SELECT judge.judge_id, judge.name
        FROM judge LEFT JOIN item
        ON judge.judge_id = item.judge_id AND item.event_id = '${eventId}'
        WHERE item.judge_id IS NULL;
    `);
    return rows;
};
