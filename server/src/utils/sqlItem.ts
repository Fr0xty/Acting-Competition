import { Item, ItemData } from 'acting-comp';
import pool from './sqlPool.js';

export const sqlGetEventItems = async (eventId: string) => {
    const [rows, _] = (await pool.query(`
        SELECT 
            item.item_id,
            item.name,
            item.full_marks,
            judge.judge_id,
            judge.name as judge_name

        FROM item LEFT JOIN judge
        ON item.judge_id = judge.judge_id

        WHERE item.event_id = '${eventId}';
    `)) as [Item[], any];

    return rows;
};

export const sqlAddEventItem = async (itemData: ItemData) => {
    try {
        await pool.execute(`
            INSERT INTO item (name, full_marks, judge_id, event_id)
            VALUES (
                '${itemData.name}',
                '${itemData.full_marks}',
                '${itemData.judge_id}',
                '${itemData.event_id}'
            );
        `);
    } catch {}
};

export const sqlGetEventJudgeItem = async (judgeId: string, eventId: string) => {
    const [rows, _] = (await pool.query(`
        SELECT
            item.item_id,
            item.name,
            item.full_marks,
            judge.judge_id,
            judge.name as judge_name

        FROM item LEFT JOIN judge
        ON item.judge_id = judge.judge_id

        WHERE item.event_id = '${eventId}'
        AND item.judge_id = ${judgeId};
    `)) as [Item[] | [], any];

    return rows;
};
