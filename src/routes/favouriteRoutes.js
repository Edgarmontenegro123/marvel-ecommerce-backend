/*
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
*/

// Working with classes

import {Router} from 'express';
import {verifyToken} from '../middlewares/auth.js';
import FavouriteController from '../controllers/favouriteController.js';

const router = Router();
const favouriteController = new FavouriteController();

router.use(verifyToken);

router.post('/', favouriteController.addFavourite);
router.get('/', favouriteController.getFavourites);
router.delete('/:marvelId', favouriteController.removeFavourite);

export default router;