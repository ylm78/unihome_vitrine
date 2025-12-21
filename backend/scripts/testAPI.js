import fetch from 'node-fetch';

const API_URL = 'http://localhost:3001/api';

async function testAPI() {
  console.log('🧪 Test de l\'API UNIHOME\n');
  
  try {
    // Test Health
    console.log('1️⃣  Test Health Check...');
    const healthRes = await fetch(`${API_URL.replace('/api', '')}/health`);
    const health = await healthRes.json();
    console.log('   ✅', health.message || 'Serveur opérationnel');
    
    // Test Products
    console.log('\n2️⃣  Test Récupération des Produits...');
    const productsRes = await fetch(`${API_URL}/products?status=active`);
    const productsData = await productsRes.json();
    
    if (productsData.success) {
      console.log(`   ✅ ${productsData.count} produits trouvés`);
      
      if (productsData.data && productsData.data.length > 0) {
        console.log('\n   📦 Premiers produits:');
        productsData.data.slice(0, 5).forEach((p, i) => {
          console.log(`   ${i + 1}. ${p.name} (${p.category_name})`);
          console.log(`      - Prix: ${p.price_min ? `${p.price_min}€` : 'N/A'}`);
          console.log(`      - Images: ${p.images ? JSON.parse(p.images).length : 0}`);
        });
      } else {
        console.log('   ⚠️  Aucun produit dans la base de données');
        console.log('   💡 Exécutez: npm run setup');
      }
    } else {
      console.log('   ❌ Erreur:', productsData.message);
    }
    
    // Test Categories
    console.log('\n3️⃣  Test Récupération des Catégories...');
    const categoriesRes = await fetch(`${API_URL}/categories`);
    const categoriesData = await categoriesRes.json();
    
    if (categoriesData.success) {
      console.log(`   ✅ ${categoriesData.count} catégories trouvées`);
      categoriesData.data.forEach((cat, i) => {
        console.log(`   ${i + 1}. ${cat.name} (${cat.product_count} produits)`);
      });
    }
    
    console.log('\n✅ Tests terminés!\n');
    
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error.message);
    console.log('\n💡 Assurez-vous que le serveur backend est démarré: npm run dev');
    process.exit(1);
  }
}

testAPI();

