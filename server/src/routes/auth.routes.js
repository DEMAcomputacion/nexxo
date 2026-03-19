import { Router } from 'express';
import { register, login, getMe, registerBusiness, requestPasswordReset, resetPassword } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/register-business', registerBusiness);
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
