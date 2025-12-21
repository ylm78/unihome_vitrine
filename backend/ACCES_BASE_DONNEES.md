# 📊 Accès à la Base de Données SQLite

## 🔧 Méthode 1 : Ligne de commande (sqlite3)

### Ouvrir la base de données

```bash
cd backend
sqlite3 data/products.db
```

### Commandes SQLite utiles

Une fois dans sqlite3 :

```sql
-- Voir toutes les tables
.tables

-- Voir la structure d'une table
.schema users
.schema products

-- Voir toutes les colonnes d'une table
PRAGMA table_info(users);

-- Quitter
.quit
```

### Exemples de requêtes

```bash
# Voir tous les utilisateurs
sqlite3 data/products.db "SELECT id, email, first_name, last_name FROM users;"

# Voir tous les produits
sqlite3 data/products.db "SELECT id, name, price_min, price_max FROM products;"

# Voir toutes les commandes
sqlite3 data/products.db "SELECT id, product_name, amount, status, created_at FROM orders;"

# Compter les utilisateurs
sqlite3 data/products.db "SELECT COUNT(*) FROM users;"

# Voir un utilisateur spécifique
sqlite3 data/products.db "SELECT * FROM users WHERE email='arifxhakan78@gmail.com';"
```

### Mode interactif

```bash
cd backend
sqlite3 data/products.db

# Puis tapez vos commandes SQL :
sqlite> SELECT * FROM users;
sqlite> SELECT name, price_min FROM products LIMIT 10;
sqlite> .quit
```

## 🔧 Méthode 2 : Applications graphiques (GUI)

### Option A : DB Browser for SQLite (Gratuit)

1. **Télécharger** : [https://sqlitebrowser.org/](https://sqlitebrowser.org/)
2. **Installer** l'application
3. **Ouvrir** le fichier : `backend/data/products.db`

### Option B : TablePlus (Payant, essai gratuit)

1. **Télécharger** : [https://tableplus.com/](https://tableplus.com/)
2. **Installer** l'application
3. **Ouvrir** une connexion SQLite : `backend/data/products.db`

### Option C : VS Code Extension (Gratuit)

1. Installer l'extension "SQLite Viewer" ou "SQLite" dans VS Code
2. Ouvrir le fichier `backend/data/products.db`

## 📝 Commandes SQL utiles

### Utilisateurs

```sql
-- Voir tous les utilisateurs
SELECT id, email, first_name, last_name, google_id, created_at FROM users;

-- Supprimer un utilisateur (attention !)
DELETE FROM users WHERE id = 1;

-- Modifier un utilisateur
UPDATE users SET first_name = 'Nouveau Nom' WHERE id = 1;
```

### Produits

```sql
-- Voir tous les produits avec leurs catégories
SELECT p.id, p.name, p.price_min, p.price_max, c.name as category
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;

-- Voir les images d'un produit
SELECT name, images FROM products WHERE id = 1;
```

### Commandes

```sql
-- Voir toutes les commandes avec détails
SELECT
  o.id,
  o.product_name,
  o.amount,
  o.currency,
  o.status,
  o.customer_email,
  o.created_at
FROM orders o
ORDER BY o.created_at DESC;

-- Voir les commandes réussies
SELECT * FROM orders WHERE status = 'completed';
```

## ⚠️ Précautions

1. **Faites une sauvegarde** avant de modifier :

   ```bash
   cp data/products.db data/products.db.backup
   ```

2. **Ne supprimez pas de données** sans être sûr

3. **Le serveur backend** doit être arrêté avant certaines modifications importantes

## 🔍 Localisation du fichier

Le fichier de base de données se trouve ici :

```
/Users/yilmaz-a/Desktop/unihome_vitrine/backend/data/products.db
```
