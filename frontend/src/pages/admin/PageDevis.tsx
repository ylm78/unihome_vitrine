import { useState, useEffect } from 'react';
import { Search, FileText, Calendar, Mail, User, CheckCircle, Clock, XCircle, MessageSquare, Star, Trash2, PlusCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../lib/api';

interface QuoteRequest {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  model: string;
  project: string;
  status: string;
  source: string;
  request_type?: string;
  is_favorite?: number | boolean;
  created_at: string;
}

interface PageDevisProps {
  defaultType?: 'contact' | 'quote';
}

export function PageDevis({ defaultType }: PageDevisProps) {
  const { token } = useAuth();
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>(defaultType || 'all');

  useEffect(() => {
    if (token) fetchRequests();
  }, [token]);

  useEffect(() => {
    if (defaultType) setTypeFilter(defaultType);
  }, [defaultType]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/quote-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setRequests(data.data || []);
      } else {
        setError(data.message || 'Erreur lors du chargement des demandes');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des demandes');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id: number, current: boolean) => {
    try {
      const res = await fetch(`${API_URL}/quote-requests/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_favorite: !current }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchRequests();
      }
    } catch {
      // silent fail
    }
  };

  const markQuoteCreated = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/quote-requests/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'quote_created' }),
      });
      const data = await res.json();
      if (data.success) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: 'quote_created' } : r))
        );
      }
    } catch {
      // silent fail
    }
  };

  const deleteRequest = async (id: number) => {
    if (!window.confirm('Supprimer cette demande ?')) return;
    try {
      const res = await fetch(`${API_URL}/quote-requests/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setRequests((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      setError('Erreur lors de la suppression');
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      searchTerm === '' ||
      req.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.project?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const reqType = req.request_type || 'quote';
    const matchesType =
      typeFilter === 'all' ||
      (typeFilter === 'contact' && reqType === 'contact') ||
      (typeFilter === 'quote' && reqType === 'quote');

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: typeof Clock; label: string }> = {
      pending: {
        color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
        icon: Clock,
        label: 'En attente',
      },
      quote_created: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        icon: CheckCircle,
        label: 'Devis créé',
      },
      treated: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        icon: CheckCircle,
        label: 'Traité',
      },
      cancelled: {
        color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        icon: XCircle,
        label: 'Annulé',
      },
    };

    const config = statusConfig[status] || {
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      icon: Clock,
      label: status,
    };

    const Icon = config.icon;

    return (
      <span
        className={`px-2 py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${config.color}`}
      >
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const pageTitle = defaultType === 'contact'
    ? 'Demandes de contact'
    : defaultType === 'quote'
      ? 'Demandes de devis'
      : 'Demandes de contact & devis';

  const pageDescription = defaultType === 'contact'
    ? 'Messages généraux et questions des visiteurs'
    : defaultType === 'quote'
      ? 'Demandes de devis sur les produits'
      : 'Liste des demandes issues du site vitrine';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {pageDescription}
        </p>
      </div>

      <div className={`grid grid-cols-1 gap-4 ${defaultType ? 'md:grid-cols-2' : 'md:grid-cols-4'}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {defaultType === 'contact' ? 'Total contact' : defaultType === 'quote' ? 'Total devis' : 'Total'}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {filteredRequests.length}
              </p>
            </div>
            {defaultType === 'contact' ? (
              <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            ) : (
              <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
            )}
          </div>
        </div>
        {!defaultType && (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {requests.filter((r) => (r.request_type || 'quote') === 'contact').length}
                  </p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Devis</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {requests.filter((r) => (r.request_type || 'quote') === 'quote').length}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </>
        )}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">En attente</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {filteredRequests.filter((r) => r.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher (client, email, produit)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {!defaultType && (
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Toutes les demandes</option>
              <option value="contact">Contact</option>
              <option value="quote">Devis</option>
            </select>
            )}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="quote_created">Devis créé</option>
              <option value="treated">Traité</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Chargement des demandes...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
              ? 'Aucune demande ne correspond aux filtres'
              : 'Aucune demande'}
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  {!defaultType && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Produit / Modèle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Projet
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
                {filteredRequests.map((req) => {
                  const reqType = req.request_type || 'quote';
                  return (
                  <tr
                    key={req.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {!defaultType && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${
                          reqType === 'quote'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}
                      >
                        {reqType === 'quote' ? (
                          <><FileText className="w-3 h-3" /> Devis</>
                        ) : (
                          <><MessageSquare className="w-3 h-3" /> Contact</>
                        )}
                      </span>
                    </td>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400 shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {req.customer_name}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Mail className="w-3 h-3" />
                            {req.customer_email}
                          </div>
                          {req.customer_phone && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {req.customer_phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {req.model || '-'}
                      </div>
                      {req.source && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Source: {req.source}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-[200px]">
                      <div className="text-sm text-gray-700 dark:text-gray-300 truncate" title={req.project}>
                        {req.project || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(req.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {new Date(req.created_at).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(req.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleFavorite(req.id, !!(req.is_favorite === 1 || req.is_favorite === true))}
                          className={`p-2 rounded-lg transition-colors ${
                            req.is_favorite === 1 || req.is_favorite === true
                              ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20'
                              : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          title="Favoris"
                        >
                          <Star className="w-4 h-4" fill={req.is_favorite === 1 || req.is_favorite === true ? 'currentColor' : 'none'} />
                        </button>
                        {req.status !== 'quote_created' && (
                          <button
                            onClick={() => markQuoteCreated(req.id)}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Créer le devis"
                          >
                            <PlusCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteRequest(req.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );})}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
