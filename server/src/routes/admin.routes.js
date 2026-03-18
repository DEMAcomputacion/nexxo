import { Router } from 'express';
import { adminAuthenticate } from '../middleware/adminAuth.middleware.js';
import {
  adminLogin,
  getStats,
  getAllUsers,
  getInfluencers,
  getBusinesses,
  updateUser,
  deleteUser,
  getCampaigns,
  createCampaign,
  updateCampaign,
} from '../controllers/admin.controller.js';
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getCollaborators,
  createCollaborator,
  updateCollaborator,
  getPaymentOrders,
  createPaymentOrder,
  updatePaymentOrder,
  registerPayment,
  getTransactions,
} from '../controllers/collaborator.controller.js';

const router = Router();

// Auth
router.post('/auth', adminLogin);

// Dashboard
router.get('/stats', adminAuthenticate, getStats);

// Users
router.get('/users', adminAuthenticate, getAllUsers);
router.get('/influencers', adminAuthenticate, getInfluencers);
router.get('/businesses', adminAuthenticate, getBusinesses);
router.put('/users/:id', adminAuthenticate, updateUser);
router.delete('/users/:id', adminAuthenticate, deleteUser);

// Campaigns
router.get('/campaigns', adminAuthenticate, getCampaigns);
router.post('/campaigns', adminAuthenticate, createCampaign);
router.put('/campaigns/:id', adminAuthenticate, updateCampaign);

// Collaborators — specific routes before /:id
router.get('/collab/roles', adminAuthenticate, getRoles);
router.post('/collab/roles', adminAuthenticate, createRole);
router.put('/collab/roles/:id', adminAuthenticate, updateRole);
router.delete('/collab/roles/:id', adminAuthenticate, deleteRole);

router.get('/collab/orders', adminAuthenticate, getPaymentOrders);
router.post('/collab/orders', adminAuthenticate, createPaymentOrder);
router.put('/collab/orders/:id', adminAuthenticate, updatePaymentOrder);

router.post('/collab/payments', adminAuthenticate, registerPayment);
router.get('/collab/transactions', adminAuthenticate, getTransactions);

router.get('/collab', adminAuthenticate, getCollaborators);
router.post('/collab', adminAuthenticate, createCollaborator);
router.put('/collab/:id', adminAuthenticate, updateCollaborator);

export default router;
