import { Info } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const allContainerModels = [
  { id: 1, name: 'Maison Container 21 m²', size: '21 m²', type: '1+1', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop', description: 'Maison container compacte idéale pour studio ou petite famille' },
  { id: 2, name: 'Maison Container 35 m²', size: '35 m²', type: '1+1 avec Terrasse', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop', description: 'Maison container avec terrasse, espace de vie optimisé' },
  { id: 3, name: 'Maison Container 42 m²', size: '42 m²', type: '2+1', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop', description: 'Maison container familiale avec 2 chambres' },
  { id: 4, name: 'Maison Container Villageoise', size: '54 m²', type: '2+1', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop', description: 'Maison container villageoise spacieuse' },
  { id: 5, name: 'Container Métropole 14 m²', size: '14 m²', type: 'Studio', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop', description: 'Studio container urbain compact' },
  { id: 6, name: 'Container Métropole 21 m²', size: '21 m²', type: '1+0', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop', description: 'Studio container moderne et fonctionnel' },
  { id: 7, name: 'Container Métropole 42 m²', size: '42 m²', type: '2+1', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop', description: 'Maison container métropole avec 2 chambres' },
  { id: 8, name: 'Container Métropole 54 m²', size: '54 m²', type: '2+1', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop', description: 'Villa container métropole spacieuse' },
  { id: 9, name: 'Maison Container 42 m² Premium', size: '42 m²', type: '2+1', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop', description: 'Maison container premium avec finitions haut de gamme' },
];

export function PageMaisonContainer() {
  const [searchParams] = useSearchParams();
  const selectedModelId = searchParams.get('model');
  const selectedModel = selectedModelId ? allContainerModels.find(m => m.id === Number(selectedModelId)) : null;

  const handleRequestPrice = (modelId: number) => {
    window.location.href = `/contact?model=${modelId}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Maisons Container et Tarifs
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Les maisons container, qui reflètent les avantages du modèle d'habitation prêt à l'emploi, sont très prisées avec des modèles innovants. 
              Un large choix vous attend dans les nouvelles maisons container, du type studio (1+0) au 2+1.
            </p>
          </div>
        </div>
      </section>

      {/* Selected Model Detail */}
      {selectedModel && (
        <section className="py-8 px-4 bg-green-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-green-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img src={selectedModel.image} alt={selectedModel.name} className="w-full h-64 object-cover rounded-lg" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedModel.name}</h2>
                  <div className="space-y-3 mb-6">
                    <p className="text-lg"><strong>Taille:</strong> {selectedModel.size}</p>
                    <p className="text-lg"><strong>Type:</strong> {selectedModel.type}</p>
                    <p className="text-gray-600">{selectedModel.description}</p>
                  </div>
                  <button
                    onClick={() => handleRequestPrice(selectedModel.id)}
                    className="w-full bg-green-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-800 transition-colors"
                  >
                    Demander un Prix
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Produits Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Merriweather, serif' }}>Tous les Modèles de Maisons Container</h2>
            <p className="text-gray-600">La production prête à l'emploi dans des installations modernes est le principal avantage de la maison container.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allContainerModels.map((model) => (
              <div key={model.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{model.name}</h3>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-semibold">
                      {model.size}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{model.type}</p>
                  <p className="text-sm text-gray-500 mb-4">{model.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRequestPrice(model.id)}
                      className="flex-1 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors font-semibold text-sm"
                    >
                      Demander un Prix
                    </button>
                    <Link
                      to={`/container/maison-container?model=${model.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors font-semibold text-sm flex items-center justify-center gap-1"
                    >
                      <Info className="w-4 h-4" />
                      Détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

