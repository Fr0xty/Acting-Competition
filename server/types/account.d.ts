declare module 'acting-comp' {
    export interface UserSignupFormData {
        name: string;
        ic_number: string;
        phone_number: string;
        password: string;
    }

    export interface ValidateError {
        field: string;
        message: string;
    }

    export interface SQLUserInfo {
        admin_id?: string;
        participant_id?: string;
        judge_id?: string;
        name: string;
        phone_number: string;
        password: string;
    }

    export interface OAuthTableReturn {
        admin_id?: string;
        participant_id?: string;
        judge_id?: string;
        user_type: 'admin' | 'participant' | 'judge';
        refresh_token: string;
        access_token: string;
        refresh_token_expires: string;
        access_token_expires: string;
    }

    export interface UserAccountInfo {
        userType: 'admin' | 'participant' | 'judge';
        userId: string;
        name: string;
        phoneNumber: string;
        password: string;
    }
}
