import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Home, Package } from 'lucide-react';
import { API_URL } from '../lib/api';

export function PagePaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      fetch(`${API_URL}/payments/session/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setOrder(data.order);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Erreur lors de la récupération de la commande:', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 md:p-12 text-center">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Paiement réussi !
          </h1>
          <p className="text-gray-600 text-lg">
            Merci pour votre commande
          </p>
        </div>

        {loading ? (
          <div className="py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : order ? (
          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Détails de la commande
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Produit :</span>
                <span className="font-medium">{order.product_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Montant :</span>
                <span className="font-medium text-green-700">
                  {order.amount?.toLocaleString('fr-FR')} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Statut :</span>
                <span className="font-medium text-green-600 capitalize">
                  {order.status === 'completed' ? 'Confirmé' : 'En attente'}
                </span>
              </div>
              {order.customer_email && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Email :</span>
                  <span className="font-medium">{order.customer_email}</span>
                </div>
              )}
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          <p className="text-gray-600 mb-6">
            Un email de confirmation vous a été envoyé avec tous les détails de votre commande.
            Notre équipe vous contactera sous 24h pour finaliser votre projet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Retour à l'accueil
            </Link>
            <Link
              to="/projets"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Package size={20} />
              Voir nos projets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


