import express from 'express';
import { createQuoteRequest, getAllQuoteRequests, updateQuoteRequest, deleteQuoteRequest } from '../controllers/quoteController.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Route publique : soumettre une demande de devis
router.post('/', createQuoteRequest);

// Routes admin
router.get('/', authenticateToken, requireAdmin, getAllQuoteRequests);
router.patch('/:id', authenticateToken, requireAdmin, updateQuoteRequest);
router.delete('/:id', authenticateToken, requireAdmin, deleteQuoteRequest);

export default router;
