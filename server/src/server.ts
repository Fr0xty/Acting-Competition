import 'dotenv/config';

import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';

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
 * render React webapp
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

/**
 * run server on given port
 */
app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}...`);
});
