# Structure de l'Interface Admin

## Architecture des dossiers

```
frontend/src/
├── components/admin/
│   ├── AdminLayout.tsx       # Layout principal (Sidebar + Header)
│   ├── AdminSidebar.tsx      # Sidebar de navigation
│   ├── AdminHeader.tsx       # Header avec profil et dark mode
│   └── StatCard.tsx          # Composant réutilisable pour les statistiques
│
├── pages/admin/
│   └── AdminDashboard.tsx    # Page Dashboard avec statistiques
│
├── pages/
│   └── PageAdmin.tsx         # Point d'entrée avec protection d'accès
│
└── utils/
    └── adminUtils.ts         # Utilitaires admin (vérification email)
```

## Fonctionnalités implémentées

### 1. Layout Principal (`AdminLayout.tsx`)
- Sidebar latérale fixe avec navigation
- Header avec profil utilisateur
- Toggle Dark/Light mode (persistant dans localStorage)
- Responsive avec menu burger sur mobile
- Overlay pour mobile

### 2. Sidebar (`AdminSidebar.tsx`)
- Navigation avec icônes (Dashboard, Inventaire, Commandes, Clients, Paramètres)
- État actif visuel
- Lien "Retour au site"
- Version desktop fixe et mobile avec slide

### 3. Header (`AdminHeader.tsx`)
- Bouton menu pour mobile
- Toggle Dark/Light mode
- Menu profil utilisateur avec déconnexion
- Affichage des initiales ou avatar

### 4. Dashboard (`AdminDashboard.tsx`)
- **4 cartes de statistiques** avec icônes et tendances :
  - Total Ventes (125 000 €, +12%)
  - Maisons en Stock (3 produits actifs, +1)
  - Demandes en Attente (7, -3)
  - Total Clients (42, +8)
- **Graphique placeholder** (à intégrer avec Chart.js ou Recharts)
- **Tableau des 5 dernières demandes** avec statuts colorés

### 5. Composants réutilisables
- **StatCard** : Carte de statistique réutilisable avec icône, valeur, tendance

## Sécurité

- Vérification d'email admin : `arifxhakan78@gmail.com`
- Protection des routes avec redirection automatique
- Vérification d'authentification

## Dark Mode

- Activé via Tailwind CSS (darkMode: 'class')
- Persistance dans localStorage
- Détection de la préférence système au premier chargement
- Support complet sur tous les composants

## Design

- Style SaaS moderne et épuré
- Espacement généreux (whitespace)
- Bords arrondis (rounded-xl, rounded-lg)
- Palette de couleurs cohérente
- Transitions fluides
- Responsive mobile-first

## Prochaines étapes

1. **Page Inventaire** - CRUD complet des maisons containers
2. **Page Commandes** - Gestion des commandes
3. **Page Clients** - CRM léger pour les leads
4. **Page Paramètres** - Configuration de l'admin
5. **Intégration graphiques** - Chart.js ou Recharts pour les statistiques

