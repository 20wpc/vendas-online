import React from 'react';
import { Event } from '../types';
import EventCard from './EventCard';
import FilterBar from './FilterBar';
import { Filters } from '../App';

interface EventListProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  filters: Filters;
  onFilterChange: (filterName: keyof Filters, value: string | number) => void;
  onClearFilters: () => void;
  maxPrice: number;
  categories: string[];
  onToggleReminder: (eventId: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onSelectEvent, filters, onFilterChange, onClearFilters, maxPrice, categories, onToggleReminder }) => {
  const groupedEvents = events.reduce((acc, event) => {
    const category = event.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(event);
    return acc;
  }, {} as Record<string, Event[]>);
  
  const categoriesToDisplay = Object.keys(groupedEvents);

  return (
    <div>
        <h2 className="text-3xl font-bold text-center mb-2 text-indigo-400">Próximos Eventos</h2>
        <p className="text-lg text-center text-slate-300 mb-10">Não perca os melhores eventos do ano. Garanta seu ingresso!</p>

        <FilterBar 
            filters={filters} 
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            maxPrice={maxPrice}
            categories={categories}
        />

        {events.length > 0 ? (
          <div className="space-y-12 mt-12">
            {categoriesToDisplay.map(category => (
              <div key={category}>
                <h3 className="text-2xl font-bold text-slate-200 mb-6 border-b-2 border-slate-700 pb-2">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupedEvents[category].map(event => (
                      <EventCard key={event.id} event={event} onSelectEvent={onSelectEvent} onToggleReminder={onToggleReminder} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-slate-400">Nenhum evento encontrado.</p>
            <p className="text-slate-500">Tente ajustar seus filtros ou clique em "Limpar Filtros".</p>
          </div>
        )}
    </div>
  );
};

export default EventList;