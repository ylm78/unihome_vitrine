import express from 'express';
import {
  getAllProducts,
  getProductBySlug,
  getProductByRoute,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Routes pour les produits
router.get('/', getAllProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/route/*', getProductByRoute);
router.post('/', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;

