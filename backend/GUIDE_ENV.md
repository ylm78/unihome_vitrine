# 📝 Guide de Configuration du fichier .env

## 📍 Où créer le fichier .env ?

Le fichier `.env` doit être créé dans le dossier **`backend/`**

Chemin complet : `/Users/yilmaz-a/Desktop/unihome_vitrine/backend/.env`

## 🚀 Création rapide

### Méthode 1 : Copier le fichier d'exemple

```bash
cd backend
cp .env.example .env
```

Puis éditez le fichier `.env` avec vos valeurs.

### Méthode 2 : Créer manuellement

Créez un fichier nommé `.env` dans le dossier `backend/` avec ce contenu :

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=votre-secret-jwt-tres-securise-changez-moi-en-production
SESSION_SECRET=votre-secret-session-tres-securise-changez-moi
FRONTEND_URL=http://localhost:5090
```

## 🔑 Explications des variables

### Variables Requises

#### `PORT`

- **Valeur par défaut** : `3001`
- **Description** : Port sur lequel le serveur backend va écouter
- **Exemple** : `PORT=3001`

#### `JWT_SECRET`

- **Requis** : ✅ OUI (mais peut utiliser la valeur par défaut du code)
- **Description** : Secret pour signer et vérifier les tokens JWT
- **Comment générer** : Utilisez une chaîne aléatoire longue et sécurisée
- **Exemple** : `JWT_SECRET=ma-super-secret-key-12345-super-longue-et-securisee`
- **⚠️ Important** : Changez cette valeur en production !

#### `SESSION_SECRET`

- **Requis** : ✅ OUI (mais peut utiliser la valeur par défaut du code)
- **Description** : Secret pour les sessions Express
- **Comment générer** : Utilisez une chaîne aléatoire longue et sécurisée
- **Exemple** : `SESSION_SECRET=mon-secret-session-super-securise-67890`

#### `FRONTEND_URL`

- **Valeur par défaut** : `http://localhost:5090`
- **Description** : URL du frontend (pour CORS et redirections OAuth)
- **Exemple** : `FRONTEND_URL=http://localhost:5090`

### Variables Optionnelles

#### `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET`

- **Requis** : ❌ NON (la connexion classique fonctionne sans)
- **Description** : Identifiants Google OAuth pour la connexion avec Google
- **Comment obtenir** : Voir la section "Configurer Google OAuth" ci-dessous

#### `STRIPE_SECRET_KEY`

- **Requis** : ✅ OUI (pour activer les paiements)
- **Description** : Clé secrète Stripe pour les paiements
- **Comment obtenir** : Voir la section "Configurer Stripe" ci-dessous
- **Exemple** : `STRIPE_SECRET_KEY=sk_test_51AbCdEf...`

#### `STRIPE_WEBHOOK_SECRET`

- **Requis** : ⚠️ OUI (pour les webhooks en production)
- **Description** : Secret pour vérifier les webhooks Stripe
- **Comment obtenir** : Voir la section "Configurer Stripe" ci-dessous
- **Exemple** : `STRIPE_WEBHOOK_SECRET=whsec_...`

## 🔧 Configuration minimale (sans Google OAuth)

