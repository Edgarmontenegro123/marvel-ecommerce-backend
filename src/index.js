import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Api Marvel funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
})

async function testConnection() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to MariaDB');
        conn.release();
    } catch (err) {
        console.error ('Error connecting to MariaDB: ', err)
    }
}

testConnection();