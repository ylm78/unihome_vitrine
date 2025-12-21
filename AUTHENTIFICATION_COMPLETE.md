# 🔐 Système d'Authentification Complet - Installation

## ✅ Ce qui a été créé

### Backend (Complet ✅)
- ✅ Tables utilisateurs dans la base de données
- ✅ Modèle User avec gestion bcrypt
- ✅ Routes d'authentification (register, login, profile)
- ✅ Authentification JWT
- ✅ Intégration Google OAuth avec Passport
- ✅ Middleware de protection des routes
- ✅ Contrôleurs d'authentification

### Frontend (Complet ✅)
- ✅ Contexte d'authentification (AuthContext)
- ✅ Page de connexion (PageLogin)
- ✅ Page d'inscription (PageRegister)
- ✅ Page de callback Google (PageAuthCallback)
- ✅ Intégration Google OAuth
- ✅ Gestion du token JWT dans localStorage

## 🚀 Installation Rapide

### 1. Backend - Installer les dépendances

```bash
cd backend
npm install
```

**Nouvelles dépendances:**
- jsonwebtoken
- bcryptjs
- passport
- passport-google-oauth20
- cookie-parser
- express-session

### 2. Configurer les variables d'environnement

Créez ou modifiez `backend/.env` :

```env
PORT=3001
NODE_ENV=development

# JWT Secret (changez-le en production!)
JWT_SECRET=votre-secret-jwt-tres-securise-changez-moi-en-production

# Session Secret
SESSION_SECRET=votre-secret-session-tres-securise

# Frontend URL
FRONTEND_URL=http://localhost:5090

# Google OAuth (optionnel - pour la connexion Google)
GOOGLE_CLIENT_ID=votre-google-client-id
GOOGLE_CLIENT_SECRET=votre-google-client-secret
```

### 3. Configurer Google OAuth (Optionnel)

Si vous voulez activer la connexion Google :

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un projet
3. Activez "Google+ API"
4. Créez des identifiants OAuth 2.0
5. Dans "Authorized redirect URIs", ajoutez :
   ```
   http://localhost:3001/api/auth/google/callback
   ```
6. Copiez le Client ID et Secret dans votre `.env`

**Note:** La connexion classique (email/password) fonctionne sans Google OAuth.

### 4. Initialiser la base de données

Les tables d'authentification seront créées automatiquement au premier démarrage du serveur.

### 5. Démarrer le backend

```bash
cd backend
npm run dev
```

## 📡 Endpoints API

### Publiques
- `POST /api/auth/register` - Inscription
  ```json
  {
    "email": "user@example.com",
    "password": "motdepasse123",
    "first_name": "Jean",
    "last_name": "Dupont",
    "phone": "+33123456789"
  }
  ```

- `POST /api/auth/login` - Connexion
  ```json
  {
    "email": "user@example.com",
    "password": "motdepasse123"
  }
  ```

- `GET /api/auth/google` - Redirection vers Google OAuth

### Protégées (nécessitent un token)
- `GET /api/auth/me` - Récupérer le profil
  ```
  Header: Authorization: Bearer <token>
  ```

- `PUT /api/auth/profile` - Mettre à jour le profil
  ```
  Header: Authorization: Bearer <token>
  Body: { "first_name": "...", "last_name": "...", "phone": "..." }
  ```

## 🎨 Utilisation dans le Frontend

### Exemple d'utilisation du contexte

```tsx
import { useAuth } from './contexts/AuthContext';
import { loginWithGoogle } from './contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (isAuthenticated) {
    return <div>Bonjour {user?.first_name}!</div>;
  }

  return <button onClick={() => login(email, password)}>Se connecter</button>;
}
```

### Routes disponibles

- `/login` - Page de connexion
- `/register` - Page d'inscription
- `/auth/callback` - Callback Google (automatique)

## 🔒 Sécurité

- ✅ Mots de passe hachés avec bcrypt (10 rounds)
- ✅ Tokens JWT avec expiration (7 jours)
- ✅ Validation des données d'entrée
- ✅ Protection contre les injections SQL
- ✅ Sessions sécurisées

## 📝 Exemple de réponse API

### Succès
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

### Erreur
```json
{
  "success": false,
  "message": "Email ou mot de passe incorrect"
}
```

## 🧪 Tester l'authentification

### 1. Inscription
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### 2. Connexion
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Profil (avec token)
```bash
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer <votre-token>"
```

## 🎉 C'est prêt !

Vous pouvez maintenant :
1. Créer des comptes utilisateurs
2. Se connecter avec email/password
3. Se connecter avec Google (si configuré)
4. Protéger vos routes avec le middleware `authenticateToken`

## 📞 Support

Si vous avez des problèmes :
1. Vérifiez que toutes les dépendances sont installées
2. Vérifiez les variables d'environnement
3. Vérifiez que le backend est démarré
4. Consultez les logs du serveur

