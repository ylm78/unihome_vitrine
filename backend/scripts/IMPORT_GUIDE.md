# Guide d'Importation des Produits

## Structure des Images

Organisez vos images dans le répertoire `/frontend/public/images/products/` avec la structure suivante :

```
frontend/public/images/products/
├── maison-container-moderne-terrasse/
│   ├── vue-aerienne-1.jpg
│   ├── vue-frontale.jpg
│   ├── vue-laterale.jpg
│   ├── vue-terrasse.jpg
│   └── ...
├── batiment-modulaire-panneaux-bois/
│   ├── vue-exterieure-1.jpg
│   ├── vue-exterieure-2.jpg
│   └── ...
└── ...
```

## Utilisation du Script

### 1. Préparer les images

Placez toutes les images dans les dossiers correspondants à chaque produit.

### 2. Modifier le script `importProducts.js`

Dans le fichier `backend/scripts/importProducts.js`, remplacez les placeholders `IMAGE_1`, `IMAGE_2`, etc. par les vrais chemins :

```javascript
images: [
  '/images/products/maison-container-moderne-terrasse/vue-aerienne-1.jpg',
  '/images/products/maison-container-moderne-terrasse/vue-frontale.jpg',
  // ... autres images du même produit
]
```

### 3. Ajouter les vidéos (optionnel)

Si vous avez des vidéos, ajoutez-les dans le tableau `videos` :

```javascript
videos: [
  '/videos/products/maison-container-moderne-terrasse/presentation.mp4',
  // ... autres vidéos
]
```

### 4. Exécuter le script

```bash
cd backend
node scripts/importProducts.js
```

## Organisation des Images par Produit

Les images du même produit mais sous différents angles doivent être regroupées dans le même tableau `images` du produit. Le script gère automatiquement cette organisation.

## Notes

- Les images doivent être accessibles depuis le frontend via le chemin `/images/products/...`
- Les vidéos doivent être accessibles via `/videos/products/...`
- Le script met à jour les produits existants s'ils ont le même `slug`
- Les nouveaux produits sont créés automatiquement

