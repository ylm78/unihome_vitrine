import { initDatabase, dbRun, dbGet } from '../database/db.js';
import db from '../database/db.js';

const categories = [
  { name: 'Bâtiment Préfabriqué', slug: 'batiment-prefabrique', description: 'Solutions de construction préfabriquées', icon: 'building' },
  { name: 'Container', slug: 'container', description: 'Containers innovants pour tous vos besoins', icon: 'container' },
  { name: 'Maison Acier', slug: 'maison-acier', description: 'Maisons en acier robustes et esthétiques', icon: 'home' },
  { name: 'Maisons Préfabriquées', slug: 'maisons-prefabriquees', description: 'Maisons préfabriquées pour une vie unique', icon: 'home' },
  { name: 'Cabine Modulaire', slug: 'cabine', description: 'Cabines modulaires pour une expérience de confort parfaite', icon: 'box' },
  { name: 'Entreprise', slug: 'entreprise', description: 'Informations sur l\'entreprise', icon: 'info' }
];

const products = [
  // Bâtiment Préfabriqué
  {
    category: 'batiment-prefabrique',
    name: 'Bâtiments de Chantier Préfabriqués',
    slug: 'batiment-prefabrique-chantier',
    description: 'Güven, hızlı kurulum, en iyi ergonomi. Des bâtiments de chantier préfabriqués offrant sécurité, installation rapide et ergonomie optimale.',
    short_description: 'Bâtiments de chantier préfabriqués offrant sécurité et installation rapide',
    route: '/batiment-prefabrique/chantier',
    features: JSON.stringify([
      'Installation rapide et efficace',
      'Sécurité renforcée',
      'Ergonomie optimale',
      'Résistance aux intempéries',
      'Modularité et flexibilité'
    ]),
    surface_min: 20,
    surface_max: 500
  },
  {
    category: 'batiment-prefabrique',
    name: 'Bureaux Préfabriqués',
    slug: 'batiment-prefabrique-bureau',
    description: 'Çalışma alanlarına verimlilik katan teknoloji. Des bureaux préfabriqués qui apportent productivité et efficacité aux espaces de travail.',
    short_description: 'Bureaux préfabriqués modernes et efficaces',
    route: '/batiment-prefabrique/bureau',
    features: JSON.stringify([
      'Espaces de travail optimisés',
      'Technologie moderne',
      'Isolation thermique et phonique',
      'Installation rapide',
      'Personnalisation possible'
    ]),
    surface_min: 15,
    surface_max: 200
  },
  {
    category: 'batiment-prefabrique',
    name: 'Structures en Acier',
    slug: 'batiment-prefabrique-acier',
    description: 'Yüksek güvenlik yüksek konfor. Des structures en acier offrant sécurité maximale et confort optimal.',
    short_description: 'Structures en acier haute sécurité',
    route: '/batiment-prefabrique/acier',
    features: JSON.stringify([
      'Haute sécurité',
      'Confort optimal',
      'Durabilité exceptionnelle',
      'Résistance sismique',
      'Design moderne'
    ]),
    surface_min: 50,
    surface_max: 1000
  },
  {
    category: 'batiment-prefabrique',
    name: 'Bâtiments d\'Installations Sociales',
    slug: 'batiment-prefabrique-social',
    description: 'Yenilik, hız, güven, huzur. Des bâtiments pour installations sociales alliant innovation, rapidité, sécurité et sérénité.',
    short_description: 'Bâtiments pour installations sociales',
    route: '/batiment-prefabrique/social',
    features: JSON.stringify([
      'Innovation architecturale',
      'Installation rapide',
      'Sécurité garantie',
      'Environnement serein',
      'Adaptabilité aux besoins'
    ]),
    surface_min: 30,
    surface_max: 400
  },
  {
    category: 'batiment-prefabrique',
    name: 'Écoles et Bâtiments Éducatifs',
    slug: 'batiment-prefabrique-ecole',
    description: 'Eğitimde en hızlı ve güvenli yapılar. Les structures les plus rapides et sécurisées pour l\'éducation.',
    short_description: 'Bâtiments éducatifs rapides et sécurisés',
    route: '/batiment-prefabrique/ecole',
    features: JSON.stringify([
      'Construction rapide',
      'Sécurité maximale',
      'Espaces adaptés à l\'éducation',
      'Confort pour les élèves',
      'Normes de sécurité respectées'
    ]),
    surface_min: 100,
    surface_max: 2000
  },
  {
    category: 'batiment-prefabrique',
    name: 'Hôpitaux Préfabriqués',
    slug: 'batiment-prefabrique-hopital',
    description: 'En hızlı ve yerinde sağlık hizmeti. Des hôpitaux préfabriqués pour des services de santé rapides et sur site.',
    short_description: 'Hôpitaux préfabriqués pour services de santé',
    route: '/batiment-prefabrique/hopital',
    features: JSON.stringify([
      'Installation ultra-rapide',
      'Services de santé sur site',
      'Normes sanitaires respectées',
      'Équipements médicaux intégrables',
      'Flexibilité d\'aménagement'
    ]),
    surface_min: 200,
    surface_max: 5000
  },
  {
    category: 'batiment-prefabrique',
    name: 'Hôtels Préfabriqués en Acier Léger',
    slug: 'batiment-prefabrique-hotel',
    description: 'Yeni nesil modern konaklama yapıları. Des structures d\'hébergement modernes de nouvelle génération.',
    short_description: 'Hôtels préfabriqués modernes',
    route: '/batiment-prefabrique/hotel',
    features: JSON.stringify([
      'Architecture moderne',
      'Confort hôtelier',
      'Installation rapide',
      'Design contemporain',
      'Équipements haut de gamme'
    ]),
    surface_min: 500,
    surface_max: 10000
  },
  {
    category: 'batiment-prefabrique',
    name: 'Blocs Sanitaires Préfabriqués',
    slug: 'batiment-prefabrique-sanitaires',
    description: 'İhtiyaçlara en estetik ve pratik çözüm. La solution la plus esthétique et pratique pour vos besoins sanitaires.',
    short_description: 'Blocs sanitaires esthétiques et pratiques',
    route: '/batiment-prefabrique/sanitaires',
    features: JSON.stringify([
      'Design esthétique',
      'Solution pratique',
      'Installation facile',
      'Hygiène optimale',
      'Durabilité'
    ]),
    surface_min: 5,
    surface_max: 50
  },
  {
    category: 'batiment-prefabrique',
    name: 'Bâtiments de Dortoirs Préfabriqués',
    slug: 'batiment-prefabrique-dortoir',
    description: 'Konaklamada ev konforu. Le confort d\'une maison dans l\'hébergement.',
    short_description: 'Dortoirs préfabriqués confortables',
    route: '/batiment-prefabrique/dortoir',
    features: JSON.stringify([
      'Confort résidentiel',
      'Espaces de vie agréables',
      'Isolation optimale',
      'Installation rapide',
      'Ambiance chaleureuse'
    ]),
    surface_min: 40,
    surface_max: 800
  },
  {
    category: 'batiment-prefabrique',
    name: 'Réfectoires Préfabriqués',
    slug: 'batiment-prefabrique-refectoire',
    description: 'Yemek anı konfora dönüşüyor. Le moment du repas devient un moment de confort.',
    short_description: 'Réfectoires préfabriqués confortables',
    route: '/batiment-prefabrique/refectoire',
    features: JSON.stringify([
      'Espaces de restauration confortables',
      'Installation rapide',
      'Capacité d\'accueil importante',
      'Design fonctionnel',
      'Hygiène optimale'
    ]),
    surface_min: 50,
    surface_max: 600
  },
  // Maison Acier
  {
    category: 'maison-acier',
    name: 'Série Impériale',
    slug: 'maison-acier-imperiale',
    description: '6 Ocak için hazırlanıyor. Une série exceptionnelle en préparation.',
    short_description: 'Série exceptionnelle en préparation',
    route: '/maison-acier/imperiale',
    features: JSON.stringify([
      'Design exclusif',
      'Finition premium',
      'Espace généreux',
      'Technologies avancées',
      'Bientôt disponible'
    ]),
    surface_min: 120,
    surface_max: 300
  },
  {
    category: 'maison-acier',
    name: 'Maisons Acier Plain-Pied',
    slug: 'maison-acier-plain-pied',
    description: 'Güven, mutluluk, huzur bu evde. Sécurité, bonheur et sérénité dans cette maison.',
    short_description: 'Maisons en acier plain-pied sécurisées',
    route: '/maison-acier/plain-pied',
    features: JSON.stringify([
      'Sécurité maximale',
      'Confort optimal',
      'Accessibilité',
      'Design moderne',
      'Durabilité'
    ]),
    surface_min: 60,
    surface_max: 150
  },
  {
    category: 'maison-acier',
    name: 'Maisons Acier à Étage',
    slug: 'maison-acier-etage',
    description: 'Evin en güvenlisi en konforlusu. La maison la plus sûre et la plus confortable.',
    short_description: 'Maisons en acier à étage',
    route: '/maison-acier/etage',
    features: JSON.stringify([
      'Sécurité renforcée',
      'Confort exceptionnel',
      'Espace optimisé',
      'Architecture moderne',
      'Résistance sismique'
    ]),
    surface_min: 100,
    surface_max: 250
  },
  {
    category: 'maison-acier',
    name: 'Caractéristiques Techniques Maison Acier',
    slug: 'maison-acier-technique',
    description: 'En güvenlisi en iyisi. Les meilleures caractéristiques techniques pour votre sécurité.',
    short_description: 'Caractéristiques techniques des maisons en acier',
    route: '/maison-acier/technique',
    features: JSON.stringify([
      'Structure en acier renforcé',
      'Isolation thermique optimale',
      'Résistance aux intempéries',
      'Normes de sécurité respectées',
      'Garantie de qualité'
    ])
  },
  // Maisons Préfabriquées
  {
    category: 'maisons-prefabriquees',
    name: 'Maisons Préfabriquées Plain-Pied',
    slug: 'maisons-prefabriquees-plain-pied',
    description: 'Ev sahibi olmanın en kolay yolu. Le moyen le plus simple de devenir propriétaire.',
    short_description: 'Maisons préfabriquées plain-pied',
    route: '/maisons-prefabriquees/plain-pied',
    features: JSON.stringify([
      'Accessibilité financière',
      'Installation rapide',
      'Confort optimal',
      'Design moderne',
      'Personnalisation possible'
    ]),
    surface_min: 50,
    surface_max: 120
  },
  {
    category: 'maisons-prefabriquees',
    name: 'Maisons Préfabriquées à Étage',
    slug: 'maisons-prefabriquees-etage',
    description: 'Modern mimarinin yeni trend evleri. Les nouvelles maisons tendance de l\'architecture moderne.',
    short_description: 'Maisons préfabriquées à étage',
    route: '/maisons-prefabriquees/etage',
    features: JSON.stringify([
      'Architecture moderne',
      'Espace optimisé',
      'Design contemporain',
      'Confort exceptionnel',
      'Économie d\'énergie'
    ]),
    surface_min: 80,
    surface_max: 180
  },
  {
    category: 'maisons-prefabriquees',
    name: 'Villas Préfabriquées',
    slug: 'maisons-prefabriquees-villa',
    description: 'Farklı olmanın ayrıcalıkları. Les privilèges d\'être différent.',
    short_description: 'Villas préfabriquées de luxe',
    route: '/maisons-prefabriquees/villa',
    features: JSON.stringify([
      'Design exclusif',
      'Espace généreux',
      'Finition premium',
      'Luxe et confort',
      'Personnalisation totale'
    ]),
    surface_min: 150,
    surface_max: 400
  },
  {
    category: 'maisons-prefabriquees',
    name: 'Logements Collectifs Économiques',
    slug: 'maisons-prefabriquees-economique',
    description: 'Konut açığının giderilmesinin en hızlı yolu. Le moyen le plus rapide de résoudre le déficit de logement.',
    short_description: 'Logements collectifs économiques',
    route: '/maisons-prefabriquees/economique',
    features: JSON.stringify([
      'Solution économique',
      'Construction rapide',
      'Grande capacité',
      'Qualité garantie',
      'Accessibilité'
    ]),
    surface_min: 40,
    surface_max: 100
  },
  {
    category: 'maisons-prefabriquees',
    name: 'Logements d\'Urgence Sismique',
    slug: 'maisons-prefabriquees-urgence-sismique',
    description: 'Zor zamanda insanlığın yanında. Aux côtés de l\'humanité dans les moments difficiles.',
    short_description: 'Logements d\'urgence sismique',
    route: '/maisons-prefabriquees/urgence-sismique',
    features: JSON.stringify([
      'Installation ultra-rapide',
      'Sécurité sismique',
      'Confort d\'urgence',
      'Résistance aux intempéries',
      'Solution temporaire durable'
    ]),
    surface_min: 25,
    surface_max: 60
  },
  {
    category: 'maisons-prefabriquees',
    name: 'Caractéristiques Techniques Maison Préfabriquée',
    slug: 'maisons-prefabriquees-technique',
    description: 'En güvenlisi en iyisi. Les meilleures caractéristiques techniques.',
    short_description: 'Caractéristiques techniques des maisons préfabriquées',
    route: '/maisons-prefabriquees/technique',
    features: JSON.stringify([
      'Isolation thermique et phonique',
      'Structure renforcée',
      'Résistance aux intempéries',
      'Normes de construction respectées',
      'Garantie de qualité'
    ])
  },
  // Cabine
  {
    category: 'cabine',
    name: 'Cabinets Métropole Esthétiques',
    slug: 'cabine-metropole',
    description: 'Des cabinets esthétiques pour environnements urbains.',
    short_description: 'Cabinets métropole esthétiques',
    route: '/cabine/metropole',
    features: JSON.stringify([
      'Design moderne',
      'Esthétique urbaine',
      'Fonctionnalité optimale',
      'Installation facile',
      'Durabilité'
    ]),
    surface_min: 1,
    surface_max: 10
  },
  {
    category: 'cabine',
    name: 'Cabinets Polyester',
    slug: 'cabine-polyester',
    description: 'Des cabinets en polyester résistants et durables.',
    short_description: 'Cabinets en polyester',
    route: '/cabine/polyester',
    features: JSON.stringify([
      'Résistance aux intempéries',
      'Léger et robuste',
      'Entretien facile',
      'Longue durée de vie',
      'Design moderne'
    ]),
    surface_min: 1,
    surface_max: 8
  },
  {
    category: 'cabine',
    name: 'Cabinets Larges',
    slug: 'cabine-large',
    description: 'Des cabinets spacieux pour tous vos besoins.',
    short_description: 'Cabinets larges et spacieux',
    route: '/cabine/large',
    features: JSON.stringify([
      'Espace généreux',
      'Confort optimal',
      'Installation rapide',
      'Polyvalence',
      'Qualité garantie'
    ]),
    surface_min: 2,
    surface_max: 15
  },
  {
    category: 'cabine',
    name: 'Cabinets Sanitaires Mobiles',
    slug: 'cabine-mobile',
    description: 'Des solutions sanitaires mobiles pratiques et efficaces.',
    short_description: 'Cabinets sanitaires mobiles',
    route: '/cabine/mobile',
    features: JSON.stringify([
      'Mobilité totale',
      'Installation instantanée',
      'Hygiène optimale',
      'Facilité d\'entretien',
      'Solution pratique'
    ]),
    surface_min: 1,
    surface_max: 6
  },
  {
    category: 'cabine',
    name: 'Cabinets Panneaux',
    slug: 'cabine-panneaux',
    description: 'Des cabinets en panneaux modulaires.',
    short_description: 'Cabinets en panneaux modulaires',
    route: '/cabine/panneaux',
    features: JSON.stringify([
      'Modularité',
      'Installation rapide',
      'Personnalisation',
      'Résistance',
      'Design fonctionnel'
    ]),
    surface_min: 1,
    surface_max: 12
  },
  {
    category: 'cabine',
    name: 'Guérites de Sécurité Blindées',
    slug: 'cabine-securite',
    description: 'Des guérites de sécurité blindées pour une protection maximale.',
    short_description: 'Guérites de sécurité blindées',
    route: '/cabine/securite',
    features: JSON.stringify([
      'Sécurité renforcée',
      'Blindage efficace',
      'Résistance aux agressions',
      'Confort du personnel',
      'Visibilité optimale'
    ]),
    surface_min: 2,
    surface_max: 10
  },
  {
    category: 'cabine',
    name: 'Cabinets Préfabriqués Esthétiques',
    slug: 'cabine-prefabriquee',
    description: 'Des cabinets préfabriqués alliant esthétique et fonctionnalité.',
    short_description: 'Cabinets préfabriqués esthétiques',
    route: '/cabine/prefabriquee',
    features: JSON.stringify([
      'Design esthétique',
      'Installation rapide',
      'Qualité premium',
      'Durabilité',
      'Personnalisation'
    ]),
    surface_min: 1,
    surface_max: 10
  },
  {
    category: 'cabine',
    name: 'Caractéristiques Techniques Cabinet',
    slug: 'cabine-technique',
    description: 'Les caractéristiques techniques de nos cabinets.',
    short_description: 'Caractéristiques techniques des cabinets',
    route: '/cabine/technique',
    features: JSON.stringify([
      'Normes de qualité respectées',
      'Isolation optimale',
      'Résistance aux intempéries',
      'Garantie de durabilité',
      'Certifications'
    ])
  },
  // Container
  {
    category: 'container',
    name: 'Container Panneau Sandwich',
    slug: 'container-panneau-sandwich',
    description: 'Uzun ömür, yüksek yalıtım, enerji tasarrufu. Containers avec panneaux sandwich pour une longue durée de vie.',
    short_description: 'Containers avec panneaux sandwich',
    route: '/container/panneau-sandwich',
    features: JSON.stringify([
      'Longue durée de vie',
      'Isolation élevée',
      'Économie d\'énergie',
      'Résistance optimale',
      'Installation rapide'
    ]),
    surface_min: 14,
    surface_max: 60
  },
  {
    category: 'container',
    name: 'Containers Bureau & Chantier',
    slug: 'container-bureau-chantier',
    description: 'Hızlı kurulum avantajlarıyla hemen kazandıran yapılar. Containers pour bureaux et chantiers avec installation rapide.',
    short_description: 'Containers bureau et chantier',
    route: '/container/bureau-chantier',
    features: JSON.stringify([
      'Installation rapide',
      'Flexibilité d\'usage',
      'Confort de travail',
      'Résistance aux intempéries',
      'Solution économique'
    ]),
    surface_min: 14,
    surface_max: 42
  },
  {
    category: 'container',
    name: 'Maisons Container',
    slug: 'container-maison-container',
    description: 'Konfor beklentilerinin de ötesinde. Des maisons container au-delà des attentes de confort.',
    short_description: 'Maisons container confortables',
    route: '/container/maison-container',
    features: JSON.stringify([
      'Confort optimal',
      'Design moderne',
      'Installation rapide',
      'Personnalisation',
      'Économie d\'énergie'
    ]),
    surface_min: 14,
    surface_max: 120
  },
  {
    category: 'container',
    name: 'Containers Métropole de Luxe',
    slug: 'container-metropole',
    description: 'Modern mimariye en uyumlu mobil yapılar. Structures mobiles les plus adaptées à l\'architecture moderne.',
    short_description: 'Containers métropole de luxe',
    route: '/container/metropole',
    features: JSON.stringify([
      'Design moderne',
      'Finition luxe',
      'Mobilité',
      'Architecture contemporaine',
      'Confort premium'
    ]),
    surface_min: 14,
    surface_max: 42
  },
  {
    category: 'container',
    name: 'Containers Sanitaires',
    slug: 'container-sanitaires-douches',
    description: 'Nerede ihtiyaç varsa aynı gün kullanıma hazır. Containers sanitaires prêts à l\'emploi le jour même.',
    short_description: 'Containers sanitaires et douches',
    route: '/container/sanitaires-douches',
    features: JSON.stringify([
      'Installation immédiate',
      'Hygiène optimale',
      'Solution pratique',
      'Mobilité',
      'Durabilité'
    ]),
    surface_min: 6,
    surface_max: 20
  },
  {
    category: 'container',
    name: 'Containers Démontables',
    slug: 'container-demontable',
    description: 'Kolay nakliye en hızlı kurulum. Containers démontables avec transport facile.',
    short_description: 'Containers démontables',
    route: '/container/demontable',
    features: JSON.stringify([
      'Transport facile',
      'Installation rapide',
      'Flexibilité',
      'Réutilisable',
      'Solution pratique'
    ]),
    surface_min: 14,
    surface_max: 60
  },
  {
    category: 'container',
    name: 'Container Sur Mesure',
    slug: 'container-sur-mesure',
    description: 'Farklı kullanım alanlarına en hızlı yapı çözümü. Solution de construction la plus rapide pour différents usages.',
    short_description: 'Containers sur mesure',
    route: '/container/sur-mesure',
    features: JSON.stringify([
      'Personnalisation totale',
      'Adaptation aux besoins',
      'Installation rapide',
      'Design sur mesure',
      'Solution flexible'
    ]),
    surface_min: 14,
    surface_max: 200
  },
  {
    category: 'container',
    name: 'Containers Dortoir',
    slug: 'container-dortoir',
    description: 'Zindelik veren konaklama mekanları için. Pour des espaces d\'hébergement vivifiants.',
    short_description: 'Containers dortoir',
    route: '/container/dortoir',
    features: JSON.stringify([
      'Confort d\'hébergement',
      'Espace optimisé',
      'Installation rapide',
      'Ambiance agréable',
      'Solution pratique'
    ]),
    surface_min: 14,
    surface_max: 84
  },
  {
    category: 'container',
    name: 'Containers Réfectoire',
    slug: 'container-refectoire',
    description: 'Şantiye ve Endüstri tesislerine en pratik çözüm. La solution la plus pratique pour chantiers et sites industriels.',
    short_description: 'Containers réfectoire',
    route: '/container/refectoire',
    features: JSON.stringify([
      'Solution pratique',
      'Capacité importante',
      'Installation rapide',
      'Hygiène optimale',
      'Design fonctionnel'
    ]),
    surface_min: 20,
    surface_max: 80
  },
  {
    category: 'container',
    name: 'Containers d\'Urgence Sismique',
    slug: 'container-urgence-sismique',
    description: 'Afetzedeyi evinde hissettiren yapı sistemi. Système de construction qui fait sentir les sinistrés chez eux.',
    short_description: 'Containers d\'urgence sismique',
    route: '/container/urgence-sismique',
    features: JSON.stringify([
      'Installation ultra-rapide',
      'Confort d\'urgence',
      'Sécurité sismique',
      'Résistance aux intempéries',
      'Solution temporaire durable'
    ]),
    surface_min: 14,
    surface_max: 42
  }
];

