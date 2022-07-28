import { Router } from 'express';

const router = Router();

router.post('/create-user/:userType', async (req, res) => {
    const { userType } = req.params;
    const userTypes = ['admin', 'judge', 'participant'];
    if (!userTypes.includes(userType)) return res.status(400).send('Invalid user type.');
});

export default router;
