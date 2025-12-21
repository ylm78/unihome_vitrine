/**
 * Script de test pour vérifier la configuration Stripe
 * Usage: node scripts/testStripe.js
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: join(__dirname, '../.env') });

console.log('\n🧪 Test de Configuration Stripe\n');
console.log('═'.repeat(50));

// Vérifier les variables d'environnement
const requiredVars = {
  'STRIPE_SECRET_KEY': process.env.STRIPE_SECRET_KEY,
  'STRIPE_WEBHOOK_SECRET': process.env.STRIPE_WEBHOOK_SECRET,
  'FRONTEND_URL': process.env.FRONTEND_URL || 'http://localhost:5090',
  'PORT': process.env.PORT || '3001'
};

let allGood = true;

console.log('\n📋 Variables d\'environnement :\n');

for (const [key, value] of Object.entries(requiredVars)) {
  if (key === 'STRIPE_SECRET_KEY' || key === 'STRIPE_WEBHOOK_SECRET') {
    if (!value || value.includes('votre_cle') || value.includes('temporaire')) {
      console.log(`❌ ${key}: ${value || 'NON DÉFINI'}`);
      console.log(`   ⚠️  Configurez cette variable dans backend/.env`);
      allGood = false;
    } else {
      // Masquer la clé pour la sécurité
      const masked = value.substring(0, 12) + '...' + value.substring(value.length - 4);
      console.log(`✅ ${key}: ${masked}`);
    }
  } else {
    console.log(`✅ ${key}: ${value}`);
  }
}

console.log('\n' + '═'.repeat(50));

// Vérifier la connexion Stripe
if (requiredVars.STRIPE_SECRET_KEY && !requiredVars.STRIPE_SECRET_KEY.includes('votre_cle')) {
  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(requiredVars.STRIPE_SECRET_KEY);
    
    // Tester la connexion en récupérant le compte
    const account = await stripe.accounts.retrieve();
    
    console.log('\n✅ Connexion Stripe réussie !');
    console.log(`   Compte: ${account.email || account.id}`);
    console.log(`   Mode: ${account.livemode ? 'PRODUCTION' : 'TEST'}`);
    
    if (account.livemode) {
      console.log('   ⚠️  ATTENTION: Vous êtes en mode PRODUCTION !');
    } else {
      console.log('   ✅ Mode TEST activé (parfait pour le développement)');
    }
  } catch (error) {
    console.log('\n❌ Erreur de connexion Stripe:');
    console.log(`   ${error.message}`);
    allGood = false;
  }
}

console.log('\n' + '═'.repeat(50));

// Instructions
console.log('\n📝 Instructions pour tester :\n');

if (!allGood) {
  console.log('1. Configurez les variables manquantes dans backend/.env');
  console.log('2. Redémarrez le serveur backend');
}

console.log('3. Dans un terminal séparé, lancez :');
console.log('   stripe listen --forward-to localhost:3001/api/payments/webhook');
console.log('4. Copiez le whsec_... affiché et mettez-le dans backend/.env');
console.log('5. Démarrez le backend : npm start');
console.log('6. Démarrez le frontend : cd ../frontend && npm run dev');
console.log('7. Allez sur http://localhost:5090');
console.log('8. Cliquez sur un produit > "Commander maintenant"');
console.log('9. Utilisez la carte de test : 4242 4242 4242 4242\n');

console.log('💳 Cartes de test Stripe :');
console.log('   ✅ Succès : 4242 4242 4242 4242');
console.log('   ❌ Refusé : 4000 0000 0000 0002');
console.log('   🔐 3D Secure : 4000 0025 0000 3155\n');

if (allGood) {
  console.log('✅ Configuration prête ! Vous pouvez commencer les tests.\n');
} else {
  console.log('⚠️  Corrigez les erreurs ci-dessus avant de tester.\n');
}

process.exit(allGood ? 0 : 1);


