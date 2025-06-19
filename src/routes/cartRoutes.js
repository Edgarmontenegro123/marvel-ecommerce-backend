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

export default router;