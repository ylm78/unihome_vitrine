import { initDatabase, dbRun, dbGet, dbAll } from '../database/db.js';

/**
 * Script pour mettre à jour les noms des produits avec des noms premium
 */
async function updateProductNamesPremium() {
  await initDatabase();
  
  console.log('✨ Mise à jour des noms des produits avec des noms premium...\n');
  
  // Mapping des slugs vers les noms premium
  const premiumNames = {
    'container-moderne': 'MONOLITHE',
    'container-moderne-2': "L'ÉCRIN",
    'container-moderne-3': 'SANCTUARY'
  };
  
  // Récupérer tous les produits
  const products = await dbAll(`SELECT id, name, slug FROM products ORDER BY id`);
  
  console.log(`📊 Produits trouvés: ${products.length}\n`);
  
  // Mettre à jour chaque produit
  for (const product of products) {
    const premiumName = premiumNames[product.slug];
    
    if (premiumName) {
      console.log(`🔄 Mise à jour: "${product.name}" → "${premiumName}"`);
      
      await dbRun(
        `UPDATE products SET
          name = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [premiumName, product.id]
      );
      
      console.log(`   ✅ Slug: ${product.slug} (ID: ${product.id})\n`);
    } else {
      console.log(`⚠️  Pas de nom premium défini pour: ${product.slug} (${product.name})\n`);
    }
  }
  
  // Afficher le résumé final
  console.log(`${'='.repeat(60)}`);
  console.log('📊 Résumé final');
  console.log(`${'='.repeat(60)}\n`);
  
  const updatedProducts = await dbAll(`SELECT id, name, slug FROM products ORDER BY id`);
  
  updatedProducts.forEach(product => {
    console.log(`✅ ${product.name}`);
    console.log(`   - Slug: ${product.slug}`);
    console.log(`   - ID: ${product.id}\n`);
  });
  
  console.log('✨ Mise à jour terminée !\n');
}

// Exécuter le script
updateProductNamesPremium().catch(console.error);

