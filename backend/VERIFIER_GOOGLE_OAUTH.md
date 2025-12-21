# 🔍 Vérifier la Configuration Google OAuth

## ❌ Erreur actuelle : `google_auth_failed`

Cette erreur signifie que Passport n'a pas pu authentifier l'utilisateur. `req.user` est `undefined`.

## ✅ Checklist de vérification

### 1. Vérifier l'URI de redirection dans Google Cloud Console

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** > **Credentials**
3. Cliquez sur votre **OAuth 2.0 Client ID**
4. Dans **"Authorized redirect URIs"**, vérifiez qu'il y a EXACTEMENT :
   ```
   http://localhost:3001/api/auth/google/callback
   ```
   
   ⚠️ **Important** :
   - Pas d'espace avant/après
   - Pas de `/` à la fin
   - Utilisez `http://` (pas `https://`)
   - Le port doit être `3001`

### 2. Vérifier les identifiants dans backend/.env

```bash
cd backend
cat .env | grep GOOGLE
```

Vous devriez voir :
```env
GOOGLE_CLIENT_ID=648426780674-xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
BACKEND_URL=http://localhost:3001
PORT=3001
```

### 3. Redémarrer le serveur backend

```bash
cd backend
npm start
```

Vous devriez voir dans les logs :
```
🔐 Configuration Google OAuth:
   Callback URL: http://localhost:3001/api/auth/google/callback
```

### 4. Tester la connexion

1. Ouvrez la console du navigateur (F12)
2. Allez sur votre site
3. Cliquez sur "Continuer avec Google"
4. Autorisez l'application
5. Regardez les logs dans :
   - **Console du navigateur** (F12)
   - **Terminal du serveur backend**

Vous devriez voir :
- `🔐 Passport Strategy - Profile reçu:`
- `✅ Passport Strategy - Utilisateur créé/mis à jour:`
- `🔐 Callback Google reçu: Utilisateur présent`

## 🐛 Si ça ne marche toujours pas

### Vérifier que l'API est activée

1. **APIs & Services** > **Library**
2. Recherchez **"Google+ API"** ou **"People API"**
3. Si ce n'est pas activé, activez-le

### Vérifier l'écran de consentement

1. **APIs & Services** > **OAuth consent screen**
2. Assurez-vous qu'il est configuré
3. Ajoutez votre email comme **test user** si en mode test

### Vérifier les logs détaillés

Après avoir essayé de vous connecter, regardez les logs du serveur :

```bash
# Dans le terminal où tourne le serveur
# Vous devriez voir des messages avec 🔐, ✅ ou ❌
```

Si vous voyez `❌ Passport Strategy - Erreur:`, c'est là qu'est le problème.

---

**Besoin d'aide ?** Partagez les logs du serveur backend après avoir tenté la connexion.

