import { Router } from 'express';
import accessTokenCheck from '../../../middlewares/accessTokenCheck.js';
import fileUpload from '../../../utils/fileParser.js';
import { sqlCreateUser, sqlGetUserWithAccessToken } from '../../../utils/sqlAcount.js';
import { sqlGetUserList } from '../../../utils/sqlUser.js';
import { validateSignupForm } from '../../../utils/validate.js';

const router = Router();

/**
 * get all information about current logged in user
 */
router.get('/@me', accessTokenCheck, async (req, res) => {
    /**
     * get info from sql
     */
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    if (!userInfo) return res.sendStatus(401);

    /**
     * prevent password from getting sent
     */
    userInfo.password = '';
    res.json(userInfo);
});

/**
 * check if client is logged in
 */
router.get('/is-logged-in', async (req, res) => {
    if (req.signedCookies['rt'] || req.signedCookies['at']) return res.send('true');
    res.send('false');
});

/**
 * get list of all users
 */
router.get('/user-list', accessTokenCheck, async (req, res) => {
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    if (!userInfo) return res.sendStatus(401);
    if (userInfo.userType !== 'admin') return res.sendStatus(403);

    const userList = await sqlGetUserList();
    res.json(userList);
});

/**
 * handle .csv file upload
 */
router.post('/csv-upload', accessTokenCheck, fileUpload.single('file'), async (req, res) => {
    const userInfo = await sqlGetUserWithAccessToken(req.accessToken!);
    if (!userInfo) return res.sendStatus(401);
    if (userInfo.userType !== 'admin') return res.sendStatus(403);

    const buffer = req.file?.buffer;
    if (!buffer) return res.sendStatus(400);
    const content = buffer.toString();

    /**
     * split by new line
     */
    const rows = content.split(/\r?\n/);

    if (rows.length < 2) return res.sendStatus(400);
    const definitionColumns = rows.shift()?.split(/\s*,\s*/);
    if (!definitionColumns) return res.sendStatus(400);

    const correctDefinitionColumns = ['judge_id', 'name', 'phone_number', 'password'];
    if (definitionColumns.length !== correctDefinitionColumns.length) return res.sendStatus(400);

    for (let i = 0; i < correctDefinitionColumns.length; i++) {
        if (definitionColumns[i] !== correctDefinitionColumns[i]) {
            return res.sendStatus(400);
        }
    }

    /**
     * definition row is correct
     */
    let errorEncountered = false;
    await Promise.all(
        rows.map(async (row) => {
            if (errorEncountered) return;
            const rowValues = row.split(/\s*,\s*/);

            const formData = {
                name: rowValues[1],
                ic_number: rowValues[0],
                phone_number: rowValues[2],
                password: rowValues[3],
            };

            const error = await validateSignupForm(formData);
            if (error) {
                console.log(error);

                errorEncountered = true;
                return;
            }

            try {
                await sqlCreateUser('judge', formData);
            } catch {
                errorEncountered = true;
            }
        })
    );

    if (errorEncountered) return res.sendStatus(400);
    res.sendStatus(200);
});

export default router;
