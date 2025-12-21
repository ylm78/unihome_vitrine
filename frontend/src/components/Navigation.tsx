import { Mail, Phone, MapPin, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserMenu } from './UserMenu';

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [cubeRotating, setCubeRotating] = useState(false);
  const location = useLocation();
  
  const handleCubeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCubeRotating(true);
    setTimeout(() => setCubeRotating(false), 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full transition-all duration-300 z-50 ${
      scrolled 
        ? 'bg-white shadow-md border-b border-gray-200' 
        : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            {/* Cube 3D */}
            <div 
              className="relative w-8 h-8 sm:w-10 sm:h-10 cursor-pointer" 
              style={{ perspective: '1000px' }}
              onClick={handleCubeClick}
            >
              <div 
                className={`relative w-full h-full cube-container ${cubeRotating ? 'rotate-cube' : ''}`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(20deg) rotateZ(-10deg)',
                }}
              >
                {/* Face avant */}
                <div 
                  className="absolute w-full h-full bg-green-600 border-2 border-green-700 rounded-sm"
                  style={{
                    transform: 'translateZ(10px)',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2), 0 0 5px rgba(34, 197, 94, 0.3)'
                  }}
                />
                {/* Face arrière */}
                <div 
                  className="absolute w-full h-full bg-green-700 border-2 border-green-800 rounded-sm"
                  style={{
                    transform: 'translateZ(-10px) rotateY(180deg)',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                  }}
                />
                {/* Face droite */}
                <div 
                  className="absolute w-full h-full bg-green-500 border-2 border-green-600 rounded-sm"
                  style={{
                    transform: 'rotateY(90deg) translateZ(10px)',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                  }}
                />
                {/* Face gauche */}
                <div 
                  className="absolute w-full h-full bg-green-600 border-2 border-green-700 rounded-sm"
                  style={{
                    transform: 'rotateY(-90deg) translateZ(10px)',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                  }}
                />
                {/* Face supérieure */}
                <div 
                  className="absolute w-full h-full bg-green-400 border-2 border-green-500 rounded-sm"
                  style={{
                    transform: 'rotateX(90deg) translateZ(10px)',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                  }}
                />
                {/* Face inférieure */}
                <div 
                  className="absolute w-full h-full bg-green-700 border-2 border-green-800 rounded-sm"
                  style={{
                    transform: 'rotateX(-90deg) translateZ(10px)',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                  }}
                />
              </div>
            </div>
            {/* Texte UNIHOME */}
            <span 
              className="text-xl sm:text-2xl font-bold group-hover:text-green-800 transition-colors"
              style={{ fontFamily: 'Merriweather, serif' }}
            >
              <span className="text-gray-800">UNI</span><span className="text-green-700">HOME</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-1 items-center">
            <Link 
              to="/" 
              className={`px-4 py-2 transition-colors font-medium text-sm ${
                location.pathname === '/' ? 'text-green-700' : 'text-gray-700 hover:text-green-700'
              }`}
            >
              Accueil
            </Link>
            
            {/* Entreprise Dropdown */}
            <div className="relative group">
              <button 
                className={`px-4 py-2 transition-colors font-medium text-sm flex items-center gap-1 ${
                  location.pathname.startsWith('/entreprise') ? 'text-green-700' : 'text-gray-700 hover:text-green-700'
                }`}
                onMouseEnter={() => setDropdownOpen('kurumsal')}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                Entreprise
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen === 'kurumsal' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md border border-gray-200 py-2"
                  onMouseEnter={() => setDropdownOpen('kurumsal')}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <Link to="/entreprise/mission" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Notre Mission et Vision</Link>
                  <Link to="/entreprise/actualites" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Actualités</Link>
                  <Link to="/entreprise/rgpd" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Politique RGPD</Link>
                  <Link to="/entreprise/certifications" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Certifications</Link>
                  <Link to="/entreprise/catalogue" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">E-Catalogue</Link>
                </div>
              )}
            </div>

            {/* Bâtiment Préfabriqué Dropdown */}
            <div className="relative group">
              <button 
                className={`px-4 py-2 transition-colors font-medium text-sm flex items-center gap-1 ${
                  location.pathname.startsWith('/batiment-prefabrique') ? 'text-green-700' : 'text-gray-700 hover:text-green-700'
                }`}
                onMouseEnter={() => setDropdownOpen('prefabrik')}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                Bâtiment Préfabriqué
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen === 'prefabrik' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-72 bg-white shadow-lg rounded-md border border-gray-200 py-2"
                  onMouseEnter={() => setDropdownOpen('prefabrik')}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <Link to="/batiment-prefabrique/chantier" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Bâtiments de Chantier Préfabriqués</Link>
                  <Link to="/batiment-prefabrique/bureau" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Bureaux Préfabriqués</Link>
                  <Link to="/batiment-prefabrique/acier" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Structures en Acier</Link>
                  <Link to="/batiment-prefabrique/social" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Bâtiments d'Installations Sociales</Link>
                  <Link to="/batiment-prefabrique/ecole" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Écoles et Bâtiments Éducatifs</Link>
                  <Link to="/batiment-prefabrique/hopital" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Hôpitaux Préfabriqués</Link>
                  <Link to="/batiment-prefabrique/hotel" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Hôtels Préfabriqués en Acier Léger</Link>
                  <Link to="/batiment-prefabrique/sanitaires" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Blocs Sanitaires Préfabriqués</Link>
                  <Link to="/batiment-prefabrique/dortoir" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Bâtiments de Dortoirs Préfabriqués</Link>
                  <Link to="/batiment-prefabrique/refectoire" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Réfectoires Préfabriqués</Link>
                </div>
              )}
            </div>

            {/* Container Dropdown */}
            <div className="relative group">
              <Link
                to="/container/maison-container"
                className={`px-4 py-2 transition-colors font-medium text-sm flex items-center gap-1 ${
                  location.pathname.startsWith('/container') ? 'text-green-700' : 'text-gray-700 hover:text-green-700'
                }`}
                onMouseEnter={() => setDropdownOpen('konteyner')}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                Container
                <ChevronDown className="w-4 h-4" />
              </Link>
              {dropdownOpen === 'konteyner' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-72 bg-white shadow-lg rounded-md border border-gray-200 py-2"
                  onMouseEnter={() => setDropdownOpen('konteyner')}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <Link to="/container/panneau-sandwich" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Container Panneau Sandwich</Link>
                  <Link to="/container/bureau-chantier" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Containers Bureau & Chantier</Link>
                  <Link to="/container/maison-container" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700 font-semibold text-green-700">Maisons Container</Link>
                  <Link to="/container/metropole" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Containers Métropole de Luxe</Link>
                  <Link to="/container/sanitaires-douches" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Containers Sanitaires & Douches</Link>
                  <Link to="/container/demontable" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Containers Démontables</Link>
                  <Link to="/container/sur-mesure" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Container Sur Mesure</Link>
                  <Link to="/container/dortoir" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Containers Dortoir</Link>
                  <Link to="/container/refectoire" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Containers Réfectoire</Link>
                  <Link to="/container/urgence-sismique" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Containers d'Urgence Sismique</Link>
                  <Link to="/container/plans" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Modèles et Plans de Containers</Link>
                </div>
              )}
            </div>

            {/* Maison Acier Dropdown */}
            <div className="relative group">
              <button 
                className={`px-4 py-2 transition-colors font-medium text-sm flex items-center gap-1 ${
                  location.pathname.startsWith('/maison-acier') ? 'text-green-700' : 'text-gray-700 hover:text-green-700'
                }`}
                onMouseEnter={() => setDropdownOpen('celik')}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                Maison Acier
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen === 'celik' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md border border-gray-200 py-2"
                  onMouseEnter={() => setDropdownOpen('celik')}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <Link to="/maison-acier/imperiale" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Série Impériale (Bientôt...)</Link>
                  <Link to="/maison-acier/plain-pied" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Maisons Acier Plain-Pied</Link>
                  <Link to="/maison-acier/etage" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Maisons Acier à Étage</Link>
                  <Link to="/maison-acier/technique" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Caractéristiques Techniques Maison Acier</Link>
                </div>
              )}
            </div>

            {/* Maisons Préfabriquées Dropdown */}
            <div className="relative group">
              <button 
                className={`px-4 py-2 transition-colors font-medium text-sm flex items-center gap-1 ${
                  location.pathname.startsWith('/maisons-prefabriquees') ? 'text-green-700' : 'text-gray-700 hover:text-green-700'
                }`}
                onMouseEnter={() => setDropdownOpen('prefabrik-ev')}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                Maisons Préfabriquées
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen === 'prefabrik-ev' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md border border-gray-200 py-2"
                  onMouseEnter={() => setDropdownOpen('prefabrik-ev')}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <Link to="/maisons-prefabriquees/plain-pied" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Maisons Préfabriquées Plain-Pied</Link>
                  <Link to="/maisons-prefabriquees/etage" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Maisons Préfabriquées à Étage</Link>
                  <Link to="/maisons-prefabriquees/villa" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Villas Préfabriquées</Link>
                  <Link to="/maisons-prefabriquees/economique" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Logements Collectifs Économiques</Link>
                  <Link to="/maisons-prefabriquees/urgence-sismique" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Logements d'Urgence Sismique</Link>
                  <Link to="/maisons-prefabriquees/technique" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Caractéristiques Techniques Maison Préfabriquée</Link>
                </div>
              )}
            </div>

            {/* Cabine Dropdown */}
            <div className="relative group">
              <button 
                className={`px-4 py-2 transition-colors font-medium text-sm flex items-center gap-1 ${
                  location.pathname.startsWith('/cabine') ? 'text-green-700' : 'text-gray-700 hover:text-green-700'
                }`}
                onMouseEnter={() => setDropdownOpen('kabin')}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                Cabine
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen === 'kabin' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-72 bg-white shadow-lg rounded-md border border-gray-200 py-2"
                  onMouseEnter={() => setDropdownOpen('kabin')}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <Link to="/cabine/metropole" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Cabinets Métropole Esthétiques</Link>
                  <Link to="/cabine/polyester" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Cabinets Polyester</Link>
                  <Link to="/cabine/large" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Cabinets Larges</Link>
                  <Link to="/cabine/mobile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Cabinets Sanitaires Mobiles</Link>
                  <Link to="/cabine/panneaux" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Cabinets Panneaux</Link>
                  <Link to="/cabine/securite" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Guérites de Sécurité Blindées</Link>
                  <Link to="/cabine/prefabriquee" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Cabinets Préfabriqués Esthétiques</Link>
                  <Link to="/cabine/technique" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700">Caractéristiques Techniques Cabinet</Link>
                </div>
              )}
            </div>

            <Link 
              to="/projets" 
              className={`px-4 py-2 transition-colors font-medium text-sm ${
                location.pathname === '/projets' ? 'text-green-700' : 'text-gray-700 hover:text-green-700'
              }`}
            >
              Projets
            </Link>
            <Link 
              to="/galeries" 
              className={`px-4 py-2 transition-colors font-medium text-sm ${
                location.pathname === '/galeries' ? 'text-green-700' : 'text-gray-700 hover:text-green-700'
              }`}
            >
              Galeries
            </Link>
            <Link 
              to="/contact" 
              className="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800 transition-colors font-semibold text-sm"
            >
              Contact
            </Link>
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 animate-slideDown shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-700 py-2 px-2 transition-colors font-medium text-sm sm:text-base">Accueil</Link>
            <Link to="/container/maison-container" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-700 py-2 px-2 transition-colors font-medium text-sm sm:text-base">Maison Container</Link>
            <Link to="/projets" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-700 py-2 px-2 transition-colors font-medium text-sm sm:text-base">Projets</Link>
            <Link to="/galeries" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-700 py-2 px-2 transition-colors font-medium text-sm sm:text-base">Galeries</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="block bg-green-700 text-white rounded-md px-4 py-2 hover:bg-green-800 transition-colors font-semibold text-center text-sm sm:text-base mt-2">Contact</Link>
            <div className="border-t border-gray-200 my-2"></div>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-gray-700 hover:text-green-700 py-2 px-2 transition-colors font-medium text-center text-sm sm:text-base">Connexion</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="block bg-green-700 text-white rounded-md px-4 py-2 hover:bg-green-800 transition-colors font-semibold text-center text-sm sm:text-base">Inscription</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

