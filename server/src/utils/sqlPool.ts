import { createPool } from 'mysql2/promise';
import 'dotenv/config';

const pool = createPool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    dateStrings: true,
});

export default pool;
