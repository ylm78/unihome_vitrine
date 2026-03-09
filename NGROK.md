# Partager le site avec ngrok (Frontend + Backend)

## Option recommandée : ngrok (backend) + localtunnel (frontend)

En plan ngrok gratuit, un seul tunnel ngrok est autorisé. Pour tout afficher (site + produits + images) :

1. **Backend** : ngrok → `ngrok http 3001`
2. **Frontend** : localtunnel → `npx localtunnel --port 5090`
3. **Config** : `frontend/.env.local` avec `VITE_API_URL=https://VOTRE-URL-NGROK/api`
4. **Redémarrer** le frontend, puis partager l’URL **localtunnel** (ex. `https://xxx.loca.lt`)

---

## 1. Démarrer les services

```bash
# Terminal 1 : Backend
cd backend
npm run dev

# Terminal 2 : Frontend
cd frontend
npm run dev
```

## 2. Créer deux tunnels ngrok

```bash
# Terminal 3 : Tunnel Backend (API)
ngrok http 3001

# Terminal 4 : Tunnel Frontend (Site)
ngrok http 5090
```

Notez les URL affichées :
- **Backend** : `https://xxxx-backend.ngrok-free.dev`
- **Frontend** : `https://xxxx-frontend.ngrok-free.dev`

## 3. Configurer le frontend pour utiliser l’API ngrok

Créez ou modifiez `frontend/.env.local` :

```env
VITE_API_URL=https://VOTRE-URL-BACKEND-NGROK/api
```

Remplacez `VOTRE-URL-BACKEND-NGROK` par l’URL ngrok du backend (sans slash final).

Exemple :
```env
VITE_API_URL=https://abc123.ngrok-free.dev/api
```

## 4. Redémarrer le frontend

Les variables `VITE_*` sont chargées au démarrage. Après modification de `.env.local` :

```bash
# Arrêtez (Ctrl+C) puis relancez
cd frontend
npm run dev
```

## 5. Partager le lien

Envoyez à votre ami l’URL ngrok du **frontend** (ex. `https://xyz.ngrok-free.dev`).

Les produits et l’API fonctionneront car le frontend appelle désormais l’URL publique du backend.

---

## Notes

- Les URL ngrok **changent** à chaque redémarrage de ngrok (plan gratuit). Mettez à jour `VITE_API_URL` et redémarrez le frontend.
- Pour Google OAuth : ajoutez l’URL ngrok du backend dans les "Authorized redirect URIs" (ex. `https://xxx.ngrok-free.dev/api/auth/google/callback`).
- CORS est configuré pour accepter automatiquement les domaines `*.ngrok-free.dev`.
