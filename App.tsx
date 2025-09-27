
import React, { useState, useEffect } from 'react';
import { Event, CompanyInfo } from './types';
import { db, populate } from './services/db';
import Header from './components/Header';
import Footer from './components/Footer';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import AddEventForm from './components/AddEventForm';
import AdminPanel from './components/AdminPanel';
import { LoadingSpinner } from './components/icons';

export interface Filters {
  location: string;
  maxPrice: number;
  date: string;
  category: string;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isShowingAdmin, setIsShowingAdmin] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [maxPrice, setMaxPrice] = useState(500);
  const [categories, setCategories] = useState<string[]>([]);

  const [filters, setFilters] = useState<Filters>({
    location: '',
    maxPrice: 500,
    date: '',
    category: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await populate(); // Populates DB only if it's empty
      
      const allEvents: Event[] = await db.events.orderBy('id').reverse().toArray();
      setEvents(allEvents);

      // Fetch company info, using .get(1) assuming a single entry with id=1
      if (db.table('companyInfo')) {
        const info = await db.companyInfo.get(1);
        setCompanyInfo(info || null);
      }

      const uniqueCategories: string[] = [...new Set(allEvents.map(e => e.category))];
      setCategories(uniqueCategories.sort());

      if (allEvents.length > 0) {
        const maxEventPrice = Math.ceil(Math.max(...allEvents.map(e => e.price)));
        setMaxPrice(maxEventPrice);
        setFilters(prevFilters => ({
            ...prevFilters,
            maxPrice: maxEventPrice
        }));
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let tempEvents = [...events];

    if (filters.location) {
      tempEvents = tempEvents.filter(event =>
        event.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.category) {
      tempEvents = tempEvents.filter(event => event.category === filters.category);
    }

    tempEvents = tempEvents.filter(event => event.price <= filters.maxPrice);

    if (filters.date) {
      tempEvents = tempEvents.filter(event => event.date === filters.date);
    }

    setFilteredEvents(tempEvents);
  }, [filters, events]);

  const handleFilterChange = (filterName: keyof Filters, value: string | number) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      location: '',
      maxPrice: maxPrice,
      date: '',
      category: '',
    });
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsAddingEvent(false);
    setIsShowingAdmin(false);
  };

  const handleBackToList = () => {
    setSelectedEvent(null);
    setIsShowingAdmin(false);
  };
  
  const handleShowAddEventForm = () => {
    setSelectedEvent(null);
    setIsAddingEvent(true);
    setIsShowingAdmin(false);
  };
  
  const handleHideAddEventForm = () => {
    setIsAddingEvent(false);
  };

  const handleAddEvent = async (newEventData: Omit<Event, 'id'>) => {
    try {
      await db.events.add({
        ...newEventData,
        reminderSet: false,
      });

      const allEvents: Event[] = await db.events.orderBy('id').reverse().toArray();
      setEvents(allEvents);
      
      const newCategories: string[] = [...new Set(allEvents.map(e => e.category))].sort();
      setCategories(newCategories);

      setIsAddingEvent(false);
    } catch (error) {
        console.error("Falha ao adicionar evento:", error);
    }
  };

  const handleToggleReminder = async (eventId: number) => {
    const event = events.find(e => e.id === eventId);
    if (!event || event.id === undefined) return;

    const newReminderSet = !event.reminderSet;
    try {
        await db.events.update(event.id, { reminderSet: newReminderSet });
        setEvents(prevEvents =>
            prevEvents.map(e =>
                e.id === eventId ? { ...e, reminderSet: newReminderSet } : e
            )
        );
    } catch(error) {
        console.error("Falha ao alternar lembrete:", error);
    }
  };

  // Admin Panel handlers
  const handleShowAdminPanel = () => {
    setSelectedEvent(null);
    setIsAddingEvent(false);
    setIsShowingAdmin(true);
  };

  const handleHideAdminPanel = () => {
    setIsShowingAdmin(false);
  };

  const handleSaveCompanyInfo = async (info: CompanyInfo) => {
    if (!info.id) return;
    try {
        await db.companyInfo.put(info);
        setCompanyInfo(info);
        setIsShowingAdmin(false);
    } catch (error) {
        console.error("Falha ao salvar as informações da empresa:", error);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <LoadingSpinner />
        </div>
      );
    }

    if (isAddingEvent) {
      return <AddEventForm onAddEvent={handleAddEvent} onCancel={handleHideAddEventForm} />;
    }

    if (isShowingAdmin) {
      return <AdminPanel initialInfo={companyInfo} onSave={handleSaveCompanyInfo} onCancel={handleHideAdminPanel} />;
    }

    if (selectedEvent) {
      const eventWithReminderStatus = events.find(e => e.id === selectedEvent.id) || selectedEvent;
      return <EventDetail event={eventWithReminderStatus} onBack={handleBackToList} onToggleReminder={handleToggleReminder} companyInfo={companyInfo} />;
    }

    return (
        <EventList
            events={filteredEvents}
            onSelectEvent={handleSelectEvent}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            maxPrice={maxPrice}
            categories={categories}
            onToggleReminder={handleToggleReminder}
        />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header onAddEventClick={handleShowAddEventForm} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer onAdminClick={handleShowAdminPanel} />
    </div>
  );
};

export default App;