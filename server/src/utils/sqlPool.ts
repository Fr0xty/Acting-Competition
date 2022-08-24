import 'dotenv/config';
import { createPool } from 'mysql2/promise';

/**
 * instance of connection to mysql server
 */
const pool = createPool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    dateStrings: true,
});

export default pool;
