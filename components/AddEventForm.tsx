import React, { useState } from 'react';
import { Event } from '../types';

interface AddEventFormProps {
  onAddEvent: (eventData: Omit<Event, 'id'>) => void;
  onCancel: () => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ onAddEvent, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    price: '',
    imageUrl: `https://picsum.photos/seed/${Date.now()}/600/400`,
    description: '',
    category: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.location || !formData.price || !formData.category || !formData.description) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const dateObj = new Date(`${formData.date}T00:00:00`); // Use T00:00:00 to avoid timezone issues
    const displayDate = dateObj.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const newEventData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      displayDate: displayDate,
    };
    onAddEvent(newEventData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-lg shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-6 border-b-2 border-slate-700 pb-4">Cadastrar Novo Evento</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-slate-300 mb-2 font-semibold">Título do Evento</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
          </div>
          <div>
            <label htmlFor="category" className="block text-slate-300 mb-2 font-semibold">Categoria</label>
            <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} placeholder="Ex: Música, Esporte" className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label htmlFor="date" className="block text-slate-300 mb-2 font-semibold">Data</label>
                <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
            </div>
            <div>
                <label htmlFor="location" className="block text-slate-300 mb-2 font-semibold">Localização</label>
                <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
            </div>
            <div>
                <label htmlFor="price" className="block text-slate-300 mb-2 font-semibold">Preço (R$)</label>
                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} min="0" step="0.01" placeholder="Ex: 150.50" className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
            </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-slate-300 mb-2 font-semibold">Descrição</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required></textarea>
        </div>

        <div>
            <label htmlFor="imageUrl" className="block text-slate-300 mb-2 font-semibold">URL da Imagem</label>
            <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full bg-slate-700 text-white p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            <p className="text-xs text-slate-400 mt-1">Uma imagem aleatória é fornecida por padrão. Você pode colar outra URL se desejar.</p>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-500 transition-colors duration-300">Cancelar</button>
          <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-500 transition-colors duration-300">Salvar Evento</button>
        </div>
      </form>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AddEventForm;
