# 💳 Guide de Configuration Stripe

## 📋 Vue d'ensemble

Ce guide vous explique comment configurer Stripe pour activer les paiements sur votre site UNIHOME.

## 🚀 Configuration rapide

### 1. Créer un compte Stripe

1. Allez sur [stripe.com](https://stripe.com) et créez un compte
2. Accédez au [Tableau de bord Stripe](https://dashboard.stripe.com)

### 2. Récupérer les clés API

1. Dans le tableau de bord, allez dans **"Developers"** > **"API keys"**
2. Vous verrez deux clés :
   - **Publishable key** (commence par `pk_test_` en mode test) - pour le frontend
   - **Secret key** (commence par `sk_test_` en mode test) - pour le backend

### 3. Configurer le fichier .env

Ajoutez ces lignes dans votre fichier `backend/.env` :

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_ici
STRIPE_WEBHOOK_SECRET=whsec_votre_secret_webhook_ici
```

⚠️ **Important** : En mode test, utilisez les clés commençant par `sk_test_` et `pk_test_`.

## 🔧 Configuration des Webhooks

Les webhooks permettent à Stripe de notifier votre serveur lorsque des événements de paiement se produisent.

### 📍 Où trouver le STRIPE_WEBHOOK_SECRET ?

**Il y a 2 méthodes selon votre contexte :**

---

### 🖥️ Méthode 1 : Développement Local (Recommandé pour commencer)

Si vous testez en local, utilisez **Stripe CLI** :

#### Étape 1 : Installer Stripe CLI

```bash
# macOS (avec Homebrew)
brew install stripe/stripe-cli/stripe

# Ou téléchargez depuis : https://stripe.com/docs/stripe-cli
```

#### Étape 2 : Se connecter à votre compte Stripe

```bash
stripe login
```

Cela ouvrira votre navigateur pour vous authentifier.

#### Étape 3 : Démarrer l'écoute des webhooks

```bash
stripe listen --forward-to localhost:3001/api/payments/webhook
```

**Cette commande affichera quelque chose comme :**

```
> Ready! Your webhook signing secret is whsec_1234567890abcdef... (^C to quit)
```

**Copiez ce secret** (commence par `whsec_`) et ajoutez-le dans votre `backend/.env` :

```env
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef...
```

⚠️ **Important** : Gardez cette commande `stripe listen` en cours d'exécution pendant vos tests !

---

### 🌐 Méthode 2 : Production (Quand votre site est en ligne)

Si votre site est déployé en production :

#### Étape 1 : Accéder au tableau de bord Stripe

1. Allez sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. Connectez-vous à votre compte

#### Étape 2 : Créer un endpoint webhook

1. Dans le menu de gauche, cliquez sur **"Developers"** > **"Webhooks"**
2. Cliquez sur **"Add endpoint"** (ou "Ajouter un endpoint")
3. **URL du endpoint** : `https://votre-domaine.com/api/payments/webhook`
   - Remplacez `votre-domaine.com` par votre vrai domaine
   - Exemple : `https://unihome.fr/api/payments/webhook`
4. Cliquez sur **"Add endpoint"**

#### Étape 3 : Sélectionner les événements

Cochez ces événements :
- ✅ `checkout.session.completed`
- ✅ `checkout.session.async_payment_succeeded`
- ✅ `checkout.session.async_payment_failed`

Puis cliquez sur **"Add endpoint"**

#### Étape 4 : Récupérer le Signing secret

1. Une fois l'endpoint créé, cliquez dessus
2. Dans la section **"Signing secret"**, cliquez sur **"Reveal"** ou **"Révéler"**
3. **Copiez le secret** (commence par `whsec_`)
4. Ajoutez-le dans votre `backend/.env` :

```env
STRIPE_WEBHOOK_SECRET=whsec_votre_secret_de_production
```

---

### ⚠️ Note importante

- **En développement** : Utilisez la Méthode 1 (Stripe CLI)
- **En production** : Utilisez la Méthode 2 (Tableau de bord)
- **Ne mélangez pas** : Chaque environnement a son propre secret webhook

### Étape 4 : Configurer les webhooks en production

1. Dans le tableau de bord Stripe, allez dans **"Developers"** > **"Webhooks"**
2. Cliquez sur **"Add endpoint"**
3. URL du endpoint : `https://votre-domaine.com/api/payments/webhook`
4. Sélectionnez les événements à écouter :
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
5. Copiez le **"Signing secret"** et ajoutez-le dans votre `.env`

## 🧪 Tester les paiements

### Mode Test

Stripe fournit des cartes de test pour simuler différents scénarios :

**Carte de test réussie :**
- Numéro : `4242 4242 4242 4242`
- Date d'expiration : n'importe quelle date future (ex: `12/34`)
- CVC : n'importe quel 3 chiffres (ex: `123`)
- Code postal : n'importe quel code postal (ex: `75001`)

**Carte de test refusée :**
- Numéro : `4000 0000 0000 0002`

**Carte nécessitant une authentification 3D Secure :**
- Numéro : `4000 0025 0000 3155`

### Tester le flux complet

1. Démarrez le backend : `cd backend && npm start`
2. Démarrez le frontend : `cd frontend && npm run dev`
3. Allez sur le site et cliquez sur un produit
4. Cliquez sur "Commander maintenant"
5. Remplissez le formulaire et utilisez une carte de test
6. Vérifiez que vous êtes redirigé vers la page de succès

## 📊 Voir les paiements

Dans le tableau de bord Stripe :
- **"Payments"** : Liste de tous les paiements
- **"Customers"** : Liste de tous les clients
- **"Orders"** : Commandes créées via l'API

## 🔒 Sécurité

⚠️ **IMPORTANT** :
- Ne partagez **JAMAIS** votre clé secrète (`sk_`) publiquement
- Ne commitez **JAMAIS** votre fichier `.env` dans Git
- Utilisez des clés différentes pour le développement et la production
- Activez la protection contre la fraude dans le tableau de bord Stripe

## 🆘 Problèmes courants

### Erreur "No API key provided"

Vérifiez que `STRIPE_SECRET_KEY` est bien défini dans votre `.env` et que le serveur a été redémarré.

### Erreur "Invalid API key"

Vérifiez que vous utilisez la bonne clé (test vs production) et qu'elle est complète.

### Les webhooks ne fonctionnent pas

1. Vérifiez que `STRIPE_WEBHOOK_SECRET` est correct
2. Vérifiez que l'URL du webhook est accessible depuis Internet (en production)
3. Utilisez Stripe CLI pour tester localement

### Le paiement ne se complète pas

1. Vérifiez les logs du serveur backend
2. Vérifiez les logs dans le tableau de bord Stripe
3. Vérifiez que les URLs de redirection (`success_url` et `cancel_url`) sont correctes

## 📚 Ressources

- [Documentation Stripe](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Stripe Testing](https://stripe.com/docs/testing)

