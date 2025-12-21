import express from 'express';
import {
  createCheckoutSession,
  getCheckoutSession,
  handleStripeWebhook,
  getAllOrders
} from '../controllers/paymentController.js';

const router = express.Router();

// Route webhook (doit être avant express.json() middleware)
// Note: Cette route doit recevoir le body brut, pas JSON
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

// Routes de paiement
router.post('/create-checkout-session', createCheckoutSession);
router.get('/session/:sessionId', getCheckoutSession);
router.get('/orders', getAllOrders);

export default router;


