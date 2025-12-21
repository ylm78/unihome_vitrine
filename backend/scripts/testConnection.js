import fetch from 'node-fetch';

const API_URL = 'http://localhost:3001';

async function testConnection() {
  console.log('🧪 Test de connexion à l\'API...\n');
  
  try {
    // Test 1: Health Check
    console.log('1️⃣  Test Health Check...');
    try {
      const healthRes = await fetch(`${API_URL}/health`);
      const health = await healthRes.json();
      console.log('   ✅', health.message || 'Serveur opérationnel');
    } catch (error) {
      console.log('   ❌ Le serveur backend n\'est pas démarré !');
      console.log('   💡 Démarrez-le avec: npm run dev');
      process.exit(1);
    }
    
    // Test 2: API Products
    console.log('\n2️⃣  Test Récupération des Produits...');
    const productsRes = await fetch(`${API_URL}/api/products?status=active`);
    
    if (!productsRes.ok) {
      throw new Error(`HTTP ${productsRes.status}`);
    }
    
    const productsData = await productsRes.json();
    
    if (productsData.success) {
      console.log(`   ✅ ${productsData.count || productsData.data?.length || 0} produits trouvés`);
      
      if (productsData.data && productsData.data.length > 0) {
        console.log('\n   📦 Premiers produits:');
        productsData.data.slice(0, 5).forEach((p, i) => {
          console.log(`   ${i + 1}. ${p.name}`);
          console.log(`      Catégorie: ${p.category_name} (${p.category_slug})`);
          console.log(`      Prix: ${p.price_min ? `${p.price_min}€` : 'N/A'}`);
          console.log(`      Images: ${p.images ? JSON.parse(p.images).length : 0}`);
        });
        
        console.log('\n✅ L\'API fonctionne correctement !');
        console.log('💡 Le frontend devrait pouvoir charger ces produits.');
      } else {
        console.log('   ⚠️  Aucun produit dans la réponse API');
        console.log('   💡 Exécutez: npm run init-db');
      }
    } else {
      console.log('   ❌ Erreur:', productsData.message);
    }
    
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.log('\n💡 Solutions:');
    console.log('   1. Vérifiez que le backend est démarré: npm run dev');
    console.log('   2. Vérifiez que le port 3001 est disponible');
    console.log('   3. Vérifiez que la base de données existe: ls -la data/products.db');
    process.exit(1);
  }
}

testConnection();

