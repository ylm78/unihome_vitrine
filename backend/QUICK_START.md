# 🚀 Guide de Démarrage Rapide

## Installation et Configuration

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Initialiser la base de données avec tous les produits
npm run init-db

# Démarrer le serveur
npm run dev
```

Le serveur démarre sur **http://localhost:3001**

## 📡 Test Rapide

Une fois le serveur démarré, vous pouvez tester :

1. **Health Check**
   ```
   GET http://localhost:3001/health
   ```

2. **Tous les produits**
   ```
   GET http://localhost:3001/api/products
   ```

3. **Produit par route** (exemple)
   ```
   GET http://localhost:3001/api/products/route/batiment-prefabrique/chantier
   ```

4. **Toutes les catégories**
   ```
   GET http://localhost:3001/api/categories
   ```

## 📊 Produits Disponibles

Le backend contient **40+ produits** organisés en **6 catégories** :

- ✅ Bâtiment Préfabriqué (10 produits)
- ✅ Container (10 produits)
- ✅ Maison Acier (4 produits)
- ✅ Maisons Préfabriquées (6 produits)
- ✅ Cabine Modulaire (8 produits)
- ✅ Entreprise (pour informations)

## 🔗 Intégration Frontend

Le backend est configuré pour accepter les requêtes depuis le frontend sur `http://localhost:5090`.

Vous pouvez maintenant utiliser l'API dans votre frontend React !

## 📝 Notes

- La base de données SQLite est créée dans `backend/data/products.db`
- Tous les produits sont actifs par défaut
- Les routes correspondent exactement aux routes du frontend React Router

