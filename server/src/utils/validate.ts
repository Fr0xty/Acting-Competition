import { ValidateError } from 'acting-comp';
import Joi from 'joi';

/**
 * validate form data with signup form schema
 * @param userSignupFormData form data to be validated for signup
 * @returns void if success, ValidateError if not successful
 */
export const validateSignupForm = async (userSignupFormData: any): Promise<void | ValidateError> => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(30).required(),
        ic_number: Joi.string()
            .regex(/^[0-9]{12}$/)
            .required(),
        phone_number: Joi.string()
            .regex(/^[0-9]*$/)
            .min(1)
            .max(15)
            .required(),
        password: Joi.string().min(8).max(30).required(),
    });

    try {
        await schema.validateAsync(userSignupFormData);
    } catch (e: any) {
        return {
            field: e.details[0].path[e.details[0].path.length - 1],
            message: e.details[0].message,
        };
    }
};

/**
 * validate form data with login form schema
 * @param userLoginFormData form data to be validated for login
 * @returns void if success, ValidateError if not successful
 */
export const validateloginForm = async (userLoginFormData: any): Promise<void | ValidateError> => {
    const schema = Joi.object({
        ic_number: Joi.string()
            .regex(/^[0-9]{12}$/)
            .required(),
        password: Joi.string().min(8).max(30).required(),
    });

    try {
        await schema.validateAsync(userLoginFormData);
    } catch (e: any) {
        return {
            field: e.details[0].path[e.details[0].path.length - 1],
            message: e.details[0].message,
        };
    }
};

/**
 * validate form data with event schema
 * @param userAddEventData form data to be validated for add event
 * @returns void if success, ValidateError if not successful
 */
export const validateEventData = async (userAddEventData: any): Promise<void | ValidateError> => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(30).required(),
        description: Joi.string().min(1).max(1000).required(),
        register_deadline: Joi.string()
            .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
            .required(),
        event_deadline: Joi.string()
            .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
            .required(),
    });

    try {
        await schema.validateAsync(userAddEventData);
    } catch (e: any) {
        return {
            field: '',
            message: e.details[0].message,
        };
    }
};

/**
 * validate form data with event item schema
 * @param userAddEventItemData form data to be validated for add event item
 * @returns void if success, ValidateError if not successful
 */
export const validateEventItemData = async (userAddEventItemData: any): Promise<void | ValidateError> => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(30).required(),
        full_marks: Joi.string().min(1).max(10).required(),
        judge_id: Joi.string().length(12).required(),
        event_id: Joi.string().min(1).required(),
    });

    try {
        await schema.validateAsync(userAddEventItemData);
    } catch (e: any) {
        return {
            field: e.details[0].path[e.details[0].path.length - 1],
            message: e.details[0].message,
        };
    }
};

/**
 * validate form data with marks schema
 * @param userSubmitMarksData form data to be validated for submiting marks
 * @returns void if success, ValidateError if not successful
 */
export const validateSubmitMarksData = async (
    userSubmitMarksData: any,
    fullMarks: string
): Promise<void | ValidateError> => {
    const schema = Joi.object({
        marks: Joi.string()
            .min(1)
            .regex(/^[0-9]+$/)
            .required(),
        participant_id: Joi.string().required(),
    });

    try {
        await schema.validateAsync(userSubmitMarksData);

        /**
         * check if marks given is over full marks
         */
        if (Number(userSubmitMarksData.marks) > Number(fullMarks)) {
            return {
                field: '',
                message: `Maximum marks allowed is ${fullMarks}.`,
            };
        }
    } catch (e: any) {
        return {
            field: '',
            message: e.details[0].message,
        };
    }
};

export const validateApproveMarksData = async (formData: any) => {
    const schema = Joi.object({
        event_id: Joi.string()
            .min(1)
            .regex(/^[0-9]+$/)
            .required(),
        participant_id: Joi.string()
            .regex(/^[0-9]{12}$/)
            .required(),
    });

    try {
        await schema.validateAsync(formData);
    } catch (e: any) {
        return {
            field: '',
            message: e.details[0].message,
        };
    }
};
