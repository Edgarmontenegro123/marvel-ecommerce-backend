/*
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
}*/

// Working with classes

import UserService from '../services/userService.js';

export default class UserController {
    constructor() {
        this.userService = new UserService();

        this.getUser = this.getUser.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    async getUser(req, res) {
        try {
            const {id} = req.params;
            const user = await this.userService.getUserById(id);
            res.json(user);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async createUser(req, res) {
        try {
            const {name, email, password} = req.body;
            const user = await this.userService.createUser({name, email, password});
            res.status(201).json({message: 'User created successfully.',
            user: {
                id: Number(user.insertId),
                name,
                email
            }});
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    async deleteUser(req, res) {
        try {
            const {id} = req.params;
            const result = await this.userService.deleteUser(id);

            if(result.affectedRows === 0) {
                return res.status(404).json({error: 'User not found or already inactive.'});
            }
            res.status(200).json({message: 'User marked as inactive.'});
        } catch(error) {
            res.status(500).json({error: error.message});
        }
    }
}