/*
import {Router} from 'express';
import {createUser} from '../controllers/userController.js';
const router = Router();

router.post('/', createUser);

export default router;*/

// Working with classes

import {Router} from 'express';
import UserController from '../controllers/userController.js';
import {verifyToken} from '../middlewares/auth.js';

const router = Router();
const userController = new UserController();

router.get('/:id', verifyToken, userController.getUser);
router.get('/', verifyToken, userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:id', verifyToken, userController.deleteUser);

export default router;
