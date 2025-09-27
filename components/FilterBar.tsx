import React from 'react';
import { Filters } from '../App';

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filterName: keyof Filters, value: string | number) => void;
  onClearFilters: () => void;
  maxPrice: number;
  categories: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, onClearFilters, maxPrice, categories }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg mb-8 shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-1">Localização</label>
        <input
          type="text"
          id="location"
          placeholder="Ex: São Paulo"
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          className="w-full bg-slate-700 text-white p-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-1">Categoria</label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="w-full bg-slate-700 text-white p-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none appearance-none"
          style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center' }}
        >
          <option value="">Todas</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-slate-300 mb-1">Preço (até R$ {filters.maxPrice})</label>
        <input
          type="range"
          id="price"
          min="0"
          max={maxPrice}
          step="10"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-1">Data</label>
        <input
          type="date"
          id="date"
          value={filters.date}
          onChange={(e) => onFilterChange('date', e.target.value)}
          className="w-full bg-slate-700 text-white p-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div>
          <button
            onClick={onClearFilters}
            className="w-full bg-slate-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-slate-500 transition-colors duration-300"
          >
            Limpar Filtros
          </button>
      </div>
    </div>
  );
};

export default FilterBar;