import express from 'express';
import { getWishlist, addWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

router.get('/', getWishlist);
router.post('/', addWishlist);

export default router;
