import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box } from 'lucide-react';

export function PageAuthCallback() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('🔄 PageAuthCallback - État:', { user: !!user, loading });
    
    // Le token est déjà géré par AuthContext via l'URL
    if (!loading) {
      if (user) {
        console.log('✅ Utilisateur connecté, redirection vers l\'accueil');
        // Rediriger vers l'accueil si connecté
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        console.log('❌ Aucun utilisateur, redirection vers login');
        // Rediriger vers login si erreur
        setTimeout(() => {
          navigate('/login?error=auth_failed');
        }, 1000);
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-700 rounded-xl flex items-center justify-center animate-spin">
            <Box className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Connexion en cours...
        </h2>
        <p className="text-gray-600">
          Veuillez patienter pendant que nous vous connectons.
        </p>
      </div>
    </div>
  );
}

