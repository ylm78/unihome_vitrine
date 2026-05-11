# Déploiement sur Vercel

## Mode « Services » (monorepo, racine `./`)

Le fichier `vercel.json` à la racine définit **experimentalServices** :

- **frontend** (Vite) → `/`
- **backend** (Express) → `/_/backend`

Sur Vercel : **Root Directory** = `./` (racine du repo), preset **Services**.

### Variables d’environnement (à configurer sur Vercel)

**Frontend (build)** — toutes les previews / prod :

| Clé | Valeur |
|-----|--------|
| `VITE_API_URL` | `/_/backend/api` |

**Backend (runtime)** — même projet :

| Clé | Valeur |
|-----|--------|
| `API_PUBLIC_PREFIX` | `/_/backend` |
| `BACKEND_URL` | `https://TON-PROJET.vercel.app` (URL exacte du déploiement, sans slash final) |
| `FRONTEND_URL` | `https://TON-PROJET.vercel.app` |
| `SESSION_SECRET`, `JWT_SECRET`, `GOOGLE_*`, `STRIPE_*`, etc. | comme en local |

**Google OAuth** : dans la console Google, ajoute l’URI de redirection  
`https://TON-PROJET.vercel.app/_/backend/api/auth/google/callback`.

Après le premier déploiement, remplace `TON-PROJET` par le nom réel (ex. `unihome-vitrine`).

### Si le déploiement du backend échoue

Express + SQLite sur Vercel « Services » peut ne pas être supporté comme un serveur Node classique. Dans ce cas :

1. Héberge l’API sur **Railway**, **Render**, etc.
2. Remplace `experimentalServices` dans `vercel.json` par **un seul service** `frontend` (voir section ci‑dessous), ou crée un second projet Vercel uniquement pour le frontend avec **Root Directory** = `frontend`.
3. Mets `VITE_API_URL` = `https://ton-api.railway.app/api` (URL HTTPS réelle).

### Fichier `vercel.json` — frontend seul (sans backend Vercel)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "experimentalServices": {
    "frontend": {
      "entrypoint": "frontend",
      "routePrefix": "/",
      "framework": "vite"
    }
  }
}
```

Puis dans l’UI Vercel, ne garde qu’un service **frontend** (retire le service backend du preset).

---

## Option classique : un seul projet frontend

1. [vercel.com](https://vercel.com) → **Add New Project** → importer le repo.
2. **Root Directory** : `frontend`.
3. Framework : Vite.
4. `VITE_API_URL` = URL publique de ton API (ex. Railway).
5. **Deploy**.

## OAuth Google

Dans la console Google Cloud, ajoute l’URL Vercel aux **URI de redirection autorisées** et **Origines JavaScript autorisées** (ex. `https://xxx.vercel.app`).

## Backend

Le backend Express + SQLite n’est pas déployé par ce flux. Héberge-le (Railway, Render, Fly.io, etc.) et pointe `VITE_API_URL` vers cette URL.
