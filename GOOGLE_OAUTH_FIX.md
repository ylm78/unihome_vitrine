# Corriger l'erreur redirect_uri_mismatch

## L'URI à configurer (copie exacte)

```
http://localhost:3001/api/auth/google/callback
```

## Étapes dans Google Cloud Console

1. Va sur https://console.cloud.google.com/
2. Projet **Unihome**
3. **APIs et services** → **Identifiants**
4. Clique sur ton **ID client OAuth** (Application Web)
5. Dans **URI de redirection autorisés** :
   - Supprime les entrées incorrectes
   - Clique **+ AJOUTER UN URI**
   - Colle exactement : `http://localhost:3001/api/auth/google/callback`
   - Pas d’espace, pas de slash final
6. **Enregistrer**

## Points importants

- **http** (et pas https) pour localhost
- Port **3001** (backend)
- Chemin **/api/auth/google/callback**
- Aucun slash à la fin
