import { Router } from 'express';
import { createSQLUser } from '../../../utils/sqlAcount.js';
import { validateSignupForm } from '../../../utils/validate.js';

const router = Router();

/**
 * create a new user in database + assign oauth cookies
 */
router.post('/signup', async (req, res) => {
    const userType = req.query['user-type']?.toString();

    /**
     * validate user type query string
     */
    if (!userType) return res.status(400).json({ field: null, message: 'Missing "user-type" query string.' });
    if (!['admin', 'judge', 'participant'].includes(userType))
        return res.status(400).json({ field: null, message: 'Invalid user type.' });

    /**
     * validate form data in body
     */
    const userFormData = req.body;
    const error = await validateSignupForm(userFormData);
    if (error) return res.status(400).json(error);

    /**
     * create user in database
     */
    try {
        await createSQLUser(userType as 'admin' | 'participant' | 'judge', userFormData);
    } catch (e: any) {
        return res.status(400).json({ field: null, message: e.message });
    }

    /**
     * success
     */
    res.sendStatus(200);
});

export default router;
