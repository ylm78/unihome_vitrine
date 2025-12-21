import { NavigationModerne } from '../components/NavigationModerne';
import { FooterModerne } from '../components/FooterModerne';
import { Cookie } from 'lucide-react';

export function PagePolitiqueCookies() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <NavigationModerne />
      <main className="flex-grow pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-8 md:p-12">
            {/* En-tête */}
            <div className="flex items-center gap-3 mb-8">
              <Cookie className="w-8 h-8 text-green-500" />
              <h1 className="text-3xl font-bold text-white">Politique de Cookies</h1>
            </div>

            <div className="prose prose-lg max-w-none space-y-8 prose-invert">
              {/* Introduction */}
              <section>
                <p className="text-gray-300 mb-4">
                  Cette politique de cookies explique ce que sont les cookies, comment nous les utilisons sur notre site, 
                  et comment vous pouvez contrôler leur utilisation.
                </p>
              </section>

              {/* Qu'est-ce qu'un cookie */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Qu'est-ce qu'un cookie ?</h2>
                <p className="text-gray-300 mb-4">
                  Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) 
                  lors de la visite d'un site web. Il permet au site de reconnaître votre navigateur et de mémoriser 
                  certaines informations vous concernant.
                </p>
              </section>

              {/* Types de cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Types de cookies utilisés</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Cookies strictement nécessaires</h3>
                    <p className="text-gray-300 mb-2">
                      Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                      <li>Cookies de session pour maintenir votre connexion</li>
                      <li>Cookies de sécurité pour prévenir la fraude</li>
                      <li>Cookies de préférences utilisateur (langue, thème)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Cookies de performance</h3>
                    <p className="text-gray-300 mb-2">
                      Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site en collectant 
                      des informations de manière anonyme.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                      <li>Analyse du trafic et du comportement des utilisateurs</li>
                      <li>Mesure de l'efficacité de nos pages</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Cookies de fonctionnalité</h3>
                    <p className="text-gray-300 mb-2">
                      Ces cookies permettent au site de se souvenir de vos choix et d'améliorer votre expérience.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                      <li>Mémorisation de vos préférences</li>
                      <li>Personnalisation de l'interface</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Cookies de ciblage/publicité</h3>
                    <p className="text-gray-300 mb-2">
                      Ces cookies peuvent être utilisés pour vous proposer des publicités pertinentes 
                      sur d'autres sites (avec votre consentement).
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies tiers */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Cookies tiers</h2>
                <p className="text-gray-300 mb-4">
                  Nous utilisons les services suivants qui peuvent déposer des cookies :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>
                    <strong>Stripe :</strong> pour le traitement sécurisé des paiements
                  </li>
                  <li>
                    <strong>Google Analytics :</strong> pour l'analyse du trafic (si activé)
                  </li>
                  <li>
                    <strong>Réseaux sociaux :</strong> pour le partage de contenu (si activé)
                  </li>
                </ul>
                <p className="text-gray-300 mt-4">
                  Ces services ont leurs propres politiques de cookies que nous vous invitons à consulter.
                </p>
              </section>

              {/* Durée de conservation */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Durée de conservation</h2>
                <p className="text-gray-300 mb-4">
                  Les cookies ont différentes durées de vie :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li><strong>Cookies de session :</strong> supprimés à la fermeture du navigateur</li>
                  <li><strong>Cookies persistants :</strong> conservés jusqu'à 13 mois maximum</li>
                </ul>
              </section>

              {/* Gestion des cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Comment gérer vos cookies ?</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Via votre navigateur</h3>
                    <p className="text-gray-300 mb-2">
                      Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies. 
                      Voici les liens vers les paramètres des principaux navigateurs :
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                      <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">Google Chrome</a></li>
                      <li><a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies-preferences" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">Mozilla Firefox</a></li>
                      <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">Safari</a></li>
                      <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">Microsoft Edge</a></li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-gray-300">
                      <strong>Attention :</strong> La désactivation de certains cookies peut affecter le fonctionnement 
                      du site et votre expérience utilisateur.
                    </p>
                  </div>
                </div>
              </section>

              {/* Consentement */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Consentement</h2>
                <p className="text-gray-300 mb-4">
                  En poursuivant votre navigation sur notre site après avoir été informé de l'utilisation des cookies, 
                  vous acceptez leur utilisation conformément à la présente politique.
                </p>
                <p className="text-gray-300">
                  Vous pouvez retirer votre consentement à tout moment en modifiant les paramètres de votre navigateur 
                  ou en nous contactant à l'adresse <a href="mailto:contact@unihome.fr" className="text-green-500 hover:underline">contact@unihome.fr</a>.
                </p>
              </section>

              {/* Modifications */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Modifications</h2>
                <p className="text-gray-300">
                  Cette politique de cookies peut être modifiée à tout moment. 
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

