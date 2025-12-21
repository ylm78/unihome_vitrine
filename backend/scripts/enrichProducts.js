import { dbRun, dbGet, dbAll } from '../database/db.js';
import db from '../database/db.js';

// Images et prix pour enrichir les produits
const productEnrichments = {
  // Containers
  'container-maison-container': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop'
    ]),
    price_min: 28900,
    price_max: 145000
  },
  'container-panneau-sandwich': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop'
    ]),
    price_min: 15000,
    price_max: 60000
  },
  'container-bureau-chantier': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop'
    ]),
    price_min: 12000,
    price_max: 45000
  },
  'container-metropole': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop'
    ]),
    price_min: 18000,
    price_max: 55000
  },
  'container-sanitaires-douches': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1628624747186-a94194773912?w=800&auto=format&fit=crop'
    ]),
    price_min: 8000,
    price_max: 25000
  },
  'container-demontable': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop'
    ]),
    price_min: 14000,
    price_max: 50000
  },
  'container-sur-mesure': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop'
    ]),
    price_min: 20000,
    price_max: 200000
  },
  'container-dortoir': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop'
    ]),
    price_min: 35000,
    price_max: 120000
  },
  'container-refectoire': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&auto=format&fit=crop'
    ]),
    price_min: 25000,
    price_max: 80000
  },
  'container-urgence-sismique': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&auto=format&fit=crop'
    ]),
    price_min: 14000,
    price_max: 45000
  },
  // Bâtiment Préfabriqué
  'batiment-prefabrique-chantier': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop'
    ]),
    price_min: 25000,
    price_max: 150000
  },
  'batiment-prefabrique-bureau': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop'
    ]),
    price_min: 30000,
    price_max: 120000
  },
  'batiment-prefabrique-acier': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop'
    ]),
    price_min: 50000,
    price_max: 500000
  },
  'batiment-prefabrique-social': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop'
    ]),
    price_min: 40000,
    price_max: 300000
  },
  'batiment-prefabrique-ecole': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800&auto=format&fit=crop'
    ]),
    price_min: 100000,
    price_max: 1000000
  },
  'batiment-prefabrique-hopital': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&auto=format&fit=crop'
    ]),
    price_min: 200000,
    price_max: 5000000
  },
  'batiment-prefabrique-hotel': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop'
    ]),
    price_min: 500000,
    price_max: 10000000
  },
  'batiment-prefabrique-sanitaires': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1565514020126-dbfa84617e94?w=800&auto=format&fit=crop'
    ]),
    price_min: 5000,
    price_max: 50000
  },
  'batiment-prefabrique-dortoir': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop'
    ]),
    price_min: 40000,
    price_max: 300000
  },
  'batiment-prefabrique-refectoire': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&auto=format&fit=crop'
    ]),
    price_min: 50000,
    price_max: 400000
  },
  // Maison Acier
  'maison-acier-imperiale': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop'
    ]),
    price_min: 120000,
    price_max: 350000
  },
  'maison-acier-plain-pied': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop'
    ]),
    price_min: 60000,
    price_max: 150000
  },
  'maison-acier-etage': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800&auto=format&fit=crop'
    ]),
    price_min: 100000,
    price_max: 250000
  },
  // Maisons Préfabriquées
  'maisons-prefabriquees-plain-pied': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&auto=format&fit=crop'
    ]),
    price_min: 50000,
    price_max: 120000
  },
  'maisons-prefabriquees-etage': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800&auto=format&fit=crop'
    ]),
    price_min: 80000,
    price_max: 180000
  },
  'maisons-prefabriquees-villa': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&auto=format&fit=crop'
    ]),
    price_min: 150000,
    price_max: 400000
  },
  'maisons-prefabriquees-economique': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop'
    ]),
    price_min: 40000,
    price_max: 100000
  },
  'maisons-prefabriquees-urgence-sismique': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&auto=format&fit=crop'
    ]),
    price_min: 25000,
    price_max: 60000
  },
  // Cabine
  'cabine-metropole': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1565514020126-dbfa84617e94?w=800&auto=format&fit=crop'
    ]),
    price_min: 3000,
    price_max: 10000
  },
  'cabine-polyester': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1628624747186-a94194773912?w=800&auto=format&fit=crop'
    ]),
    price_min: 2500,
    price_max: 8000
  },
  'cabine-large': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1565514020126-dbfa84617e94?w=800&auto=format&fit=crop'
    ]),
    price_min: 4000,
    price_max: 15000
  },
  'cabine-mobile': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1628624747186-a94194773912?w=800&auto=format&fit=crop'
    ]),
    price_min: 1500,
    price_max: 6000
  },
  'cabine-panneaux': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1565514020126-dbfa84617e94?w=800&auto=format&fit=crop'
    ]),
    price_min: 2000,
    price_max: 12000
  },
  'cabine-securite': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1565514020126-dbfa84617e94?w=800&auto=format&fit=crop'
    ]),
    price_min: 5000,
    price_max: 20000
  },
  'cabine-prefabriquee': {
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1628624747186-a94194773912?w=800&auto=format&fit=crop'
    ]),
    price_min: 3000,
    price_max: 10000
  }
};

async function enrichProducts() {
  try {
    console.log('🚀 Enrichissement des produits avec images et prix...\n');
    
    // Récupérer tous les produits
    const products = await dbAll(`SELECT id, slug FROM products WHERE status = 'active'`);
    console.log(`📦 ${products.length} produits trouvés\n`);
    
    let updatedCount = 0;
    
    for (const product of products) {
      const enrichment = productEnrichments[product.slug];
      
      if (enrichment) {
        try {
          await dbRun(
            `UPDATE products SET 
              images = COALESCE(?, images),
              price_min = COALESCE(?, price_min),
              price_max = COALESCE(?, price_max),
              updated_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
            [
              enrichment.images || null,
              enrichment.price_min || null,
              enrichment.price_max || null,
              product.id
            ]
          );
          updatedCount++;
          console.log(`✅ ${product.slug} enrichi`);
        } catch (error) {
          console.error(`❌ Erreur pour ${product.slug}:`, error.message);
        }
      } else {
        // Ajouter une image par défaut si pas d'enrichissement spécifique
        const defaultImage = JSON.stringify([
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop'
        ]);
        await dbRun(
          `UPDATE products SET 
            images = COALESCE(images, ?),
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ? AND images IS NULL`,
          [defaultImage, product.id]
        );
      }
    }
    
    console.log(`\n✅ Enrichissement terminé!`);
    console.log(`   - ${updatedCount} produits enrichis`);
    console.log(`   - ${products.length - updatedCount} produits avec image par défaut\n`);
    
    // Afficher un résumé
    const productWithImages = await dbGet(`SELECT COUNT(*) as count FROM products WHERE images IS NOT NULL AND status = 'active'`);
    const productWithPrices = await dbGet(`SELECT COUNT(*) as count FROM products WHERE price_min IS NOT NULL AND status = 'active'`);
    
    console.log(`📊 Résumé final:`);
    console.log(`   - Produits avec images: ${productWithImages.count}`);
    console.log(`   - Produits avec prix: ${productWithPrices.count}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'enrichissement:', error);
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

enrichProducts();

