import { NavigationModerne } from '../components/NavigationModerne';
import { FooterModerne } from '../components/FooterModerne';
import { FileText, Building2, Mail, Phone, MapPin } from 'lucide-react';

export function PageMentionsLegales() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <NavigationModerne />
      <main className="flex-grow pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-8 md:p-12">
            {/* En-tête */}
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-green-500" />
              <h1 className="text-3xl font-bold text-white">Mentions Légales</h1>
            </div>

            <div className="prose prose-lg max-w-none space-y-8 prose-invert">
              {/* Éditeur du site */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Éditeur du site</h2>
                <div className="space-y-2 text-gray-300">
                  <p>
                    Le présent site est édité par <strong className="text-white">UNIHOME</strong>, société spécialisée dans la construction de maisons containers.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Raison sociale :</p>
                        <p className="text-gray-300">UNIHOME</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Adresse :</p>
                        <p className="text-gray-300">[À compléter avec l'adresse complète]</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Téléphone :</p>
                        <p className="text-gray-300">[À compléter avec le numéro de téléphone]</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Email :</p>
                        <p className="text-gray-300">contact@unihome.fr</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-300">
                    <strong className="text-white">Numéro SIRET :</strong> [À compléter avec le numéro SIRET]<br />
                    <strong className="text-white">Numéro TVA intracommunautaire :</strong> [À compléter si applicable]<br />
                    <strong className="text-white">Capital social :</strong> [À compléter]
                  </p>
                </div>
              </section>

              {/* Directeur de publication */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Directeur de publication</h2>
                <p className="text-gray-300">
                  Le directeur de la publication est <strong className="text-white">[Nom du directeur de publication]</strong>, en qualité de [fonction].
                </p>
              </section>

              {/* Hébergement */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Hébergement</h2>
                <p className="text-gray-300">
                  Le site est hébergé par :
                </p>
                <div className="mt-2 text-gray-300">
                  <p><strong className="text-white">[Nom de l'hébergeur]</strong></p>
                  <p>[Adresse complète de l'hébergeur]</p>
                  <p>Téléphone : [Numéro de téléphone de l'hébergeur]</p>
                </div>
              </section>

              {/* Propriété intellectuelle */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Propriété intellectuelle</h2>
                <p className="text-gray-300 mb-4">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                  Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p className="text-gray-300">
                  La reproduction de tout ou partie de ce site sur un support électronique quelconque est formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
              </section>

              {/* Protection des données */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Protection des données personnelles</h2>
                <p className="text-gray-300 mb-4">
                  Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), 
                  vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                </p>
                <p className="text-gray-300">
                  Pour exercer ce droit, vous pouvez nous contacter à l'adresse suivante : <a href="mailto:contact@unihome.fr" className="text-green-400 hover:text-green-300 hover:underline">contact@unihome.fr</a>
                </p>
                <p className="text-gray-300 mt-4">
                  Pour plus d'informations, consultez notre <a href="/politique-confidentialite" className="text-green-400 hover:text-green-300 hover:underline">Politique de Confidentialité</a>.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies</h2>
                <p className="text-gray-300 mb-4">
                  Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic du site.
                </p>
                <p className="text-gray-300">
                  Pour plus d'informations, consultez notre <a href="/politique-cookies" className="text-green-400 hover:text-green-300 hover:underline">Politique de Cookies</a>.
                </p>
              </section>

              {/* Responsabilité */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation de responsabilité</h2>
                <p className="text-gray-300 mb-4">
                  Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, 
                  mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
                </p>
                <p className="text-gray-300">
                  UNIHOME ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, 
                  lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications, 
                  soit de l'apparition d'un bug ou d'une incompatibilité.
                </p>
              </section>

              {/* Droit applicable */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Droit applicable et juridiction compétente</h2>
                <p className="text-gray-300">
                  Tout litige en relation avec l'utilisation du site est soumis au droit français. 
                  Il est fait attribution exclusive de juridiction aux tribunaux compétents de [Ville du siège social].
                </p>
              </section>

              {/* Mise à jour */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Mise à jour</h2>
                <p className="text-gray-300">
                  Les présentes mentions légales peuvent être modifiées à tout moment. 
                  Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <FooterModerne />
    </div>
  );
}

