import React from 'react';
import { Event } from '../types';
import { CalendarIcon, LocationIcon, PriceIcon, BellIcon, BellSolidIcon } from './icons';

interface EventCardProps {
  event: Event;
  onSelectEvent: (event: Event) => void;
  onToggleReminder: (eventId: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onSelectEvent, onToggleReminder }) => {
  const handleReminderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleReminder(event.id);
  };
  
  return (
    <div 
      className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-2 flex flex-col group"
    >
      <div className="relative">
        <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
        <div 
          className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 cursor-pointer"
          onClick={() => onSelectEvent(event)}
        ></div>
        <div className="absolute top-0 right-0 m-2 flex items-center gap-2">
            <span className="inline-block bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">{event.category}</span>
            <button 
              onClick={handleReminderClick} 
              className="p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
              aria-label={event.reminderSet ? "Remover lembrete" : "Criar lembrete"}
            >
              {event.reminderSet ? <BellSolidIcon className="w-5 h-5 text-yellow-400" /> : <BellIcon className="w-5 h-5" />}
            </button>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 
          className="text-xl font-bold text-white mb-2 cursor-pointer hover:text-indigo-400 transition-colors"
          onClick={() => onSelectEvent(event)}
        >
            {event.title}
        </h3>
        <div className="space-y-2 text-slate-300 mb-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-indigo-400" />
            <span>{event.displayDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <LocationIcon className="w-5 h-5 text-indigo-400" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
             <PriceIcon className="w-5 h-5 text-indigo-400" />
             <span className="text-lg font-semibold text-white">R$ {event.price.toFixed(2)}</span>
          </div>
          <button 
            onClick={() => onSelectEvent(event)}
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
          >
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;