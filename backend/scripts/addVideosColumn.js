import { initDatabase, dbRun, dbGet, dbAll } from '../database/db.js';
import db from '../database/db.js';

async function addVideosColumn() {
  try {
    console.log('🔧 Ajout du champ videos à la table products...\n');
    
    // Vérifier si la colonne existe déjà
    const tableInfo = await dbAll(
      `PRAGMA table_info(products)`
    );
    
    const hasVideosColumn = tableInfo.some(col => col.name === 'videos');
    
    if (hasVideosColumn) {
      console.log('✅ La colonne videos existe déjà\n');
    } else {
      // Ajouter la colonne videos
      await dbRun(
        `ALTER TABLE products ADD COLUMN videos TEXT`
      );
      console.log('✅ Colonne videos ajoutée avec succès\n');
    }
    
    // Afficher la structure de la table
    const newTableInfo = await dbAll(`PRAGMA table_info(products)`);
    console.log('📊 Structure de la table products:');
    newTableInfo.forEach(col => {
      console.log(`   - ${col.name} (${col.type})`);
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

addVideosColumn();

