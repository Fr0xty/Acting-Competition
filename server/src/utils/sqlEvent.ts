import { AddEventData, EventTableReturnRow } from 'acting-comp';
import { sqlGetEventItems, sqlGetEventJudgeItem } from './sqlItem.js';
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
                SELECT
                    event.*,
                    event_user.participant_id,
                    event_user.placement,
                    event_user.total_marks,
                    CASE
                        WHEN event.register_deadline > NOW() THEN 'starting'
                        WHEN event.event_deadline > NOW() THEN 'ongoing'
                        ELSE 'ended'
                    END AS event_status

                FROM event LEFT JOIN event_user
                ON (
                    event.event_id = event_user.event_id
                    AND (
                        event_user.participant_id = '${userId}'
                        OR
                        event_user.participant_id IS NULL
                    )
                );
            `);
            return rows;
        }

        /**
         * admin & judge
         */
        const [rows, _] = await pool.query(`
            SELECT 
                *,
                CASE 
                    WHEN register_deadline > NOW() THEN 'starting'
                    WHEN event_deadline > NOW() THEN 'ongoing'
                    ELSE 'ended'
                END AS event_status 
            
            FROM event;
        `);
        return rows;
    } catch {}
};

export const sqlGetEventInfo = async (userType: 'admin' | 'participant' | 'judge', userId: string, eventId: string) => {
    const [eventDetailRows, _] = (await pool.query(`
        SELECT 
            *,
            CASE 
                WHEN register_deadline > NOW() THEN 'starting'
                WHEN event_deadline > NOW() THEN 'ongoing'
                ELSE 'ended'
            END AS event_status

        FROM event
        WHERE event_id = ${eventId};
    `)) as [EventTableReturnRow[], any];

    /**
     * if no event with the id exists, return
     */
    if (!eventDetailRows.length) return null;
    const eventDetail = eventDetailRows[0];

    let eventUserQuery;

    /**
     * event has not started
     */
    if (eventDetail.event_status === 'starting') {
        if (userType !== 'participant') {
            eventUserQuery = `
                SELECT 
                    participant.participant_id,
                    participant.name,
                    participant.phone_number
                        
                FROM event_user LEFT JOIN participant
                ON event_user.participant_id = participant.participant_id
                
                WHERE event_user.event_id = ${eventId};
            `;
        }

        if (userType === 'participant') {
            eventUserQuery = `
                SELECT participant.name
                FROM event_user LEFT JOIN participant
                ON event_user.participant_id = participant.participant_id
                
                WHERE event_user.event_id = ${eventId};
            `;
        }
    }

    /**
     * event is on going
     */
    if (eventDetail.event_status === 'ongoing') {
        if (userType === 'admin') {
            const eventItems = await sqlGetEventItems(eventDetail.event_id);

            let itemQuery = '';
            eventItems.forEach((item) => {
                itemQuery += `
                    ,(
                        SELECT marks.marks FROM marks
                        WHERE marks.item_id = ${item.item_id}
                        AND marks.event_id = ${eventId}
                        AND marks.participant_id = event_user.participant_id
                    ) as '${item.name} (${item.full_marks})'
                `;
            });

            eventUserQuery = `
                SELECT 
                    participant.participant_id,
                    participant.name,
                    participant.phone_number,
                    (
						SELECT admin.name 

                        FROM marks LEFT JOIN admin
                        ON marks.admin_id = admin.admin_id

						WHERE event_user.participant_id = marks.participant_id
						AND event_user.event_id = marks.event_id
                        LIMIT 1
                    ) as approved_admin_name
                    ${itemQuery}
                        
                FROM event_user 
                
                LEFT JOIN participant
                ON event_user.participant_id = participant.participant_id

                WHERE event_user.event_id = ${eventId};
            `;
        }

        if (userType === 'judge') {
            const judgeEventItem = (await sqlGetEventJudgeItem(userId, eventDetail.event_id))?.shift();

            let itemQuery = '';
            /**
             * judge doesn't have an assigned item in event
             */
            if (!judgeEventItem) {
                itemQuery = `
                    , '-' AS 'No Item Assigned'
                `;
            }
            if (judgeEventItem) {
                itemQuery += `
                    ,(
                        SELECT marks.marks FROM marks
                        WHERE marks.item_id = ${judgeEventItem.item_id}
                        AND marks.event_id = ${eventId}
                        AND marks.participant_id = event_user.participant_id
                    ) as '${judgeEventItem.name} (${judgeEventItem.full_marks})'
                `;
            }

            eventUserQuery = `
                SELECT 
                    participant.participant_id,
                    participant.name,
                    participant.phone_number
                    ${itemQuery}
                        
                FROM event_user LEFT JOIN participant
                ON event_user.participant_id = participant.participant_id
                
                WHERE event_user.event_id = ${eventId};
            `;
        }

        if (userType === 'participant') {
            eventUserQuery = `
                SELECT participant.name
                FROM event_user LEFT JOIN participant
                ON event_user.participant_id = participant.participant_id
                
                WHERE event_user.event_id = ${eventId};`;
        }
    }

    /**
     * event ended
     */
    if (eventDetail.event_status === 'ended') {
        const eventItems = await sqlGetEventItems(eventDetail.event_id);

        let itemQuery = '';
        eventItems.forEach((item) => {
            itemQuery += `
                ,(
                    SELECT marks.marks FROM marks
                    WHERE marks.item_id = ${item.item_id}
                    AND marks.event_id = ${eventId}
                    AND marks.participant_id = event_user.participant_id
                ) as '${item.name} (${item.full_marks})'
            `;
        });

        eventUserQuery = `
            SELECT 
                event_user.placement,
                event_user.total_marks,
                ${userType !== 'participant' ? 'participant.participant_id,' : ''}
                participant.name
                ${userType !== 'participant' ? ', participant.phone_number' : ''}
                ${itemQuery}
                    
            FROM event_user 
            
            LEFT JOIN participant
            ON event_user.participant_id = participant.participant_id

            WHERE event_user.event_id = ${eventId}
            
            ORDER BY IF(event_user.placement IS NULL, 10000, 0), event_user.placement ASC;
        `;
    }

    const [eventUserRows, __] = await pool.query(eventUserQuery as string);

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

export const sqlJoinEvent = async (participantId: string, eventId: string) => {
    try {
        await pool.execute(`
            INSERT INTO event_user (event_id, participant_id)
            VALUES ('${eventId}', '${participantId}');
        `);
    } catch {}
};

export const sqlDeleteEvent = async (eventId: string) => {
    try {
        const effectingTables = ['event', 'event_user', 'item', 'marks'];

        effectingTables.forEach(async (tableName) => {
            await pool.execute(`
                DELETE FROM ${tableName}
                WHERE event_id = '${eventId}';
            `);
        });
    } catch {}
};
