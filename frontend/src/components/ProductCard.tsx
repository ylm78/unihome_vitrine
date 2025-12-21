import { useState } from 'react';
import { ArrowRight, Maximize, Layout, Trees, Box, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: any;
  onClick: (product: any) => void;
  finishMode?: 'indus' | 'wood';
}

// Fonction helper pour obtenir le nom d'affichage du produit
function getDisplayName(product: any, finishMode: 'indus' | 'wood'): string {
  if (finishMode === 'wood' && product.slug === 'container-moderne') {
    return 'MONOLITHE - Version Bois';
  }
  return product.name;
}

// Fonction helper pour obtenir les images selon le mode de finition
function getProductImages(product: any, finishMode: 'indus' | 'wood'): string[] {
  if (product.slug === 'container-moderne') {
    if (finishMode === 'wood') {
      // Mode bois : utiliser les images de container-bois1
      return [
        '/images/products/container-bois1/image1.png',
        '/images/products/container-bois1/image2.png',
        '/images/products/container-bois1/image3.png',
        '/images/products/container-bois1/image4.png',
        '/images/products/container-bois1/image5.png'
      ];
    } else {
      // Mode indus : utiliser les images de container-moderne
      return [
        '/images/products/container-moderne/image1.png',
        '/images/products/container-moderne/image2.png',
        '/images/products/container-moderne/image3.png',
        '/images/products/container-moderne/image4.png',
        '/images/products/container-moderne/image5.png'
      ];
    }
  }
  // Pour les autres produits, utiliser les images normales
  return product.images && Array.isArray(product.images) ? product.images : [];
}

export function ProductCard({ product, onClick, finishMode = 'wood' }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const displayName = getDisplayName(product, finishMode);
  const productImages = getProductImages(product, finishMode);
  
  // Utiliser l'image du produit ou une image par défaut
  const imageUrl = productImages.length > 0 
    ? productImages[0] 
    : 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop';
  
  const surfaceDisplay = product.surface_min && product.surface_max
    ? `${product.surface_min}-${product.surface_max}m²`
    : product.surface_min
    ? `${product.surface_min}m²+`
    : 'Sur mesure';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🖱️ Clic sur produit:', product);
    console.log('🖱️ Produit images:', product.images);
    onClick(product);
  };

  return (
    <div 
      onClick={handleClick}
      className="group bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
    >
      <div className="relative h-48 sm:h-64 overflow-hidden">
        {!imageError ? (
          <img 
            src={imageUrl}
            alt={`${product.name} - ${product.short_description || 'Produit UNIHOME'}`}
            width="400"
            height="300"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
            fetchPriority="low"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-gray-200 flex items-center justify-center">
            <Box className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex gap-2">
          <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md uppercase tracking-wide ${
            finishMode === 'indus' ? 'bg-gray-800 text-white' : 'bg-amber-700 text-white'
          }`}>
            {finishMode === 'indus' ? 'Finition Indus' : 'Finition Nature'}
          </span>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
          <p className="text-white font-bold text-base sm:text-lg">
            {displayName}
          </p>
          <p className="text-green-300 text-xs sm:text-sm flex items-center gap-1 mt-1">
            {finishMode === 'wood' && <Trees size={10} className="sm:w-3 sm:h-3"/>}
            {product.category_name || 'Produit UNIHOME'}
          </p>
        </div>
      </div>
      
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-0 mb-3 sm:mb-4">
          <div>
            <span className="text-[10px] sm:text-xs text-gray-400 uppercase font-semibold">À partir de</span>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">
              {product.price_min 
                ? `${Math.round(product.price_min).toLocaleString()} €`
                : 'Sur devis'
              }
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 text-gray-500 text-xs sm:text-sm bg-gray-50 px-2 sm:px-3 py-1 rounded-lg self-start sm:self-auto">
            <span className="flex items-center gap-1">
              <Maximize size={14} className="sm:w-4 sm:h-4"/> {surfaceDisplay}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-4 sm:mb-6 flex-grow">
          {product.short_description || product.description || 'Découvrez ce produit UNIHOME'}
        </p>
        
        <button className="w-full py-2.5 sm:py-3 bg-gray-50 text-gray-800 font-bold rounded-lg sm:rounded-xl group-hover:bg-green-600 group-hover:text-white transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2">
          Voir les détails <ArrowRight size={14} className="sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}

