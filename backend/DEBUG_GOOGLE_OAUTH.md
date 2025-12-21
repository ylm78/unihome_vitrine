# 🐛 Debug Connexion Google OAuth

## Problème actuel

La connexion Google redirige vers `/login?error=google_auth_failed` au lieu de `/auth/callback?token=...`

Cela signifie que `req.user` est `undefined` dans le callback Google.

## 🔍 Vérifications à faire

### 1. Vérifier l'URI de redirection dans Google Cloud Console

**C'est probablement la cause principale !**

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** > **Credentials**
3. Cliquez sur votre **OAuth 2.0 Client ID**
4. Dans **"Authorized redirect URIs"**, il doit y avoir **EXACTEMENT** :
   ```
   http://localhost:3001/api/auth/google/callback
   ```
   
   ⚠️ **Vérifiez point par point** :
   - ✅ Commence par `http://` (pas `https://`)
   - ✅ `localhost` (pas `127.0.0.1`)
   - ✅ Port `3001` (pas `5090`)
   - ✅ Pas d'espace avant ou après
   - ✅ Pas de `/` à la fin
   - ✅ Tous les caractères sont corrects

### 2. Vérifier les identifiants dans backend/.env

```bash
cd backend
cat .env | grep GOOGLE
```

Vous devriez voir :
```env
GOOGLE_CLIENT_ID=648426780674-xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
```

**Important** : Ces identifiants doivent correspondre à ceux dans Google Cloud Console.

### 3. Vérifier les logs du serveur backend

Quand vous essayez de vous connecter avec Google, regardez le terminal où tourne le serveur backend.

Vous devriez voir des messages comme :

**Si ça fonctionne :**
```
🔐 Passport Strategy - Profile reçu: { id: '...', email: '...', name: '...' }
✅ Passport Strategy - Utilisateur créé/mis à jour: email@example.com
🔐 Callback Google reçu: Utilisateur présent
✅ Utilisateur créé/mis à jour: email@example.com
✅ Token généré, redirection vers frontend...
```

**Si ça ne fonctionne pas :**
```
🔐 Callback Google reçu: Utilisateur manquant
❌ req.user est undefined
```

**Ou si Passport échoue :**
```
❌ Passport Strategy - Erreur: [message d'erreur]
```

### 4. Vérifier que l'API est activée

1. **APIs & Services** > **Library**
2. Recherchez **"Google+ API"** ou **"People API"**
3. Si ce n'est pas activé, activez-le

### 5. Vérifier l'écran de consentement OAuth

1. **APIs & Services** > **OAuth consent screen**
2. Assurez-vous qu'il est configuré
3. Si vous êtes en mode "Test", ajoutez votre email comme **test user**

## 🔧 Solution la plus probable

**99% du temps, le problème vient de l'URI de redirection qui ne correspond pas exactement.**

### Étapes pour corriger :

1. **Dans Google Cloud Console**, supprimez l'URI existant
2. **Ajoutez-le à nouveau** en copiant-colant exactement :
   ```
   http://localhost:3001/api/auth/google/callback
   ```
3. **Cliquez sur "Save"**
4. **Redémarrez le serveur backend** :
   ```bash
   cd backend
   npm start
   ```
5. **Réessayez la connexion Google**

## 📝 Logs à partager pour diagnostic

Si ça ne marche toujours pas, partagez :

1. **Les logs du serveur backend** (terminal où tourne `npm start`)
2. **L'URI exact configuré dans Google Cloud Console**
3. **La console du navigateur** (F12) - surtout les erreurs en rouge

---

**Astuce** : Si vous avez plusieurs projets Google Cloud, vérifiez que vous modifiez le bon !

