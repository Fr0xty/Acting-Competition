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
}
