import { Router } from 'express';
import { getInfluencers, getInfluencerById, updateProfile, getMyProfile } from '../controllers/influencer.controller.js';
import { authenticate, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticate, requireRole('client'), getInfluencers);
router.get('/:id', getInfluencerById);
router.get('/me/profile', authenticate, requireRole('influencer'), getMyProfile);
router.put('/profile', authenticate, requireRole('influencer'), updateProfile);

export default router;
