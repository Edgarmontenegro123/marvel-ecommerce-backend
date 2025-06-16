import {query} from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const rows = await query('SELECT * FROM users WHERE email = ?', [email]);
        if (!rows.length) return res.status(400).json({error: 'User not found'});

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({error: 'Invalid credentials'});

        const token = jwt.sign({
            id: user.id, name: user.name
        }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'DB error'});
    }
}