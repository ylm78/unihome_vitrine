import { initDatabase, dbRun, dbGet, dbAll } from '../database/db.js';
import db from '../database/db.js';

// Produits à importer avec leurs images organisées par produit
// Les images du même produit mais sous différents angles sont regroupées dans un même tableau
const productsToImport = [
  {
    category: 'container',
    name: 'Maison Container Moderne avec Terrasse',
    slug: 'maison-container-moderne-terrasse',
    description: 'Maison moderne construite à partir de containers avec une magnifique terrasse en bois. Design épuré et intégration harmonieuse dans la nature.',
    short_description: 'Maison container moderne avec terrasse en bois, intégrée dans un environnement naturel',
    route: '/container/maison-moderne-terrasse',
    images: [
      '/images/products/maison-container-moderne-terrasse/vue-aerienne-1.png',
      '/images/products/maison-container-moderne-terrasse/vue-aerienne-2.png',
      '/images/products/maison-container-moderne-terrasse/vue-frontale.png',
      '/images/products/maison-container-moderne-terrasse/vue-laterale.png',
      '/images/products/maison-container-moderne-terrasse/vue-terrasse-1.png',
      '/images/products/maison-container-moderne-terrasse/vue-terrasse-2.png',
      '/images/products/maison-container-moderne-terrasse/vue-lshape-1.png',
      '/images/products/maison-container-moderne-terrasse/vue-lshape-2.png',
      '/images/products/maison-container-moderne-terrasse/vue-complete-1.png',
      '/images/products/maison-container-moderne-terrasse/vue-complete-2.png',
      '/images/products/maison-container-moderne-terrasse/collage-vues.png'
    ],
    videos: [], // À remplir avec les URLs des vidéos
    features: [
      'Construction en containers recyclés',
      'Terrasse en bois multi-niveaux',
      'Grandes baies vitrées',
      'Intégration paysagère',
      'Mobilier extérieur inclus',
      'Éclairage extérieur intégré',
      'Isolation optimale',
      'Design modulaire extensible'
    ],
    surface_min: 42,
    surface_max: 126,
    price_min: 45000,
    price_max: 180000
  },
  {
    category: 'maisons-prefabriquees',
    name: 'Bâtiment Modulaire Préfabriqué Panneaux Bois',
    slug: 'batiment-modulaire-panneaux-bois',
    description: 'Bâtiment modulaire préfabriqué avec revêtement en panneaux bois. Structure robuste et esthétique moderne.',
    short_description: 'Bâtiment modulaire préfabriqué avec panneaux bois et design contemporain',
    route: '/maisons-prefabriquees/modulaire-panneaux-bois',
    images: [
      '/images/products/batiment-modulaire-panneaux-bois/vue-lshape.png',
      '/images/products/batiment-modulaire-panneaux-bois/vue-paralleles-1.png',
      '/images/products/batiment-modulaire-panneaux-bois/vue-paralleles-2.png',
      '/images/products/batiment-modulaire-panneaux-bois/vue-aerienne.png',
      '/images/products/batiment-modulaire-panneaux-bois/vue-detaillee.png'
    ],
    videos: [],
    features: [
      'Revêtement en panneaux bois',
      'Fenêtres avec grilles de sécurité',
      'Structure métallique renforcée',
      'Installation rapide',
      'Design modulaire',
      'Isolation thermique et phonique',
      'Fondation sur dalle béton',
      'Personnalisation possible'
    ],
    surface_min: 30,
    surface_max: 100,
    price_min: 35000,
    price_max: 120000
  },
  {
    category: 'maisons-prefabriquees',
    name: 'Maison Préfabriquée avec Toit Tuiles',
    slug: 'maison-prefabriquee-toit-tuiles',
    description: 'Maison préfabriquée élégante avec toit en tuiles de style méditerranéen. Combinaison parfaite entre tradition et modernité.',
    short_description: 'Maison préfabriquée avec toit en tuiles méditerranéennes',
    route: '/maisons-prefabriquees/toit-tuiles',
    images: [
      '/images/products/maison-prefabriquee-toit-tuiles/vue-aerienne-1.png',
      '/images/products/maison-prefabriquee-toit-tuiles/vue-aerienne-2.png'
    ],
    videos: [],
    features: [
      'Toit en tuiles méditerranéennes',
      'Revêtement bois clair',
      'Fenêtres sécurisées',
      'Design traditionnel moderne',
      'Résistance aux intempéries',
      'Isolation optimale',
      'Charpente renforcée',
      'Finitions haut de gamme'
    ],
    surface_min: 40,
    surface_max: 80,
    price_min: 40000,
    price_max: 100000
  },
  {
    category: 'container',
    name: 'Containers Modulaires Bleus',
    slug: 'containers-modulaires-bleus',
    description: 'Ensemble de containers modulaires en bleu foncé, offrant une solution d\'hébergement moderne et fonctionnelle. Maisons containers avec terrasses en bois, intégrées dans un environnement naturel.',
    short_description: 'Containers modulaires bleus avec aménagement extérieur et terrasses en bois',
    route: '/container/modulaires-bleus',
    images: [
      '/images/products/containers-modulaires-bleus/vue-exterieure.png',
      // Images de la maison container avec terrasse (même produit, différents angles)
      '/images/products/maison-container-moderne-terrasse/vue-aerienne-1.png',
      '/images/products/maison-container-moderne-terrasse/vue-aerienne-2.png',
      '/images/products/maison-container-moderne-terrasse/vue-frontale.png',
      '/images/products/maison-container-moderne-terrasse/vue-laterale.png',
      '/images/products/maison-container-moderne-terrasse/vue-terrasse-1.png',
      '/images/products/maison-container-moderne-terrasse/vue-terrasse-2.png',
      '/images/products/maison-container-moderne-terrasse/vue-lshape-1.png',
      '/images/products/maison-container-moderne-terrasse/vue-lshape-2.png',
      '/images/products/maison-container-moderne-terrasse/vue-complete-1.png',
      '/images/products/maison-container-moderne-terrasse/vue-complete-2.png',
      '/images/products/maison-container-moderne-terrasse/collage-vues.png'
    ],
    videos: [],
    features: [
      'Containers modulaires',
      'Couleur bleu foncé',
      'Terrasse et aménagement extérieur',
      'Fenêtres sécurisées',
      'Mobilier extérieur',
      'Installation rapide',
      'Personnalisation intérieure',
      'Résistance aux intempéries'
    ],
    surface_min: 28,
    surface_max: 84,
    price_min: 35000,
    price_max: 120000
  }
];

