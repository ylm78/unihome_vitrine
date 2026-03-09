/**
 * URL de base de l'API backend.
 * En dev local : http://localhost:3001
 * Avec ngrok : https://xxx.ngrok-free.dev (URL publique du backend)
 * Configurez VITE_API_URL dans .env ou .env.local
 */
export const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001/api')
  .replace(/\/api\/?$/, '');

export const API_URL = `${API_BASE}/api`;
