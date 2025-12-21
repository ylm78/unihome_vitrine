import { NavigationModerne } from '../components/NavigationModerne';
import { FooterModerne } from '../components/FooterModerne';
import { Shield, Database, UserCheck, Mail, Lock } from 'lucide-react';

export function PagePolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <NavigationModerne />
      <main className="flex-grow pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-8 md:p-12">
            {/* En-tête */}
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-green-500" />
              <h1 className="text-3xl font-bold text-white">Politique de Confidentialité</h1>
            </div>

            <div className="prose prose-lg max-w-none space-y-8 prose-invert">
              {/* Introduction */}
              <section>
                <p className="text-gray-300 mb-4">
                  La présente politique de confidentialité décrit la façon dont <strong className="text-white">UNIHOME</strong> collecte, 
                  utilise et protège les informations personnelles que vous nous fournissez lorsque vous utilisez notre site web.
                </p>
                <p className="text-gray-300">
                  Cette politique est conforme au Règlement Général sur la Protection des Données (RGPD) 
                  et à la loi Informatique et Libertés.
                </p>
              </section>

              {/* Données collectées */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Database className="w-6 h-6 text-green-500" />
                  1. Données personnelles collectées
                </h2>
                <p className="text-gray-300 mb-4">
                  Nous collectons les données personnelles suivantes :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li><strong>Données d'identification :</strong> nom, prénom, adresse email</li>
                  <li><strong>Données de contact :</strong> numéro de téléphone, adresse postale</li>
                  <li><strong>Données de connexion :</strong> adresse IP, données de navigation, cookies</li>
                  <li><strong>Données de transaction :</strong> informations de commande, historique d'achat</li>
                  <li><strong>Données techniques :</strong> type de navigateur, système d'exploitation, pages visitées</li>
                </ul>
              </section>

              {/* Finalités */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Finalités du traitement</h2>
                <p className="text-gray-300 mb-4">
                  Vos données personnelles sont collectées et traitées pour les finalités suivantes :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Gestion de votre compte utilisateur</li>
                  <li>Traitement et suivi de vos commandes</li>
                  <li>Communication avec vous concernant nos services</li>
                  <li>Amélioration de nos services et de votre expérience utilisateur</li>
                  <li>Respect de nos obligations légales et réglementaires</li>
                  <li>Prévention de la fraude et sécurité du site</li>
                  <li>Envoi de communications marketing (avec votre consentement)</li>
                </ul>
              </section>

              {/* Base légale */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Base légale du traitement</h2>
                <p className="text-gray-300 mb-4">
                  Le traitement de vos données personnelles est fondé sur :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li><strong>L'exécution d'un contrat :</strong> pour la gestion de vos commandes</li>
                  <li><strong>Votre consentement :</strong> pour l'envoi de communications marketing</li>
                  <li><strong>Notre intérêt légitime :</strong> pour l'amélioration de nos services</li>
                  <li><strong>Une obligation légale :</strong> pour la conservation de certaines données comptables</li>
                </ul>
              </section>

              {/* Conservation */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Durée de conservation</h2>
                <p className="text-gray-300 mb-4">
                  Vos données personnelles sont conservées pour les durées suivantes :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li><strong>Données de compte :</strong> pendant la durée de vie de votre compte, puis 3 ans après sa fermeture</li>
                  <li><strong>Données de commande :</strong> 10 ans (obligation légale comptable)</li>
                  <li><strong>Données de navigation :</strong> 13 mois maximum</li>
                  <li><strong>Données de marketing :</strong> jusqu'à votre désinscription ou 3 ans après le dernier contact</li>
                </ul>
              </section>

              {/* Destinataires */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Destinataires des données</h2>
                <p className="text-gray-300 mb-4">
                  Vos données personnelles peuvent être transmises aux destinataires suivants :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Personnel autorisé de UNIHOME</li>
                  <li>Prestataires techniques (hébergement, paiement sécurisé Stripe)</li>
                  <li>Partenaires de livraison</li>
                  <li>Autorités compétentes en cas d'obligation légale</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  Nous ne vendons jamais vos données personnelles à des tiers.
                </p>
              </section>

              {/* Sécurité */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-green-500" />
                  6. Sécurité des données
                </h2>
                <p className="text-gray-300 mb-4">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>L'accès non autorisé</li>
                  <li>La perte ou la destruction accidentelle</li>
                  <li>L'altération ou la divulgation non autorisée</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  Ces mesures incluent notamment le chiffrement des données sensibles, la limitation de l'accès aux données, 
                  et des procédures de sauvegarde régulières.
                </p>
              </section>

              {/* Vos droits */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-green-500" />
                  7. Vos droits
                </h2>
                <p className="text-gray-300 mb-4">
                  Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
                </p>
                <ul className="list-disc list-inside space-y-3 text-gray-300 ml-4">
                  <li>
                    <strong>Droit d'accès :</strong> vous pouvez obtenir une copie de vos données personnelles
                  </li>
                  <li>
                    <strong>Droit de rectification :</strong> vous pouvez corriger vos données inexactes
                  </li>
                  <li>
                    <strong>Droit à l'effacement :</strong> vous pouvez demander la suppression de vos données
                  </li>
                  <li>
                    <strong>Droit à la limitation :</strong> vous pouvez demander la limitation du traitement
                  </li>
                  <li>
                    <strong>Droit à la portabilité :</strong> vous pouvez récupérer vos données dans un format structuré
                  </li>
                  <li>
                    <strong>Droit d'opposition :</strong> vous pouvez vous opposer au traitement de vos données
                  </li>
                  <li>
                    <strong>Droit de retirer votre consentement :</strong> à tout moment pour les traitements fondés sur le consentement
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-green-900/20 border border-green-700/50 rounded-lg">
                  <p className="text-gray-300 mb-2">
                    <strong className="text-white">Pour exercer vos droits, contactez-nous :</strong>
                  </p>
                  <div className="flex items-center gap-2 text-green-400">
                    <Mail className="w-5 h-5" />
                    <a href="mailto:contact@unihome.fr" className="hover:text-green-300 hover:underline">contact@unihome.fr</a>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Nous répondrons à votre demande dans un délai maximum d'un mois.
                  </p>
                </div>
              </section>

              {/* Réclamation */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Droit de réclamation</h2>
                <p className="text-gray-300 mb-4">
                  Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la 
                  Commission Nationale de l'Informatique et des Libertés (CNIL) :
                </p>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-300">
                    <strong>CNIL</strong><br />
                    3 Place de Fontenoy - TSA 80715<br />
                    75334 PARIS CEDEX 07<br />
                    Téléphone : 01 53 73 22 22<br />
                    Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">www.cnil.fr</a>
                  </p>
                </div>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Cookies</h2>
                <p className="text-gray-300">
                  Pour plus d'informations sur l'utilisation des cookies, consultez notre{' '}
                  <a href="/politique-cookies" className="text-green-500 hover:underline">Politique de Cookies</a>.
                </p>
              </section>

              {/* Modifications */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">10. Modifications</h2>
                <p className="text-gray-300">
                  Cette politique de confidentialité peut être modifiée à tout moment. 
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

