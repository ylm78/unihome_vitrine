import { Link } from 'react-router-dom';
import { XCircle, Home, ArrowLeft } from 'lucide-react';

export function PagePaymentCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 md:p-12 text-center">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Paiement annulé
          </h1>
          <p className="text-gray-600 text-lg">
            Votre paiement n'a pas été effectué
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <p className="text-gray-700 mb-4">
            Vous avez annulé le processus de paiement. Aucun montant n'a été débité.
          </p>
          <p className="text-sm text-gray-600">
            Si vous avez rencontré un problème ou souhaitez finaliser votre commande, 
            n'hésitez pas à nous contacter.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="flex-1 bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Retour à l'accueil
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Retour
            </button>
          </div>
          
          <Link
            to="/contact"
            className="block text-green-700 hover:text-green-800 font-medium text-sm mt-4"
          >
            Besoin d'aide ? Contactez-nous
          </Link>
        </div>
      </div>
    </div>
  );
}


