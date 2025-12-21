# 🔐 Créer un ID Client OAuth 2.0 pour Google - Guide Étape par Étape

## 📋 Étape 1 : Configurer l'écran de consentement OAuth

**IMPORTANT** : Vous devez d'abord configurer l'écran de consentement avant de créer les identifiants.

1. **Cliquez sur le bouton jaune** "Configurer l'écran de consentement" (ou allez dans **Écran de consentement OAuth** dans le menu de gauche)

2. **Choisissez le type d'utilisateur** :
   - Sélectionnez **"Externe"** (pour les tests et le développement)
   - Cliquez sur **"Créer"**

3. **Remplissez les informations** :
   - **Nom de l'application** : `UNIHOME` (ou ce que vous voulez)
   - **Email de support utilisateur** : Votre email (arifxhakan78@gmail.com)
   - **Email du développeur** : Votre email
   - Cliquez sur **"Enregistrer et continuer"**

4. **Scopes (portées)** :
   - Cliquez sur **"Enregistrer et continuer"** (les scopes par défaut suffisent)

5. **Utilisateurs de test** :
   - Ajoutez votre email : `arifxhakan78@gmail.com`
   - Cliquez sur **"Enregistrer et continuer"**

6. **Résumé** :
   - Vérifiez les informations
   - Cliquez sur **"Retour au tableau de bord"**

## 📋 Étape 2 : Créer l'ID Client OAuth 2.0

1. **Retournez sur la page "Identifiants"** (dans le menu de gauche)

2. **Cliquez sur** "+ Créer des identifiants" > **"ID client OAuth"**

3. **Remplissez le formulaire** :
   - **Type d'application** : Sélectionnez **"Application Web"**
   - **Nom** : `UNIHOME Local` (ou ce que vous voulez)

4. **URIs de redirection autorisés** :
   - Cliquez sur **"+ Ajouter un URI"**
   - Ajoutez **EXACTEMENT** cette URL :
     ```
     http://localhost:3001/api/auth/google/callback
     ```
   - ⚠️ **IMPORTANT** :
     - Pas d'espace avant/après
     - Pas de `/` à la fin
     - Utilisez `http://` (pas `https://`)
     - Le port doit être `3001`

5. **Cliquez sur "Créer"**

## 📋 Étape 3 : Copier les identifiants

Après la création, vous verrez une popup avec :
- **ID client** : `322891035197-xxxxx.apps.googleusercontent.com`
- **Secret client** : `GOCSPX-xxxxx`

**Copiez ces deux valeurs !**

## 📋 Étape 4 : Mettre à jour backend/.env

Ouvrez `backend/.env` et vérifiez/modifiez :

```env
GOOGLE_CLIENT_ID=322891035197-xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
BACKEND_URL=http://localhost:3001
PORT=3001
```

**Remplacez** `xxxxx` par les vraies valeurs que vous avez copiées.

## 📋 Étape 5 : Redémarrer le serveur

```bash
cd backend
npm start
```

Vous devriez voir dans les logs :
```
🔐 Configuration Google OAuth:
   Callback URL: http://localhost:3001/api/auth/google/callback
```

## ✅ Test

1. Rafraîchissez votre navigateur
2. Essayez de vous connecter avec Google
3. Ça devrait fonctionner !

## 🐛 Si ça ne marche toujours pas

1. **Vérifiez l'URI dans Google Cloud Console** :
   - Allez dans **Identifiants** > Cliquez sur votre ID client
   - Vérifiez que l'URI est **exactement** : `http://localhost:3001/api/auth/google/callback`

2. **Vérifiez les variables d'environnement** :
   ```bash
   cd backend
   cat .env | grep GOOGLE
   ```

3. **Vérifiez les logs du serveur** :
   - Le serveur doit afficher le callback URL au démarrage

4. **Vérifiez que l'API est activée** :
   - Allez dans **Bibliothèque** (Library)
   - Recherchez "Google+ API" ou "People API"
   - Si ce n'est pas activé, activez-le

---

**Besoin d'aide ?** Consultez `CONFIGURER_GOOGLE_OAUTH.md` pour plus de détails.

