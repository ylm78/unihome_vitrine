# 🧪 Comment Tester Stripe en Local - Guide Rapide

## ⚡ Démarrage Rapide (5 minutes)

### 1️⃣ Vérifier la configuration

```bash
cd backend
npm run test-stripe
```

Ce script vérifie que tout est bien configuré.

### 2️⃣ Configurer Stripe dans backend/.env

Ouvrez `backend/.env` et ajoutez :

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_votre_cle_ici
STRIPE_WEBHOOK_SECRET=whsec_temporaire
```

**Où trouver STRIPE_SECRET_KEY :**
1. Allez sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Developers** > **API keys**
3. Copiez la **"Secret key"** (commence par `sk_test_`)

### 3️⃣ Démarrer Stripe CLI (Terminal 1)

```bash
# Se connecter à Stripe (première fois seulement)
stripe login

# Démarrer l'écoute des webhooks
stripe listen --forward-to localhost:3001/api/payments/webhook
```

**Copiez le `whsec_...` affiché** et mettez-le dans `backend/.env` :

```env
STRIPE_WEBHOOK_SECRET=whsec_la_valeur_copiée
```

⚠️ **Gardez ce terminal ouvert !**

### 4️⃣ Démarrer le Backend (Terminal 2)

```bash
cd backend
npm start
```

### 5️⃣ Démarrer le Frontend (Terminal 3)

```bash
cd frontend
npm run dev
```

### 6️⃣ Tester un Paiement

1. Allez sur [http://localhost:5090](http://localhost:5090)
2. Cliquez sur un produit
3. Cliquez sur **"Commander maintenant"**
4. Remplissez le formulaire :
   - Nom : `Test User`
   - Email : `test@example.com`
5. Dans le formulaire Stripe, utilisez :
   - **Carte** : `4242 4242 4242 4242`
   - **Date** : `12/34` (ou toute date future)
   - **CVC** : `123`
   - **Code postal** : `75001`
6. Cliquez sur **"Payer"**

### 7️⃣ Vérifier le Résultat

✅ **Succès** : Vous serez redirigé vers `/payment/success`

❌ **Échec** : Vous serez redirigé vers `/payment/cancel`

---

## 🔍 Vérifications

### Vérifier les logs Backend

Dans le terminal du backend, vous devriez voir :
```
✅ Paiement réussi: cs_test_...
```

### Vérifier les logs Stripe CLI

Dans le terminal de `stripe listen`, vous devriez voir :
```
--> checkout.session.completed [evt_...]
<--  [200] POST http://localhost:3001/api/payments/webhook
```

### Vérifier dans Stripe Dashboard

1. Allez sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Payments** : Vous verrez les paiements de test
3. **Developers** > **Events** : Vous verrez les événements webhooks

---

## 💳 Cartes de Test Stripe

| Scénario | Numéro de carte |
|----------|----------------|
| ✅ Paiement réussi | `4242 4242 4242 4242` |
| ❌ Paiement refusé | `4000 0000 0000 0002` |
| 🔐 3D Secure requis | `4000 0025 0000 3155` |

**Pour toutes :**
- Date : N'importe quelle date future (ex: `12/34`)
- CVC : N'importe quel 3 chiffres (ex: `123`)
- Code postal : N'importe quel code postal (ex: `75001`)

---

## 🐛 Problèmes Courants

### "No API key provided"
→ Vérifiez que `STRIPE_SECRET_KEY` est dans `backend/.env` et redémarrez le serveur

### "Invalid API key"
→ Vérifiez que vous utilisez une clé de test (`sk_test_...`)

### Les webhooks ne fonctionnent pas
→ Vérifiez que `stripe listen` est en cours d'exécution et que `STRIPE_WEBHOOK_SECRET` correspond

### Erreur CORS
→ Vérifiez que `FRONTEND_URL=http://localhost:5090` dans `backend/.env`

---

## 📚 Documentation Complète

- Guide détaillé : `backend/TEST_STRIPE_LOCAL.md`
- Configuration : `backend/STRIPE_SETUP.md`
- Guide rapide : `backend/QUICK_STRIPE_SETUP.md`

---

**Besoin d'aide ?** Exécutez `npm run test-stripe` dans le dossier `backend/` pour diagnostiquer les problèmes.


