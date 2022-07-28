/**
 * to setup tables for MySQL database
 */
import pool from './sqlPool.js';

/**
 * participant table
 */
await pool.execute(`
    CREATE TABLE PARTICIPANT (
        participant_id VARCHAR(12) PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        phone_number VARCHAR(15) NOT NULL,
        password VARCHAR(30) NOT NULL
    );
`);

/**
 * admin table
 */
await pool.execute(`
    CREATE TABLE ADMIN (
        admin_id VARCHAR(12) PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        phone_number VARCHAR(15) NOT NULL,
        password VARCHAR(30) NOT NULL
    );
`);

/**
 * judge table
 */
await pool.execute(`
    CREATE TABLE JUDGE (
        judge_id VARCHAR(12) PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        phone_number VARCHAR(15) NOT NULL,
        password VARCHAR(30) NOT NULL
    );
`);

/**
 * item table
 */
await pool.execute(`
    CREATE TABLE ITEM (
        item_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        full_marks INT NOT NULL,
        judge_id VARCHAR(12),
        FOREIGN KEY (judge_id) REFERENCES JUDGE(judge_id)
    );
`);

/**
 * event table
 */
await pool.execute(`
    CREATE TABLE EVENT (
        event_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        description TEXT NOT NULL,
        register_deadline DATE NOT NULL,
        event_deadline DATE NOT NULL
    );
`);

/**
 * event_user table
 */
await pool.execute(`
    CREATE TABLE EVENT_USER (
        event_id INT,
        FOREIGN KEY (event_id) REFERENCES EVENT(event_id),
        participant_id VARCHAR(12),
        FOREIGN KEY (participant_id) REFERENCES PARTICIPANT(participant_id),
        PRIMARY KEY(event_id, participant_id)
    );
`);

/**
 * marks table
 */
await pool.execute(`
    CREATE TABLE MARKS (
        marks_id INT AUTO_INCREMENT PRIMARY KEY,
        marks INT NOT NULL,
        participant_id VARCHAR(12) NOT NULL,
        FOREIGN KEY (participant_id) REFERENCES PARTICIPANT(participant_id),
        event_id INT NOT NULL,
        FOREIGN KEY (event_id) REFERENCES EVENT(event_id),
        item_id INT NOT NULL,
        FOREIGN KEY (item_id) REFERENCES ITEM(item_id),
        admin_id VARCHAR(12),
        FOREIGN KEY (admin_id) REFERENCES ADMIN(admin_id)
    );
`);

/**
 * success message
 */
console.log('SQL tables setup!');
