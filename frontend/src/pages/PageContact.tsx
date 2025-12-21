import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NavigationModerne } from '../components/NavigationModerne';
import { FooterModerne } from '../components/FooterModerne';

const containerModels = [
  { id: 1, name: 'Maison Container 21 m²' },
  { id: 2, name: 'Maison Container 35 m²' },
  { id: 3, name: 'Maison Container 42 m²' },
  { id: 4, name: 'Maison Container Villageoise' },
  { id: 5, name: 'Container Métropole 14 m²' },
  { id: 6, name: 'Container Métropole 21 m²' },
  { id: 7, name: 'Container Métropole 42 m²' },
  { id: 8, name: 'Container Métropole 54 m²' },
  { id: 9, name: 'Maison Container 42 m² Premium' },
];

export function PageContact() {
  const [searchParams] = useSearchParams();
  const modelId = searchParams.get('model');
  const selectedModel = modelId ? containerModels.find(m => m.id === Number(modelId)) : null;
  
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    message: '' 
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <NavigationModerne />
      <main className="flex-grow pt-20 sm:pt-24">
        <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Contact
              </h1>
              <p className="text-lg text-gray-300">
              Pour toutes vos demandes et questions, vous pouvez nous contacter via nos bureaux de vente ou notre centre d'appels.
            </p>
          </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-700/50 p-6 rounded-lg shadow-md border border-gray-600 text-center">
                <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white mb-2">Téléphone</h4>
                <p className="text-green-400 font-semibold">+33 1 23 45 67 89</p>
                <p className="text-sm text-gray-400 mt-1">Lun-Ven: 9h-19h</p>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-lg shadow-md border border-gray-600 text-center">
                <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white mb-2">Email</h4>
                <p className="text-green-400 font-semibold">contact@unihome.fr</p>
                <p className="text-sm text-gray-400 mt-1">Réponse sous 24h</p>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-lg shadow-md border border-gray-600 text-center">
                <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white mb-2">Showroom</h4>
                <p className="text-green-400 font-semibold">15 Avenue Marceau</p>
                <p className="text-sm text-gray-400 mt-1">75016 Paris, France</p>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="bg-gray-700/30 rounded-lg p-8 shadow-md border border-gray-600">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Merci !</h3>
                  <p className="text-gray-300">Nous vous recontacterons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Nom complet</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-green-500 transition-all placeholder-gray-400"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-green-500 transition-all placeholder-gray-400"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-green-500 transition-all placeholder-gray-400"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={5}
                      className="w-full px-4 py-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-green-500 transition-all resize-none placeholder-gray-400"
                      placeholder="Parlez-nous de votre projet..."
                    />
                  </div>
                  {selectedModel && (
                    <div className="bg-green-900/30 border border-green-700/50 rounded-md p-4">
                      <p className="text-sm text-green-300">
                        <strong className="text-white">Modèle sélectionné:</strong> {selectedModel.name}
                      </p>
                    </div>
                  )}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-green-700 text-white px-10 py-3 rounded-md font-semibold hover:bg-green-800 transition-colors flex items-center gap-2 mx-auto"
                    >
                      Envoyer
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      </main>
      <FooterModerne />
    </div>
  );
}

