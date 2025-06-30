/*
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
}*/

import FavouriteService from '../services/favouriteService.js';

export default class FavouriteController {
    constructor() {
        this.favouriteService = new FavouriteService();

        this.addFavourite = this.addFavourite.bind(this);
        this.getFavourites = this.getFavourites.bind(this);
        this.removeFavourite = this.removeFavourite.bind(this);
    }

    async addFavourite(req, res) {
        const {marvelId, type, name, thumbnail} = req.body;
        const userId = req.user.id;

        try {
            const fav = await this.favouriteService.addFavourite({userId, marvelId, type, name, thumbnail});
            res.status(201).json(fav);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async getFavourites(req, res) {
        const userId = req.user.id;

        try {
            const favs = await this.favouriteService.getFavouritesByUser(userId);
            res.status(200).json(favs);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async removeFavourite(req, res) {
        const {marvelId} = req.params;
        const userId = req.user.id;

        try {
            await this.favouriteService.removeFavourite({userId, marvelId});
            res.status(200).json({message: 'Favourite removed successfully.'});
        } catch(err) {
            res.status(500).json({error: err.message});
        }
    }
}