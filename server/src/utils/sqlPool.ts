import 'dotenv/config';

import { createPool } from 'mysql2/promise';

const pool = createPool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    dateStrings: true,
});

export default pool;
