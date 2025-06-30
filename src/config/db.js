/*
import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

export async function query(sql, params) {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query(sql, params);
        return res;
    } finally {
        if(conn) conn.release();
    }
}

export default pool;*/

// Working with classes

import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    constructor() {
        this.pool = mariadb.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectionLimit: 5
        })
    }

    async query(sql, params) {
        let conn;
        try {
            conn = await this.pool.getConnection();
            return await conn.query(sql, params);
        } finally {
            if(conn) await conn.release();
        }
    }
}

const db = new Database();

export default db;