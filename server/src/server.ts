import 'dotenv/config';

import cookieParser from 'cookie-parser';
import express from 'express';

/**
 * main instance of server
 */
const app = express();

/**
 * parse cookies and JSON
 */
app.use(cookieParser(process.env.SIGN_COOKIE_SECRET));
app.use(express.json());

/**
 * mount routes
 */
import apiRouter from './routes/api.js';

app.use('/api', apiRouter);

/**
 * run server on given port
 */
app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}...`);
});
