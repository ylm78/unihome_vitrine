import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Navigation } from './components/Navigation';
import { PiedDePage } from './components/PiedDePage';
import { ScrollToTop } from './components/ScrollToTop';

// Lazy loading de TOUTES les pages pour réduire le bundle initial (incl. /login)
const PageAccueilModerne = lazy(() => import('./pages/PageAccueilModerne').then(m => ({ default: m.PageAccueilModerne })));
const PageAccueil = lazy(() => import('./pages/PageAccueil').then(m => ({ default: m.PageAccueil })));
const PageMaisonContainer = lazy(() => import('./pages/PageMaisonContainer').then(m => ({ default: m.PageMaisonContainer })));
const PageProjets = lazy(() => import('./pages/PageProjets').then(m => ({ default: m.PageProjets })));
const PageGaleries = lazy(() => import('./pages/PageGaleries').then(m => ({ default: m.PageGaleries })));
const PageContact = lazy(() => import('./pages/PageContact').then(m => ({ default: m.PageContact })));
const PageProduit = lazy(() => import('./pages/PageProduit').then(m => ({ default: m.PageProduit })));
const PageLogin = lazy(() => import('./pages/PageLogin').then(m => ({ default: m.PageLogin })));
const PageRegister = lazy(() => import('./pages/PageRegister').then(m => ({ default: m.PageRegister })));
const PageAuthCallback = lazy(() => import('./pages/PageAuthCallback').then(m => ({ default: m.PageAuthCallback })));
const PagePaymentSuccess = lazy(() => import('./pages/PagePaymentSuccess').then(m => ({ default: m.PagePaymentSuccess })));
const PagePaymentCancel = lazy(() => import('./pages/PagePaymentCancel').then(m => ({ default: m.PagePaymentCancel })));
const PageProfile = lazy(() => import('./pages/PageProfile').then(m => ({ default: m.PageProfile })));
const PageAdmin = lazy(() => import('./pages/PageAdmin').then(m => ({ default: m.PageAdmin })));
const PageMentionsLegales = lazy(() => import('./pages/PageMentionsLegales').then(m => ({ default: m.PageMentionsLegales })));
const PagePolitiqueConfidentialite = lazy(() => import('./pages/PagePolitiqueConfidentialite').then(m => ({ default: m.PagePolitiqueConfidentialite })));
const PagePolitiqueCookies = lazy(() => import('./pages/PagePolitiqueCookies').then(m => ({ default: m.PagePolitiqueCookies })));
const PageCGV = lazy(() => import('./pages/PageCGV').then(m => ({ default: m.PageCGV })));
const PageCGU = lazy(() => import('./pages/PageCGU').then(m => ({ default: m.PageCGU })));
const PageInstallationsChantier = lazy(() => import('./pages/PageInstallationsChantier').then(m => ({ default: m.PageInstallationsChantier })));

