/**
 * to setup tables for MySQL database
 */
import pool from './sqlPool.js';

/**
 * participant table
 */
await pool.execute(`
    CREATE TABLE participant (
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
    CREATE TABLE admin (
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
    CREATE TABLE judge (
        judge_id VARCHAR(12) PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        phone_number VARCHAR(15) NOT NULL,
        password VARCHAR(30) NOT NULL
    );
`);

/**
 * event table
 */
await pool.execute(`
    CREATE TABLE event (
        event_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        description TEXT NOT NULL,
        register_deadline DATE NOT NULL,
        event_deadline DATE NOT NULL
    );
`);

/**
 * item table
 */
await pool.execute(`
    CREATE TABLE item (
        item_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        full_marks INT NOT NULL,

        judge_id VARCHAR(12),
        FOREIGN KEY (judge_id) REFERENCES judge(judge_id),

        event_id INT NOT NULL,
        FOREIGN KEY (event_id) REFERENCES event(event_id)
    );
`);

/**
 * event_user table
 */
await pool.execute(`
    CREATE TABLE event_user (
        event_id INT,
        FOREIGN KEY (event_id) REFERENCES event(event_id),

        participant_id VARCHAR(12),
        FOREIGN KEY (participant_id) REFERENCES participant(participant_id),

        placement INT,
        total_marks INT,

        PRIMARY KEY(event_id, participant_id)
    );
`);

/**
 * marks table
 */
await pool.execute(`
    CREATE TABLE marks (
        marks_id INT AUTO_INCREMENT PRIMARY KEY,
        marks INT NOT NULL,

        participant_id VARCHAR(12) NOT NULL,
        FOREIGN KEY (participant_id) REFERENCES participant(participant_id),

        event_id INT NOT NULL,
        FOREIGN KEY (event_id) REFERENCES event(event_id),

        item_id INT NOT NULL,
        FOREIGN KEY (item_id) REFERENCES item(item_id),

        admin_id VARCHAR(12),
        FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
    );
`);

/**
 * oauth token table
 */
await pool.execute(`
    CREATE TABLE oauth_token (
        participant_id VARCHAR(12),
        FOREIGN KEY (participant_id) REFERENCES participant(participant_id),
        admin_id VARCHAR(12),
        FOREIGN KEY (admin_id) REFERENCES admin(admin_id),
        judge_id VARCHAR(12),
        FOREIGN KEY (judge_id) REFERENCES judge(judge_id),
        refresh_token VARCHAR(255),
        access_token VARCHAR(255),
        refresh_token_expires TIMESTAMP,
        access_token_expires TIMESTAMP
    );
`);

/**
 * success message
 */
console.log('SQL tables setup!');
