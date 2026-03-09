import { Link } from 'react-router-dom';
import { Box, X, Menu } from 'lucide-react';
import { UserMenu } from './UserMenu';

interface NavHomepageStyleProps {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  onMenuToggle: () => void;
  onContactClick: () => void;
}

export function NavHomepageStyle({
  scrolled,
  mobileMenuOpen,
  onMenuToggle,
  onContactClick
}: NavHomepageStyleProps) {
  const linkClass = `hover:text-green-500 font-medium transition-colors whitespace-nowrap text-sm xl:text-base ${
    scrolled ? 'text-gray-600' : 'text-gray-100'
  }`;
  const linkClassTablet = `hover:text-green-500 font-medium transition-colors text-sm ${
    scrolled ? 'text-gray-600' : 'text-gray-100'
  }`;

  return (
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
          <Link to="/#models" className={linkClass}>Nos Produits</Link>
          <Link to="/installations-chantier" className={`${linkClass} text-green-500`}>Installations Chantier</Link>
          <a href="/#philosophie" className={linkClass}>Notre Philosophie</a>
          <a href="/#concept" className={linkClass}>Technologie</a>
          <button 
            onClick={onContactClick}
            className="bg-green-700 hover:bg-green-800 text-white px-4 xl:px-6 py-2 rounded-full text-xs xl:text-sm font-medium transition-colors shadow-lg shadow-green-500/30 whitespace-nowrap flex-shrink-0"
          >
            Obtenir un devis
          </button>
          <UserMenu />
        </div>
        
        {/* Tablet Menu */}
        <div className="hidden md:flex lg:hidden items-center gap-3 flex-shrink-0">
          <Link to="/#models" className={linkClassTablet}>Produits</Link>
          <Link to="/installations-chantier" className={`${linkClassTablet} text-green-500`}>Chantier</Link>
          <button 
            onClick={onContactClick}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full text-xs font-medium transition-colors shadow-lg shadow-green-500/30 whitespace-nowrap"
          >
            Devis
          </button>
          <UserMenu />
        </div>
        
        {/* Mobile Toggle */}
        <button 
          className="md:hidden lg:hidden text-green-500 flex-shrink-0" 
          onClick={onMenuToggle}
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
            <Link to="/#models" onClick={onMenuToggle} className="text-gray-700 font-medium">Nos Produits</Link>
            <Link to="/installations-chantier" onClick={onMenuToggle} className="text-green-600 font-medium">Installations Chantier</Link>
            <a href="/#philosophie" onClick={onMenuToggle} className="text-gray-700 font-medium">Notre Philosophie</a>
            <a href="/#concept" onClick={onMenuToggle} className="text-gray-700 font-medium">Technologie</a>
            <button 
              onClick={() => { onContactClick(); onMenuToggle(); }}
              className="bg-green-700 text-white px-4 py-3 rounded-lg text-center font-medium"
            >
              Devis Gratuit
            </button>
            <div className="border-t border-gray-200 pt-4 mt-2">
              <Link to="/login" onClick={onMenuToggle} className="block text-center text-gray-700 font-medium py-2">Connexion</Link>
              <Link to="/register" onClick={onMenuToggle} className="block bg-green-700 text-white px-4 py-3 rounded-lg text-center font-medium mt-2">Inscription</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