async function seedDatabase() {
  try {
    console.log('Initialisation de la base de données...');
    await initDatabase();

    // Insérer les catégories
    console.log('Insertion des catégories...');
    const categoryMap = {};
    
    for (const category of categories) {
      try {
        const result = await dbRun(
          `INSERT OR IGNORE INTO categories (name, slug, description, icon) VALUES (?, ?, ?, ?)`,
          [category.name, category.slug, category.description, category.icon]
        );
        
        const insertedCategory = await dbGet(
          `SELECT id FROM categories WHERE slug = ?`,
          [category.slug]
        );
        
        if (insertedCategory) {
          categoryMap[category.slug] = insertedCategory.id;
        }
      } catch (error) {
        console.error(`Erreur lors de l'insertion de la catégorie ${category.name}:`, error);
      }
    }

    // Insérer les produits
    console.log('Insertion des produits...');
    let insertedCount = 0;
    
    for (const product of products) {
      try {
        const categoryId = categoryMap[product.category];
        if (!categoryId) {
          console.warn(`Catégorie non trouvée pour ${product.name}`);
          continue;
        }

        // Image par défaut basée sur la catégorie
        const defaultImages = {
          'container': JSON.stringify(['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop']),
          'batiment-prefabrique': JSON.stringify(['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop']),
          'maison-acier': JSON.stringify(['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop']),
          'maisons-prefabriquees': JSON.stringify(['https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&auto=format&fit=crop']),
          'cabine': JSON.stringify(['https://images.unsplash.com/photo-1565514020126-dbfa84617e94?w=800&auto=format&fit=crop'])
        };
        
        const defaultImage = defaultImages[product.category] || JSON.stringify(['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop']);
        
        // Prix par défaut basés sur la surface
        let price_min = null;
        let price_max = null;
        if (product.surface_min) {
          price_min = Math.round(product.surface_min * 500); // ~500€/m²
          price_max = Math.round((product.surface_max || product.surface_min * 2) * 1500); // ~1500€/m²
        }

        await dbRun(
          `INSERT OR REPLACE INTO products 
          (category_id, name, slug, description, short_description, route, features, surface_min, surface_max, images, price_min, price_max, status) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
          [
            categoryId,
            product.name,
            product.slug,
            product.description,
            product.short_description,
            product.route,
            product.features,
            product.surface_min || null,
            product.surface_max || null,
            defaultImage,
            price_min,
            price_max
          ]
        );
        insertedCount++;
      } catch (error) {
        console.error(`Erreur lors de l'insertion du produit ${product.name}:`, error);
      }
    }

    console.log(`✅ Base de données initialisée avec succès!`);
    console.log(`   - ${categories.length} catégories`);
    console.log(`   - ${insertedCount} produits insérés`);
    
    // Afficher un résumé
    const productCount = await dbGet(`SELECT COUNT(*) as count FROM products`);
    const categoryCount = await dbGet(`SELECT COUNT(*) as count FROM categories`);
    console.log(`\n📊 Résumé:`);
    console.log(`   - Total catégories: ${categoryCount.count}`);
    console.log(`   - Total produits: ${productCount.count}`);
    
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
    throw error;
  } finally {
    db.close((err) => {
      if (err) {
        console.error('Erreur lors de la fermeture de la base de données:', err.message);
      } else {
        console.log('\n✅ Base de données fermée');
        process.exit(0);
      }
    });
  }
}

seedDatabase();

