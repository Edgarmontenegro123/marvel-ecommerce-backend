import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export default class UserService {
    async getUserById(id) {
        return await User.findById(id);
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async createUser({name, email, password}) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await User.create({name, email, password: hashedPassword});
    }

    async deleteUser(id) {
        return await User.softDelete(id);
    }
}