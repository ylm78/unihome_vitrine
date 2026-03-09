import { useState } from 'react';
import { X, Loader2, CreditCard } from 'lucide-react';
import { API_URL } from '../lib/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  finishMode?: 'indus' | 'wood';
}

// Fonction helper pour obtenir le nom d'affichage du produit
function getDisplayName(product: any, finishMode: 'indus' | 'wood'): string {
  if (finishMode === 'wood' && product.slug === 'container-moderne') {
    return 'MONOLITHE - Version Bois';
  }
  return product.name;
}

export function CheckoutModal({ isOpen, onClose, product, finishMode = 'indus' }: CheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const displayName = getDisplayName(product, finishMode);

  if (!isOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('🚀 Début de la création de session checkout:', { productId: product.id, finishMode, email, name });
      
      const response = await fetch(`${API_URL}/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          finishMode,
          customerEmail: email,
          customerName: name,
        }),
      });

      console.log('📡 Réponse reçue:', response.status, response.statusText);

      let data;
      try {
        data = await response.json();
        console.log('📦 Données reçues:', data);
      } catch (parseError) {
        console.error('❌ Erreur de parsing JSON:', parseError);
        const text = await response.text();
        console.error('📄 Réponse texte:', text);
        throw new Error('Réponse invalide du serveur');
      }

      if (!response.ok) {
        console.error('❌ Erreur HTTP:', response.status, data);
        throw new Error(data.error || data.message || `Erreur ${response.status}: ${response.statusText}`);
      }

      // Rediriger vers Stripe Checkout
      if (data.url) {
        console.log('✅ Redirection vers Stripe:', data.url);
        window.location.href = data.url;
      } else {
        console.error('❌ URL de paiement manquante dans la réponse:', data);
        throw new Error('URL de paiement non reçue');
      }
    } catch (err: any) {
      console.error('❌ Erreur checkout complète:', err);
      setError(err.message || 'Une erreur est survenue lors de l\'initialisation du paiement');
      setLoading(false);
    }
  };

  const price = finishMode === 'wood' && product.price_max 
    ? product.price_max 
    : product.price_min || 45000;

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-[10000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Finaliser votre commande</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleCheckout} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Jean Dupont"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="jean.dupont@example.com"
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Produit</span>
              <span className="font-medium">{displayName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Finition</span>
              <span className="font-medium">
                {finishMode === 'wood' ? 'Bois (Douglas/Mélèze)' : 'Industrielle'}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-green-700">
                  {price.toLocaleString('fr-FR')} €
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:scale-[1.02] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Traitement en cours...
              </>
            ) : (
              <>
                <CreditCard size={20} />
                Procéder au paiement sécurisé
              </>
            )}
          </button>

          <p className="text-xs text-center text-gray-500">
            Vous serez redirigé vers Stripe pour effectuer le paiement de manière sécurisée
          </p>
        </form>
      </div>
    </div>
  );
}


