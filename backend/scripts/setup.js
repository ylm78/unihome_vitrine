import { initDatabase } from '../database/db.js';
import db from '../database/db.js';

console.log('🚀 Configuration du backend UNIHOME...\n');

async function setup() {
  try {
    console.log('1️⃣  Initialisation de la base de données...');
    await initDatabase();
    
    console.log('\n✅ Configuration terminée avec succès!');
    console.log('\n📝 Prochaines étapes:');
    console.log('   - Exécutez: npm run init-db (pour remplir la base avec les produits)');
    console.log('   - Exécutez: npm run dev (pour démarrer le serveur)');
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error);
    process.exit(1);
  } finally {
    db.close((err) => {
      if (err) {
        console.error('Erreur lors de la fermeture:', err.message);
      }
      process.exit(0);
    });
  }
}

setup();

