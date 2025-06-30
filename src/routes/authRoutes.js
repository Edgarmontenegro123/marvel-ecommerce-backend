/*
import { Router } from 'express';
import { loginUser } from '../controllers/authController.js';

const router = Router();
router.post('/login', loginUser);

export default router;*/

// Working with classes

import {Router} from 'express';
import AuthController from '../controllers/authController.js';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;