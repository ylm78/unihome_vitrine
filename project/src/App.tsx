import { Home, Building2, Award, Mail, Phone, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center justify-center w-full md:justify-start">
              <span className="text-4xl font-bold text-gray-900 tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>UNIHOME</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('accueil')} className="text-gray-700 hover:text-emerald-600 transition-colors">Accueil</button>
              <button onClick={() => scrollToSection('concept')} className="text-gray-700 hover:text-emerald-600 transition-colors">Concept</button>
              <button onClick={() => scrollToSection('realisations')} className="text-gray-700 hover:text-emerald-600 transition-colors">Réalisations</button>
              <button onClick={() => scrollToSection('avantages')} className="text-gray-700 hover:text-emerald-600 transition-colors">Avantages</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-emerald-600 transition-colors">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              <button onClick={() => scrollToSection('accueil')} className="block w-full text-left text-gray-700 hover:text-emerald-600">Accueil</button>
              <button onClick={() => scrollToSection('concept')} className="block w-full text-left text-gray-700 hover:text-emerald-600">Concept</button>
              <button onClick={() => scrollToSection('realisations')} className="block w-full text-left text-gray-700 hover:text-emerald-600">Réalisations</button>
              <button onClick={() => scrollToSection('avantages')} className="block w-full text-left text-gray-700 hover:text-emerald-600">Avantages</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-gray-700 hover:text-emerald-600">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Spécialiste de maisons en container
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed">
              Des habitations modernes, écologiques et personnalisables qui allient design contemporain et durabilité
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transformons ensemble des containers maritimes en espaces de vie exceptionnels,
              alliant confort, esthétique et respect de l'environnement
            </p>
          </div>
        </div>
      </section>

      {/* Qui sommes-nous Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">UNIHOME, c'est</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Une entreprise pionnière dans la construction de maisons en containers, née de la passion
                de réinventer l'habitat moderne. Nous croyons qu'une maison doit être à la fois belle,
                fonctionnelle et respectueuse de notre planète.
              </p>
              <p>
                Notre expertise combine architecture innovante, savoir-faire artisanal et technologies durables
                pour créer des espaces de vie uniques qui reflètent votre personnalité et vos valeurs.
              </p>
              <p className="text-xl font-semibold text-gray-900">
                Chaque projet est une aventure unique où vos rêves prennent forme,
                container après container.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Localisation Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Nos Implantations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Trois sites stratégiques pour vous accompagner au plus près de vos projets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Coudray-Montceaux</h3>
              <p className="text-gray-600 text-center">Essonne (91)</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">Site principal et showroom</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Dreux</h3>
              <p className="text-gray-600 text-center">Eure-et-Loir (28)</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">Atelier de fabrication</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Poissy</h3>
              <p className="text-gray-600 text-center">Yvelines (78)</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">Bureau d'études et design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savoir-faire Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Un savoir-faire reconnu depuis plus de 10 ans</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des réalisations qui témoignent de notre expertise et de notre engagement qualité
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <img
                src="https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Réalisation 1"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Villa Contemporaine</h3>
                <p className="text-sm text-gray-200">Architecture moderne de 120m²</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <img
                src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Réalisation 2"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Maison Familiale</h3>
                <p className="text-sm text-gray-200">Espace de vie de 85m² optimisé</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <img
                src="https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Réalisation 3"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Studio Design</h3>
                <p className="text-sm text-gray-200">Espace compact de 40m²</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concept" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Le Concept UNIHOME</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une nouvelle vision de l'habitat qui réconcilie esthétique contemporaine, performance énergétique et engagement écologique.
              Chaque container devient une toile vierge pour créer votre espace de vie idéal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Design Modulaire</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Du studio compact de 20m² à la villa familiale de 150m², nos modules s'assemblent selon vos besoins.
                Ajoutez une pièce, créez un étage, agrandissez votre terrasse : votre maison grandit avec votre famille.
              </p>
              <p className="text-sm text-emerald-700 font-semibold">
                Possibilité d'extension jusqu'à 300m² habitables
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Éco-responsable</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                En donnant une seconde vie aux containers maritimes, nous réduisons de 85% l'empreinte carbone
                par rapport à une construction traditionnelle. Isolation thermique renforcée, panneaux solaires,
                récupération d'eau de pluie : chaque détail compte.
              </p>
              <p className="text-sm text-emerald-700 font-semibold">
                Certification écologique garantie
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualité Premium</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous sélectionnons les meilleurs matériaux : parquets en chêne massif, cuisine équipée haut de gamme,
                domotique intégrée, baies vitrées XXL. Nos artisans qualifiés transforment chaque container en chef-d'œuvre
                architectural.
              </p>
              <p className="text-sm text-emerald-700 font-semibold">
                Garantie décennale incluse
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Intérieur maison container"
                className="rounded-2xl shadow-xl w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Un intérieur qui vous ressemble</h3>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                L'architecture container offre des volumes généreux et lumineux. Les grandes hauteurs sous plafond (2,70m minimum)
                et les larges ouvertures créent une sensation d'espace incroyable. Nos architectes d'intérieur travaillent avec vous
                pour optimiser chaque mètre carré.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Parquet, carrelage, béton ciré, murs végétalisés... Les possibilités de personnalisation sont infinies.
                Choisissez vos finitions, vos équipements, vos couleurs. Nous réalisons votre vision, dans les moindres détails.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                  Aménagements sur-mesure
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                  Équipements domotiques dernière génération
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                  Espaces optimisés et fonctionnels
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Réalisations Section */}
      <section id="realisations" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nos Réalisations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez quelques-unes de nos créations qui ont transformé la vie de nos clients.
              Chaque projet est unique, chaque histoire est inspirante.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Villa Moderne"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  120m²
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Villa Moderne Biarritz</h3>
                <p className="text-gray-600 mb-4">
                  3 containers assemblés pour créer une villa familiale vue mer. Grandes baies vitrées,
                  terrasse en bois, piscine intégrée. Un rêve devenu réalité.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  Biarritz, France
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Studio Urbain"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  40m²
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Studio Urbain Paris</h3>
                <p className="text-gray-600 mb-4">
                  Un container transformé en loft moderne au cœur de Paris. Optimisation maximale de l'espace,
                  design minimaliste et technologies smart home.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  Paris, France
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Maison Nature"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  85m²
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Refuge Montagne Annecy</h3>
                <p className="text-gray-600 mb-4">
                  2 containers imbriqués en pleine nature. Isolation renforcée, poêle à bois,
                  panneaux solaires. L'autonomie énergétique totale.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  Annecy, France
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section id="avantages" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pourquoi Choisir UNIHOME ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une maison container UNIHOME, c'est bien plus qu'un simple logement. C'est un choix de vie,
              un engagement pour l'avenir, une déclaration d'indépendance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Rapidité Express', desc: 'Construction en 3 à 6 mois vs 12-18 mois en traditionnel' },
              { title: 'Prix Maîtrisé', desc: 'Jusqu\'à 30% moins cher, budget transparent dès le départ' },
              { title: 'Durabilité Extrême', desc: 'Structure en acier Corten, résiste 50+ ans' },
              { title: 'Personnalisation Totale', desc: 'Architecture, finitions, équipements : 100% sur mesure' },
              { title: 'Écologie Active', desc: '-85% émissions CO2, matériaux recyclés' },
              { title: 'Mobilité Unique', desc: 'Déménagez avec votre maison si besoin' },
              { title: 'Design Avant-gardiste', desc: 'Architecture contemporaine primée' },
              { title: 'Garantie Sérénité', desc: 'Garantie décennale + SAV réactif' }
            ].map((avantage, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-emerald-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-emerald-100">
                <h4 className="text-xl font-bold text-emerald-600 mb-2">{avantage.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{avantage.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Le Processus UNIHOME en 5 Étapes</h3>
            <div className="grid md:grid-cols-5 gap-6 mt-8">
              <div>
                <div className="w-16 h-16 bg-white text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h4 className="font-semibold mb-2">Consultation</h4>
                <p className="text-sm text-emerald-50">Échange sur votre projet et vos besoins</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h4 className="font-semibold mb-2">Conception</h4>
                <p className="text-sm text-emerald-50">Plans 3D et devis personnalisé</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h4 className="font-semibold mb-2">Fabrication</h4>
                <p className="text-sm text-emerald-50">Construction en atelier contrôlée</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h4 className="font-semibold mb-2">Installation</h4>
                <p className="text-sm text-emerald-50">Livraison et montage sur votre terrain</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">5</div>
                <h4 className="font-semibold mb-2">Emménagement</h4>
                <p className="text-sm text-emerald-50">Clés en main, prêt à vivre</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ils Nous Font Confiance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les témoignages de nos clients qui ont franchi le pas et vivent aujourd'hui
              dans leur maison UNIHOME.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Marie Dubois"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Marie Dubois</h4>
                  <p className="text-sm text-gray-500">Biarritz</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed italic">
                "Un projet incroyable du début à la fin. L'équipe UNIHOME a su transformer notre rêve
                en réalité. Notre villa vue mer est magnifique et respectueuse de l'environnement.
                Nous ne pourrions pas être plus heureux!"
              </p>
              <div className="flex text-emerald-600 mt-4">★★★★★</div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Thomas Martin"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Thomas Martin</h4>
                  <p className="text-sm text-gray-500">Paris</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed italic">
                "Après des années en appartement, j'ai enfin mon chez-moi. Un studio container parfait,
                livré en 4 mois seulement. Design moderne, équipements high-tech, et un prix imbattable.
                Je recommande à 200%!"
              </p>
              <div className="flex text-emerald-600 mt-4">★★★★★</div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Sophie Laurent"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Sophie Laurent</h4>
                  <p className="text-sm text-gray-500">Annecy</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed italic">
                "Notre refuge en montagne est un petit paradis autonome. Panneaux solaires, isolation
                parfaite, design chaleureux... UNIHOME a dépassé toutes nos attentes. Un investissement
                dont nous sommes fiers."
              </p>
              <div className="flex text-emerald-600 mt-4">★★★★★</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Concrétisons Votre Projet Ensemble</h2>
            <p className="text-xl text-emerald-50 max-w-3xl mx-auto">
              Une consultation gratuite, sans engagement. Nos experts vous accompagnent à chaque étape pour
              transformer votre vision en réalité. Parlons de votre futur chez-vous.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              <Phone className="w-10 h-10 text-white mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2 text-lg">Téléphone</h4>
              <p className="text-emerald-50 text-lg">+33 1 23 45 67 89</p>
              <p className="text-emerald-100 text-sm mt-2">Lun-Ven: 9h-19h</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              <Mail className="w-10 h-10 text-white mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2 text-lg">Email</h4>
              <p className="text-emerald-50 text-lg">contact@unihome.fr</p>
              <p className="text-emerald-100 text-sm mt-2">Réponse sous 24h</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              <MapPin className="w-10 h-10 text-white mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2 text-lg">Showroom</h4>
              <p className="text-emerald-50 text-lg">15 Avenue Marceau</p>
              <p className="text-emerald-100 text-sm mt-2">75016 Paris, France</p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-white text-emerald-600 px-10 py-5 rounded-xl text-lg font-bold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-2xl mb-4">
              Demander une consultation gratuite
            </button>
            <p className="text-emerald-100 text-sm">
              Ou visitez notre showroom sur rendez-vous pour découvrir nos modèles en taille réelle
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-3xl font-bold text-white tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>UNIHOME</span>
          </div>

          <div className="flex justify-center items-center space-x-8 mb-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-500 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-500 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-500 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-500 transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          <div className="text-center border-t border-gray-800 pt-8">
            <p className="text-sm">© 2025 UNIHOME. Tous droits réservés.</p>
            <p className="text-sm mt-2">Maisons en container modernes et durables</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
