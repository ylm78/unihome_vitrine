# Optimisations Lighthouse - Page /login

## Modifications effectuées

### 1. Performance – Bundle

**Problème** : PageAccueilModerne (~26 kB + dépendances) était chargée sur toutes les routes dont /login.

**Solution** : Mise en lazy loading de `PageAccueilModerne` comme les autres pages.

**Résultat** :
- Bundle principal (`index.js`) : **66.9 kB → 41.7 kB** (≈ -38 %)
- Sur /login, `PageAccueilModerne` n’est plus chargée
- Build plus rapide (esbuild au lieu de Terser)

### 2. Accessibilité

- `lang="fr"` déjà présent dans `index.html`
- Contenu de la page login encapsulé dans une balise `<main role="main" aria-label="Formulaire de connexion">`

### 3. Minification

- Passage à **esbuild** (plus rapide et stable)
- Suppression des `console.log` en production via `esbuild.drop`

### 4. Erreurs console

- Suppression des `console.log` / `console.warn` / `console.error` dans `AuthContext`
- Les autres composants sont nettoyés en production par `esbuild.drop`

### 5. En-têtes de sécurité (backend)

- **HSTS** : `Strict-Transport-Security` (uniquement en production)
- **CSP** : politique adaptée à Stripe, Google Fonts, Supabase

---

## Pistes supplémentaires

### Réduire davantage le payload (9,5 Mo)

Le payload total inclut souvent :

1. **Fonts Google** (~100–200 KB) : envisager des polices système ou hébergement local
2. **Images** : optimiser (WebP, lazy load) et compresser
3. **Mode dev** : en développement, le payload est plus lourd (pas de minification) ; mesurer en production

### bfcache (back/forward cache)

Pour ne pas bloquer le bfcache :

- Ne pas utiliser `unload` ou `beforeunload`
- Éviter les connexions persistantes (WebSocket, IndexedDB) sans fermeture propre
- Le projet n’utilise pas `unload` / `beforeunload`

### CSP

Si des erreurs CSP apparaissent, ajouter les domaines manquants dans `backend/server.js` :

```javascript
// Exemple : ajouter votre domaine frontend
"connect-src 'self' https://votredomaine.com https://api.stripe.com ..."
```

### Mesure en production

Relancer l’audit Lighthouse après déploiement en production (HTTPS, build minifié, CDN) pour des métriques représentatives.
