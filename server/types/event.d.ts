declare module 'acting-comp' {
    export interface AddEventData {
        name: string;
        description: string;
        register_deadline: string;
        event_deadline: string;
    }

    export interface EventTableReturnRow {
        event_id: string;
        name: string;
        description: string;
        register_deadline: string;
        event_deadline: string;
        event_status: 'starting' | 'ongoing' | 'ended';
    }
}
