const galleryImages = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop',
];

export function PageGaleries() {
  return (
    <div>
      <section className="pt-24 pb-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Galeries
            </h1>
            <p className="text-lg text-gray-600">
              Images de nos maisons container
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative h-64 overflow-hidden rounded-lg group cursor-pointer">
                <img
                  src={image}
                  alt={`Galerie ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