Pour commencer rapidement, créez un `.env` avec juste :

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=changez-moi-par-un-secret-securise-123456789
SESSION_SECRET=changez-moi-par-un-secret-securise-987654321
FRONTEND_URL=http://localhost:5090
```

L'authentification classique (email/password) fonctionnera parfaitement.

## 🔐 Générer des secrets sécurisés

### Méthode 1 : En ligne de commande (Node.js)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Méthode 2 : En ligne de commande (OpenSSL)

```bash
openssl rand -hex 32
```

Exécutez ces commandes 2 fois pour générer 2 secrets différents (un pour JWT_SECRET, un pour SESSION_SECRET).

## 💳 Configurer Stripe (Requis pour les paiements)

### Étape 1 : Créer un compte Stripe

1. Allez sur [Stripe.com](https://stripe.com) et créez un compte
2. Accédez au [Tableau de bord Stripe](https://dashboard.stripe.com)

### Étape 2 : Récupérer les clés API

1. Dans le tableau de bord, allez dans **"Developers"** > **"API keys"**
2. Copiez la **"Secret key"** (commence par `sk_test_` en mode test)
3. Ajoutez-la dans votre `.env` :
   ```env
   STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_ici
   ```

### Étape 3 : Configurer les webhooks (Production)

1. Dans le tableau de bord, allez dans **"Developers"** > **"Webhooks"**
2. Cliquez sur **"Add endpoint"**
3. URL du endpoint : `https://votre-domaine.com/api/payments/webhook`
4. Sélectionnez les événements :
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
5. Copiez le **"Signing secret"** (commence par `whsec_`)
6. Ajoutez-le dans votre `.env` :
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_votre_secret_webhook_ici
   ```

### Mode Test vs Production

- **Mode Test** : Utilisez les clés commençant par `sk_test_` et `pk_test_`
- **Mode Production** : Utilisez les clés commençant par `sk_live_` et `pk_live_`

⚠️ **Important** : Ne partagez jamais vos clés secrètes (`sk_`) publiquement !

## 🌐 Configurer Google OAuth (Optionnel)

### Étape 1 : Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Cliquez sur "Créer un projet"
3. Donnez un nom à votre projet (ex: "UNIHOME Auth")
4. Cliquez sur "Créer"

### Étape 2 : Configurer OAuth

1. Dans le menu, allez dans **"APIs & Services"** > **"Credentials"**
2. Cliquez sur **"Create Credentials"** > **"OAuth client ID"**
3. Si demandé, configurez l'écran de consentement OAuth
4. Sélectionnez **"Web application"**
5. Donnez un nom (ex: "UNIHOME Web Client")
6. Dans **"Authorized redirect URIs"**, ajoutez :
   ```
   http://localhost:3001/api/auth/google/callback
   ```
7. Cliquez sur **"Create"**
8. Copiez le **Client ID** et le **Client Secret**

### Étape 3 : Ajouter dans le .env

Ajoutez ces lignes dans votre fichier `.env` :

```env
GOOGLE_CLIENT_ID=votre-client-id-google.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre-client-secret-google
```

## 📋 Exemple de fichier .env complet

```env
# Port du serveur
PORT=3001

# Environnement
NODE_ENV=development

# Secrets (générés avec la commande ci-dessus)
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
SESSION_SECRET=z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6b5a4

# URL du frontend
FRONTEND_URL=http://localhost:5090

# Google OAuth (optionnel)
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz

# Stripe (requis pour les paiements)
STRIPE_SECRET_KEY=sk_test_votre_cle_secrete_stripe
STRIPE_WEBHOOK_SECRET=whsec_votre_secret_webhook_stripe
```

## ✅ Vérifier que le .env est bien chargé

Au démarrage du serveur, vous ne devriez pas voir d'erreur concernant les variables d'environnement.

Si vous voyez des erreurs comme :

- `JWT_SECRET is not defined`
- `Cannot read property of undefined`

Cela signifie que le fichier `.env` n'est pas trouvé ou mal configuré.

## 🔒 Sécurité

⚠️ **IMPORTANT** :

- Le fichier `.env` est dans `.gitignore` (il ne sera pas commité)
- **NE PARTAGEZ JAMAIS** votre fichier `.env`
- Changez les secrets en production
- Utilisez des secrets différents pour chaque environnement (dev, staging, prod)

## 📍 Emplacement du fichier

```
unihome_vitrine/
  └── backend/
      ├── .env          ← CRÉEZ CE FICHIER ICI
      ├── .env.example  ← Fichier d'exemple (copiez-le)
      ├── package.json
      └── server.js
```

## 🆘 Problèmes courants

### Le fichier .env n'est pas pris en compte

1. Vérifiez que le fichier est bien nommé `.env` (avec le point au début)
2. Vérifiez qu'il est dans le dossier `backend/`
3. Redémarrez le serveur après modification

### Erreur "dotenv is not installed"

Le package `dotenv` devrait être installé automatiquement. Si ce n'est pas le cas :

```bash
cd backend
npm install dotenv
```

Mais normalement, il devrait déjà être dans les dépendances.
