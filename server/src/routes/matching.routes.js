import { Router } from 'express';
import { createRequest, getMyRequests, updateRequestStatus } from '../controllers/matching.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/request', authenticate, createRequest);
router.get('/requests', authenticate, getMyRequests);
router.put('/:id/status', authenticate, updateRequestStatus);

export default router;
