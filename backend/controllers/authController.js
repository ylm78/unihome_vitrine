import { User } from '../models/User.js';
import { generateToken } from '../middleware/auth.js';
import { dbAll, dbGet } from '../database/db.js';

// Inscription
export const register = async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Le mot de passe doit contenir au moins 6 caractères'
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Un compte avec cet email existe déjà'
      });
    }

    // Créer l'utilisateur
    const user = await User.create({
      email,
      password,
      first_name,
      last_name,
      phone
    });

    // Générer le token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      data: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du compte',
      error: error.message
    });
  }
};

// Connexion
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis'
      });
    }

    // Trouver l'utilisateur
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: 'Ce compte utilise une connexion Google. Connectez-vous avec Google.'
      });
    }

    const isValidPassword = await User.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Générer le token
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Connexion réussie',
      data: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          avatar: user.avatar,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      error: error.message
    });
  }
};

// Obtenir le profil de l'utilisateur connecté
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil',
      error: error.message
    });
  }
};

// Mettre à jour le profil
export const updateProfile = async (req, res) => {
  try {
    const { first_name, last_name, phone } = req.body;

    const user = await User.update(req.user.id, {
      first_name,
      last_name,
      phone
    });

    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: user
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil',
      error: error.message
    });
  }
};

// Connexion Google (callback)
export const googleCallback = async (req, res) => {
  try {
    console.log('🔐 Callback Google reçu:', req.user ? 'Utilisateur présent' : 'Utilisateur manquant');
    
    if (!req.user) {
      console.error('❌ req.user est undefined');
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5090'}/login?error=google_auth_failed`);
    }

    // req.user est déjà l'utilisateur créé/mis à jour par Passport (voir config/passport.js)
    // Pas besoin de le recréer !
    const user = req.user;
    console.log('✅ Utilisateur depuis Passport:', user.email);

    const token = generateToken(user);
    console.log('✅ Token généré, redirection vers frontend...');

    // Rediriger vers le frontend avec le token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5090';
    res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('❌ Erreur lors de la connexion Google:', error);
    console.error('Stack:', error.stack);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5090'}/login?error=google_auth_failed`);
  }
};

// Récupérer tous les utilisateurs (admin uniquement)
export const getAllUsers = async (req, res) => {
  try {
    const users = await dbAll(
      `SELECT 
        id, email, first_name, last_name, phone, google_id, avatar, role, 
        email_verified, created_at, updated_at
       FROM users 
       ORDER BY created_at DESC`
    );

    // Compter les commandes pour chaque utilisateur
    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const ordersCount = await dbGet(
          `SELECT COUNT(*) as count FROM orders WHERE customer_email = ?`,
          [user.email]
        );
        return {
          ...user,
          orders_count: ordersCount?.count || 0
        };
      })
    );

    res.json({
      success: true,
      count: usersWithOrders.length,
      data: usersWithOrders
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des utilisateurs',
      error: error.message
    });
  }
};

