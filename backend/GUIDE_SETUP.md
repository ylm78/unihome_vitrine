# 🚀 Guide de Configuration Rapide

## Problème: Aucun produit affiché ?

Suivez ces étapes pour alimenter votre base de données avec tous les produits.

## 📋 Étapes de Configuration

### 1. Aller dans le dossier backend

```bash
cd backend
```

### 2. Installer les dépendances (si pas déjà fait)

```bash
npm install
```

### 3. Initialiser la base de données avec les produits

```bash
npm run init-db
```

Cette commande va :
- ✅ Créer les tables (categories, products)
- ✅ Insérer toutes les catégories
- ✅ Insérer tous les produits (40+ produits)

### 4. Enrichir les produits avec images et prix

```bash
npm run enrich
```

Cette commande va ajouter :
- ✅ Des images pour chaque produit
- ✅ Des prix minimum et maximum

### OU en une seule commande :

```bash
npm run setup
```

Cette commande fait tout automatiquement !

## 🧪 Vérifier que tout fonctionne

### 1. Démarrer le serveur backend

```bash
npm run dev
```

Le serveur démarre sur **http://localhost:3001**

### 2. Tester l'API (dans un autre terminal)

```bash
npm run test-api
```

Vous devriez voir :
- ✅ Serveur opérationnel
- ✅ X produits trouvés
- ✅ X catégories trouvées

### 3. Vérifier dans le navigateur

- **Health Check**: http://localhost:3001/health
- **Tous les produits**: http://localhost:3001/api/products
- **Produit spécifique**: http://localhost:3001/api/products/slug/container-maison-container

## 🔍 Résolution de problèmes

### Aucun produit n'apparaît ?

1. **Vérifier que le backend est démarré**
   ```bash
   # Le serveur doit être en cours d'exécution
   npm run dev
   ```

2. **Vérifier que la base de données existe**
   ```bash
   # Le fichier doit exister
   ls -la data/products.db
   ```

3. **Réinitialiser complètement**
   ```bash
   # Supprimer l'ancienne base
   rm -f data/products.db
   
   # Recréer tout
   npm run setup
   ```

### Les produits n'ont pas d'images ?

```bash
npm run enrich
```

### Erreur de connexion à l'API ?

Vérifiez que :
- ✅ Le backend est démarré sur le port 3001
- ✅ L'URL dans le frontend est correcte: `http://localhost:3001/api`
- ✅ Il n'y a pas de problème CORS (normalement configuré)

## 📊 Statistiques attendues

Après configuration complète, vous devriez avoir :
- ✅ **6 catégories**
- ✅ **40+ produits**
- ✅ **Tous les produits avec images**
- ✅ **La plupart des produits avec prix**

## 🎉 C'est prêt !

Une fois que tout fonctionne, vos produits s'afficheront automatiquement dans le frontend sur http://localhost:5090

