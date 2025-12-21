# 🔐 Système d'Authentification - Guide d'Installation

## ✅ Ce qui a été créé

### Backend
- ✅ Tables utilisateurs dans la base de données
- ✅ Routes d'authentification (register, login, profile)
- ✅ Authentification JWT
- ✅ Intégration Google OAuth
- ✅ Middleware de protection des routes
- ✅ Hachage des mots de passe avec bcrypt

### Frontend (à créer)
- ⏳ Contexte d'authentification
- ⏳ Pages de connexion/inscription
- ⏳ Bouton Google OAuth
- ⏳ Protection des routes

## 📋 Installation

### 1. Installer les dépendances backend

```bash
cd backend
npm install
```

Nouvelles dépendances ajoutées :
- `jsonwebtoken` - Pour les tokens JWT
- `bcryptjs` - Pour le hachage des mots de passe
- `passport` - Middleware d'authentification
- `passport-google-oauth20` - Stratégie Google OAuth
- `cookie-parser` - Pour gérer les cookies
- `express-session` - Pour les sessions

### 2. Configurer les variables d'environnement

Créez un fichier `.env` dans le dossier `backend/` :

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=votre-secret-jwt-tres-securise-changez-moi-en-production
SESSION_SECRET=votre-secret-session-tres-securise
FRONTEND_URL=http://localhost:5090

# Google OAuth (optionnel mais recommandé)
GOOGLE_CLIENT_ID=votre-google-client-id
GOOGLE_CLIENT_SECRET=votre-google-client-secret
```

### 3. Configurer Google OAuth (Optionnel)

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet
3. Activez l'API "Google+ API"
4. Créez des identifiants OAuth 2.0
5. Ajoutez dans "Authorized redirect URIs" :
   - `http://localhost:3001/api/auth/google/callback`
6. Copiez le Client ID et Client Secret dans votre `.env`

### 4. Initialiser la base de données

Les tables d'authentification seront créées automatiquement au démarrage du serveur.

Ou manuellement :
```bash
cd backend
node -e "import('./database/authSchema.js').then(m => m.initAuthDatabase())"
```

### 5. Démarrer le backend

```bash
cd backend
npm run dev
```

## 🔌 Endpoints API Disponibles

### Publiques
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/google` - Connexion Google (redirection)
- `GET /api/auth/google/callback` - Callback Google

### Protégées (nécessitent un token)
- `GET /api/auth/me` - Récupérer le profil
- `PUT /api/auth/profile` - Mettre à jour le profil

## 📝 Format des requêtes

### Inscription
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "motdepasse123",
  "first_name": "Jean",
  "last_name": "Dupont",
  "phone": "+33123456789"
}
```

### Connexion
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "motdepasse123"
}
```

### Réponse
```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "first_name": "Jean",
      "last_name": "Dupont",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Utiliser le token
Ajoutez dans les headers :
```
Authorization: Bearer <votre-token>
```

## 🎨 Prochaines étapes Frontend

1. Créer les pages de connexion/inscription
2. Intégrer le contexte AuthContext
3. Ajouter la protection des routes
4. Créer le bouton "Connexion avec Google"

## 🔒 Sécurité

- Les mots de passe sont hachés avec bcrypt
- Les tokens JWT expirent après 7 jours
- Validation des données d'entrée
- Protection contre les injections SQL (paramètres préparés)

## 📞 Support

Si vous rencontrez des problèmes, vérifiez :
1. Les dépendances sont installées
2. Le backend est démarré
3. Les variables d'environnement sont configurées
4. La base de données est accessible

