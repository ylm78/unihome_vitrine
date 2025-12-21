import { NavigationModerne } from '../components/NavigationModerne';
import { FooterModerne } from '../components/FooterModerne';
import { ScrollText } from 'lucide-react';

export function PageCGU() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <NavigationModerne />
      <main className="flex-grow pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-8 md:p-12">
            {/* En-tête */}
            <div className="flex items-center gap-3 mb-8">
              <ScrollText className="w-8 h-8 text-green-500" />
              <h1 className="text-3xl font-bold text-white">Conditions Générales d'Utilisation</h1>
            </div>

            <div className="prose prose-lg max-w-none space-y-8 prose-invert">
              {/* Préambule */}
              <section>
                <p className="text-gray-300 mb-4">
                  Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation du site web de <strong className="text-white">UNIHOME</strong> 
                  (ci-après "le Site") par tout utilisateur (ci-après "l'Utilisateur").
                </p>
                <p className="text-gray-300">
                  L'accès et l'utilisation du Site impliquent l'acceptation pleine et entière des présentes CGU.
                </p>
              </section>

              {/* Article 1 - Objet */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 1 - Objet</h2>
                <p className="text-gray-300">
                  Les présentes CGU ont pour objet de définir les modalités et conditions d'accès et d'utilisation du Site, 
                  ainsi que les droits et obligations des parties dans ce cadre.
                </p>
              </section>

              {/* Article 2 - Accès au site */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 2 - Accès au site</h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>2.1.</strong> Le Site est accessible gratuitement à tout Utilisateur disposant d'un accès internet. 
                    Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, connexion internet, etc.) 
                    sont à sa charge.
                  </p>
                  <p>
                    <strong>2.2.</strong> UNIHOME se réserve le droit de modifier, suspendre ou interrompre l'accès au Site à tout moment, 
                    notamment pour des raisons de maintenance, sans préavis ni justification.
                  </p>
                </div>
              </section>

              {/* Article 3 - Compte utilisateur */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 3 - Compte utilisateur</h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>3.1.</strong> L'Utilisateur peut créer un compte personnel en fournissant des informations exactes et à jour.
                  </p>
                  <p>
                    <strong>3.2.</strong> L'Utilisateur est responsable de la confidentialité de ses identifiants de connexion.
                  </p>
                  <p>
                    <strong>3.3.</strong> L'Utilisateur s'engage à informer immédiatement UNIHOME de toute utilisation non autorisée 
                    de son compte.
                  </p>
                  <p>
                    <strong>3.4.</strong> UNIHOME se réserve le droit de suspendre ou supprimer le compte de tout Utilisateur ne respectant 
                    pas les présentes CGU.
                  </p>
                </div>
              </section>

              {/* Article 4 - Utilisation du site */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 4 - Utilisation du site</h2>
                <p className="text-gray-300 mb-4">
                  <strong>4.1.</strong> L'Utilisateur s'engage à utiliser le Site conformément à sa destination et dans le respect des lois 
                  et règlements en vigueur.
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>4.2.</strong> Il est strictement interdit à l'Utilisateur :
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>d'utiliser le Site à des fins illégales ou frauduleuses</li>
                  <li>de porter atteinte à l'intégrité ou à la sécurité du Site</li>
                  <li>de diffuser des contenus illicites, offensants, diffamatoires ou contraires aux bonnes mœurs</li>
                  <li>de perturber le fonctionnement du Site ou des serveurs</li>
                  <li>de tenter d'accéder de manière non autorisée à des zones restreintes du Site</li>
                  <li>de collecter ou d'utiliser des données personnelles d'autres utilisateurs</li>
                  <li>de reproduire, copier ou vendre les contenus du Site sans autorisation</li>
                </ul>
              </section>

              {/* Article 5 - Propriété intellectuelle */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 5 - Propriété intellectuelle</h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>5.1.</strong> L'ensemble des éléments du Site (textes, images, vidéos, logos, icônes, graphismes, etc.) 
                    sont la propriété exclusive de UNIHOME ou de ses partenaires et sont protégés par les lois relatives à la propriété 
                    intellectuelle.
                  </p>
                  <p>
                    <strong>5.2.</strong> Toute reproduction, représentation, modification, publication, adaptation de tout ou partie 
                    des éléments du Site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable 
                    de UNIHOME.
                  </p>
                  <p>
                    <strong>5.3.</strong> Toute exploitation non autorisée du Site ou de son contenu engage la responsabilité civile 
                    et/ou pénale de l'Utilisateur.
                  </p>
                </div>
              </section>

              {/* Article 6 - Liens hypertextes */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 6 - Liens hypertextes</h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>6.1.</strong> Le Site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. 
                    Les liens vers ces autres ressources vous font quitter le Site.
                  </p>
                  <p>
                    <strong>6.2.</strong> Il est possible de créer un lien vers la page d'accueil du Site sans autorisation expresse 
                    de UNIHOME. Aucun lien ne peut être établi vers une page autre que la page d'accueil du Site sans autorisation.
                  </p>
                  <p>
                    <strong>6.3.</strong> UNIHOME ne peut être tenu responsable du contenu des sites tiers vers lesquels des liens 
                    sont présents sur le Site.
                  </p>
                </div>
              </section>

              {/* Article 7 - Disponibilité du site */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 7 - Disponibilité du site</h2>
                <p className="text-gray-300 mb-4">
                  <strong>7.1.</strong> UNIHOME s'efforce d'assurer un accès 24h/24 et 7j/7 au Site, sous réserve des cas de force majeure, 
                  de pannes, et des interventions de maintenance nécessaires au bon fonctionnement du Site.
                </p>
                <p className="text-gray-300">
                  <strong>7.2.</strong> UNIHOME ne pourra être tenu responsable en cas d'indisponibilité temporaire du Site, quelle qu'en 
                  soit la cause.
                </p>
              </section>

              {/* Article 8 - Limitation de responsabilité */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 8 - Limitation de responsabilité</h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>8.1.</strong> Les informations contenues sur le Site sont fournies à titre indicatif et peuvent être modifiées 
                    à tout moment sans préavis.
                  </p>
                  <p>
                    <strong>8.2.</strong> UNIHOME ne pourra être tenu responsable :
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>des dommages directs ou indirects résultant de l'utilisation du Site</li>
                    <li>des dommages résultant de l'impossibilité d'utiliser le Site</li>
                    <li>des dommages résultant de l'utilisation de sites tiers accessibles via des liens présents sur le Site</li>
                    <li>de tout dommage résultant d'une faute, erreur ou omission de l'Utilisateur</li>
                  </ul>
                </div>
              </section>

              {/* Article 9 - Données personnelles */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 9 - Données personnelles</h2>
                <p className="text-gray-300 mb-4">
                  Les données personnelles collectées lors de l'utilisation du Site sont traitées conformément à notre{' '}
                  <a href="/politique-confidentialite" className="text-green-500 hover:underline">Politique de Confidentialité</a>.
                </p>
                <p className="text-gray-300">
                  Conformément au RGPD, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition 
                  aux données personnelles le concernant.
                </p>
              </section>

              {/* Article 10 - Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 10 - Cookies</h2>
                <p className="text-gray-300">
                  Le Site utilise des cookies pour améliorer l'expérience utilisateur. Pour plus d'informations, consultez notre{' '}
                  <a href="/politique-cookies" className="text-green-500 hover:underline">Politique de Cookies</a>.
                </p>
              </section>

              {/* Article 11 - Modification des CGU */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 11 - Modification des CGU</h2>
                <p className="text-gray-300">
                  UNIHOME se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur 
                  dès leur publication sur le Site. Il est donc conseillé à l'Utilisateur de consulter régulièrement cette page.
                </p>
              </section>

              {/* Article 12 - Droit applicable */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 12 - Droit applicable et juridiction compétente</h2>
                <p className="text-gray-300 mb-4">
                  Les présentes CGU sont régies par le droit français.
                </p>
                <p className="text-gray-300">
                  En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.
                </p>
              </section>

              {/* Mise à jour */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Mise à jour</h2>
                <p className="text-gray-300">
                  Dernière mise à jour des présentes CGU : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}.
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

