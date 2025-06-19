import {query} from '../config/db.js';

export async function addFavourite(req, res) {
    const {marvel_id, name, thumbnail} = req.body;
    const userId = req.user.id; // The user's ID comes from the token

    try {
        await query(
            'INSERT INTO favourites (user_id, marvel_id, name, thumbnail) VALUES (?, ?, ?, ?)',
            [userId, marvel_id, name, thumbnail]
        );
        res.status(201).json({message: 'Favourite added'});
    } catch (err) {
        if(err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({message: 'Already in favourites'});
        }
        console.error(err);
        res.status(500).json({message: 'DB error'});
    }
}

export async function getFavourites(req, res) {
    const userId = req.user.id;
    try {
        const favs = await query('SELECT * FROM favourites WHERE user_id = ?', [userId]);
        res.json(favs);
    } catch (err) {
        res.status(500).json({message: 'DB error'});
    }
}

export async function deleteFavourite(req, res) {
    const {id} = req.params;
    const userId = req.user.id;
    try {
        const result = await query(
            'DELETE FROM favourites WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        if(result.affectedRows === 0) return res.status(404).json({message: 'No favourite found.'});
        res.json({message: 'Favourite deleted'});
    } catch (err) {
        res.status(500).json({message: 'DB error'});
    }
}