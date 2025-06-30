import db from '../config/db.js';

export default class Favourite {
    static async create({userId, marvelId, type, name, thumbnail}) {
        const existing = await db.query(
            'SELECT * FROM favourites WHERE user_id = ? AND marvel_id = ?',
            [userId, marvelId]
        );

        if (existing.length > 0) {
            throw new Error('Favourite already exists');
        }

        const result = await db.query(
            'INSERT INTO favourites (user_id, marvel_id, type, name, thumbnail) VALUES (?, ?, ?, ?, ?)',
            [userId, marvelId, type, name, thumbnail]
        );
        return {
            id: Number(result.insertId),
            userId: Number(userId),
            marvelId,
            type,
            name,
            thumbnail
        };
    }

    static async findAllByUser(userId) {
        return db.query('SELECT * FROM favourites WHERE user_id = ?', [userId]);
    }

    static async delete({userId, marvelId}) {
        return db.query('DELETE FROM favourites WHERE user_id = ? AND marvel_id = ?', [userId, marvelId]);
    }
}