import {query} from '../config/db.js';
import bcrypt from 'bcryptjs';

export async function createUser(req, res) {
    const {name, email, password} = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        await query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashed]
        );
        res.status(201).json({message: 'User created successfully.'});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'DB error'});
    }
}