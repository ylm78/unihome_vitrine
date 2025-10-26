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
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900">UNIHOME</span>
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
      <section id="accueil" className="pt-24 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-90"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                L'habitat du futur, aujourd'hui
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Vivez autrement,<br />
                <span className="text-emerald-600">Vivez UNIHOME</span>
              </h1>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Découvrez l'alliance parfaite entre innovation architecturale et respect de l'environnement.
                Nos maisons en container transforment des structures industrielles en véritables havres de paix,
                conçus pour répondre à vos aspirations de vie moderne et durable.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Chaque projet UNIHOME est une œuvre unique, pensée pour s'adapter à votre style de vie,
                votre budget et vos valeurs écologiques. De la conception à la livraison, nous vous accompagnons
                dans la réalisation de votre rêve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Demander un devis gratuit
                </button>
                <button
                  onClick={() => scrollToSection('realisations')}
                  className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-all"
                >
                  Voir nos réalisations
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Maison container moderne"
                className="rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <p className="text-3xl font-bold text-emerald-600">+250</p>
                <p className="text-gray-600 font-semibold">Maisons livrées</p>
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
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Home className="w-6 h-6 text-emerald-600" />
            <span className="text-xl font-bold text-white">UNIHOME</span>
          </div>
          <p className="text-sm">© 2025 UNIHOME. Tous droits réservés.</p>
          <p className="text-sm mt-2">Maisons en container modernes et durables</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
