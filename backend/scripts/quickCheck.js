import { dbAll, dbGet } from '../database/db.js';
import db from '../database/db.js';

async function quickCheck() {
  try {
    console.log('🔍 Vérification rapide de la base de données...\n');
    
    const totalProducts = await dbGet(`SELECT COUNT(*) as count FROM products WHERE status = 'active'`);
    const productsWithImages = await dbGet(`SELECT COUNT(*) as count FROM products WHERE status = 'active' AND images IS NOT NULL`);
    const productsWithPrices = await dbGet(`SELECT COUNT(*) as count FROM products WHERE status = 'active' AND price_min IS NOT NULL`);
    
    console.log(`📦 Produits actifs: ${totalProducts.count}`);
    console.log(`🖼️  Produits avec images: ${productsWithImages.count}`);
    console.log(`💰 Produits avec prix: ${productsWithPrices.count}\n`);
    
    if (totalProducts.count === 0) {
      console.log('❌ Aucun produit ! Exécutez: npm run init-db');
      process.exit(1);
    }
    
    // Afficher quelques exemples
    const samples = await dbAll(`
      SELECT p.name, p.slug, c.slug as category_slug, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'active'
      LIMIT 5
    `);
    
    console.log('📋 Exemples de produits:');
    samples.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.name}`);
      console.log(`      Catégorie: ${p.category_name} (${p.category_slug})`);
      console.log(`      Slug: ${p.slug}`);
      console.log('');
    });
    
    console.log('✅ La base de données est prête !');
    console.log('💡 Démarrez le serveur avec: npm run dev');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    db.close();
    process.exit(0);
  }
}

quickCheck();

