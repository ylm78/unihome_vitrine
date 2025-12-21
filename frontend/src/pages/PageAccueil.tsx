import { Link } from 'react-router-dom';
import { Info, ArrowRight, CheckCircle, Shield, Zap, Leaf, Home, Building2, Container, Factory, Box, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const containerModels = [
  { id: 1, name: 'Maison Container 21 m²', size: '21 m²', type: '1+1', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop', description: 'Maison container compacte idéale pour studio ou petite famille' },
  { id: 2, name: 'Maison Container 35 m²', size: '35 m²', type: '1+1 avec Terrasse', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop', description: 'Maison container avec terrasse, espace de vie optimisé' },
  { id: 3, name: 'Maison Container 42 m²', size: '42 m²', type: '2+1', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop', description: 'Maison container familiale avec 2 chambres' },
  { id: 4, name: 'Maison Container Villageoise', size: '54 m²', type: '2+1', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop', description: 'Maison container villageoise spacieuse' },
  { id: 5, name: 'Container Métropole 14 m²', size: '14 m²', type: 'Studio', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop', description: 'Studio container urbain compact' },
  { id: 6, name: 'Container Métropole 21 m²', size: '21 m²', type: '1+0', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop', description: 'Studio container moderne et fonctionnel' },
];

export function PageAccueil() {
  const [beforeAfterIndex, setBeforeAfterIndex] = useState(0);
  
  const beforeAfterProjects = [
    {
      avant: '/images/products/avant.jpeg',
      apres: '/images/products/apres.jpg',
      title: 'Transformation Complète',
      description: 'De conteneurs bruts à une maison moderne et élégante',
      points: [
        'Structure en conteneurs maritimes recyclés',
        'Isolation et finitions haut de gamme',
        'Grandes baies vitrées pour luminosité maximale',
        'Terrasse en bois intégrée',
        'Éclairage LED moderne'
      ]
    },
    {
      avant: '/images/products/avant2.jpeg',
      apres: '/images/products/apres2.jpg',
      title: 'Maison Container Moderne',
      description: 'Architecture contemporaine avec vue imprenable',
      points: [
        'Design en L avec étage suspendu',
        'Pergola métallique pour espace extérieur',
        'Éclairage intérieur chaleureux',
        'Fondation en béton surélevée',
        'Intégration paysagère harmonieuse'
      ]
    }
  ];

  const handleRequestPrice = (modelId: number) => {
    window.location.href = `/contact?model=${modelId}`;
  };

  const nextProject = () => {
    setBeforeAfterIndex((prev) => (prev + 1) % beforeAfterProjects.length);
  };

  const prevProject = () => {
    setBeforeAfterIndex((prev) => (prev - 1 + beforeAfterProjects.length) % beforeAfterProjects.length);
  };

  return (
    <div>
      {/* Hero Sections pour chaque catégorie */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 bg-gradient-to-br from-green-50 to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Çelik Ev */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Maison Acier</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Güven ve Estetik Sarmalı Çelik Ev Modelleri</p>
              <Link to="/maison-acier/plain-pied" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800">
                Découvrir <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Prefabrik Yapı */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Bâtiment Préfabriqué</h3>
              </div>
              <p className="text-gray-600 mb-4">İhtiyaca Yönelik Tasarım ve Üretkenlik Prefabrik Yapı Modelleri</p>
              <Link to="/batiment-prefabrique/chantier" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800">
                Découvrir <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Konteyner */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
                  <Container className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Container</h3>
              </div>
              <p className="text-gray-600 mb-4">İddialıyız Beklentilerinizi Aşacağız Yeni Nesil Konteyner Modelleri</p>
              <Link to="/container/maison-container" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800">
                Découvrir <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Prefabrik Evler */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Maisons Préfabriquées</h3>
              </div>
              <p className="text-gray-600 mb-4">Benzersiz Yaşam İstediğiniz Yerde Prefabrik Ev Modelleri</p>
              <Link to="/maisons-prefabriquees/plain-pied" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800">
                Découvrir <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Kabin */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
                  <Box className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Cabine Modulaire</h3>
              </div>
              <p className="text-gray-600 mb-4">Mükemmel Konfor Deneyimi Modüler Kabin Modelleri</p>
              <Link to="/cabine/panneaux" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800">
                Découvrir <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Projeler */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
                  <Factory className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Projets</h3>
              </div>
              <p className="text-gray-600 mb-4">Siz Hayal Edin Biz Gerçekleştirelim Dünyanın Her Yerinden Projelerimiz</p>
              <Link to="/projets" className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800">
                Découvrir <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Prefabrik Yapı */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Bâtiment Préfabriqué
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Des solutions de construction préfabriquées adaptées à tous vos besoins
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
            {[
              { title: 'Bâtiments de Chantier', desc: 'Güven, hızlı kurulum, en iyi ergonomi', link: '/batiment-prefabrique/chantier' },
              { title: 'Bureaux Préfabriqués', desc: 'Çalışma alanlarına verimlilik katan teknoloji', link: '/batiment-prefabrique/bureau' },
              { title: 'Structures en Acier', desc: 'Yüksek güvenlik yüksek konfor', link: '/batiment-prefabrique/acier' },
              { title: 'Installations Sociales', desc: 'Yenilik, hız, güven, huzur', link: '/batiment-prefabrique/social' },
              { title: 'Bâtiments Éducatifs', desc: 'Eğitimde en hızlı ve güvenli yapılar', link: '/batiment-prefabrique/ecole' },
              { title: 'Hôpitaux Préfabriqués', desc: 'En hızlı ve yerinde sağlık hizmeti', link: '/batiment-prefabrique/hopital' },
              { title: 'Hôtels Préfabriqués', desc: 'Yeni nesil modern konaklama yapıları', link: '/batiment-prefabrique/hotel' },
              { title: 'Blocs Sanitaires', desc: 'İhtiyaçlara en estetik ve pratik çözüm', link: '/batiment-prefabrique/sanitaires' },
              { title: 'Bâtiments de Dortoirs', desc: 'Konaklamada ev konforu', link: '/batiment-prefabrique/dortoir' },
              { title: 'Réfectoires Préfabriqués', desc: 'Yemek anı konfora dönüşüyor', link: '/batiment-prefabrique/refectoire' },
            ].map((item, index) => (
              <Link key={index} to={item.link} className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Konteyner */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Container
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Des containers innovants pour tous vos besoins
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
            {[
              { title: 'Container Panneau Sandwich', desc: 'Uzun ömür, yüksek yalıtım, enerji tasarrufu', link: '/container/panneau-sandwich' },
              { title: 'Containers Bureau & Chantier', desc: 'Hızlı kurulum avantajlarıyla hemen kazandıran yapılar', link: '/container/bureau-chantier' },
              { title: 'Maisons Container', desc: 'Konfor beklentilerinin de ötesinde', link: '/container/maison-container' },
              { title: 'Containers Métropole de Luxe', desc: 'Modern mimariye en uyumlu mobil yapılar', link: '/container/metropole' },
              { title: 'Containers Sanitaires', desc: 'Nerede ihtiyaç varsa aynı gün kullanıma hazır', link: '/container/sanitaires-douches' },
              { title: 'Containers Démontables', desc: 'Kolay nakliye en hızlı kurulum', link: '/container/demontable' },
              { title: 'Container Sur Mesure', desc: 'Farklı kullanım alanlarına en hızlı yapı çözümü', link: '/container/sur-mesure' },
              { title: 'Containers Dortoir', desc: 'Zindelik veren konaklama mekanları için', link: '/container/dortoir' },
              { title: 'Containers Réfectoire', desc: 'Şantiye ve Endüstri tesislerine en pratik çözüm', link: '/container/refectoire' },
              { title: 'Containers d\'Urgence', desc: 'Afetzedeyi evinde hissettiren yapı sistemi', link: '/container/urgence-sismique' },
            ].map((item, index) => (
              <Link key={index} to={item.link} className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Çelik Ev */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Maison Acier
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Des maisons en acier robustes et esthétiques
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: 'Série Impériale', desc: '6 Ocak için hazırlanıyor.', link: '/maison-acier/imperiale' },
              { title: 'Maisons Plain-Pied', desc: 'Güven, mutluluk, huzur bu evde', link: '/maison-acier/plain-pied' },
              { title: 'Maisons à Étage', desc: 'Evin en güvenlisi en konforlusu', link: '/maison-acier/etage' },
              { title: 'Caractéristiques Techniques', desc: 'En güvenlisi en iyisi', link: '/maison-acier/technique' },
            ].map((item, index) => (
              <Link key={index} to={item.link} className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Prefabrik Evler */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Maisons Préfabriquées
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Des maisons préfabriquées pour une vie unique où vous le souhaitez
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
            {[
              { title: 'Maisons Plain-Pied', desc: 'Ev sahibi olmanın en kolay yolu', link: '/maisons-prefabriquees/plain-pied' },
              { title: 'Maisons à Étage', desc: 'Modern mimarinin yeni trend evleri', link: '/maisons-prefabriquees/etage' },
              { title: 'Villas Préfabriquées', desc: 'Farklı olmanın ayrıcalıkları', link: '/maisons-prefabriquees/villa' },
              { title: 'Logements Collectifs', desc: 'Konut açığının giderilmesinin en hızlı yolu', link: '/maisons-prefabriquees/economique' },
              { title: 'Logements d\'Urgence', desc: 'Zor zamanda insanlığın yanında', link: '/maisons-prefabriquees/urgence-sismique' },
              { title: 'Caractéristiques Techniques', desc: 'En güvenlisi en iyisi', link: '/maisons-prefabriquees/technique' },
            ].map((item, index) => (
              <Link key={index} to={item.link} className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Kabin */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Cabine Modulaire
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Des cabines modulaires pour une expérience de confort parfaite
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: 'Cabinets Métropole', desc: 'Estetik Metropol Kabinler', link: '/cabine/metropole' },
              { title: 'Cabinets Polyester', desc: 'Polyester Kabinler', link: '/cabine/polyester' },
              { title: 'Cabinets Larges', desc: 'Geniş Kabinler', link: '/cabine/large' },
              { title: 'Cabinets Sanitaires Mobiles', desc: 'Seyyar Tuvalet & Duş Kabinleri', link: '/cabine/mobile' },
              { title: 'Cabinets Panneaux', desc: 'Panel Kabinler', link: '/cabine/panneaux' },
              { title: 'Guérites de Sécurité', desc: 'Zırhlı Güvenlik Kulübeleri', link: '/cabine/securite' },
              { title: 'Cabinets Préfabriqués', desc: 'Prekast Estetik Kabinler', link: '/cabine/prefabriquee' },
              { title: 'Caractéristiques Techniques', desc: 'Kabin Teknik Özellikleri', link: '/cabine/technique' },
            ].map((item, index) => (
              <Link key={index} to={item.link} className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produits Section - Maisons Container */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 px-2" style={{ fontFamily: 'Merriweather, serif' }}>Modèles de Maisons Container</h2>
            <p className="text-sm sm:text-base text-gray-600 px-2">La production prête à l'emploi dans des installations modernes est le principal avantage de la maison container.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {containerModels.map((model) => (
              <div key={model.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">{model.name}</h3>
                    <span className="bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-semibold self-start sm:self-auto">
                      {model.size}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{model.type}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{model.description}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleRequestPrice(model.id)}
                      className="flex-1 bg-green-700 text-white px-3 sm:px-4 py-2 rounded hover:bg-green-800 transition-colors font-semibold text-xs sm:text-sm"
                    >
                      Demander un Prix
                    </button>
                    <Link
                      to={`/container/maison-container?model=${model.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded hover:bg-gray-200 transition-colors font-semibold text-xs sm:text-sm flex items-center justify-center gap-1"
                    >
                      <Info className="w-3 h-3 sm:w-4 sm:h-4" />
                      Détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link 
              to="/container/maison-container"
              className="inline-block bg-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md font-semibold hover:bg-green-800 transition-colors text-sm sm:text-base"
            >
              Voir Tous les Modèles
            </Link>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-green-50 to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Pourquoi UNIHOME ?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              La production prête à l'emploi dans des installations modernes est le principal avantage de la maison container.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: 'Rapidité Express', desc: 'Construction en 3 à 6 mois vs 12-18 mois en traditionnel', icon: Zap },
              { title: 'Prix Maîtrisé', desc: 'Jusqu\'à 30% moins cher, budget transparent dès le départ', icon: Shield },
              { title: 'Durabilité Extrême', desc: 'Structure en acier Corten, résiste 50+ ans', icon: CheckCircle },
              { title: 'Écologie Active', desc: '-85% émissions CO2, matériaux recyclés', icon: Leaf },
            ].map((avantage, index) => {
              const Icon = avantage.icon;
              return (
              <div 
                key={index} 
                  className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all"
              >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
                  </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{avantage.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{avantage.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Avant/Après */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Avant / Après : La Transformation
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Découvrez comment nous transformons des conteneurs maritimes en maisons modernes et confortables
            </p>
          </div>

          <div className="relative">
            {/* Navigation */}
            {beforeAfterProjects.length > 1 && (
              <>
                <button
                  onClick={prevProject}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all hover:scale-110"
                  aria-label="Projet précédent"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextProject}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all hover:scale-110"
                  aria-label="Projet suivant"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </button>
              </>
            )}

            {/* Contenu Avant/Après */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image AVANT */}
                <div className="relative group">
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm sm:text-base shadow-lg">
                    AVANT
                  </div>
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={beforeAfterProjects[beforeAfterIndex].avant}
                      alt="Avant transformation"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                    <p className="text-white text-xs sm:text-sm font-medium">
                      Conteneurs maritimes bruts en cours d'assemblage
                    </p>
                  </div>
                </div>

                {/* Image APRÈS */}
                <div className="relative group">
                  <div className="absolute top-4 left-4 z-10 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm sm:text-base shadow-lg">
                    APRÈS
                  </div>
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={beforeAfterProjects[beforeAfterIndex].apres}
                      alt="Après transformation"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                    <p className="text-white text-xs sm:text-sm font-medium">
                      Maison moderne et élégante prête à habiter
                    </p>
                  </div>
                </div>
              </div>

              {/* Informations du projet */}
              <div className="p-6 sm:p-8 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                    {beforeAfterProjects[beforeAfterIndex].title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    {beforeAfterProjects[beforeAfterIndex].description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {beforeAfterProjects[beforeAfterIndex].points.map((point, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Indicateurs de pagination */}
            {beforeAfterProjects.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {beforeAfterProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setBeforeAfterIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                      index === beforeAfterIndex
                        ? 'bg-green-600 w-8 sm:w-10'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Aller au projet ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Commentaire expert */}
            <div className="mt-8 sm:mt-12 bg-green-50 border-l-4 border-green-600 rounded-r-lg p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    L'Expertise UNIHOME en Action
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Chaque projet UNIHOME commence par des conteneurs maritimes standards. Notre équipe d'experts 
                    les transforme en habitations modernes grâce à un processus rigoureux : découpe précise des ouvertures, 
                    isolation thermique et phonique de haute qualité, installation de grandes baies vitrées, finitions sur mesure, 
                    et intégration d'équipements modernes. Le résultat ? Des maisons qui allient durabilité, confort et design contemporain, 
                    avec un impact environnemental réduit grâce au recyclage de conteneurs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center">
            {[
              { number: '45.000', unit: 'm²', label: 'Surface de Production' },
              { number: '1986', unit: '', label: 'Année de Création' },
              { number: '1000+', unit: '', label: 'Projets Réalisés' },
              { number: '50+', unit: 'Pays', label: 'Présence Internationale' },
            ].map((stat, index) => (
              <div key={index} className="p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-700 mb-2">
                  {stat.number} {stat.unit && <span className="text-lg sm:text-xl md:text-2xl">{stat.unit}</span>}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

