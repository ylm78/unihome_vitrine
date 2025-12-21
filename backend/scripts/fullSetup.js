import { initDatabase, dbRun, dbGet, dbAll } from '../database/db.js';
import db from '../database/db.js';

// Import des enrichissements
const productEnrichments = {
  'container-maison-container': {
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop'],
    price_min: 28900,
    price_max: 145000
  },
  'container-panneau-sandwich': {
    images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop'],
    price_min: 15000,
    price_max: 60000
  },
  'container-bureau-chantier': {
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop'],
    price_min: 12000,
    price_max: 45000
  },
  'batiment-prefabrique-chantier': {
    images: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop'],
    price_min: 25000,
    price_max: 150000
  },
  'batiment-prefabrique-bureau': {
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop'],
    price_min: 30000,
    price_max: 120000
  },
  'maison-acier-plain-pied': {
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop'],
    price_min: 60000,
    price_max: 150000
  },
  'maisons-prefabriquees-plain-pied': {
    images: ['https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&auto=format&fit=crop'],
    price_min: 50000,
    price_max: 120000
  },
  'cabine-metropole': {
    images: ['https://images.unsplash.com/photo-1565514020126-dbfa84617e94?w=800&auto=format&fit=crop'],
    price_min: 3000,
    price_max: 10000
  }
};

// Image par défaut
const defaultImage = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop';

async function fullSetup() {
  try {
    console.log('🚀 Configuration complète de la base de données UNIHOME\n');
    
    // 1. Initialiser la base
    console.log('1️⃣  Initialisation de la base de données...');
    await initDatabase();
    console.log('   ✅ Base de données initialisée\n');
    
    // 2. Vérifier les produits existants
    console.log('2️⃣  Vérification des produits...');
    const existingProducts = await dbAll(`SELECT id, slug, name FROM products WHERE status = 'active'`);
    console.log(`   📦 ${existingProducts.length} produits trouvés\n`);
    
    if (existingProducts.length === 0) {
      console.log('⚠️  Aucun produit trouvé. Exécutez d\'abord: npm run init-db');
      process.exit(1);
    }
    
    // 3. Enrichir les produits
    console.log('3️⃣  Enrichissement des produits avec images et prix...');
    let enrichedCount = 0;
    let defaultImageCount = 0;
    
    for (const product of existingProducts) {
      const enrichment = productEnrichments[product.slug];
      const images = enrichment 
        ? JSON.stringify(enrichment.images)
        : JSON.stringify([defaultImage]);
      
      const price_min = enrichment?.price_min || null;
      const price_max = enrichment?.price_max || null;
      
      // Vérifier si le produit a déjà des images
      const currentProduct = await dbGet(`SELECT images FROM products WHERE id = ?`, [product.id]);
      
      if (!currentProduct.images) {
        await dbRun(
          `UPDATE products SET 
            images = ?,
            price_min = COALESCE(?, price_min),
            price_max = COALESCE(?, price_max),
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`,
          [images, price_min, price_max, product.id]
        );
        
        if (enrichment) {
          enrichedCount++;
          console.log(`   ✅ ${product.name} - enrichi`);
        } else {
          defaultImageCount++;
        }
      }
    }
    
    console.log(`\n   ✅ ${enrichedCount} produits enrichis`);
    console.log(`   📷 ${defaultImageCount} produits avec image par défaut\n`);
    
    // 4. Statistiques finales
    console.log('4️⃣  Statistiques finales...');
    const stats = {
      total: await dbGet(`SELECT COUNT(*) as count FROM products WHERE status = 'active'`),
      withImages: await dbGet(`SELECT COUNT(*) as count FROM products WHERE images IS NOT NULL AND status = 'active'`),
      withPrices: await dbGet(`SELECT COUNT(*) as count FROM products WHERE price_min IS NOT NULL AND status = 'active'`),
      categories: await dbGet(`SELECT COUNT(*) as count FROM categories`)
    };
    
    console.log(`   📊 Produits actifs: ${stats.total.count}`);
    console.log(`   🖼️  Produits avec images: ${stats.withImages.count}`);
    console.log(`   💰 Produits avec prix: ${stats.withPrices.count}`);
    console.log(`   📁 Catégories: ${stats.categories.count}`);
    
    console.log('\n✅ Configuration terminée avec succès!\n');
    console.log('🚀 Vous pouvez maintenant démarrer le serveur: npm run dev\n');
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error);
    throw error;
  } finally {
    db.close((err) => {
      if (err) {
        console.error('Erreur lors de la fermeture:', err.message);
      }
      process.exit(0);
    });
  }
}

fullSetup();

