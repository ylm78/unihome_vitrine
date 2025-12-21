import { initDatabase, dbRun, dbGet, dbAll } from '../database/db.js';
import db from '../database/db.js';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateProductImages() {
  try {
    console.log('🖼️  Mise à jour des images du produit "Maison Container Moderne avec Terrasse"...\n');
    
    await initDatabase();
    
    // Chemin vers le dossier des images
    const imagesDir = path.join(__dirname, '../../frontend/public/images/products/maison-container-moderne-terrasse');
    
    // Lire tous les fichiers du dossier
    let imageFiles = [];
    try {
      const files = await readdir(imagesDir);
      imageFiles = files
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .map(file => `/images/products/maison-container-moderne-terrasse/${file}`)
        .sort((a, b) => {
          // Trier pour mettre les vues aériennes en premier, puis les autres
          if (a.includes('aerienne')) return -1;
          if (b.includes('aerienne')) return 1;
          if (a.includes('frontale')) return -1;
          if (b.includes('frontale')) return 1;
          if (a.includes('complete')) return -1;
          if (b.includes('complete')) return 1;
          if (a.includes('lshape')) return -1;
          if (b.includes('lshape')) return 1;
          if (a.includes('terrasse')) return -1;
          if (b.includes('terrasse')) return 1;
          if (a.includes('laterale')) return -1;
          if (b.includes('laterale')) return 1;
          if (a.includes('collage')) return 1; // Collage en dernier
          if (b.includes('collage')) return -1;
          return a.localeCompare(b);
        });
    } catch (error) {
      console.error('❌ Erreur lors de la lecture du dossier:', error.message);
      console.log('💡 Assurez-vous que le dossier existe:', imagesDir);
      return;
    }
    
    if (imageFiles.length === 0) {
      console.log('⚠️  Aucune image trouvée dans le dossier');
      return;
    }
    
    console.log(`📸 ${imageFiles.length} images trouvées:\n`);
    imageFiles.forEach((img, idx) => {
      console.log(`   ${idx + 1}. ${img}`);
    });
    
    // Récupérer le produit
    const product = await dbGet(
      `SELECT id, name, slug, images FROM products WHERE slug = ?`,
      ['maison-container-moderne-terrasse']
    );
    
    if (!product) {
      console.log('\n❌ Produit "maison-container-moderne-terrasse" non trouvé dans la base de données');
      console.log('💡 Exécutez d\'abord: npm run import-products');
      return;
    }
    
    // Mettre à jour les images
    await dbRun(
      `UPDATE products 
      SET images = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?`,
      [JSON.stringify(imageFiles), product.id]
    );
    
    console.log(`\n✅ Produit mis à jour avec succès!`);
    console.log(`   - Nom: ${product.name}`);
    console.log(`   - Slug: ${product.slug}`);
    console.log(`   - Images: ${imageFiles.length} images ajoutées\n`);
    
    // Vérification
    const updatedProduct = await dbGet(
      `SELECT images FROM products WHERE id = ?`,
      [product.id]
    );
    
    const images = JSON.parse(updatedProduct.images);
    console.log('📊 Images dans la base de données:');
    images.forEach((img, idx) => {
      console.log(`   ${idx + 1}. ${img}`);
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error);
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

updateProductImages();

