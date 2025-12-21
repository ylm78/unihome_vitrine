import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Bâtiment Préfabriqué */}
          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">Bâtiment Préfabriqué</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/batiment-prefabrique/chantier" className="hover:text-green-500 transition-colors">Bâtiments de Chantier Préfabriqués</Link></li>
              <li><Link to="/batiment-prefabrique/acier" className="hover:text-green-500 transition-colors">Structures en Acier</Link></li>
              <li><Link to="/batiment-prefabrique/bureau" className="hover:text-green-500 transition-colors">Bureaux et Locaux Professionnels Préfabriqués</Link></li>
              <li><Link to="/batiment-prefabrique/hopital" className="hover:text-green-500 transition-colors">Hôpitaux de Camp Préfabriqués</Link></li>
              <li><Link to="/batiment-prefabrique/hotel" className="hover:text-green-500 transition-colors">Hôtels Préfabriqués en Acier Léger</Link></li>
              <li><Link to="/batiment-prefabrique/ecole" className="hover:text-green-500 transition-colors">Écoles et Bâtiments Éducatifs Préfabriqués</Link></li>
              <li><Link to="/batiment-prefabrique/refectoire" className="hover:text-green-500 transition-colors">Réfectoires Préfabriqués</Link></li>
              <li><Link to="/batiment-prefabrique/dortoir" className="hover:text-green-500 transition-colors">Bâtiments de Dortoirs Préfabriqués</Link></li>
              <li><Link to="/batiment-prefabrique/social" className="hover:text-green-500 transition-colors">Bâtiments d'Installations Sociales</Link></li>
              <li><Link to="/batiment-prefabrique/sanitaires" className="hover:text-green-500 transition-colors">Blocs Sanitaires Préfabriqués</Link></li>
            </ul>
          </div>

          {/* Maison Préfabriquée */}
          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">Maison Préfabriquée</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/maison-acier/plain-pied" className="hover:text-green-500 transition-colors">Maison Acier Plain-Pied</Link></li>
              <li><Link to="/maison-acier/etage" className="hover:text-green-500 transition-colors">Maison Acier à Étage</Link></li>
              <li><Link to="/maisons-prefabriquees/villa" className="hover:text-green-500 transition-colors">Villa Préfabriquée</Link></li>
              <li><Link to="/maisons-prefabriquees/etage" className="hover:text-green-500 transition-colors">Maison Préfabriquée Duplex</Link></li>
              <li><Link to="/maisons-prefabriquees/economique" className="hover:text-green-500 transition-colors">Logements Collectifs Économiques</Link></li>
              <li><Link to="/maisons-prefabriquees/urgence-sismique" className="hover:text-green-500 transition-colors">Logements d'Urgence Sismique Préfabriqués</Link></li>
              <li><Link to="/maisons-prefabriquees/technique" className="hover:text-green-500 transition-colors">Caractéristiques Techniques Maison Préfabriquée</Link></li>
            </ul>
          </div>

          {/* Container */}
          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">Container</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/container/panneau-sandwich" className="hover:text-green-500 transition-colors">Container Panneau Sandwich</Link></li>
              <li><Link to="/container/bureau-chantier" className="hover:text-green-500 transition-colors">Containers Bureau & Chantier</Link></li>
              <li><Link to="/container/metropole" className="hover:text-green-500 transition-colors">Container Métropole</Link></li>
              <li><Link to="/container/sanitaires-douches" className="hover:text-green-500 transition-colors">Container Sanitaires & Douches</Link></li>
              <li><Link to="/container/maison-container" className="hover:text-green-500 transition-colors">Maison Container</Link></li>
              <li><Link to="/container/sur-mesure" className="hover:text-green-500 transition-colors">Container Sur Mesure</Link></li>
              <li><Link to="/container/refectoire" className="hover:text-green-500 transition-colors">Container Réfectoire</Link></li>
              <li><Link to="/container/dortoir" className="hover:text-green-500 transition-colors">Container Dortoir</Link></li>
              <li><Link to="/container/demontable" className="hover:text-green-500 transition-colors">Container Démontable</Link></li>
              <li><Link to="/container/urgence-sismique" className="hover:text-green-500 transition-colors">Container d'Urgence Sismique</Link></li>
            </ul>
          </div>

          {/* Cabine Modulaire */}
          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">Cabine Modulaire</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/cabine/panneaux" className="hover:text-green-500 transition-colors">Cabine Panneaux</Link></li>
              <li><Link to="/cabine/polyester" className="hover:text-green-500 transition-colors">Cabine Polyester</Link></li>
              <li><Link to="/cabine/large" className="hover:text-green-500 transition-colors">Cabinets Larges</Link></li>
              <li><Link to="/cabine/metropole" className="hover:text-green-500 transition-colors">Container Métropole</Link></li>
              <li><Link to="/cabine/mobile" className="hover:text-green-500 transition-colors">Cabine Sanitaire Mobile</Link></li>
              <li><Link to="/cabine/prefabriquee" className="hover:text-green-500 transition-colors">Cabine Préfabriquée</Link></li>
              <li><Link to="/cabine/securite" className="hover:text-green-500 transition-colors">Guérite de Sécurité Blindée</Link></li>
              <li><Link to="/cabine/panneaux" className="hover:text-green-500 transition-colors">Plans de Cabine Panneaux</Link></li>
              <li><Link to="/cabine/technique" className="hover:text-green-500 transition-colors">Caractéristiques Techniques Cabine Panneaux</Link></li>
              <li><Link to="/cabine/technique" className="hover:text-green-500 transition-colors">Caractéristiques Techniques Cabinet</Link></li>
              <li><Link to="/cabine/technique" className="hover:text-green-500 transition-colors">Caractéristiques Techniques Cabinet Métropole</Link></li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Blog */}
          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">Blog</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-green-500 transition-colors">Comment Calculer le Coût de Construction ?</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Maisons Préfabriquées à 10 000 €</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Est-il Judicieux d'Acheter une Maison Préfabriquée d'Occasion ?</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Un Permis est-il Nécessaire pour une Maison Container ?</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">De Quels Matériaux est Faite une Maison Préfabriquée ?</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Quels sont les Éléments d'une Structure Préfabriquée ?</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Quelle est la Durée de Vie des Maisons Préfabriquées ?</a></li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base">Entreprise</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/entreprise/mission" className="hover:text-green-500 transition-colors">Notre Mission et Vision</Link></li>
              <li><Link to="/entreprise/certifications" className="hover:text-green-500 transition-colors">Certifications</Link></li>
              <li><Link to="/entreprise/rgpd" className="hover:text-green-500 transition-colors">Politique RGPD</Link></li>
              <li><Link to="/entreprise/actualites" className="hover:text-green-500 transition-colors">Actualités</Link></li>
              <li><Link to="/entreprise/catalogue" className="hover:text-green-500 transition-colors">E-Catalogue</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center border-t border-gray-800 pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm text-gray-500 mb-2 px-4">1986 - 2025 © Tous droits réservés. UNIHOME Technologies de Construction Préfabriquée.</p>
          <p className="text-xs sm:text-sm text-gray-600 px-4">Toutes les images et textes présents sur notre site sont la propriété de notre entreprise et leur utilisation sans autorisation écrite est strictement interdite.</p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mt-4 sm:mt-6 px-4">
            <Link to="/entreprise/mission" className="text-gray-400 hover:text-green-500 transition-colors text-xs sm:text-sm">À Propos</Link>
            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-xs sm:text-sm">Mentions Légales</a>
            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-xs sm:text-sm">Politique de Confidentialité</a>
            <Link to="/contact" className="text-gray-400 hover:text-green-500 transition-colors text-xs sm:text-sm">FAQ</Link>
            <a href="#" className="text-gray-400 hover:text-green-500 transition-colors text-xs sm:text-sm">Blog</a>
            <Link to="/contact" className="text-gray-400 hover:text-green-500 transition-colors text-xs sm:text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

