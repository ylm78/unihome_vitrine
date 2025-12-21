/**
 * Utilitaires pour la gestion des administrateurs
 */

// Email de l'administrateur autorisé
export const ADMIN_EMAIL = 'arifxhakan78@gmail.com'; // Note: corrigé avec @

/**
 * Vérifie si un email correspond à l'administrateur
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

