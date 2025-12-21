import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onError?: () => void;
}

/**
 * Composant Image optimisé pour améliorer les performances Lighthouse
 * - Ajoute automatiquement width/height pour éviter le CLS
 * - Support du lazy loading
 * - Gestion des erreurs de chargement
 */
export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  loading = 'lazy',
  priority = false,
  onError
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
    if (onError) {
      onError();
    }
  };

  if (imageError) {
    return (
      <div 
        className={`bg-gradient-to-br from-green-100 to-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <svg 
          className="w-16 h-16 text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      onError={handleError}
      decoding="async"
    />
  );
}

