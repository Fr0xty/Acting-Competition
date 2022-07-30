import { ValidateError } from 'acting-comp';
import Joi from 'joi';

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
