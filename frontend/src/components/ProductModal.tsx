import { X, Trees, Box, CheckCircle, Mail, ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CheckoutModal } from './CheckoutModal';

interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: (productName: string) => void;
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
  // Pour les autres produits, parser les images normalement
  if (product.images) {
    if (typeof product.images === 'string') {
      try {
        return JSON.parse(product.images);
      } catch (e) {
        return [product.images];
      }
    }
    if (Array.isArray(product.images)) {
      return product.images;
    }
  }
  return [];
}

export function ProductModal({ product, isOpen, onClose, onRequestQuote, finishMode = 'wood' }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  
  const displayName = getDisplayName(product, finishMode);
  const parsedImages = getProductImages(product, finishMode);
  
  // Debug
  useEffect(() => {
    if (isOpen && product) {
      console.log('🔍 ProductModal ouvert:', { product, isOpen, images: parsedImages });
    }
  }, [isOpen, product, parsedImages]);
  
  // Debug: toujours log même si pas ouvert
  console.log('🔍 ProductModal render:', { isOpen, hasProduct: !!product, productId: product?.id });

  if (!isOpen || !product) {
    console.log('❌ ProductModal ne s\'affiche pas:', { isOpen, hasProduct: !!product });
    return null;
  }

  const images = parsedImages.length > 0
    ? parsedImages
    : ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop'];
  
  const currentImage = images[currentImageIndex];

  // Réinitialiser l'index quand le produit change
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product.id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  const surfaceDisplay = product.surface_min && product.surface_max
    ? `${product.surface_min}-${product.surface_max}m²`
    : product.surface_min
    ? `${product.surface_min}m²+`
    : 'Sur mesure';

  const priceDisplay = product.price_min 
    ? `${Math.round(product.price_min).toLocaleString()} €`
    : 'Sur devis';

  const features = product.features || [];

  // Empêcher le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  console.log('✅ ProductModal va s\'afficher!', { isOpen, product: product.name });

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-2 md:p-4"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={(e) => {
        // Fermer si on clique sur le backdrop
        if (e.target === e.currentTarget) {
          console.log('🖱️ Clic sur backdrop, fermeture');
          onClose();
        }
      }}
    >
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.9)'
        }}
      ></div>
      
      <div 
        className="bg-white rounded-none sm:rounded-2xl lg:rounded-3xl w-full h-full sm:h-auto max-w-7xl max-h-[100vh] sm:max-h-[95vh] overflow-hidden relative shadow-2xl flex flex-col lg:flex-row animate-fadeIn m-0 sm:m-2 md:m-4 lg:m-6"
        style={{ 
          zIndex: 10,
          position: 'relative',
          backgroundColor: 'white',
          maxHeight: '100vh'
        }}
        onClick={(e) => {
          e.stopPropagation();
          console.log('🖱️ Clic dans le modal');
        }}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 bg-white/90 hover:bg-white p-2 rounded-full text-gray-800 transition-colors shadow-lg"
          aria-label="Fermer"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>
        
        {/* Image Gallery Section - Disposition améliorée */}
        <div className="w-full lg:w-1/2 relative bg-gray-50 flex-shrink-0 flex flex-col min-h-0">
          {/* Image principale - Plus grande et mieux centrée */}
          <div className="relative flex-1 min-h-[50vh] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] bg-black flex items-center justify-center overflow-hidden group">
            <img 
              src={currentImage} 
              alt={`${product.name} - Image ${currentImageIndex + 1} sur ${images.length}`} 
              width="1200"
              height="900"
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" 
              fetchPriority="high"
            />
            
            {/* Navigation entre images (si plus d'une image) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2 sm:p-3 shadow-xl transition-all hover:scale-110 z-20 backdrop-blur-sm"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-2 sm:p-3 shadow-xl transition-all hover:scale-110 z-20 backdrop-blur-sm"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                </button>
                
                {/* Indicateur d'image amélioré */}
                <div className="absolute top-3 left-3 sm:top-6 sm:left-6 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold z-20">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
            
            {/* Badge finition - Positionné en haut à droite */}
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full z-20">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {finishMode === 'wood' ? (
                  <Trees className="text-green-400 w-3 h-3 sm:w-[18px] sm:h-[18px]" />
                ) : (
                  <Box className="text-gray-300 w-3 h-3 sm:w-[18px] sm:h-[18px]" />
                )}
                <span className="uppercase text-[10px] sm:text-xs font-bold tracking-wider hidden xs:inline">
                  {finishMode === 'wood' ? 'Bardage Bois' : 'Indus Acier'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Grille de miniatures améliorée - Plus grande et plus visible */}
          {images.length > 1 && (
            <div className="bg-white border-t border-gray-200 p-3 sm:p-4 lg:p-6">
              <div className="flex gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 relative group transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'ring-2 sm:ring-4 ring-green-600 ring-offset-1 sm:ring-offset-2 scale-105'
                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-green-600 shadow-lg'
                        : 'border-gray-200 group-hover:border-gray-400'
                    }`}>
                      <img
                        src={img}
                        alt={`Miniature ${index + 1} de ${product.name}`}
                        width="128"
                        height="128"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {index === currentImageIndex && (
                      <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-green-600 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                        <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col bg-white overflow-y-auto max-h-[50vh] sm:max-h-[95vh] lg:max-h-[95vh] min-h-0">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-2 leading-tight">
                {displayName}
              </h2>
              <p className="text-green-600 font-medium text-base sm:text-lg">{product.category_name || 'Produit UNIHOME'}</p>
            </div>
            <div className="text-left lg:text-right lg:flex-shrink-0">
              <p className="text-xs sm:text-sm text-gray-400 mb-1">Prix estimatif</p>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900">{priceDisplay}</p>
            </div>
          </div>
          
          <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex-1 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 text-center">
              <span className="block text-gray-400 text-xs uppercase mb-1 sm:mb-2">Surface</span>
              <span className="font-bold text-gray-800 text-base sm:text-lg lg:text-xl">{surfaceDisplay}</span>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 text-center">
              <span className="block text-gray-400 text-xs uppercase mb-1 sm:mb-2">Délai</span>
              <span className="font-bold text-gray-800 text-base sm:text-lg lg:text-xl">8 sem.</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg xl:text-xl">
            {product.description || product.short_description || 'Découvrez ce produit UNIHOME exceptionnel.'}
            <br/><br/>
            {finishMode === 'wood' 
              ? "Ce modèle bénéficie d'une double isolation extérieure avec bardage en Douglas français, garantissant une intégration paysagère parfaite et une performance thermique supérieure." 
              : "Ce modèle conserve l'esthétique brute et industrielle du container maritime. Peinture anticorrosion garantie 10 ans, coloris au choix."}
          </p>
          
          {features.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h3 className="font-bold text-gray-800 mb-4 sm:mb-5 lg:mb-6 uppercase text-xs sm:text-sm lg:text-base tracking-wide">Inclus dans l'offre :</h3>
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                {features.map((feat: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 sm:gap-3 lg:gap-4 text-gray-600 text-xs sm:text-sm lg:text-base">
                    <div className="bg-green-100 p-1 sm:p-1.5 lg:p-2 rounded-full text-green-600 flex-shrink-0">
                      <CheckCircle size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
                <li className="flex items-center gap-2 sm:gap-3 lg:gap-4 text-gray-600 text-xs sm:text-sm lg:text-base">
                  <div className="bg-green-100 p-1 sm:p-1.5 lg:p-2 rounded-full text-green-600 flex-shrink-0">
                    <CheckCircle size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  </div>
                  <span>{finishMode === 'wood' 
                    ? "Bardage Bois Naturel (Douglas/Mélèze)" 
                    : "Peinture Industrielle Marine"}</span>
                </li>
              </ul>
            </div>
          )}
          
          <div className="mt-auto pt-4 sm:pt-6 lg:pt-8 border-t border-gray-200 space-y-2 sm:space-y-3">
            <button 
              onClick={() => setShowCheckout(true)}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl transition-all shadow-xl shadow-green-200 hover:scale-[1.02] flex justify-center items-center gap-2 text-sm sm:text-base lg:text-lg"
            >
              <CreditCard size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" /> Commander maintenant
            </button>
            <button 
              onClick={() => {
                onClose();
                onRequestQuote(`${displayName} (${finishMode === 'wood' ? 'Bois' : 'Indus'})`);
              }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl transition-all hover:scale-[1.02] flex justify-center items-center gap-2 text-sm sm:text-base lg:text-lg"
            >
              <Mail size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" /> Demander un devis personnalisé
            </button>
            <p className="text-center text-[10px] sm:text-xs lg:text-sm text-gray-400 px-2">
              Paiement sécurisé via Stripe • Devis gratuit et sans engagement
            </p>
          </div>
        </div>
      </div>
      
      {/* Modal de checkout */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        product={product}
        finishMode={finishMode}
      />
    </div>
  );
}

