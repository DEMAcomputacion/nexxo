import { Router } from 'express';
import { getMyProfile, updateProfile } from '../controllers/client.controller.js';
import { authenticate, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/profile', authenticate, requireRole('client'), getMyProfile);
router.put('/profile', authenticate, requireRole('client'), updateProfile);

export default router;
