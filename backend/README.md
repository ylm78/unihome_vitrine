# UNIHOME Backend API

Backend API complet pour la gestion des produits UNIHOME avec base de données SQLite.

## 🚀 Démarrage rapide

### Installation

```bash
cd backend
npm install
```

### Initialisation de la base de données

```bash
npm run init-db
```

Cette commande va :
- Créer la base de données SQLite
- Créer les tables (categories, products)
- Insérer toutes les catégories
- Insérer tous les produits (40+ produits)

### Démarrer le serveur

**Mode développement (avec watch) :**
```bash
npm run dev
```

**Mode production :**
```bash
npm start
```

Le serveur démarre sur le port **3001** par défaut.

## 📡 Endpoints API

### Health Check
- `GET /health` - Vérifier l'état du serveur
- `GET /api` - Informations sur l'API

### Produits

- `GET /api/products` - Liste tous les produits
  - Query params: `?category=slug&status=active&limit=10&offset=0&search=terme`
  
- `GET /api/products/:id` - Récupérer un produit par ID
  
- `GET /api/products/slug/:slug` - Récupérer un produit par slug
  
- `GET /api/products/route/:route` - Récupérer un produit par route (ex: `/batiment-prefabrique/chantier`)
  
- `POST /api/products` - Créer un nouveau produit
  ```json
  {
    "category_id": 1,
    "name": "Nom du produit",
    "slug": "nom-du-produit",
    "description": "Description complète",
    "short_description": "Description courte",
    "route": "/categorie/produit",
    "features": ["Feature 1", "Feature 2"],
    "surface_min": 20,
    "surface_max": 100,
    "price_min": 10000,
    "price_max": 50000
  }
  ```
  
- `PUT /api/products/:id` - Mettre à jour un produit
  
- `DELETE /api/products/:id` - Supprimer un produit (soft delete)

### Catégories

- `GET /api/categories` - Liste toutes les catégories avec le nombre de produits
  
- `GET /api/categories/:slug` - Récupérer une catégorie avec ses produits
  
- `POST /api/categories` - Créer une nouvelle catégorie

## 📊 Structure de la base de données

### Table `categories`
- `id` - ID unique
- `name` - Nom de la catégorie
- `slug` - Slug unique
- `description` - Description
- `icon` - Icône
- `created_at` - Date de création

### Table `products`
- `id` - ID unique
- `category_id` - ID de la catégorie
- `name` - Nom du produit
- `slug` - Slug unique
- `description` - Description complète
- `short_description` - Description courte
- `price_min` - Prix minimum
- `price_max` - Prix maximum
- `surface_min` - Surface minimum (m²)
- `surface_max` - Surface maximum (m²)
- `images` - JSON array d'images
- `features` - JSON array de caractéristiques
- `route` - Route frontend
- `status` - Statut (active, inactive, deleted)
- `created_at` - Date de création
- `updated_at` - Date de mise à jour

## 📦 Catégories de produits

1. **Bâtiment Préfabriqué** (10 produits)
   - Bâtiments de Chantier
   - Bureaux Préfabriqués
   - Structures en Acier
   - Installations Sociales
   - Bâtiments Éducatifs
   - Hôpitaux Préfabriqués
   - Hôtels Préfabriqués
   - Blocs Sanitaires
   - Bâtiments de Dortoirs
   - Réfectoires Préfabriqués

2. **Container** (10 produits)
   - Container Panneau Sandwich
   - Containers Bureau & Chantier
   - Maisons Container
   - Containers Métropole de Luxe
   - Containers Sanitaires
   - Containers Démontables
   - Container Sur Mesure
   - Containers Dortoir
   - Containers Réfectoire
   - Containers d'Urgence Sismique

3. **Maison Acier** (4 produits)
   - Série Impériale
   - Maisons Plain-Pied
   - Maisons à Étage
   - Caractéristiques Techniques

4. **Maisons Préfabriquées** (6 produits)
   - Maisons Plain-Pied
   - Maisons à Étage
   - Villas Préfabriquées
   - Logements Collectifs Économiques
   - Logements d'Urgence Sismique
   - Caractéristiques Techniques

5. **Cabine Modulaire** (8 produits)
   - Cabinets Métropole
   - Cabinets Polyester
   - Cabinets Larges
   - Cabinets Sanitaires Mobiles
   - Cabinets Panneaux
   - Guérites de Sécurité
   - Cabinets Préfabriqués
   - Caractéristiques Techniques

## 🔧 Configuration

Le port peut être configuré via la variable d'environnement `PORT` (défaut: 3001).

Le CORS est configuré pour autoriser `http://localhost:5090` (frontend).

## 📝 Notes

- La base de données SQLite est créée dans le dossier `backend/data/products.db`
- Les données sont persistantes
- Tous les produits ont un statut 'active' par défaut
- Les routes utilisent le format du frontend React Router

