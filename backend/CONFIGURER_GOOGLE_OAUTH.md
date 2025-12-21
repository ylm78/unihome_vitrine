# 🔐 Configuration Google OAuth - Guide Complet

## ❌ Erreur "redirect_uri_mismatch"

Cette erreur signifie que l'URI de redirection configuré dans Google Cloud Console ne correspond pas à celui utilisé par votre application.

## ✅ Solution

### Étape 1 : Vérifier l'URL de callback

Votre application utilise cette URL de callback :
```
http://localhost:3001/api/auth/google/callback
```

### Étape 2 : Configurer dans Google Cloud Console

1. **Allez sur [Google Cloud Console](https://console.cloud.google.com/)**

2. **Sélectionnez votre projet** (ou créez-en un)

3. **Activez l'API Google+**
   - Allez dans **APIs & Services** > **Library**
   - Recherchez "Google+ API" ou "People API"
   - Cliquez sur **Enable**

4. **Configurez l'écran de consentement OAuth**
   - Allez dans **APIs & Services** > **OAuth consent screen**
   - Choisissez **External** (pour les tests)
   - Remplissez les informations requises
   - Ajoutez votre email comme test user si nécessaire

5. **Créez les identifiants OAuth**
   - Allez dans **APIs & Services** > **Credentials**
   - Cliquez sur **Create Credentials** > **OAuth client ID**
   - Choisissez **Web application**
   - Donnez un nom (ex: "UNIHOME Local")

6. **Configurez les URI de redirection autorisés**
   
   **IMPORTANT** : Ajoutez EXACTEMENT cette URL :
   ```
   http://localhost:3001/api/auth/google/callback
   ```
   
   ⚠️ **Attention** :
   - Pas d'espace avant/après
   - Pas de `/` à la fin
   - Utilisez `http://` (pas `https://`) pour le développement local
   - Le port doit être `3001` (ou celui configuré dans votre `.env`)

7. **Copiez les identifiants**
   - **Client ID** : commence par `...apps.googleusercontent.com`
   - **Client Secret** : commence par `GOCSPX-...`

### Étape 3 : Mettre à jour backend/.env

Ajoutez ou modifiez dans `backend/.env` :

```env
GOOGLE_CLIENT_ID=votre-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-votre-client-secret
BACKEND_URL=http://localhost:3001
PORT=3001
```

### Étape 4 : Redémarrer le serveur

```bash
cd backend
npm start
```

## 🔍 Vérification

1. Le serveur affiche dans les logs :
   ```
   🔐 Configuration Google OAuth:
      Callback URL: http://localhost:3001/api/auth/google/callback
   ```

2. Testez la connexion Google depuis votre frontend

## 🌐 Pour la Production

Quand vous déployez en production, vous devrez :

1. **Ajouter l'URL de production dans Google Cloud Console** :
   ```
   https://votre-domaine.com/api/auth/google/callback
   ```

2. **Mettre à jour backend/.env** :
   ```env
   BACKEND_URL=https://votre-domaine.com
   ```

3. **Utiliser HTTPS** (obligatoire pour OAuth en production)

## 🐛 Problèmes Courants

### "redirect_uri_mismatch" persiste

- Vérifiez que l'URL dans Google Cloud Console est **exactement** la même
- Vérifiez qu'il n'y a pas d'espaces
- Vérifiez le port (3001 par défaut)
- Redémarrez le serveur après modification

### "Access blocked: This app's request is invalid"

- Vérifiez que l'écran de consentement OAuth est configuré
- Vérifiez que votre email est ajouté comme test user (si en mode test)

### L'API n'est pas activée

- Allez dans **APIs & Services** > **Library**
- Activez **Google+ API** ou **People API**

---

**Besoin d'aide ?** Consultez la [documentation Google OAuth](https://developers.google.com/identity/protocols/oauth2).

