// Helper pour gérer les images avec fallback
import { containerHouseImages, fallbackImages } from '../data/images';

/**
 * Récupère l'image d'un modèle avec fallback
 */
export function getModelImage(index: number): string {
  if (containerHouseImages.models[index]) {
    // Vérifier si l'image existe (on utilisera un try/catch côté composant si nécessaire)
    return containerHouseImages.models[index];
  }
  return fallbackImages.models[index % fallbackImages.models.length];
}

/**
 * Récupère une image de galerie avec fallback
 */
export function getGalleryImage(index: number): string {
  if (containerHouseImages.gallery[index]) {
    return containerHouseImages.gallery[index];
  }
  return fallbackImages.models[index % fallbackImages.models.length];
}

/**
 * Récupère une image de projet avec fallback
 */
export function getProjectImage(index: number): string {
  if (containerHouseImages.projects[index]) {
    return containerHouseImages.projects[index];
  }
  return fallbackImages.models[index % fallbackImages.models.length];
}

