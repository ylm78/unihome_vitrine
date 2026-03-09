# Système de connexion / inscription UNIHOME

## Vue d'ensemble

Le système d'authentification est **fonctionnel** et propose :

- **Inscription** (email + mot de passe)
- **Connexion** (email + mot de passe)
- **Connexion Google** (OAuth 2.0, optionnel)
- **Profil utilisateur** (lecture / modification)
- **Gestion de session** (JWT stocké dans `localStorage`)

---

## Architecture

### Frontend (React)

| Fichier | Rôle |
|---------|------|
| `src/contexts/AuthContext.tsx` | Gestion globale de l’auth (état, `login`, `register`, `logout`, récupération du profil) |
| `src/pages/PageLogin.tsx` | Page de connexion |
| `src/pages/PageRegister.tsx` | Page d’inscription |
| `src/pages/PageAuthCallback.tsx` | Traitement du retour OAuth Google |
| `src/pages/PageProfile.tsx` | Profil et modification des données |
| `src/components/UserMenu.tsx` | Menu utilisateur (connexion / déconnexion) |

### Backend (Express)

| Fichier | Rôle |
|---------|------|
| `routes/authRoutes.js` | Routes API auth |
| `controllers/authController.js` | Logique métier (register, login, profil, Google) |
| `models/User.js` | Accès aux utilisateurs (SQLite) |
| `middleware/auth.js` | Validation JWT, génération de tokens |
| `config/passport.js` | Stratégie OAuth Google |
| `database/authSchema.js` | Schéma des tables `users` et `user_sessions` |

---

## Flux de fonctionnement

### 1. Inscription

1. L’utilisateur remplit le formulaire (`/register`) : email, mot de passe, prénom, nom, téléphone.
2. Le frontend envoie `POST /api/auth/register`.
3. Le backend vérifie l’email, hache le mot de passe (bcrypt) et crée l’utilisateur.
4. Un JWT est généré et renvoyé.
5. Le frontend stocke le token dans `localStorage` et met à jour le contexte d’auth.
6. Redirection vers `/`.

### 2. Connexion (email / mot de passe)

1. L’utilisateur saisit email et mot de passe sur `/login`.
2. Le frontend envoie `POST /api/auth/login`.
3. Le backend vérifie l’utilisateur, compare le mot de passe avec bcrypt.
4. Un JWT est généré et renvoyé.
5. Le frontend stocke le token et redirige vers `/`.

### 3. Connexion Google

1. Clic sur « Continuer avec Google ».
2. Redirection vers Google, puis vers `GET /api/auth/google/callback`.
3. Le backend crée ou met à jour l’utilisateur via Passport.
4. Un JWT est généré et l’utilisateur est redirigé vers `/auth/callback?token=...`.
5. `AuthContext` récupère le token dans l’URL, le stocke et charge le profil.
6. `PageAuthCallback` redirige vers `/`.

### 4. Persistance de session

1. Au chargement de l’app, `AuthContext` lit le token dans `localStorage` (ou dans l’URL après callback Google).
2. Appel à `GET /api/auth/me` pour charger le profil.
3. Si le token est invalide ou expiré, il est supprimé et l’utilisateur est considéré comme non connecté.

---

## Démarrage

### 1. Backend

```bash
cd backend
cp .env.example .env
# Remplir JWT_SECRET, optionnellement GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET
npm install
npm run dev
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local  # optionnel, valeur par défaut : localhost:3001
npm install
npm run dev
```

### 3. Base de données

Les tables `users` et `user_sessions` sont créées automatiquement au premier démarrage du backend via `initAuthDatabase()`.

---

## Routes API

| Méthode | Route | Protection | Description |
|---------|-------|------------|-------------|
| POST | `/api/auth/register` | Non | Inscription |
| POST | `/api/auth/login` | Non | Connexion |
| GET | `/api/auth/google` | Non | Initiation OAuth Google |
| GET | `/api/auth/google/callback` | Non | Callback OAuth Google |
| GET | `/api/auth/me` | JWT | Profil utilisateur |
| PUT | `/api/auth/profile` | JWT | Modification du profil |

---

## Utilisation dans les composants

```tsx
import { useAuth } from '../contexts/AuthContext';

function MonComposant() {
  const { user, login, logout, isAuthenticated, loading } = useAuth();

  if (loading) return <p>Chargement...</p>;
  if (!isAuthenticated) return <p>Connectez-vous</p>;

  return (
    <div>
      <p>Bonjour {user?.first_name || user?.email}</p>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
}
```

---

## Connexion Google (optionnel)

1. Créer un projet sur [Google Cloud Console](https://console.cloud.google.com/).
2. Activer l’API « Google+ » / « Google Identity ».
3. Créer des identifiants OAuth 2.0 (type application web).
4. Ajouter l’URL de redirection : `http://localhost:3001/api/auth/google/callback`.
5. Copier Client ID et Client Secret dans le `.env` du backend.
