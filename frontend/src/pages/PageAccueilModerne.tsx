import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Box, Wind, Sun, CheckCircle, MapPin, Phone, Mail, 
  ArrowRight, X, Menu, Maximize, Layout, Trees, Leaf,
  Building2, Container, Factory, Shield, Zap, Sparkles, Eye
} from 'lucide-react';
// Lazy loading des modals pour réduire le bundle initial
import { ProductCard } from '../components/ProductCard';
const ProductModal = lazy(() => import('../components/ProductModal').then(m => ({ default: m.ProductModal })));
const ContactModal = lazy(() => import('../components/ContactModal').then(m => ({ default: m.ContactModal })));
import { UserMenu } from '../components/UserMenu';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'http://localhost:3001/api';

// Filtres par caractéristiques premium
const FILTERS = [
  { 
    id: 'all', 
    label: 'Tous les modèles', 
    icon: <Home size={16} />,
    filter: (product: any) => true
  },
  { 
    id: 'monolithe', 
    label: 'MONOLITHE', 
    icon: <Sparkles size={16} />,
    filter: (product: any) => product.slug === 'container-moderne'
  },
  { 
    id: 'ecrin', 
    label: "L'ÉCRIN", 
    icon: <Eye size={16} />,
    filter: (product: any) => product.slug === 'container-moderne-2'
  },
  { 
    id: 'sanctuary', 
    label: 'SANCTUARY', 
    icon: <Trees size={16} />,
    filter: (product: any) => product.slug === 'container-moderne-3'
  }
];

const FEATURES = [
  {
    icon: <Box className="w-8 h-8 text-green-600" />,
    title: "Structure Robuste",
    desc: "Structure en acier ultra-robuste et antisismique."
  },
  {
    icon: <Trees className="w-8 h-8 text-green-600" />,
    title: "Habillage Naturel",
    desc: "Bardage bois pour une fusion avec la nature."
  },
  {
    icon: <Sun className="w-8 h-8 text-green-600" />,
    title: "Habitat Performant",
    desc: "Isolation haute performance (RE2020)."
  },
  {
    icon: <Wind className="w-8 h-8 text-green-600" />,
    title: "Pose Rapide",
    desc: "Chantier propre, sans fondations lourdes, installé en 48h."
  }
];