async function importProducts() {
  try {
    console.log('🚀 Importation des produits...\n');
    
    // Initialiser la base de données
    await initDatabase();
    
    // Vérifier/ajouter la colonne videos si nécessaire
    try {
      const tableInfo = await dbAll(`PRAGMA table_info(products)`);
      const hasVideosColumn = tableInfo.some(col => col.name === 'videos');
      if (!hasVideosColumn) {
        await dbRun(`ALTER TABLE products ADD COLUMN videos TEXT`);
        console.log('✅ Colonne videos ajoutée\n');
      }
    } catch (error) {
      console.log('⚠️  Colonne videos déjà présente ou erreur:', error.message);
    }
    
    // Récupérer les catégories
    const categories = await dbAll(`SELECT id, slug FROM categories`);
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.slug] = cat.id;
    });
    
    let importedCount = 0;
    let updatedCount = 0;
    
    for (const product of productsToImport) {
      try {
        const categoryId = categoryMap[product.category];
        if (!categoryId) {
          console.warn(`⚠️  Catégorie "${product.category}" non trouvée pour ${product.name}`);
          continue;
        }
        
        // Vérifier si le produit existe déjà
        const existingProduct = await dbGet(
          `SELECT id FROM products WHERE slug = ?`,
          [product.slug]
        );
        
        if (existingProduct) {
          // Mettre à jour le produit existant
          await dbRun(
            `UPDATE products SET
              category_id = ?,
              name = ?,
              description = ?,
              short_description = ?,
              route = ?,
              images = ?,
              videos = ?,
              features = ?,
              surface_min = ?,
              surface_max = ?,
              price_min = ?,
              price_max = ?,
              updated_at = CURRENT_TIMESTAMP
            WHERE slug = ?`,
            [
              categoryId,
              product.name,
              product.description,
              product.short_description,
              product.route,
              JSON.stringify(product.images),
              JSON.stringify(product.videos),
              JSON.stringify(product.features),
              product.surface_min,
              product.surface_max,
              product.price_min,
              product.price_max,
              product.slug
            ]
          );
          updatedCount++;
          console.log(`✅ Mis à jour: ${product.name} (${product.images.length} images)`);
        } else {
          // Créer un nouveau produit
          await dbRun(
            `INSERT INTO products 
            (category_id, name, slug, description, short_description, route, 
             images, videos, features, surface_min, surface_max, price_min, price_max, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
            [
              categoryId,
              product.name,
              product.slug,
              product.description,
              product.short_description,
              product.route,
              JSON.stringify(product.images),
              JSON.stringify(product.videos),
              JSON.stringify(product.features),
              product.surface_min,
              product.surface_max,
              product.price_min,
              product.price_max
            ]
          );
          importedCount++;
          console.log(`✅ Importé: ${product.name} (${product.images.length} images)`);
        }
      } catch (error) {
        console.error(`❌ Erreur pour ${product.name}:`, error.message);
      }
    }
    
    console.log(`\n✅ Importation terminée!`);
    console.log(`   - ${importedCount} nouveaux produits importés`);
    console.log(`   - ${updatedCount} produits mis à jour`);
    console.log(`   - ${productsToImport.length} produits traités\n`);
    
    // Résumé
    const totalProducts = await dbGet(`SELECT COUNT(*) as count FROM products WHERE status = 'active'`);
    console.log(`📊 Total produits actifs dans la base: ${totalProducts.count}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'importation:', error);
    throw error;
  } finally {
    db.close((err) => {
      if (err) {
        console.error('Erreur lors de la fermeture:', err.message);
      } else {
        console.log('\n✅ Base de données fermée');
        process.exit(0);
      }
    });
  }
}

importProducts();

