
import React from 'react';

interface FooterProps {
    onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-slate-800 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} TicketHub. Todos os direitos reservados.</p>
        <button onClick={onAdminClick} className="text-sm text-slate-500 hover:text-indigo-400 transition-colors mt-2">
            Painel Administrativo
        </button>
      </div>
    </footer>
  );
};

export default Footer;