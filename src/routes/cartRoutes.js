/*
import {Router} from 'express';
import {verifyToken} from '../middlewares/auth.js';
import {
    addToCart,
    getCart,
    updateQuantity,
    removeFromCart
} from '../controllers/cartController.js';

const router = Router();

router.use(verifyToken);

router.post('/', addToCart);
router.get('/', getCart);
router.patch('/:id', updateQuantity);
router.delete('/:id', removeFromCart);

export default router;*/

// Working with classes

import {Router} from 'express';
import {verifyToken} from '../middlewares/auth.js';
import CartController from '../controllers/cartController.js';

const router = Router();
const cartController = new CartController();

router.post('/', verifyToken, cartController.addToCart);
router.get('/', verifyToken, cartController.getCart);
router.patch('/:id', verifyToken, cartController.updateQuantity);
router.delete('/:id', verifyToken, cartController.removeFromCart);

export default router;