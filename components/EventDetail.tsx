
import React, { useState } from 'react';
import { Event, CompanyInfo } from '../types';
import TicketPurchaseModal from './TicketPurchaseModal';
import { CalendarIcon, LocationIcon, PriceIcon, LoadingSpinner, SparklesIcon, BellIcon, BellSolidIcon } from './icons';
import { generateCreativeDescription } from '../services/geminiService';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
  onToggleReminder: (eventId: number) => void;
  companyInfo: CompanyInfo | null;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onBack, onToggleReminder, companyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [creativeDesc, setCreativeDesc] = useState<string | null>(null);

  const handleGenerateDescription = async () => {
    setIsGeneratingDesc(true);
    setCreativeDesc(null);
    const description = await generateCreativeDescription(event.title);
    setCreativeDesc(description);
    setIsGeneratingDesc(false);
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-2xl p-4 sm:p-8 animate-fade-in">
      <div className="relative">
        <img src={event.imageUrl} alt={event.title} className="w-full h-64 md:h-96 object-cover rounded-lg mb-6 shadow-lg" />
        <button 
          onClick={onBack} 
          className="absolute top-4 left-4 bg-black/50 text-white py-2 px-4 rounded-full hover:bg-black/80 transition-colors duration-300"
        >
          &larr; Voltar
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-extrabold text-white mb-4">{event.title}</h2>
          <p className="text-slate-300 text-lg leading-relaxed">{event.description}</p>
          
          <div className="mt-6">
            <button
                onClick={handleGenerateDescription}
                disabled={isGeneratingDesc}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isGeneratingDesc ? <LoadingSpinner className="w-5 h-5" /> : <SparklesIcon className="w-5 h-5" />}
                <span>{isGeneratingDesc ? 'Gerando...' : 'Gerar descrição criativa com IA'}</span>
            </button>
            {creativeDesc && (
              <div className="mt-4 p-4 bg-slate-700/50 border-l-4 border-indigo-400 rounded-r-lg">
                <p className="text-slate-200 italic">{creativeDesc}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Detalhes</h3>
            <div className="space-y-4 text-slate-200">
              <div className="flex items-start space-x-3">
                <CalendarIcon className="w-6 h-6 text-indigo-400 mt-1" />
                <div>
                  <h4 className="font-semibold">Data</h4>
                  <p>{event.displayDate}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <LocationIcon className="w-6 h-6 text-indigo-400 mt-1" />
                <div>
                  <h4 className="font-semibold">Localização</h4>
                  <p>{event.location}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <PriceIcon className="w-6 h-6 text-indigo-400 mt-1" />
                <div>
                  <h4 className="font-semibold">Preço</h4>
                  <p className="text-xl font-bold">R$ {event.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-500 transition-all duration-300 text-lg shadow-lg hover:shadow-indigo-500/50"
            >
              Comprar Ingressos
            </button>
            <button
              onClick={() => onToggleReminder(event.id!)}
              className={`mt-4 w-full flex items-center justify-center gap-2 border-2 font-bold py-2.5 rounded-lg transition-all duration-300 text-lg ${
                event.reminderSet
                  ? 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-800'
                  : 'border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white'
              }`}
            >
              {event.reminderSet ? <BellSolidIcon className="w-5 h-5" /> : <BellIcon className="w-5 h-5" />}
              <span>{event.reminderSet ? 'Remover Lembrete' : 'Criar Lembrete'}</span>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && <TicketPurchaseModal event={event} onClose={() => setIsModalOpen(false)} companyInfo={companyInfo} />}
    </div>
  );
};

export default EventDetail;