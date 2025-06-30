/*
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
}*/

// Working with classes

import AuthService from '../services/authService.js';

export default class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    async register(req, res) {
        try {
            await this.authService.register(req.body);
            res.status(201).json({message: 'User created successfully.'});
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }

    async login(req, res) {
        try {
            const token = await this.authService.login(req.body);
            res.status(200).json({token});
        } catch (err) {
            res.status(401).json({message: err.message});
        }
    }
}
