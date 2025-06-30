import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export default class AuthService {
    async register({name, email, password}) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return User.create({name, email, password: hashedPassword})
    }

    async login({email, password}) {
        const user = await User.findByEmail(email);
        if (!user) throw new Error('User not found');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        return jwt.sign({
            id: user.id,
            name: user.name,
        }, process.env.JWT_SECRET, {
            expiresIn: '2h',
        });
    }
}