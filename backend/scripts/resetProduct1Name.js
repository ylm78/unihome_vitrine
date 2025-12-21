import { initDatabase, dbRun, dbGet } from '../database/db.js';

/**
 * Script pour remettre le nom du produit 1 à "Container Moderne"
 */
async function resetProduct1Name() {
  await initDatabase();
  
  console.log('🔄 Remise du nom du produit 1 à "Container Moderne"...\n');
  
  // Récupérer le produit 1 (container-moderne)
  const product = await dbGet(
    `SELECT id, name, slug FROM products WHERE slug = ?`,
    ['container-moderne']
  );
  
  if (!product) {
    console.error('❌ Produit "container-moderne" non trouvé');
    return;
  }
  
  console.log(`📦 Produit trouvé: "${product.name}" (ID: ${product.id})\n`);
  
  // Remettre le nom à "Container Moderne"
  await dbRun(
    `UPDATE products SET
      name = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [
      'Container Moderne',
      product.id
    ]
  );
  
  console.log(`✅ Nom du produit remis à "Container Moderne"\n`);
  
  // Afficher le produit mis à jour
  const updatedProduct = await dbGet(
    `SELECT id, name, slug FROM products WHERE id = ?`,
    [product.id]
  );
  
  if (updatedProduct) {
    console.log('📊 Produit mis à jour:');
    console.log(`   - ID: ${updatedProduct.id}`);
    console.log(`   - Nom: ${updatedProduct.name}`);
    console.log(`   - Slug: ${updatedProduct.slug}\n`);
  }
}

// Exécuter le script
resetProduct1Name().catch(console.error);

