import db from '../config/db.js';

export default class User {
    static async create({name, email, password}) {
        return db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
    }

    static async findByEmail(email) {
        const rows = await db.query('SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    static async findById(id) {
        const rows = await db.query(
            'SELECT id, name, email FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async findAll() {
        return db.query('SELECT id, name, email, created_at FROM users',)
    }

    static async softDelete(id) {
        return db.query('UPDATE users SET is_active = false WHERE id = ?', [id]);
    }
}