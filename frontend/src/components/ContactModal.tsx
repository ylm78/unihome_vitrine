import { X, Mail } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledModel?: string | null;
}

export function ContactModal({ isOpen, onClose, prefilledModel }: ContactModalProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    model: prefilledModel || '',
    project: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Rediriger vers la page contact avec les données
    navigate('/contact', {
      state: {
        name: formData.name,
        email: formData.email,
        model: formData.model,
        project: formData.project
      }
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-green-900/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white rounded-2xl w-full max-w-lg p-8 relative z-10 shadow-2xl animate-fadeIn">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Concrétisez votre projet</h3>
            <p className="text-gray-500 text-sm">Recevez une brochure détaillée et un devis gratuit</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Votre Nom</label>
            <input 
              type="text" 
              name="name"
              required 
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" 
              placeholder="Jean Dupont" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              required 
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" 
              placeholder="jean@email.com" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modèle intéressé</label>
            <select 
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">Je ne sais pas encore</option>
              {prefilledModel && <option value={prefilledModel}>{prefilledModel}</option>}
              <option value="Sur mesure">Projet Sur-Mesure</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Votre projet</label>
            <textarea 
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none h-24 transition-all" 
              placeholder="Terrain déjà acquis ? Délais souhaités ? Préférence Bois ou Indus ?"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:translate-y-[-2px]"
          >
            Envoyer ma demande
          </button>
        </form>
      </div>
    </div>
  );
}

