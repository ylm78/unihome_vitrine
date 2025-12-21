import { MapPin } from 'lucide-react';

const projects = [
  { id: 1, name: 'Projet Villa Biarritz', location: 'Biarritz, France', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop', description: 'Villa container vue mer de 120m²' },
  { id: 2, name: 'Projet Studio Paris', location: 'Paris, France', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop', description: 'Studio container urbain de 40m²' },
  { id: 3, name: 'Projet Refuge Annecy', location: 'Annecy, France', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop', description: 'Refuge montagne autonome de 85m²' },
  { id: 4, name: 'Projet Maison Familiale', location: 'Lyon, France', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop', description: 'Maison container familiale de 100m²' },
  { id: 5, name: 'Projet Container Moderne', location: 'Marseille, France', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop', description: 'Maison container moderne de 75m²' },
  { id: 6, name: 'Projet Villa Côte d\'Azur', location: 'Nice, France', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop', description: 'Villa container luxe de 150m²' },
  { id: 7, name: 'Projet Studio Bordeaux', location: 'Bordeaux, France', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop', description: 'Studio container design de 35m²' },
  { id: 8, name: 'Projet Maison Écologique', location: 'Toulouse, France', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop', description: 'Maison container écologique de 90m²' },
];

export function PageProjets() {
  return (
    <div>
      <section className="pt-24 pb-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Projets
            </h1>
            <p className="text-lg text-gray-600">
              Nos projets réalisés avec succès
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </p>
                  <p className="text-sm text-gray-500">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

