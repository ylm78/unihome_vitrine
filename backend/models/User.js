import { dbGet, dbRun, dbAll } from '../database/db.js';
import bcrypt from 'bcryptjs';

export class User {
  // Créer un utilisateur
  static async create(userData) {
    const { email, password, first_name, last_name, phone, google_id, avatar } = userData;
    
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const result = await dbRun(
      `INSERT INTO users (email, password, first_name, last_name, phone, google_id, avatar, email_verified)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email,
        hashedPassword,
        first_name || null,
        last_name || null,
        phone || null,
        google_id || null,
        avatar || null,
        google_id ? 1 : 0 // Email vérifié si connexion Google
      ]
    );

    return await this.findById(result.lastID);
  }

  // Trouver un utilisateur par ID
  static async findById(id) {
    const user = await dbGet(
      `SELECT id, email, first_name, last_name, phone, google_id, avatar, role, email_verified, created_at
       FROM users WHERE id = ?`,
      [id]
    );

    if (user) {
      delete user.password;
    }
    return user;
  }

  // Trouver un utilisateur par email
  static async findByEmail(email) {
    return await dbGet(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
  }

  // Trouver un utilisateur par Google ID
  static async findByGoogleId(googleId) {
    const user = await dbGet(
      `SELECT * FROM users WHERE google_id = ?`,
      [googleId]
    );
    return user;
  }

  // Mettre à jour un utilisateur
  static async update(id, updates) {
    const fields = [];
    const values = [];

    const allowedFields = ['first_name', 'last_name', 'phone', 'avatar', 'email_verified'];
    
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(updates[field]);
      }
    }

    if (fields.length === 0) {
      return await this.findById(id);
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await dbRun(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return await this.findById(id);
  }

  // Vérifier le mot de passe
  static async verifyPassword(plainPassword, hashedPassword) {
    if (!hashedPassword) {
      return false;
    }
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Créer ou mettre à jour un utilisateur Google
  static async createOrUpdateGoogleUser(profile) {
    const existingUser = await this.findByGoogleId(profile.id);

    if (existingUser) {
      // Mettre à jour les informations
      return await this.update(existingUser.id, {
        first_name: profile.name?.givenName || existingUser.first_name,
        last_name: profile.name?.familyName || existingUser.last_name,
        avatar: profile.photos?.[0]?.value || existingUser.avatar,
        email_verified: 1
      });
    }

    // Créer un nouvel utilisateur
    return await this.create({
      email: profile.emails?.[0]?.value,
      first_name: profile.name?.givenName,
      last_name: profile.name?.familyName,
      google_id: profile.id,
      avatar: profile.photos?.[0]?.value
    });
  }
}

