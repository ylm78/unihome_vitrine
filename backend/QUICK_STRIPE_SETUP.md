# ⚡ Configuration Rapide Stripe

## 🎯 Pour commencer rapidement (Développement)

### 1. Obtenir STRIPE_SECRET_KEY

1. Allez sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Developers** > **API keys**
3. Copiez la **"Secret key"** (commence par `sk_test_`)
4. Ajoutez dans `backend/.env` :
   ```env
   STRIPE_SECRET_KEY=sk_test_votre_cle_ici
   ```

### 2. Obtenir STRIPE_WEBHOOK_SECRET (Développement Local)

#### Option A : Avec Stripe CLI (Recommandé)

```bash
# 1. Installer Stripe CLI
brew install stripe/stripe-cli/stripe

# 2. Se connecter
stripe login

# 3. Démarrer l'écoute (dans un terminal séparé)
stripe listen --forward-to localhost:3001/api/payments/webhook
```

Cette commande affichera : `whsec_...` → Copiez cette valeur !

Ajoutez dans `backend/.env` :
```env
STRIPE_WEBHOOK_SECRET=whsec_la_valeur_affichée
```

#### Option B : Sans Stripe CLI (Temporaire)

Pour tester rapidement sans webhooks, vous pouvez mettre une valeur temporaire :

```env
STRIPE_WEBHOOK_SECRET=whsec_temporaire_pour_dev
```

⚠️ **Note** : Les webhooks ne fonctionneront pas, mais vous pourrez tester les paiements. Pour un fonctionnement complet, utilisez l'Option A.

### 3. Redémarrer le serveur

```bash
cd backend
npm start
```

## ✅ Vérification

1. Le serveur démarre sans erreur
2. Allez sur votre site
3. Cliquez sur un produit
4. Cliquez sur "Commander maintenant"
5. Utilisez la carte de test : `4242 4242 4242 4242`

## 🔄 Pour la Production

Quand vous déployez en production :

1. Allez dans **Stripe Dashboard** > **Developers** > **Webhooks**
2. Créez un endpoint avec l'URL : `https://votre-domaine.com/api/payments/webhook`
3. Sélectionnez les événements de paiement
4. Copiez le **Signing secret** et mettez-le dans votre `.env` de production

---

**Besoin d'aide ?** Consultez `STRIPE_SETUP.md` pour plus de détails.


