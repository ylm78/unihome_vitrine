import express from 'express';
import {
  getAllCategories,
  getCategoryBySlug,
  createCategory
} from '../controllers/categoryController.js';

const router = express.Router();

// Routes pour les catégories
router.get('/', getAllCategories);
router.get('/:slug', getCategoryBySlug);
router.post('/', createCategory);

export default router;

