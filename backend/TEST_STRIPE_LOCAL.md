# 🧪 Guide de Test Stripe en Local

Ce guide vous explique étape par étape comment tester les paiements Stripe sur votre machine locale.

## 📋 Prérequis

1. ✅ Un compte Stripe (gratuit) : [stripe.com](https://stripe.com)
2. ✅ Node.js installé
3. ✅ Les dépendances installées (`npm install` dans backend et frontend)

## 🚀 Configuration Rapide (5 minutes)

### Étape 1 : Installer Stripe CLI

```bash
# macOS (avec Homebrew)
brew install stripe/stripe-cli/stripe

# Ou téléchargez depuis : https://stripe.com/docs/stripe-cli
```

### Étape 2 : Se connecter à Stripe

```bash
stripe login
```

Cela ouvrira votre navigateur pour vous authentifier avec votre compte Stripe.

### Étape 3 : Configurer le fichier backend/.env

Créez ou modifiez le fichier `backend/.env` avec :

```env
# Configuration de base
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5090

# Stripe - Récupérez ces valeurs depuis dashboard.stripe.com
# Developers > API keys > Secret key (copiez sk_test_...)
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_ici

# Le webhook secret sera obtenu à l'étape suivante
STRIPE_WEBHOOK_SECRET=whsec_temporaire
```

**Où trouver STRIPE_SECRET_KEY :**
1. Allez sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Developers** > **API keys**
3. Copiez la **"Secret key"** (commence par `sk_test_`)

### Étape 4 : Démarrer l'écoute des webhooks

Ouvrez un **nouveau terminal** et exécutez :

```bash
stripe listen --forward-to localhost:3001/api/payments/webhook
```

Vous verrez quelque chose comme :

```
> Ready! Your webhook signing secret is whsec_1234567890abcdef... (^C to quit)
```

**Copiez le secret** (commence par `whsec_`) et mettez-le dans `backend/.env` :

```env
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef...
```

⚠️ **IMPORTANT** : Gardez ce terminal ouvert pendant tous vos tests !

### Étape 5 : Démarrer les serveurs

**Terminal 1 - Backend :**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend :**
```bash
cd frontend
npm run dev
```

**Terminal 3 - Stripe CLI (déjà lancé à l'étape 4) :**
```bash
stripe listen --forward-to localhost:3001/api/payments/webhook
```

## 🧪 Tester un Paiement

### 1. Ouvrir le site

Allez sur [http://localhost:5090](http://localhost:5090)

### 2. Cliquer sur un produit

- Parcourez les produits
- Cliquez sur un produit pour ouvrir le modal

### 3. Cliquer sur "Commander maintenant"

- Remplissez le formulaire :
  - Nom : `Test User`
  - Email : `test@example.com`

### 4. Utiliser une carte de test Stripe

Dans le formulaire de paiement Stripe, utilisez :

**✅ Carte de test réussie :**
```
Numéro : 4242 4242 4242 4242
Date : 12/34 (ou toute date future)
CVC : 123 (ou n'importe quel 3 chiffres)
Code postal : 75001 (ou n'importe quel code postal)
```

**❌ Carte de test refusée :**
```
Numéro : 4000 0000 0000 0002
```

**🔐 Carte nécessitant 3D Secure :**
```
Numéro : 4000 0025 0000 3155
```

### 5. Vérifier le résultat

- ✅ **Succès** : Vous serez redirigé vers `/payment/success`
- ❌ **Échec** : Vous serez redirigé vers `/payment/cancel`

## 🔍 Vérifier que tout fonctionne

### Vérifier les logs backend

Dans le terminal du backend, vous devriez voir :
```
✅ Paiement réussi: cs_test_...
```

### Vérifier les logs Stripe CLI

Dans le terminal de `stripe listen`, vous devriez voir :
```
2024-01-XX XX:XX:XX   --> checkout.session.completed [evt_...]
2024-01-XX XX:XX:XX  <--  [200] POST http://localhost:3001/api/payments/webhook [evt_...]
```

### Vérifier dans le tableau de bord Stripe

1. Allez sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Payments** : Vous devriez voir les paiements de test
3. **Developers** > **Events** : Vous verrez tous les événements webhooks

## 🐛 Problèmes Courants

### Erreur "No API key provided"

**Solution :** Vérifiez que `STRIPE_SECRET_KEY` est bien dans `backend/.env` et que le serveur a été redémarré.

### Erreur "Invalid API key"

**Solution :** Vérifiez que vous utilisez une clé de test (commence par `sk_test_`) et qu'elle est complète.

### Les webhooks ne fonctionnent pas

**Solution :** 
1. Vérifiez que `stripe listen` est en cours d'exécution
2. Vérifiez que `STRIPE_WEBHOOK_SECRET` dans `.env` correspond au secret affiché par `stripe listen`
3. Redémarrez le serveur backend après avoir modifié `.env`

### Le paiement ne se complète pas

**Solution :**
1. Vérifiez les logs du backend
2. Vérifiez les logs de `stripe listen`
3. Vérifiez que `FRONTEND_URL` dans `.env` correspond à l'URL de votre frontend

### Erreur CORS

**Solution :** Vérifiez que `FRONTEND_URL` dans `backend/.env` est `http://localhost:5090`

## 📊 Cartes de Test Stripe

Stripe fournit plusieurs cartes de test pour différents scénarios :

| Scénario | Numéro de carte |
|----------|----------------|
| ✅ Paiement réussi | `4242 4242 4242 4242` |
| ❌ Paiement refusé | `4000 0000 0000 0002` |
| 🔐 3D Secure requis | `4000 0025 0000 3155` |
| 💳 Carte débit | `4000 0566 5566 5556` |
| 🏦 Carte nécessitant une authentification | `4000 0027 6000 3184` |

**Pour toutes ces cartes :**
- Date : N'importe quelle date future (ex: `12/34`)
- CVC : N'importe quel 3 chiffres (ex: `123`)
- Code postal : N'importe quel code postal (ex: `75001`)

## ✅ Checklist de Test

- [ ] Stripe CLI installé
- [ ] Connecté à Stripe (`stripe login`)
- [ ] `stripe listen` en cours d'exécution
- [ ] `STRIPE_SECRET_KEY` dans `backend/.env`
- [ ] `STRIPE_WEBHOOK_SECRET` dans `backend/.env` (depuis `stripe listen`)
- [ ] Backend démarré (`npm start` dans backend/)
- [ ] Frontend démarré (`npm run dev` dans frontend/)
- [ ] Testé avec la carte `4242 4242 4242 4242`
- [ ] Vérifié la redirection vers `/payment/success`
- [ ] Vérifié les logs backend et Stripe CLI

## 🎯 Prochaines Étapes

Une fois que tout fonctionne en local :

1. **Tester différents scénarios** (paiement refusé, 3D Secure, etc.)
2. **Vérifier les commandes en base de données** (table `orders`)
3. **Configurer pour la production** (voir `STRIPE_SETUP.md`)

---

**Besoin d'aide ?** Consultez `STRIPE_SETUP.md` pour plus de détails ou la [documentation Stripe](https://stripe.com/docs/testing).


