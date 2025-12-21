import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Menu, X } from 'lucide-react';
import { UserMenu } from './UserMenu';

export function NavigationModerne() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenContact = () => {
    navigate('/contact');
  };

  const scrollToSection = (id: string) => {
    if (window.location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg py-2 sm:py-3' : 'bg-gray-900/95 backdrop-blur-sm py-3 sm:py-4 md:py-5'
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
          <a 
            href="/#models" 
            onClick={(e) => { e.preventDefault(); scrollToSection('models'); }}
            className={`hover:text-green-500 font-medium transition-colors whitespace-nowrap text-sm xl:text-base ${
              scrolled ? 'text-gray-600' : 'text-gray-100'
            }`}
          >
            Nos Produits
          </a>
          <a 
            href="/#philosophie" 
            onClick={(e) => { e.preventDefault(); scrollToSection('philosophie'); }}
            className={`hover:text-green-500 font-medium transition-colors whitespace-nowrap text-sm xl:text-base ${
              scrolled ? 'text-gray-600' : 'text-gray-100'
            }`}
          >
            Notre Philosophie
          </a>
          <a 
            href="/#concept" 
            onClick={(e) => { e.preventDefault(); scrollToSection('concept'); }}
            className={`hover:text-green-500 font-medium transition-colors whitespace-nowrap text-sm xl:text-base ${
              scrolled ? 'text-gray-600' : 'text-gray-100'
            }`}
          >
            Technologie
          </a>
          <button 
            onClick={() => { handleOpenContact(); setMobileMenuOpen(false); }}
            className="bg-green-700 hover:bg-green-800 text-white px-4 xl:px-6 py-2 rounded-full text-xs xl:text-sm font-medium transition-colors shadow-lg shadow-green-500/30 whitespace-nowrap flex-shrink-0"
          >
            Obtenir un devis
          </button>
          <UserMenu />
        </div>
        
        {/* Tablet Menu - Version compacte */}
        <div className="hidden md:flex lg:hidden items-center gap-3 flex-shrink-0">
          <a 
            href="/#models" 
            onClick={(e) => { e.preventDefault(); scrollToSection('models'); }}
            className={`hover:text-green-500 font-medium transition-colors text-sm ${
              scrolled ? 'text-gray-600' : 'text-gray-100'
            }`}
          >
            Produits
          </a>
          <button 
            onClick={() => { handleOpenContact(); setMobileMenuOpen(false); }}
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
        <div className={`md:hidden lg:hidden absolute top-full left-0 w-full ${
          scrolled ? 'bg-white' : 'bg-gray-900'
        } border-t ${scrolled ? 'border-gray-200' : 'border-gray-700'} shadow-lg animate-slideDown`}>
          <div className="container mx-auto px-4 py-4 space-y-3">
            <a 
              href="/#models" 
              onClick={(e) => { e.preventDefault(); scrollToSection('models'); }}
              className={`block py-2 font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-green-700' : 'text-gray-100 hover:text-green-500'
              }`}
            >
              Nos Produits
            </a>
            <a 
              href="/#philosophie" 
              onClick={(e) => { e.preventDefault(); scrollToSection('philosophie'); }}
              className={`block py-2 font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-green-700' : 'text-gray-100 hover:text-green-500'
              }`}
            >
              Notre Philosophie
            </a>
            <a 
              href="/#concept" 
              onClick={(e) => { e.preventDefault(); scrollToSection('concept'); }}
              className={`block py-2 font-medium transition-colors ${
                scrolled ? 'text-gray-700 hover:text-green-700' : 'text-gray-100 hover:text-green-500'
              }`}
            >
              Technologie
            </a>
            <button 
              onClick={() => { handleOpenContact(); setMobileMenuOpen(false); }}
              className="w-full bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-green-500/30 mt-2"
            >
              Obtenir un devis
            </button>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <UserMenu />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

