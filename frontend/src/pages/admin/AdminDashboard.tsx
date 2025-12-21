import { StatCard } from '../../components/admin/StatCard';
import { SalesChart } from '../../components/admin/SalesChart';
import { DollarSign, Package, Users, MessageSquare } from 'lucide-react';

// Mock data
const mockStats = {
  totalVentes: { value: '125 000 €', subtitle: 'Ce mois', trend: { value: '+12%', isPositive: true } },
  maisonsStock: { value: '3', subtitle: 'Produits actifs', trend: { value: '+1', isPositive: true } },
  demandesAttente: { value: '7', subtitle: 'En attente de traitement', trend: { value: '-3', isPositive: true } },
  totalClients: { value: '42', subtitle: 'Clients inscrits', trend: { value: '+8', isPositive: true } },
};

const mockRecentDemandes = [
  { id: 1, nom: 'Jean Dupont', email: 'jean.dupont@email.com', produit: 'MONOLITHE', date: '2024-01-15', statut: 'Nouveau' },
  { id: 2, nom: 'Marie Martin', email: 'marie.martin@email.com', produit: "L'ÉCRIN", date: '2024-01-14', statut: 'Contacté' },
  { id: 3, nom: 'Pierre Bernard', email: 'pierre.bernard@email.com', produit: 'SANCTUARY', date: '2024-01-13', statut: 'Devis envoyé' },
  { id: 4, nom: 'Sophie Durand', email: 'sophie.durand@email.com', produit: 'MONOLITHE', date: '2024-01-12', statut: 'Nouveau' },
  { id: 5, nom: 'Luc Moreau', email: 'luc.moreau@email.com', produit: "L'ÉCRIN", date: '2024-01-11', statut: 'Clôturé' },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Vue d'ensemble de votre activité
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Ventes"
          value={mockStats.totalVentes.value}
          subtitle={mockStats.totalVentes.subtitle}
          icon={DollarSign}
          iconColor="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
          trend={mockStats.totalVentes.trend}
        />
        <StatCard
          title="Maisons en Stock"
          value={mockStats.maisonsStock.value}
          subtitle={mockStats.maisonsStock.subtitle}
          icon={Package}
          iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
          trend={mockStats.maisonsStock.trend}
        />
        <StatCard
          title="Demandes en Attente"
          value={mockStats.demandesAttente.value}
          subtitle={mockStats.demandesAttente.subtitle}
          icon={MessageSquare}
          iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
          trend={mockStats.demandesAttente.trend}
        />
        <StatCard
          title="Total Clients"
          value={mockStats.totalClients.value}
          subtitle={mockStats.totalClients.subtitle}
          icon={Users}
          iconColor="bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
          trend={mockStats.totalClients.trend}
        />
      </div>

      {/* Graphique des ventes */}
      <SalesChart />

      {/* Dernières demandes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            5 dernières demandes de contact
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockRecentDemandes.map((demande) => (
                <tr key={demande.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {demande.nom}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {demande.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {demande.produit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(demande.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      px-2 py-1 inline-flex text-xs font-medium rounded-full
                      ${demande.statut === 'Nouveau' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : demande.statut === 'Contacté'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
                        : demande.statut === 'Devis envoyé'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }
                    `}>
                      {demande.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

