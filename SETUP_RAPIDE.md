# 🚀 Configuration Rapide - Alimenter la Base de Données

## ⚡ Solution Rapide (2 minutes)

### Étape 1 : Aller dans le backend

```bash
cd backend
```

### Étape 2 : Installer les dépendances (première fois seulement)

```bash
npm install
```

### Étape 3 : Initialiser et remplir la base de données

```bash
npm run init-db
```

Cette commande va :
- ✅ Créer la base de données SQLite
- ✅ Créer toutes les tables
- ✅ Ajouter 6 catégories
- ✅ Ajouter 40+ produits avec images et prix

### Étape 4 : Démarrer le serveur backend

Dans un terminal, laissez tourner :

```bash
npm run dev
```

Le serveur doit afficher : `🚀 API UNIHOME Backend démarrée avec succès!` sur le port 3001

### Étape 5 : Vérifier que ça marche

Ouvrez dans votre navigateur :
- http://localhost:3001/health
- http://localhost:3001/api/products

Vous devriez voir vos produits !

## 🎯 Résultat Attendu

Après ces étapes, votre frontend (http://localhost:5090) devrait afficher tous les produits automatiquement.

## ❌ Si ça ne marche toujours pas

### Vérifier que le backend tourne

Le terminal doit afficher des logs comme :
```
Base de données connectée avec succès
🚀 API UNIHOME Backend démarrée avec succès!
📍 Port: 3001
```

### Réinitialiser complètement

```bash
cd backend
rm -f data/products.db  # Supprimer l'ancienne base
npm run init-db         # Recréer tout
npm run dev             # Redémarrer
```

### Vérifier les produits dans la base

```bash
# Dans le backend, ouvrir la base SQLite
sqlite3 data/products.db "SELECT COUNT(*) FROM products WHERE status='active';"
```

Vous devriez voir un nombre > 0.

## 📞 Besoin d'aide ?

Si après toutes ces étapes vous ne voyez toujours pas de produits, vérifiez :
1. ✅ Le backend est bien démarré sur le port 3001
2. ✅ La base de données existe dans `backend/data/products.db`
3. ✅ L'URL de l'API dans le frontend est `http://localhost:3001/api`
4. ✅ Pas d'erreur dans la console du navigateur (F12)

