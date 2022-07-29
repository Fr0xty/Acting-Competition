import { Router } from 'express';
import Joi from 'joi';
import pool from '../../../utils/sqlPool.js';

const router = Router();

/**
 * create a new user in database + assign oauth cookies
 */
router.post('/signup', async (req, res) => {
    const { 'user-type': userType } = req.query;
    if (!userType) return res.status(400).send('Missing "user-type" query string.');

    const userTypes = ['admin', 'judge', 'participant'];
    if (!userTypes.includes(userType.toString())) return res.status(400).send('Invalid user type.');

    /**
     * valid user type
     */
    const userFormData = req.body;

    const schema = Joi.object({
        ic_number: Joi.string()
            .regex(/^[0-9]{12}$/)
            .required(),
        password: Joi.string().min(8).max(30).required(),
    });

    try {
        await schema.validateAsync(userFormData);

        /**
         * valid user form data
         */
        pool.execute(`
            INSERT INTO 
        `);

        /**
         * give oauth cookies
         */
        // TODO
        res.sendStatus(200);
    } catch (e: any) {
        res.status(400).json({
            field: e.details[0].path[e.details[0].path.length - 1],
            message: e.details[0].message,
        });
    }
});

export default router;
