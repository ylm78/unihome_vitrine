import express from 'express';
import passport from 'passport';
import {
  register,
  login,
  getProfile,
  updateProfile,
  googleCallback,
  getAllUsers
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Routes publiques
router.post('/register', register);
router.post('/login', login);

// Routes Google OAuth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5090'}/login?error=google_auth_failed`
  }),
  googleCallback
);

// Routes protégées (nécessitent authentification)
router.get('/me', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.get('/users', authenticateToken, getAllUsers); // Admin seulement (à sécuriser si besoin)

export default router;

