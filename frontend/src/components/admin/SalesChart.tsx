import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { TrendingUp, TrendingDown, X as XIcon } from 'lucide-react';

interface OrderDetail {
  id: number;
  customer_name: string;
  customer_email: string;
  product_name: string;
  amount: number;
  created_at: string;
}

interface ChartData {
  date: string;
  dateFull: string; // Date complète pour le tri et l'affichage
  ventes: number;
  commandes: number;
  orders: OrderDetail[];
}

// Noms factices pour les clients
const mockNames = [
  'Jean Dupont', 'Marie Martin', 'Pierre Bernard', 'Sophie Durand', 'Luc Moreau',
  'Claire Rousseau', 'Thomas Leroy', 'Emma Petit', 'Louis Moreau', 'Léa Dubois',
  'Antoine Girard', 'Camille Bernard', 'Hugo Lefebvre', 'Juliette Simon', 'Nicolas Laurent'
];

// Emails factices
const mockEmails = [
  'jean.dupont@email.com', 'marie.martin@email.com', 'pierre.bernard@email.com',
  'sophie.durand@email.com', 'luc.moreau@email.com', 'claire.rousseau@email.com',
  'thomas.leroy@email.com', 'emma.petit@email.com', 'louis.moreau@email.com',
  'lea.dubois@email.com', 'antoine.girard@email.com', 'camille.bernard@email.com',
  'hugo.lefebvre@email.com', 'juliette.simon@email.com', 'nicolas.laurent@email.com'
];

// Produits disponibles
const products = ['MONOLITHE', "L'ÉCRIN", 'SANCTUARY'];

// Générer des données factices avec détails des commandes
const generateMockData = (period: '7' | '30' | '90' | 'all'): ChartData[] => {
  const days = period === 'all' ? 90 : parseInt(period);
  const data: ChartData[] = [];
  const now = new Date();

  // Générer des données avec une tendance légèrement croissante et de la variabilité
  let baseVentes = 35000;
  let orderId = 1;
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateFull = date.toISOString();
    
    // Ajouter une tendance légèrement croissante
    const trend = (days - i) * 150;
    
    // Ajouter de la variabilité aléatoire (±20%)
    const variability = (Math.random() - 0.5) * 0.4;
    
    // Ventes avec tendance et variabilité
    const ventes = baseVentes + trend + (baseVentes * variability);
    
    // Nombre de commandes (entre 0 et 3 par jour, avec une probabilité plus élevée pour des ventes plus élevées)
    const numCommandes = ventes > 40000 
      ? Math.floor(Math.random() * 3) + 1
      : Math.floor(Math.random() * 2);

    // Générer les commandes détaillées pour ce jour
    const orders: OrderDetail[] = [];
    let totalVentesJour = 0;

    for (let j = 0; j < numCommandes; j++) {
      const randomIndex = Math.floor(Math.random() * mockNames.length);
      const product = products[Math.floor(Math.random() * products.length)];
      
      // Montant variant entre 30k et 70k
      const orderAmount = 30000 + Math.random() * 40000;
      totalVentesJour += orderAmount;

      orders.push({
        id: orderId++,
        customer_name: mockNames[randomIndex],
        customer_email: mockEmails[randomIndex],
        product_name: product,
        amount: Math.round(orderAmount * 100) / 100,
        created_at: new Date(date.getTime() + j * 3600000).toISOString() // Espacer les commandes de 1h
      });
    }

    data.push({
      date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      dateFull: dateFull,
      ventes: numCommandes > 0 ? Math.round(totalVentesJour * 100) / 100 : Math.round(ventes * 100) / 100,
      commandes: numCommandes,
      orders: orders
    });
  }

  return data;
};

