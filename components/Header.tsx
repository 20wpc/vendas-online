
import React from 'react';
import { TicketIcon } from './icons';

interface HeaderProps {
    onAddEventClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddEventClick }) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TicketIcon className="h-8 w-8 text-indigo-400" />
          <h1 className="text-2xl font-bold text-white tracking-wider">TicketHub</h1>
        </div>
        <nav className="flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Eventos</a>
            <button 
                onClick={onAddEventClick}
                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
            >
                Cadastrar Evento
            </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;