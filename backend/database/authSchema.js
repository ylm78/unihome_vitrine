import { dbRun } from './db.js';

// Créer les tables d'authentification
export const initAuthDatabase = async () => {
  try {
    // Table des utilisateurs
    await dbRun(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT,
        first_name TEXT,
        last_name TEXT,
        phone TEXT,
        google_id TEXT UNIQUE,
        avatar TEXT,
        role TEXT DEFAULT 'user',
        email_verified INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Table des sessions/tokens (optionnel, pour invalidation de tokens)
    await dbRun(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Index pour améliorer les performances
    await dbRun(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    await dbRun(`CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id)`);
    await dbRun(`CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id)`);
    await dbRun(`CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(token)`);

    console.log('✅ Tables d\'authentification initialisées');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation des tables d\'authentification:', error);
    throw error;
  }
};