export function SalesChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7' | '30' | '90' | 'all'>('30');
  const [selectedDate, setSelectedDate] = useState<ChartData | null>(null);

  useEffect(() => {
    // Simuler un chargement asynchrone
    setLoading(true);
    setTimeout(() => {
      const mockData = generateMockData(period);
      setChartData(mockData);
      setLoading(false);
    }, 500);
  }, [period]);

  // Calculer les statistiques
  const totalVentes = chartData.reduce((sum, item) => sum + item.ventes, 0);
  const totalCommandes = chartData.reduce((sum, item) => sum + item.commandes, 0);
  const moyenneVentes = chartData.length > 0 ? totalVentes / chartData.length : 0;

  // Calculer la tendance (comparaison avec la première moitié vs deuxième moitié)
  const firstHalf = chartData.slice(0, Math.floor(chartData.length / 2));
  const secondHalf = chartData.slice(Math.floor(chartData.length / 2));
  const avgFirstHalf = firstHalf.length > 0 ? firstHalf.reduce((sum, item) => sum + item.ventes, 0) / firstHalf.length : 0;
  const avgSecondHalf = secondHalf.length > 0 ? secondHalf.reduce((sum, item) => sum + item.ventes, 0) / secondHalf.length : 0;
  const trend = avgFirstHalf > 0 ? ((avgSecondHalf - avgFirstHalf) / avgFirstHalf) * 100 : 0;
  const isPositiveTrend = trend >= 0;

  // Formatter les valeurs pour l'axe Y
  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k €`;
    }
    return `${value.toFixed(0)} €`;
  };

  // Formatter le tooltip - simplifié sans bouton cliquable
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartData;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border-2 border-green-200 dark:border-green-700 max-w-xs">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            {data.date}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mb-1 font-medium">
            💰 Ventes: {data.ventes.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-2 font-medium">
            📦 Commandes: {data.commandes}
          </p>
          {data.orders && data.orders.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Aperçu des commandes:
              </p>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {data.orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="text-xs bg-gray-50 dark:bg-gray-900/50 p-1.5 rounded">
                    <p className="text-gray-900 dark:text-white font-medium truncate">{order.customer_name}</p>
                    <p className="text-gray-600 dark:text-gray-400 truncate">{order.product_name}</p>
                  </div>
                ))}
                {data.orders.length > 3 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    +{data.orders.length - 3} autre(s) commande(s)
                  </p>
                )}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-3 pt-2 border-t border-gray-200 dark:border-gray-700 font-semibold">
                👆 Cliquez sur le point pour voir tous les détails
              </p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Gestion du clic sur un point du graphique
  const handlePointClick = (data: ChartData) => {
    if (data.orders && data.orders.length > 0) {
      setSelectedDate(data);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Chargement des données...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {/* En-tête avec filtres */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Évolution des ventes
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Données de démonstration • <span className="font-medium text-green-600 dark:text-green-400">Cliquez sur un point</span> pour voir les détails complets
          </p>
        </div>

        {/* Filtres de période */}
        <div className="flex gap-2">
          {(['7', '30', '90', 'all'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`
                px-3 py-1 text-sm font-medium rounded-lg transition-colors
                ${period === p
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }
              `}
            >
              {p === 'all' ? 'Tout' : `${p}j`}
            </button>
          ))}
        </div>
      </div>

      {/* Statistiques résumées */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total des ventes</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalVentes.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total des commandes</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCommandes}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Tendance</p>
            {isPositiveTrend ? (
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
            )}
          </div>
          <p className={`text-2xl font-bold ${isPositiveTrend ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Graphique */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={chartData} 
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          onClick={(data: any) => {
            if (data && data.activePayload && data.activePayload[0]) {
              const clickedData = data.activePayload[0].payload as ChartData;
              handlePointClick(clickedData);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            className="dark:stroke-gray-400"
            tick={{ fill: '#6b7280' }}
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            className="dark:stroke-gray-400"
            tick={{ fill: '#6b7280' }}
            style={{ fontSize: '12px' }}
            tickFormatter={formatCurrency}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: '#16a34a', strokeWidth: 2, strokeDasharray: '5 5' }}
            animationDuration={200}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="ventes"
            stroke="#16a34a"
            strokeWidth={2}
            dot={{ 
              fill: '#16a34a', 
              r: 5,
              style: { cursor: 'pointer', transition: 'all 0.2s' }
            }}
            activeDot={{ 
              r: 8,
              fill: '#16a34a',
              stroke: '#fff',
              strokeWidth: 2,
              style: { cursor: 'pointer', transition: 'all 0.2s' }
            }}
            name="Ventes (€)"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Modal des détails des commandes */}
      {selectedDate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            // Fermer si on clique en dehors du modal
            if (e.target === e.currentTarget) {
              setSelectedDate(null);
            }
          }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col animate-in fade-in duration-200">
            {/* En-tête du modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Commandes du {selectedDate.date}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {selectedDate.commandes} commande(s) • {selectedDate.ventes.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </p>
              </div>
              <button
                onClick={() => setSelectedDate(null)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Fermer"
              >
                <XIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Liste des commandes */}
            <div className="flex-1 overflow-y-auto p-6">
              {selectedDate.orders && selectedDate.orders.length > 0 ? (
                <div className="space-y-4">
                  {selectedDate.orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-semibold text-base shadow-md">
                              {order.customer_name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-base font-semibold text-gray-900 dark:text-white">
                                {order.customer_name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {order.customer_email}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                              {order.product_name}
                            </span>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-xl font-bold text-green-600 dark:text-green-400">
                            {order.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(order.created_at).toLocaleTimeString('fr-FR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">Aucune commande ce jour</p>
                </div>
              )}
            </div>

            {/* Footer du modal */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <button
                onClick={() => setSelectedDate(null)}
                className="w-full px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

