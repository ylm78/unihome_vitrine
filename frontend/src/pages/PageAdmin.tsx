import { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isAdminEmail } from '../utils/adminUtils';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { PageInventaire } from './admin/PageInventaire';
import { PageProductForm } from './admin/PageProductForm';
import { PageClients } from './admin/PageClients';
import { PageCommandes } from './admin/PageCommandes';
import { PageDevis } from './admin/PageDevis';

export function PageAdmin() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const isAdmin = user?.role === 'admin' || isAdminEmail(user?.email);

  // Rediriger si pas authentifié ou pas admin
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || !user) {
        navigate('/login');
        return;
      }
      if (!isAdmin) {
        navigate('/');
        return;
      }
    }
  }, [isAuthenticated, user, isAdmin, loading, navigate]);

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si pas admin, ne rien afficher (redirection en cours)
  if (!isAuthenticated || !user || !isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="inventaire" element={<PageInventaire />} />
        <Route path="inventaire/nouveau" element={<PageProductForm />} />
        <Route path="inventaire/:id" element={<PageProductForm />} />
        <Route path="clients" element={<PageClients />} />
        <Route path="commandes" element={<PageCommandes />} />
        <Route path="demandes-contact" element={<PageDevis defaultType="contact" />} />
        <Route path="demandes-devis" element={<PageDevis defaultType="quote" />} />
      </Routes>
    </AdminLayout>
  );
}
