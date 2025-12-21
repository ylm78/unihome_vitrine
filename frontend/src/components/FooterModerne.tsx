import { Link } from 'react-router-dom';
import { Box, MapPin, Phone, Mail } from 'lucide-react';

export function FooterModerne() {
  return (
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
              <li><Link to="/" className="hover:text-green-400 transition-colors">Accueil</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
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
  );
}

