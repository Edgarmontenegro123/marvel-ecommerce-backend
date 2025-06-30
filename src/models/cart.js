import db from '../config/db.js';

export default class Cart {
    static async addItem({userId, marvelId, name, thumbnail, price}) {
        try {
            const result = await db.query(
                `INSERT INTO cart_items (user_id, marvel_id, name, thumbnail, price, quantity)
            VALUES (?, ?, ?, ?, ?, 1)
            ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
                [userId, marvelId, name, thumbnail, price]
            );

            if (result.affectedRows > 0 && result.insertId === 0) {
                const [updatedItem] = await db.query(
                    `SELECT * FROM cart_items WHERE user_id = ? AND marvel_id = ?`,
                    [userId, marvelId]
                )
                return this.formatItem(updatedItem);
            }
            const [newItem] = await db.query(
                `SELECT * FROM cart_items WHERE id = ?`,
                [result.insertId]
            );

            return this.formatItem(newItem);
        } catch(err) {
            if(err.code === 'ER_DUP_ENTRY') {
                return this.addItem({userId, marvelId, name, thumbnail, price});
            }
            throw err;
        }
    }

    static formatItem(item) {
        return {
            id: Number(item.id),
            user_id: Number(item.user_id),
            marvel_id: item.marvel_id,
            name: item.name,
            thumbnail: item.thumbnail,
            price: Number(item.price),
            quantity: Number(item.quantity)
        }
    }

    static async getItems(userId) {
        return await db.query(`SELECT * FROM cart_items WHERE user_id = ?`,
            [userId]);
    }

    static async getItemById(id, userId) {
        const [item] = await db.query(
            `SELECT * FROM cart_items 
         WHERE id = ? AND user_id = ?`,
            [id, userId]
        );

        if(!item) return null;
        return {
            id: Number(item.id),
            user_id: Number(item.user_id),
            marvel_id: Number(item.marvel_id),
            name: item.name,
            thumbnail: item.thumbnail,
            price: Number(item.price),
            quantity: Number(item.quantity)
        };
    }

    static async updateQuantity({id, userId, quantity}) {
        return await db.query(
            `UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?`,
            [quantity, id, userId]
        );
    }

    static async removeItem({id, userId}) {
        return await db.query(
            `DELETE FROM cart_items WHERE id = ? AND user_id = ?`,
            [id, userId]
        )
    }

    static async decreaseQuantity({id, userId}) {
        const [item] = await db.query(
            `SELECT quantity FROM cart_items WHERE id = ? AND user_id = ?`,
            [id, userId]
        );
        if(!item) return null;

        if(item.quantity > 1) {
            await db.query(
                `UPDATE cart_items SET quantity = quantity - 1 WHERE id = ? AND user_id = ?`,
                [id, userId]
            );
            return {action: 'decreaseQuantity', newQuantity: item.quantity - 1};
        } else {
            await db.query(
                `DELETE FROM cart_items WHERE id = ? AND user_id = ?`,
                [id, userId]
            );
            return {action: 'Removed'};
        }
    }
}