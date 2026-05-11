# Déploiement sur Vercel

## Option A (recommandée) : dossier `frontend`

1. [vercel.com](https://vercel.com) → **Add New Project** → importer ce dépôt GitHub.
2. **Root Directory** : `frontend` (Important : pas la racine du repo.)
3. Framework : Vite (détecté automatiquement).
4. **Environment Variables** → ajouter :
   - `VITE_API_URL` = URL publique de ton API, par ex. `https://ton-backend.railway.app/api`  
     (sans cette variable, le site s’affiche mais login / formulaires / admin ne fonctionnent pas.)
5. **Deploy**. Tu obtiens un lien `https://ton-projet.vercel.app`.

## Option B : racine du repo

Ne pas changer le Root Directory : Vercel utilise le `vercel.json` à la racine du dépôt (`installCommand` / `buildCommand` / `outputDirectory`).

Même variable `VITE_API_URL` à configurer dans le projet Vercel.

## OAuth Google

Dans la console Google Cloud, ajoute l’URL Vercel aux **URI de redirection autorisées** et **Origines JavaScript autorisées** (ex. `https://xxx.vercel.app`).

## Backend

Le backend Express + SQLite n’est pas déployé par ce flux. Héberge-le (Railway, Render, Fly.io, etc.) et pointe `VITE_API_URL` vers cette URL.
