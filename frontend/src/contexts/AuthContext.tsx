import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, first_name?: string, last_name?: string, phone?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:3001/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Charger le token depuis localStorage au démarrage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Vérifier le token depuis l'URL (callback Google)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      console.log('🔑 Token reçu depuis l\'URL, traitement...');
      setToken(tokenFromUrl);
      localStorage.setItem('token', tokenFromUrl);
      fetchUserProfile(tokenFromUrl);
      // Nettoyer l'URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log('ℹ️ Aucun token dans l\'URL');
    }
  }, []);

  const fetchUserProfile = async (authToken: string) => {
    try {
      console.log('📡 Récupération du profil utilisateur...');
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('📦 Données reçues:', data);
        if (data.success) {
          console.log('✅ Profil utilisateur chargé:', data.data?.email);
          setUser(data.data);
        } else {
          console.warn('⚠️ Réponse non réussie:', data);
        }
      } else {
        console.error('❌ Erreur HTTP:', response.status, response.statusText);
        const errorData = await response.json().catch(() => ({}));
        console.error('Détails:', errorData);
        // Token invalide, supprimer
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch (error) {
      console.error('❌ Erreur lors de la récupération du profil:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la connexion');
    }

    if (data.success && data.data.token) {
      const authToken = data.data.token;
      setToken(authToken);
      localStorage.setItem('token', authToken);
      setUser(data.data.user);
    }
  };

  const register = async (
    email: string,
    password: string,
    first_name?: string,
    last_name?: string,
    phone?: string
  ) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, first_name, last_name, phone })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de l\'inscription');
    }

    if (data.success && data.data.token) {
      const authToken = data.data.token;
      setToken(authToken);
      localStorage.setItem('token', authToken);
      setUser(data.data.user);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token && !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}

// Export pour Google login
export const loginWithGoogle = () => {
  window.location.href = 'http://localhost:3001/api/auth/google';
};

