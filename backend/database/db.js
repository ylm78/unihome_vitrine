import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { mkdirSync } from 'fs';

const dbPath = path.join(__dirname, '../data', 'products.db');

// Créer le répertoire data s'il n'existe pas (synchrone)
const dataDir = path.join(__dirname, '../data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Créer la connexion à la base de données
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur lors de l\'ouverture de la base de données:', err.message);
  } else {
    console.log('Base de données connectée avec succès');
  }
});

// Promisifier les méthodes de la base de données
// dbRun doit retourner un objet avec lastID et changes
export const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          lastID: this.lastID,
          changes: this.changes
        });
      }
    });
  });
};

export const dbGet = promisify(db.get.bind(db));
export const dbAll = promisify(db.all.bind(db));

// Fonction pour initialiser la base de données
export const initDatabase = async () => {
  try {
    // Table des catégories
    await dbRun(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        slug TEXT NOT NULL UNIQUE,
        description TEXT,
        icon TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Table des produits
    await dbRun(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        description TEXT,
        short_description TEXT,
        price_min REAL,
        price_max REAL,
        surface_min REAL,
        surface_max REAL,
        images TEXT,
        videos TEXT,
        features TEXT,
        route TEXT,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `);

    // Table des commandes
    await dbRun(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stripe_session_id TEXT UNIQUE,
        stripe_payment_intent_id TEXT,
        product_id INTEGER,
        product_name TEXT NOT NULL,
        finish_mode TEXT DEFAULT 'indus',
        amount REAL NOT NULL,
        currency TEXT DEFAULT 'eur',
        customer_email TEXT,
        customer_name TEXT,
        status TEXT DEFAULT 'pending',
        payment_status TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `);

    // Index pour améliorer les performances
    await dbRun(`CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id)`);
    await dbRun(`CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug)`);
    await dbRun(`CREATE INDEX IF NOT EXISTS idx_products_status ON products(status)`);
    await dbRun(`CREATE INDEX IF NOT EXISTS idx_orders_session ON orders(stripe_session_id)`);
    await dbRun(`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`);
    await dbRun(`CREATE INDEX IF NOT EXISTS idx_orders_product ON orders(product_id)`);

    console.log('Base de données initialisée avec succès');
    
    // Initialiser les tables d'authentification
    try {
      const authModule = await import('./authSchema.js');
      await authModule.initAuthDatabase();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des tables d\'authentification:', error);
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    throw error;
  }
};

export default db;

