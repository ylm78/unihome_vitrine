import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Info, CheckCircle } from 'lucide-react';

// Configuration des produits par route
const productConfig: Record<string, { title: string; description: string; features: string[]; image?: string }> = {
  // Bâtiment Préfabriqué
  '/batiment-prefabrique/chantier': {
    title: 'Bâtiments de Chantier Préfabriqués',
    description: 'Güven, hızlı kurulum, en iyi ergonomi. Des bâtiments de chantier préfabriqués offrant sécurité, installation rapide et ergonomie optimale.',
    features: [
      'Installation rapide et efficace',
      'Sécurité renforcée',
      'Ergonomie optimale',
      'Résistance aux intempéries',
      'Modularité et flexibilité'
    ]
  },
  '/batiment-prefabrique/bureau': {
    title: 'Bureaux Préfabriqués',
    description: 'Çalışma alanlarına verimlilik katan teknoloji. Des bureaux préfabriqués qui apportent productivité et efficacité aux espaces de travail.',
    features: [
      'Espaces de travail optimisés',
      'Technologie moderne',
      'Isolation thermique et phonique',
      'Installation rapide',
      'Personnalisation possible'
    ]
  },
  '/batiment-prefabrique/acier': {
    title: 'Structures en Acier',
    description: 'Yüksek güvenlik yüksek konfor. Des structures en acier offrant sécurité maximale et confort optimal.',
    features: [
      'Haute sécurité',
      'Confort optimal',
      'Durabilité exceptionnelle',
      'Résistance sismique',
      'Design moderne'
    ]
  },
  '/batiment-prefabrique/social': {
    title: 'Bâtiments d\'Installations Sociales',
    description: 'Yenilik, hız, güven, huzur. Des bâtiments pour installations sociales alliant innovation, rapidité, sécurité et sérénité.',
    features: [
      'Innovation architecturale',
      'Installation rapide',
      'Sécurité garantie',
      'Environnement serein',
      'Adaptabilité aux besoins'
    ]
  },
  '/batiment-prefabrique/ecole': {
    title: 'Écoles et Bâtiments Éducatifs',
    description: 'Eğitimde en hızlı ve güvenli yapılar. Les structures les plus rapides et sécurisées pour l\'éducation.',
    features: [
      'Construction rapide',
      'Sécurité maximale',
      'Espaces adaptés à l\'éducation',
      'Confort pour les élèves',
      'Normes de sécurité respectées'
    ]
  },
  '/batiment-prefabrique/hopital': {
    title: 'Hôpitaux Préfabriqués',
    description: 'En hızlı ve yerinde sağlık hizmeti. Des hôpitaux préfabriqués pour des services de santé rapides et sur site.',
    features: [
      'Installation ultra-rapide',
      'Services de santé sur site',
      'Normes sanitaires respectées',
      'Équipements médicaux intégrables',
      'Flexibilité d\'aménagement'
    ]
  },
  '/batiment-prefabrique/hotel': {
    title: 'Hôtels Préfabriqués en Acier Léger',
    description: 'Yeni nesil modern konaklama yapıları. Des structures d\'hébergement modernes de nouvelle génération.',
    features: [
      'Architecture moderne',
      'Confort hôtelier',
      'Installation rapide',
      'Design contemporain',
      'Équipements haut de gamme'
    ]
  },
  '/batiment-prefabrique/sanitaires': {
    title: 'Blocs Sanitaires Préfabriqués',
    description: 'İhtiyaçlara en estetik ve pratik çözüm. La solution la plus esthétique et pratique pour vos besoins sanitaires.',
    features: [
      'Design esthétique',
      'Solution pratique',
      'Installation facile',
      'Hygiène optimale',
      'Durabilité'
    ]
  },
  '/batiment-prefabrique/dortoir': {
    title: 'Bâtiments de Dortoirs Préfabriqués',
    description: 'Konaklamada ev konforu. Le confort d\'une maison dans l\'hébergement.',
    features: [
      'Confort résidentiel',
      'Espaces de vie agréables',
      'Isolation optimale',
      'Installation rapide',
      'Ambiance chaleureuse'
    ]
  },
  '/batiment-prefabrique/refectoire': {
    title: 'Réfectoires Préfabriqués',
    description: 'Yemek anı konfora dönüşüyor. Le moment du repas devient un moment de confort.',
    features: [
      'Espaces de restauration confortables',
      'Installation rapide',
      'Capacité d\'accueil importante',
      'Design fonctionnel',
      'Hygiène optimale'
    ]
  },
  // Maison Acier
  '/maison-acier/imperiale': {
    title: 'Série Impériale',
    description: '6 Ocak için hazırlanıyor. Une série exceptionnelle en préparation.',
    features: [
      'Design exclusif',
      'Finition premium',
      'Espace généreux',
      'Technologies avancées',
      'Bientôt disponible'
    ]
  },
  '/maison-acier/plain-pied': {
    title: 'Maisons Acier Plain-Pied',
    description: 'Güven, mutluluk, huzur bu evde. Sécurité, bonheur et sérénité dans cette maison.',
    features: [
      'Sécurité maximale',
      'Confort optimal',
      'Accessibilité',
      'Design moderne',
      'Durabilité'
    ]
  },
  '/maison-acier/etage': {
    title: 'Maisons Acier à Étage',
    description: 'Evin en güvenlisi en konforlusu. La maison la plus sûre et la plus confortable.',
    features: [
      'Sécurité renforcée',
      'Confort exceptionnel',
      'Espace optimisé',
      'Architecture moderne',
      'Résistance sismique'
    ]
  },
  '/maison-acier/technique': {
    title: 'Caractéristiques Techniques Maison Acier',
    description: 'En güvenlisi en iyisi. Les meilleures caractéristiques techniques pour votre sécurité.',
    features: [
      'Structure en acier renforcé',
      'Isolation thermique optimale',
      'Résistance aux intempéries',
      'Normes de sécurité respectées',
      'Garantie de qualité'
    ]
  },
  // Maisons Préfabriquées
  '/maisons-prefabriquees/plain-pied': {
    title: 'Maisons Préfabriquées Plain-Pied',
    description: 'Ev sahibi olmanın en kolay yolu. Le moyen le plus simple de devenir propriétaire.',
    features: [
      'Accessibilité financière',
      'Installation rapide',
      'Confort optimal',
      'Design moderne',
      'Personnalisation possible'
    ]
  },
  '/maisons-prefabriquees/etage': {
    title: 'Maisons Préfabriquées à Étage',
    description: 'Modern mimarinin yeni trend evleri. Les nouvelles maisons tendance de l\'architecture moderne.',
    features: [
      'Architecture moderne',
      'Espace optimisé',
      'Design contemporain',
      'Confort exceptionnel',
      'Économie d\'énergie'
    ]
  },
  '/maisons-prefabriquees/villa': {
    title: 'Villas Préfabriquées',
    description: 'Farklı olmanın ayrıcalıkları. Les privilèges d\'être différent.',
    features: [
      'Design exclusif',
      'Espace généreux',
      'Finition premium',
      'Luxe et confort',
      'Personnalisation totale'
    ]
  },
  '/maisons-prefabriquees/economique': {
    title: 'Logements Collectifs Économiques',
    description: 'Konut açığının giderilmesinin en hızlı yolu. Le moyen le plus rapide de résoudre le déficit de logement.',
    features: [
      'Solution économique',
      'Construction rapide',
      'Grande capacité',
      'Qualité garantie',
      'Accessibilité'
    ]
  },
  '/maisons-prefabriquees/urgence-sismique': {
    title: 'Logements d\'Urgence Sismique',
    description: 'Zor zamanda insanlığın yanında. Aux côtés de l\'humanité dans les moments difficiles.',
    features: [
      'Installation ultra-rapide',
      'Sécurité sismique',
      'Confort d\'urgence',
      'Résistance aux intempéries',
      'Solution temporaire durable'
    ]
  },
  '/maisons-prefabriquees/technique': {
    title: 'Caractéristiques Techniques Maison Préfabriquée',
    description: 'En güvenlisi en iyisi. Les meilleures caractéristiques techniques.',
    features: [
      'Isolation thermique et phonique',
      'Structure renforcée',
      'Résistance aux intempéries',
      'Normes de construction respectées',
      'Garantie de qualité'
    ]
  },
  // Cabine
  '/cabine/metropole': {
    title: 'Cabinets Métropole Esthétiques',
    description: 'Des cabinets esthétiques pour environnements urbains.',
    features: [
      'Design moderne',
      'Esthétique urbaine',
      'Fonctionnalité optimale',
      'Installation facile',
      'Durabilité'
    ]
  },
  '/cabine/polyester': {
    title: 'Cabinets Polyester',
    description: 'Des cabinets en polyester résistants et durables.',
    features: [
      'Résistance aux intempéries',
      'Léger et robuste',
      'Entretien facile',
      'Longue durée de vie',
      'Design moderne'
    ]
  },
  '/cabine/large': {
    title: 'Cabinets Larges',
    description: 'Des cabinets spacieux pour tous vos besoins.',
    features: [
      'Espace généreux',
      'Confort optimal',
      'Installation rapide',
      'Polyvalence',
      'Qualité garantie'
    ]
  },
  '/cabine/mobile': {
    title: 'Cabinets Sanitaires Mobiles',
    description: 'Des solutions sanitaires mobiles pratiques et efficaces.',
    features: [
      'Mobilité totale',
      'Installation instantanée',
      'Hygiène optimale',
      'Facilité d\'entretien',
      'Solution pratique'
    ]
  },
  '/cabine/panneaux': {
    title: 'Cabinets Panneaux',
    description: 'Des cabinets en panneaux modulaires.',
    features: [
      'Modularité',
      'Installation rapide',
      'Personnalisation',
      'Résistance',
      'Design fonctionnel'
    ]
  },
  '/cabine/securite': {
    title: 'Guérites de Sécurité Blindées',
    description: 'Des guérites de sécurité blindées pour une protection maximale.',
    features: [
      'Sécurité renforcée',
      'Blindage efficace',
      'Résistance aux agressions',
      'Confort du personnel',
      'Visibilité optimale'
    ]
  },
  '/cabine/prefabriquee': {
    title: 'Cabinets Préfabriqués Esthétiques',
    description: 'Des cabinets préfabriqués alliant esthétique et fonctionnalité.',
    features: [
      'Design esthétique',
      'Installation rapide',
      'Qualité premium',
      'Durabilité',
      'Personnalisation'
    ]
  },
  '/cabine/technique': {
    title: 'Caractéristiques Techniques Cabinet',
    description: 'Les caractéristiques techniques de nos cabinets.',
    features: [
      'Normes de qualité respectées',
      'Isolation optimale',
      'Résistance aux intempéries',
      'Garantie de durabilité',
      'Certifications'
    ]
  },
  // Entreprise
  '/entreprise/mission': {
    title: 'Notre Mission et Vision',
    description: 'Découvrez notre mission et notre vision pour l\'avenir.',
    features: [
      'Innovation constante',
      'Qualité supérieure',
      'Service client exceptionnel',
      'Durabilité',
      'Excellence'
    ]
  },
  '/entreprise/actualites': {
    title: 'Actualités',
    description: 'Restez informé de nos dernières actualités et nouveautés.',
    features: [
      'Nouvelles technologies',
      'Projets réalisés',
      'Événements',
      'Innovations',
      'Témoignages clients'
    ]
  },
  '/entreprise/rgpd': {
    title: 'Politique RGPD',
    description: 'Notre engagement en matière de protection des données personnelles.',
    features: [
      'Conformité RGPD',
      'Protection des données',
      'Transparence',
      'Sécurité',
      'Respect de la vie privée'
    ]
  },
  '/entreprise/certifications': {
    title: 'Certifications',
    description: 'Nos certifications et normes de qualité.',
    features: [
      'Certifications internationales',
      'Normes de qualité',
      'Contrôles réguliers',
      'Garanties',
      'Excellence reconnue'
    ]
  },
  '/entreprise/catalogue': {
    title: 'E-Catalogue',
    description: 'Téléchargez notre catalogue électronique complet.',
    features: [
      'Catalogue complet',
      'Téléchargement gratuit',
      'Informations détaillées',
      'Spécifications techniques',
      'Prix et tarifs'
    ]
  },
};

export function PageProduit() {
  const location = useLocation();
  const config = productConfig[location.pathname] || {
    title: 'Produit',
    description: 'Découvrez nos produits et services.',
    features: []
  };

  return (
    <div>
      <section className="pt-24 pb-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Merriweather, serif' }}>
              {config.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {config.description}
            </p>

            {config.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Caractéristiques</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {config.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Link
                to="/contact"
                className="bg-green-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-800 transition-colors inline-flex items-center gap-2"
              >
                <Info className="w-5 h-5" />
                Demander un Devis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

