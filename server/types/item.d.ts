declare module 'acting-comp' {
    export interface ItemData {
        name: string;
        full_marks: string;
        judge_id: string;
        event_id: string;
    }

    export interface Item {
        item_id: string;
        name: string;
        full_marks: string;
        judge_id: string;
        judge_name: string;
    }
}
