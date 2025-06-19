import {Router} from 'express';
import {verifyToken} from '../middlewares/auth.js';
import {
    addFavourite,
    getFavourites,
    deleteFavourite,
} from '../controllers/favouriteController.js';

const router = Router();

router.use(verifyToken);
router.get('/', getFavourites);
router.post('/', addFavourite);
router.delete('/:id', deleteFavourite);

export default router;