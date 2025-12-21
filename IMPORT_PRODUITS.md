# Guide d'Importation des Produits

## ✅ Configuration Terminée

La base de données a été mise à jour pour supporter les vidéos. Tous les scripts sont prêts à être utilisés.

## 📦 Produits Identifiés

D'après les images fournies, voici les produits organisés :

### 1. Maison Container Moderne avec Terrasse
- **11 images** regroupées (même produit, différents angles/vues)
- Vue aérienne L-shape, vues frontales, latérales, vues avec terrasse, etc.

### 2. Bâtiment Modulaire Préfabriqué Panneaux Bois
- **5 images** (structures modulaires avec panneaux bois)
- Vues L-shape, structures parallèles, vues aériennes

### 3. Maison Préfabriquée avec Toit Tuiles
- **2 images** (maisons avec toits en tuiles méditerranéennes)

### 4. Containers Modulaires Bleus
- **1 image** (containers bleus avec aménagement extérieur)

## 🚀 Étapes pour Importer les Produits

### Étape 1 : Organiser les Images

Créez la structure suivante dans `/frontend/public/images/products/` :

```
frontend/public/images/products/
├── maison-container-moderne-terrasse/
│   ├── vue-aerienne-1.jpg
│   ├── vue-aerienne-2.jpg
│   ├── vue-frontale.jpg
│   ├── vue-laterale.jpg
│   ├── vue-terrasse-1.jpg
│   ├── vue-terrasse-2.jpg
│   ├── collage-vues.jpg
│   ├── vue-lshape-1.jpg
│   ├── vue-lshape-2.jpg
│   ├── vue-complete-1.jpg
│   └── vue-complete-2.jpg
├── batiment-modulaire-panneaux-bois/
│   ├── vue-lshape.jpg
│   ├── vue-paralleles-1.jpg
│   ├── vue-paralleles-2.jpg
│   ├── vue-aerienne.jpg
│   └── vue-detaillee.jpg
├── maison-prefabriquee-toit-tuiles/
│   ├── vue-aerienne-1.jpg
│   └── vue-aerienne-2.jpg
└── containers-modulaires-bleus/
    └── vue-exterieure.jpg
```

### Étape 2 : Placer les Images

Copiez toutes vos images dans les dossiers correspondants selon la structure ci-dessus.

### Étape 3 : Ajouter les Chemins dans le Script

Ouvrez `backend/scripts/importProducts.js` et remplacez les placeholders `IMAGE_1`, `IMAGE_2`, etc. par les vrais chemins :

**Pour la Maison Container :**
```javascript
images: [
  '/images/products/maison-container-moderne-terrasse/vue-aerienne-1.jpg',
  '/images/products/maison-container-moderne-terrasse/vue-aerienne-2.jpg',
  '/images/products/maison-container-moderne-terrasse/vue-frontale.jpg',
  // ... etc pour toutes les 11 images
]
```

**Répétez pour tous les produits.**

### Étape 4 : Ajouter les Vidéos (si disponibles)

Si vous avez des vidéos, créez le dossier `/frontend/public/videos/products/` et ajoutez les chemins dans le tableau `videos` :

```javascript
videos: [
  '/videos/products/maison-container-moderne-terrasse/presentation.mp4'
]
```

### Étape 5 : Exécuter le Script d'Importation

```bash
cd backend
npm run import-products
```

Ou directement :
```bash
node scripts/importProducts.js
```

## 📝 Notes Importantes

- ✅ Les images du même produit mais sous différents angles sont automatiquement regroupées
- ✅ Le script met à jour les produits existants s'ils ont le même `slug`
- ✅ Les nouveaux produits sont créés automatiquement
- ✅ La colonne `videos` est disponible pour tous les produits
- ✅ Tous les produits sont importés avec le status `active`

## 🔍 Vérification

Après l'importation, vérifiez que tout fonctionne :

```bash
npm run test-api
```

Ou testez directement l'API :
```bash
curl http://localhost:3001/api/products
```

## 📚 Scripts Disponibles

- `npm run add-videos-column` - Ajoute la colonne videos (déjà fait)
- `npm run import-products` - Importe les produits depuis le script
- `npm run init-db` - Réinitialise la base de données
- `npm run test-api` - Teste l'API