// Composant de chargement
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
      <p className="text-gray-600">Chargement...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Page moderne avec son propre header - pas de Navigation/PiedDePage */}
          <Route path="/" element={<Suspense fallback={<LoadingFallback />}><PageAccueilModerne /></Suspense>} />
          {/* Installations Chantier - même style que page d'accueil (nav + footer intégrés) */}
          <Route path="/installations-chantier" element={<Suspense fallback={<LoadingFallback />}><PageInstallationsChantier /></Suspense>} />
          
          {/* Toutes les autres pages avec navigation commune */}
          <Route path="/*" element={
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />
            <main className="flex-grow">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/classique" element={<PageAccueil />} />
                  <Route path="/container/maison-container" element={<PageMaisonContainer />} />
                <Route path="/projets" element={<PageProjets />} />
                <Route path="/galeries" element={<PageGaleries />} />
                {/* Routes pour les autres pages Container */}
                <Route path="/container/panneau-sandwich" element={<PageMaisonContainer />} />
                <Route path="/container/bureau-chantier" element={<PageMaisonContainer />} />
                <Route path="/container/metropole" element={<PageMaisonContainer />} />
                <Route path="/container/sanitaires-douches" element={<PageMaisonContainer />} />
                <Route path="/container/demontable" element={<PageMaisonContainer />} />
                <Route path="/container/sur-mesure" element={<PageMaisonContainer />} />
                <Route path="/container/dortoir" element={<PageMaisonContainer />} />
                <Route path="/container/refectoire" element={<PageMaisonContainer />} />
                <Route path="/container/urgence-sismique" element={<PageMaisonContainer />} />
                <Route path="/container/plans" element={<PageMaisonContainer />} />
                {/* Routes Bâtiment Préfabriqué */}
                <Route path="/batiment-prefabrique/chantier" element={<PageProduit />} />
                <Route path="/batiment-prefabrique/bureau" element={<PageProduit />} />
                <Route path="/batiment-prefabrique/acier" element={<PageProduit />} />
                <Route path="/batiment-prefabrique/social" element={<PageProduit />} />
                <Route path="/batiment-prefabrique/ecole" element={<PageProduit />} />
                <Route path="/batiment-prefabrique/hopital" element={<PageProduit />} />
                <Route path="/batiment-prefabrique/hotel" element={<PageProduit />} />
                <Route path="/batiment-prefabrique/sanitaires" element={<PageProduit />} />
                <Route path="/batiment-prefabrique/dortoir" element={<PageProduit />} />
                <Route path="/batiment-prefabrique/refectoire" element={<PageProduit />} />
                {/* Routes Maison Acier */}
                <Route path="/maison-acier/imperiale" element={<PageProduit />} />
                <Route path="/maison-acier/plain-pied" element={<PageProduit />} />
                <Route path="/maison-acier/etage" element={<PageProduit />} />
                <Route path="/maison-acier/technique" element={<PageProduit />} />
                {/* Routes Maisons Préfabriquées */}
                <Route path="/maisons-prefabriquees/plain-pied" element={<PageProduit />} />
                <Route path="/maisons-prefabriquees/etage" element={<PageProduit />} />
                <Route path="/maisons-prefabriquees/villa" element={<PageProduit />} />
                <Route path="/maisons-prefabriquees/economique" element={<PageProduit />} />
                <Route path="/maisons-prefabriquees/urgence-sismique" element={<PageProduit />} />
                <Route path="/maisons-prefabriquees/technique" element={<PageProduit />} />
                {/* Routes Cabine */}
                <Route path="/cabine/metropole" element={<PageProduit />} />
                <Route path="/cabine/polyester" element={<PageProduit />} />
                <Route path="/cabine/large" element={<PageProduit />} />
                <Route path="/cabine/mobile" element={<PageProduit />} />
                <Route path="/cabine/panneaux" element={<PageProduit />} />
                <Route path="/cabine/securite" element={<PageProduit />} />
                <Route path="/cabine/prefabriquee" element={<PageProduit />} />
                <Route path="/cabine/technique" element={<PageProduit />} />
                {/* Routes Entreprise */}
                <Route path="/entreprise/mission" element={<PageProduit />} />
                <Route path="/entreprise/actualites" element={<PageProduit />} />
                <Route path="/entreprise/rgpd" element={<PageProduit />} />
                <Route path="/entreprise/certifications" element={<PageProduit />} />
                <Route path="/entreprise/catalogue" element={<PageProduit />} />
                </Routes>
              </Suspense>
            </main>
            <PiedDePage />
          </div>
          } />
          <Route path="/login" element={<Suspense fallback={<LoadingFallback />}><PageLogin /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={<LoadingFallback />}><PageRegister /></Suspense>} />
          <Route path="/auth/callback" element={<Suspense fallback={<LoadingFallback />}><PageAuthCallback /></Suspense>} />
          <Route path="/profile" element={<Suspense fallback={<LoadingFallback />}><PageProfile /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<LoadingFallback />}><PageContact /></Suspense>} />
          <Route path="/mentions-legales" element={<Suspense fallback={<LoadingFallback />}><PageMentionsLegales /></Suspense>} />
          <Route path="/politique-confidentialite" element={<Suspense fallback={<LoadingFallback />}><PagePolitiqueConfidentialite /></Suspense>} />
          <Route path="/politique-cookies" element={<Suspense fallback={<LoadingFallback />}><PagePolitiqueCookies /></Suspense>} />
          <Route path="/cgv" element={<Suspense fallback={<LoadingFallback />}><PageCGV /></Suspense>} />
          <Route path="/cgu" element={<Suspense fallback={<LoadingFallback />}><PageCGU /></Suspense>} />
          <Route path="/admin/*" element={<Suspense fallback={<LoadingFallback />}><PageAdmin /></Suspense>} />
          <Route path="/payment/success" element={<Suspense fallback={<LoadingFallback />}><PagePaymentSuccess /></Suspense>} />
          <Route path="/payment/cancel" element={<Suspense fallback={<LoadingFallback />}><PagePaymentCancel /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
