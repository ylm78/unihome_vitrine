import { useState, useEffect } from 'react';
import { Shield, Home, Lock, Zap, Trash2, Check, FileText, ArrowRight, Building2 } from 'lucide-react';
import { Suspense, lazy } from 'react';

import installationsChantierPacks from '../data/installationsChantierPacks.json';
import { NavHomepageStyle } from '../components/NavHomepageStyle';
import { FooterHomepageStyle } from '../components/FooterHomepageStyle';

const ContactModal = lazy(() => import('../components/ContactModal').then(m => ({ default: m.ContactModal })));

type ModeType = 'location' | 'achat';

const ICON_MAP = {
  shield: Shield,
  home: Home,
  lock: Lock,
  zap: Zap,
  trash: Trash2
};

interface PackCardProps {
  pack: (typeof installationsChantierPacks.packs)[0];
  mode: ModeType;
  onCtaClick: (packTitle: string, mode: ModeType) => void;
}

function PackCard({ pack, mode, onCtaClick }: PackCardProps) {
  const IconComponent = ICON_MAP[pack.icon as keyof typeof ICON_MAP] || BoxIcon;

  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden flex flex-col h-full hover:bg-white/10 hover:border-green-500/30 transition-all duration-300">
      <div className="relative h-44 sm:h-52 overflow-hidden bg-gradient-to-br from-green-900/50 to-gray-900/50">
        <div className="absolute inset-0 flex items-center justify-center">
          <IconComponent className="w-20 h-20 sm:w-24 sm:h-24 text-green-400 opacity-80" />
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3" style={{ fontFamily: 'Merriweather, serif' }}>
          {pack.title}
        </h3>
        <p className="text-gray-300 text-sm sm:text-base mb-4">
          {pack.description}
        </p>

        <ul className="space-y-2.5 mb-5 flex-grow">
          {pack.equipments.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-300">
              <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onCtaClick(pack.title, mode)}
          className="w-full py-3 sm:py-3.5 bg-green-700 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Demander un devis
        </button>
      </div>
    </div>
  );
}

function BoxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

export function PageInstallationsChantier() {
  const [mode, setMode] = useState<ModeType>('location');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [prefilledModel, setPrefilledModel] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaClick = (packTitle: string, currentMode: ModeType) => {
    const suffix = currentMode === 'location' ? ' (Location)' : ' (Achat)';
    setPrefilledModel(`${packTitle}${suffix}`);
    setContactModalOpen(true);
  };

  const handleContactModalClose = () => {
    setContactModalOpen(false);
    setPrefilledModel(null);
  };

  const handleOpenContact = () => {
    setPrefilledModel(null);
    setContactModalOpen(true);
  };

  const packs = installationsChantierPacks.packs;

  return (
    <div className="font-sans text-gray-900 min-h-screen bg-gray-900">
      <NavHomepageStyle
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onContactClick={handleOpenContact}
      />

      {/* Hero Section - style page d'accueil */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&auto=format&fit=crop&q=80" 
            alt="Chantier de construction moderne" 
            className="w-full h-full object-cover"
            width="1920"
            height="1080"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-gray-900/50" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
          <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-green-300 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-6 flex items-center justify-center gap-2 mx-auto w-fit">
            <Building2 size={14} className="sm:w-4 sm:h-4" /> 
            B2B & B2C
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight" style={{ fontFamily: 'Merriweather, serif' }}>
            Installations de <span className="text-green-400">Chantier</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 font-light max-w-2xl mx-auto">
            Packs clés en main pour artisans et chefs de chantier. Location ou achat.
          </p>

          {/* Toggle Location / Achat */}
          <div className="inline-flex border border-white/30 rounded-lg overflow-hidden backdrop-blur-sm">
            <button
              onClick={() => setMode('location')}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                mode === 'location'
                  ? 'bg-green-700 text-white'
                  : 'bg-white/10 text-gray-200 hover:bg-white/20'
              }`}
            >
              Location
            </button>
            <button
              onClick={() => setMode('achat')}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                mode === 'achat'
                  ? 'bg-green-700 text-white'
                  : 'bg-white/10 text-gray-200 hover:bg-white/20'
              }`}
            >
              Achat
            </button>
          </div>
        </div>
      </div>

      {/* Packs Section - fond sombre comme page d'accueil */}
      <section className="py-12 sm:py-20 bg-gray-900 relative">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-14 xl:gap-16">
            {packs.map((pack) => (
              <PackCard
                key={pack.id}
                pack={pack}
                mode={mode}
                onCtaClick={handleCtaClick}
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              Besoin d&apos;un pack personnalisé ou d&apos;une combinaison sur mesure ?
            </p>
            <button
              onClick={handleOpenContact}
              className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-green-500/30 hover:-translate-y-0.5"
            >
              <FileText className="w-5 h-5" />
              Nous contacter
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <FooterHomepageStyle onContactClick={handleOpenContact} />

      {/* Contact Modal */}
      <Suspense fallback={null}>
        {contactModalOpen && (
          <ContactModal
            isOpen={contactModalOpen}
            onClose={handleContactModalClose}
            prefilledModel={prefilledModel}
          />
        )}
      </Suspense>
    </div>
  );
}
