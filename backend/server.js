// Charger les variables d'environnement en premier
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { config } from './config/config.js';
import { initDatabase } from './database/db.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import './config/passport.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Headers de sécurité
app.use((req, res, next) => {
  // Headers de sécurité
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Cache pour les assets statiques
  if (req.path.startsWith('/assets/') || req.path.startsWith('/images/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  next();
});

// Middleware
app.use(cors({
  ...config.cors,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session pour Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'votre-secret-session-tres-securise',
    resave: false,
    saveUninitialized: false
  })
);

// Initialiser Passport
app.use(passport.initialize());
app.use(passport.session());

// Logging des requêtes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes de santé
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API UNIHOME est opérationnelle',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'API UNIHOME - Backend pour la vitrine',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      products: '/api/products',
      categories: '/api/categories'
    }
  });
});

// Routes API
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

// Middleware de gestion des erreurs
app.use(notFoundHandler);
app.use(errorHandler);

// Initialiser la base de données et démarrer le serveur
const startServer = async () => {
  try {
    // Initialiser la base de données
    await initDatabase();
    
    // Démarrer le serveur
    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀  API UNIHOME Backend démarrée avec succès!          ║
║                                                           ║
║   📍  Port: ${PORT}                                       ║
║   🌐  URL: http://localhost:${PORT}                        ║
║   🔗  API: http://localhost:${PORT}/api                    ║
║   ❤️   Health: http://localhost:${PORT}/health             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejet non géré:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Exception non capturée:', error);
  process.exit(1);
});

export default app;

