import {query} from '../config/db.js';

export async function addToCart(req, res) {
    const {marvel_id, name, thumbnail, price = 0} = req.body;
    const userId = req.user.id;

    try {
        // If it already exists, update the quantity; otherwise, create the row.
        await query(
            `INSERT INTO cart_items (user_id, marvel_id, name, thumbnail, price, quantity)
                Values (?, ?, ?, ?, ?, 1)
                ON DUPLICATE KEY UPDATE quantity = quantity + 1;
                `, [userId, marvel_id, name, thumbnail, price]);

        res.status(201).json({message: 'Item added to cart'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'DB error'});
    }
}

export async function getCart(req, res) {
    const userId = req.user.id;

    try {
        const items = await query('SELECT * FROM cart_items WHERE user_id = ?', [userId]);
        const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

        res.json({items, total});
    } catch (err) {
        res.status(500).json({error: 'DB error'});
    }
}

export async function updateQuantity(req, res) {
    const {id} = req.params;
    const {quantity} = req.body;
    const userId = req.user.id;

    if(quantity < 1) return res.status(400).json({error: 'Quantity should be greater than 1'});

    try {
        const result = await query(
            `UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?`,
            [quantity, id, userId]
        );
        if(result.affectedRows === 0) return res.status(404).json({error: 'Item not found'});
        res.json({message: 'Quantity updated'});
    } catch (err) {
        res.status(500).json({error: 'DB error'});
    }
}

export async function removeFromCart(req, res) {
    const {id} = req.params;
    const userId = req.user.id;

    try {
        const result = await query(
            `DELETE FROM cart_items WHERE id = ? AND user_id = ?`,
            [id, userId]
        );
        if(result.affectedRows === 0) return res.status(404).json({error: 'Item not found'});
        res.json({message: 'Item removed'});
    } catch (err) {
        res.status(500).json({error: 'DB error'});
    }
}