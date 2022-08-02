import { ValidateError } from 'acting-comp';
import Joi from 'joi';

/**
 * validate form data with signup form schema
 * @param UserSignupFormData form data to be validated for signup
 * @returns void if success, ValidateError if not successful
 */
export const validateSignupForm = async (UserSignupFormData: any): Promise<void | ValidateError> => {
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
        await schema.validateAsync(UserSignupFormData);
    } catch (e: any) {
        return {
            field: e.details[0].path[e.details[0].path.length - 1],
            message: e.details[0].message,
        };
    }
};

/**
 * validate form data with login form schema
 * @param UserLoginFormData form data to be validated for login
 * @returns void if success, ValidateError if not successful
 */
export const validateloginForm = async (UserLoginFormData: any): Promise<void | ValidateError> => {
    const schema = Joi.object({
        ic_number: Joi.string()
            .regex(/^[0-9]{12}$/)
            .required(),
        password: Joi.string().min(8).max(30).required(),
    });

    try {
        await schema.validateAsync(UserLoginFormData);
    } catch (e: any) {
        return {
            field: e.details[0].path[e.details[0].path.length - 1],
            message: e.details[0].message,
        };
    }
};
