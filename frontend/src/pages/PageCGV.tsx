import { NavigationModerne } from '../components/NavigationModerne';
import { FooterModerne } from '../components/FooterModerne';
import { FileText, ShoppingCart, Truck, CreditCard, RotateCcw } from 'lucide-react';

export function PageCGV() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <NavigationModerne />
      <main className="flex-grow pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-8 md:p-12">
            {/* En-tête */}
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-green-500" />
              <h1 className="text-3xl font-bold text-white">Conditions Générales de Vente</h1>
            </div>

            <div className="prose prose-lg max-w-none space-y-8 prose-invert">
              {/* Préambule */}
              <section>
                <p className="text-gray-300 mb-4">
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations entre <strong className="text-white">UNIHOME</strong> 
                  (ci-après "le Vendeur") et toute personne physique ou morale souhaitant effectuer un achat via le site 
                  (ci-après "l'Acheteur" ou "le Client").
                </p>
                <p className="text-gray-300">
                  Toute commande implique l'acceptation sans réserve des présentes CGV.
                </p>
              </section>

              {/* Article 1 - Objet */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 1 - Objet</h2>
                <p className="text-gray-300 mb-4">
                  Les présentes CGV ont pour objet de définir les conditions et modalités de vente des produits proposés 
                  par UNIHOME sur son site internet, ainsi que les droits et obligations des parties dans le cadre de cette vente.
                </p>
                <p className="text-gray-300">
                  Les produits proposés à la vente sont ceux qui figurent sur le site au jour de la consultation par le Client 
                  et dans la limite des stocks disponibles.
                </p>
              </section>

              {/* Article 2 - Commande */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6 text-green-500" />
                  Article 2 - Commande
                </h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>2.1.</strong> Toute commande suppose l'acceptation des prix et descriptions des produits disponibles à la vente.
                  </p>
                  <p>
                    <strong>2.2.</strong> Les informations contractuelles sont présentées en langue française et font l'objet d'une confirmation 
                    au plus tard au moment de la validation de la commande.
                  </p>
                  <p>
                    <strong>2.3.</strong> Le Client est informé de manière claire et précise, avant la validation finale de sa commande :
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>des caractéristiques essentielles du bien</li>
                    <li>du prix TTC</li>
                    <li>des frais de livraison</li>
                    <li>des modalités de paiement, de livraison et d'exécution du contrat</li>
                  </ul>
                  <p>
                    <strong>2.4.</strong> La validation de la commande vaut acceptation des présentes CGV.
                  </p>
                  <p>
                    <strong>2.5.</strong> UNIHOME se réserve le droit de refuser toute commande d'un Client avec lequel il existerait un litige 
                    relatif au paiement d'une commande antérieure.
                  </p>
                </div>
              </section>

              {/* Article 3 - Prix */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 3 - Prix</h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>3.1.</strong> Les prix des produits sont indiqués en euros, toutes taxes comprises (TTC), hors frais de livraison.
                  </p>
                  <p>
                    <strong>3.2.</strong> Les prix sont valables pour la durée indiquée sur le site, dans la limite des stocks disponibles.
                  </p>
                  <p>
                    <strong>3.3.</strong> UNIHOME se réserve le droit de modifier ses prix à tout moment, étant toutefois entendu que le prix 
                    figurant au catalogue le jour de la commande sera le seul applicable à l'Acheteur.
                  </p>
                  <p>
                    <strong>3.4.</strong> Les frais de livraison sont indiqués avant la validation finale de la commande.
                  </p>
                </div>
              </section>

              {/* Article 4 - Paiement */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-green-500" />
                  Article 4 - Paiement
                </h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>4.1.</strong> Le paiement s'effectue par carte bancaire via la plateforme sécurisée Stripe.
                  </p>
                  <p>
                    <strong>4.2.</strong> Les cartes bancaires acceptées sont : Visa, Mastercard, American Express.
                  </p>
                  <p>
                    <strong>4.3.</strong> Le paiement est exigible immédiatement à la commande. La commande ne sera validée qu'après réception 
                    du paiement.
                  </p>
                  <p>
                    <strong>4.4.</strong> En cas de refus d'autorisation de paiement par les organismes bancaires, la commande sera automatiquement annulée.
                  </p>
                  <p>
                    <strong>4.5.</strong> Le traitement des données de paiement est sécurisé et conforme aux normes PCI DSS.
                  </p>
                </div>
              </section>

              {/* Article 5 - Livraison */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-green-500" />
                  Article 5 - Livraison
                </h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>5.1.</strong> La livraison est effectuée à l'adresse indiquée par le Client lors de la commande.
                  </p>
                  <p>
                    <strong>5.2.</strong> Les délais de livraison sont indiqués à titre indicatif et ne sauraient engager la responsabilité 
                    de UNIHOME en cas de retard.
                  </p>
                  <p>
                    <strong>5.3.</strong> En cas de retard de livraison supérieur à 30 jours, le Client peut résoudre le contrat 
                    et être remboursé dans les conditions prévues à l'article 6.
                  </p>
                  <p>
                    <strong>5.4.</strong> Le Client est tenu de vérifier l'état des produits livrés et de formuler toute réserve 
                    dans les 48 heures suivant la livraison.
                  </p>
                </div>
              </section>

              {/* Article 6 - Droit de rétractation */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <RotateCcw className="w-6 h-6 text-green-500" />
                  Article 6 - Droit de rétractation
                </h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>6.1.</strong> Conformément à l'article L. 221-18 du Code de la consommation, le Client dispose d'un délai de 14 jours 
                    à compter de la réception des produits pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalité.
                  </p>
                  <p>
                    <strong>6.2.</strong> Pour exercer ce droit, le Client doit notifier sa décision de rétractation à UNIHOME à l'adresse 
                    <a href="mailto:contact@unihome.fr" className="text-green-500 hover:underline ml-1">contact@unihome.fr</a>.
                  </p>
                  <p>
                    <strong>6.3.</strong> Les frais de retour sont à la charge du Client, sauf si les produits livrés ne correspondent pas 
                    à la commande ou s'ils sont défectueux.
                  </p>
                  <p>
                    <strong>6.4.</strong> Le remboursement sera effectué dans un délai de 14 jours suivant la réception des produits retournés.
                  </p>
                  <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mt-4">
                    <p className="text-gray-300">
                      <strong className="text-white">Exception :</strong> Le droit de rétractation ne s'applique pas aux biens confectionnés selon les spécifications 
                      du Client ou nettement personnalisés.
                    </p>
                  </div>
                </div>
              </section>

              {/* Article 7 - Garanties */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 7 - Garanties légales</h2>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong>7.1.</strong> UNIHOME est tenu de livrer un bien conforme au contrat et répond des défauts de conformité existant 
                    lors de la délivrance (article L. 217-4 du Code de la consommation).
                  </p>
                  <p>
                    <strong>7.2.</strong> Le Client bénéficie de la garantie légale de conformité de 2 ans à compter de la délivrance du bien, 
                    et de la garantie des vices cachés (article 1641 du Code civil).
                  </p>
                  <p>
                    <strong>7.3.</strong> En cas de défaut de conformité, le Client peut demander la réparation ou le remplacement du bien, 
                    ou obtenir une réduction du prix ou la résolution du contrat.
                  </p>
                </div>
              </section>

              {/* Article 8 - Responsabilité */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 8 - Responsabilité</h2>
                <p className="text-gray-300 mb-4">
                  La responsabilité de UNIHOME ne peut être engagée en cas de dommages résultant :
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                  <li>d'une mauvaise utilisation des produits</li>
                  <li>d'une utilisation non conforme aux instructions</li>
                  <li>de cas de force majeure</li>
                  <li>du fait d'un tiers ou du Client</li>
                </ul>
              </section>

              {/* Article 9 - Propriété intellectuelle */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 9 - Propriété intellectuelle</h2>
                <p className="text-gray-300">
                  Tous les éléments du site (textes, images, logos, etc.) sont la propriété exclusive de UNIHOME et sont protégés 
                  par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable.
                </p>
              </section>

              {/* Article 10 - Données personnelles */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 10 - Données personnelles</h2>
                <p className="text-gray-300 mb-4">
                  Les données personnelles collectées dans le cadre de la commande sont traitées conformément à notre 
                  <a href="/politique-confidentialite" className="text-green-500 hover:underline ml-1">Politique de Confidentialité</a>.
                </p>
              </section>

              {/* Article 11 - Droit applicable */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 11 - Droit applicable et juridiction compétente</h2>
                <p className="text-gray-300 mb-4">
                  Les présentes CGV sont régies par le droit français.
                </p>
                <p className="text-gray-300">
                  À défaut de résolution amiable, tout litige relatif à l'interprétation et à l'exécution des présentes CGV sera 
                  de la compétence exclusive des tribunaux français.
                </p>
              </section>

              {/* Article 12 - Acceptation */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Article 12 - Acceptation</h2>
                <p className="text-gray-300">
                  L'acceptation des présentes CGV se matérialise par une case à cocher dans le formulaire de commande. 
                  Cette acceptation ne peut faire l'objet d'une condition particulière.
                </p>
              </section>

              {/* Mise à jour */}
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Mise à jour</h2>
                <p className="text-gray-300">
                  Les présentes CGV peuvent être modifiées à tout moment. Dernière mise à jour :{' '}
                  {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}.
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