export function PageAccueilModerne() {
  const { isAuthenticated } = useAuth();
  const [finishMode, setFinishMode] = useState<'indus' | 'wood'>('wood');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Debug: Log quand un produit est sélectionné
  useEffect(() => {
    if (selectedProduct) {
      console.log('✅ Produit sélectionné:', selectedProduct);
      console.log('✅ Images du produit:', selectedProduct.images);
    }
  }, [selectedProduct]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [prefilledModel, setPrefilledModel] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gérer le scroll vers #models au chargement de la page
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#models') {
        setTimeout(() => {
          const section = document.getElementById('models');
          if (section) {
            const offset = 80; // Hauteur de la navbar
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 500);
      }
    };

    // Vérifier au chargement initial
    handleHashChange();
    
    // Écouter les changements de hash
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [products]);

  // Charger les produits depuis l'API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('🔄 Chargement des produits depuis:', `${API_URL}/products?status=active`);
        
        const response = await fetch(`${API_URL}/products?status=active`);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('📦 Réponse API:', data);
        
        if (data.success && data.data) {
          console.log(`✅ ${data.data.length} produits chargés`);
          setProducts(data.data || []);
        } else {
          console.warn('⚠️ Pas de produits dans la réponse:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error('❌ Erreur lors du chargement des produits:', error);
        console.error('💡 Vérifiez que le backend est démarré sur http://localhost:3001');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrer par mode de finition ET par filtre sélectionné
  const filteredProducts = useMemo(() => {
    // Filtrer tous les produits actifs (le backend filtre déjà par status=active)
    // On affiche tous les produits, pas seulement ceux avec des slugs spécifiques
    let modeFiltered: any[] = products;
    
    // Ensuite appliquer le filtre sélectionné si nécessaire
    if (selectedFilter === 'all') {
      return modeFiltered;
    }
    
    const filterFunction = FILTERS.find(f => f.id === selectedFilter)?.filter;
    if (filterFunction) {
      return modeFiltered.filter(filterFunction);
    }
    
    return modeFiltered;
  }, [products, finishMode, selectedFilter]);

  const handleOpenContact = (modelName: string | null = null) => {
    setPrefilledModel(modelName);
    setIsContactOpen(true);
  };

  const scrollToModels = () => {
    const section = document.getElementById('models');
    if (section) {
      // Attendre un peu pour que le DOM soit prêt
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  // Gérer le scroll vers #models au chargement de la page
  useEffect(() => {
    if (window.location.hash === '#models') {
      setTimeout(() => {
        const section = document.getElementById('models');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, [products]);

  return (
    <div className="font-sans text-gray-900 min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-2 sm:py-3' : 'bg-gradient-to-b from-black/50 to-transparent py-3 sm:py-4 md:py-5'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center gap-2 sm:gap-4">
          <Link to="/" className={`text-xl sm:text-2xl font-bold flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`}>
            <Box className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            <span className="whitespace-nowrap">UNI<span className="text-green-500">HOME</span></span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 flex-shrink-0">
            <a href="#models" className={`hover:text-green-500 font-medium transition-colors whitespace-nowrap text-sm xl:text-base ${
              scrolled ? 'text-gray-600' : 'text-gray-100'
            }`}>Nos Produits</a>
            <a href="#philosophie" className={`hover:text-green-500 font-medium transition-colors whitespace-nowrap text-sm xl:text-base ${
              scrolled ? 'text-gray-600' : 'text-gray-100'
            }`}>Notre Philosophie</a>
            <a href="#concept" className={`hover:text-green-500 font-medium transition-colors whitespace-nowrap text-sm xl:text-base ${
              scrolled ? 'text-gray-600' : 'text-gray-100'
            }`}>Technologie</a>
            <button 
              onClick={() => handleOpenContact()}
              className="bg-green-700 hover:bg-green-800 text-white px-4 xl:px-6 py-2 rounded-full text-xs xl:text-sm font-medium transition-colors shadow-lg shadow-green-500/30 whitespace-nowrap flex-shrink-0"
            >
              Obtenir un devis
            </button>
            <UserMenu />
          </div>
          
          {/* Tablet Menu - Version compacte */}
          <div className="hidden md:flex lg:hidden items-center gap-3 flex-shrink-0">
            <a href="#models" className={`hover:text-green-500 font-medium transition-colors text-sm ${
              scrolled ? 'text-gray-600' : 'text-gray-100'
            }`}>Produits</a>
            <button 
              onClick={() => handleOpenContact()}
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors shadow-lg shadow-green-500/30 whitespace-nowrap"
            >
              Devis
            </button>
            <UserMenu />
          </div>
          
          {/* Mobile Toggle */}
          <button 
            className="md:hidden lg:hidden text-green-500 flex-shrink-0" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu mobile"
          >
            {mobileMenuOpen ? (
              <X size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
            ) : (
              <Menu size={24} className={scrolled ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t">
            <div className="flex flex-col p-4 gap-4">
              <a href="#models" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium">Nos Produits</a>
              <a href="#philosophie" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium">Notre Philosophie</a>
              <a href="#concept" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium">Technologie</a>
              <button 
                onClick={() => {
                  handleOpenContact();
                  setMobileMenuOpen(false);
                }}
                className="bg-green-700 text-white px-4 py-3 rounded-lg text-center font-medium"
              >
                Devis Gratuit
              </button>
              <div className="border-t border-gray-200 pt-4 mt-2">
                {!isAuthenticated ? (
                  <>
                    <Link 
                      to="/login" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center text-gray-700 font-medium py-2"
                    >
                      Connexion
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block bg-green-700 text-white px-4 py-3 rounded-lg text-center font-medium mt-2"
                    >
                      Inscription
                    </Link>
                  </>
                ) : (
                  <UserMenu />
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Image de fond - Maison container dans la nature avec animation */}
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Maison container moderne dans la nature, design contemporain et écologique" 
            className="w-full h-full object-cover animate-background-move"
            width="1920"
            height="1080"
            loading="eager"
            fetchPriority="high"
            style={{ 
              objectPosition: 'center center',
              transform: 'scale(1.1)'
            }}
            onError={(e) => {
              // Image de secours si la première ne charge pas
              e.currentTarget.src = 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
            }}
          />
          {/* Overlay sombre pour la lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/70 to-gray-900/50" />
          {/* Overlay supplémentaire pour plus de contraste */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl mx-auto mt-16 sm:mt-20">
          <div className="flex justify-center mb-4 sm:mb-6 px-2">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-green-300 px-2.5 sm:px-3 md:px-4 py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wide sm:tracking-widest flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
              <Leaf size={10} className="sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 flex-shrink-0" /> 
              <span className="hidden min-[375px]:inline">Construction Durable & Moderne</span>
              <span className="min-[375px]:hidden">Durable & Moderne</span>
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
            Le confort du moderne,<br className="hidden sm:block" />
            <span className="sm:hidden"> </span><span className="text-green-400">l'âme de la nature.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 sm:mb-8 md:mb-10 font-light max-w-3xl mx-auto px-2 sm:px-0">
            Deux types de maisons containers : en <strong className="text-white">acier</strong> (style industriel) 
            ou en <strong className="text-green-400">bois</strong> (style nature). Des lieux de vie d'exception, choisissez votre style.
          </p>
          
          <div className="flex justify-center px-4 sm:px-0">
            <button 
              onClick={scrollToModels}
              className="bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold hover:bg-green-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/50 hover:-translate-y-1 whitespace-nowrap"
            >
              Découvrir nos produits <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <section id="philosophie" className="py-12 sm:py-16 md:py-20 bg-green-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <Trees size={400} className="absolute -bottom-20 -left-20 hidden md:block" />
          <Leaf size={200} className="absolute top-20 right-20 rotate-45 hidden md:block" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-12">
          <div className="md:w-1/2 w-full">
            <div className="inline-block bg-green-800 text-green-200 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
              NOTRE PHILOSOPHIE
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Reconnectez-vous<br className="hidden sm:block"/>avec la <span className="text-green-400">Nature</span>.
            </h2>
            <p className="text-green-100 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
              Deux types de maisons containers : en <strong className="text-white">acier</strong> (brut industriel) 
              ou en <strong className="text-green-300">bois</strong> (authenticité naturelle), 
              pensées pour s'effacer devant le paysage.
              <br/><br/>
              Choisissez entre la <strong>robustesse industrielle</strong> de l'acier ou la <strong>chaleur naturelle</strong> du bois. 
              Maisons containers en acier avec finition métallique, ou maisons containers en bois avec bardage naturel. 
              Grandes baies vitrées, design épuré... Votre UNIHOME s'adapte à votre style.
            </p>
            <div className="flex gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-white">100%</span>
                <span className="text-sm text-green-300">Recyclable</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-white">RE2020</span>
                <span className="text-sm text-green-300">Certifié</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                className="rounded-2xl shadow-2xl transform translate-y-8" 
                alt="Cabane bois" 
              />
              <img 
                src="https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                className="rounded-2xl shadow-2xl" 
                alt="Intérieur bois" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="models" className="py-12 sm:py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Configurez votre style</h2>
            <p className="text-gray-100 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base px-2 sm:px-0">
              Choisissez entre nos maisons containers en <strong className="text-white">acier</strong> (style industriel) 
              ou en <strong className="text-green-400">bois</strong> (style nature).
            </p>
            
            {/* Toggle Switch */}
            <div className="inline-flex bg-white p-1 rounded-full shadow-lg border border-gray-200 mb-6 sm:mb-8 relative max-w-full mx-auto">
              <button
                onClick={() => setFinishMode('indus')}
                className={`relative z-10 px-3 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-1 sm:gap-2 font-bold transition-all duration-300 text-xs sm:text-base ${
                  finishMode === 'indus' ? 'text-white' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Box size={16} className="sm:w-[18px] sm:h-[18px]" /> <span className="whitespace-nowrap">Industriel</span>
              </button>
              <button
                onClick={() => setFinishMode('wood')}
                className={`relative z-10 px-3 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-1 sm:gap-2 font-bold transition-all duration-300 text-xs sm:text-base ${
                  finishMode === 'wood' ? 'text-white' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Trees size={16} className="sm:w-[18px] sm:h-[18px]" /> <span className="whitespace-nowrap">Nature & Bois</span>
              </button>
              
              {/* Sliding Background */}
              <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-transform duration-300 ${
                finishMode === 'wood' 
                  ? 'translate-x-[100%] bg-amber-700' 
                  : 'translate-x-0 bg-gray-800'
              }`}></div>
            </div>
            
            {/* Filtres par caractéristiques */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 px-2 sm:px-0">
              {FILTERS.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedFilter === filter.id
                      ? 'bg-white text-gray-900 shadow-lg scale-105'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/20'
                  }`}
                >
                  <span className="hidden xs:inline">{filter.icon}</span>
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              <p className="mt-4 text-white">Chargement des produits...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white mb-4 text-lg">
                {products.length === 0 
                  ? "Aucun produit chargé. Vérifiez que le backend est démarré."
                  : `Aucun produit trouvé pour le mode "${finishMode === 'indus' ? 'Industriel' : 'Nature & Bois'}".`
                }
              </p>
              {products.length === 0 && (
                <div className="mt-4 p-4 bg-yellow-900/50 border border-yellow-600 rounded-lg max-w-md mx-auto">
                  <p className="text-sm text-yellow-200 mb-2">
                    <strong>💡 Astuce:</strong> Assurez-vous que:
                  </p>
                  <ul className="text-sm text-yellow-300 text-left list-disc list-inside space-y-1">
                    <li>Le backend est démarré (npm run dev dans /backend)</li>
                    <li>La base de données est initialisée (npm run init-db)</li>
                    <li>L'API est accessible sur http://localhost:3001</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredProducts.slice(0, 12).map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={setSelectedProduct}
                  finishMode={finishMode}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tech Features */}
      <section id="concept" className="py-12 sm:py-16 md:py-20 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {FEATURES.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-gray-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:bg-green-50 transition-colors duration-300 text-center group border border-gray-100 hover:border-green-100"
              >
                <div className="bg-white w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-sm group-hover:scale-110 transition-transform text-green-600 group-hover:text-green-700">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Un projet unique ?</h2>
          <p className="text-gray-100 max-w-2xl mx-auto mb-10 text-lg">
            Nous réalisons du sur-mesure.
            <br/>Assemblages complexes, terrasses suspendues... 
            Défiez notre bureau d'étude.
          </p>
          <button 
            onClick={() => handleOpenContact()}
            className="bg-white text-gray-900 hover:bg-green-50 px-12 py-5 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-2xl"
          >
            Discuter avec un expert
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-500 py-16 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold flex items-center gap-2 text-white mb-6">
                <Box className="w-8 h-8 text-green-500" />
                <span>UNIHOME</span>
              </div>
              <p className="text-sm leading-relaxed">
                Le mariage de l'industrie et de la nature.
                Constructeur français de maisons containers et bâtiments préfabriqués haute performance.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Navigation</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#models" onClick={(e) => { e.preventDefault(); scrollToModels(); }} className="hover:text-green-400 transition-colors cursor-pointer">Nos Produits</a></li>
                <li><a href="#philosophie" onClick={(e) => { e.preventDefault(); document.getElementById('philosophie')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-green-400 transition-colors cursor-pointer">Notre Philosophie</a></li>
                <li><a href="#concept" onClick={(e) => { e.preventDefault(); document.getElementById('concept')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-green-400 transition-colors cursor-pointer">Technologie</a></li>
                <li><button onClick={() => handleOpenContact()} className="hover:text-green-400 transition-colors text-left">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Légal</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/mentions-legales" className="hover:text-green-400 transition-colors">Mentions légales</Link></li>
                <li><Link to="/politique-confidentialite" className="hover:text-green-400 transition-colors">Politique de confidentialité</Link></li>
                <li><Link to="/politique-cookies" className="hover:text-green-400 transition-colors">Politique de cookies</Link></li>
                <li><Link to="/cgv" className="hover:text-green-400 transition-colors">CGV</Link></li>
                <li><Link to="/cgu" className="hover:text-green-400 transition-colors">CGU</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-green-600"/> France
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-green-600"/> +33 1 23 45 67 89
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-green-600"/> contact@unihome.fr
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-xs pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center">
            <p>© 2024 UNIHOME. Tous droits réservés.</p>
            <p className="mt-2 md:mt-0 opacity-50">Inspiré par la nature, construit pour durer.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedProduct && (
        <Suspense fallback={<div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div></div>}>
      <ProductModal 
        product={selectedProduct} 
            isOpen={true} 
            finishMode={finishMode}
            onClose={() => {
              console.log('🔄 Fermeture du modal');
              setSelectedProduct(null);
            }} 
        onRequestQuote={(name) => handleOpenContact(name)}
      />
        </Suspense>
      )}
      
      {isContactOpen && (
        <Suspense fallback={<div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div></div>}>
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        prefilledModel={prefilledModel}
      />
        </Suspense>
      )}
    </div>
  );
}
