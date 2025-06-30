import express from 'express';
import db from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import favouriteRoutes from './routes/favouriteRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favourites', favouriteRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
    res.send('Marvel API up and running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

async function testConnection() {
    try {
        const conn = await db.pool.getConnection();
        console.log('Connected to MariaDB');
        await conn.release();
    } catch (err) {
        console.error ('Error connecting to MariaDB: ', err)
    }
}

testConnection();