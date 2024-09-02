import React, { useState } from 'react';
import { FaSearch, FaBars, FaHashtag, FaAsterisk } from 'react-icons/fa';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortChange: (sortOption: 'name' | 'number') => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, onSortChange }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<'name' | 'number'>('name');

  const handleSortChange = (option: 'name' | 'number') => {
    setSortOption(option);
    setShowDropdown(false);
    onSortChange(option); // Llama a la función para notificar al componente padre
  };

  return (
    <div className="w-full bg-red-500 rounded-lg relative">
      <div className="flex items-center space-x-3 mb-1">
        <img src="../../public/pokelogo.png" alt="Pokédex" className="h-10" />
        <h1 className="text-2xl font-bold text-white">Pokédex</h1>
      </div>
      <div className="flex items-center relative">
        {/* Contenedor del input de búsqueda */}
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-red-500" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-inner-lg"
          />
        </div>

        {/* Botón del filtro */}
        <div className="relative">
          <button
            className="ml-4 p-2 bg-white text-red-500 rounded-full border border-red-500 focus:outline-none shadow-inner h-full flex items-center justify-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {sortOption === 'name' ? <FaAsterisk /> : <FaHashtag />}
          </button>

          {/* Menú desplegable */}
          {showDropdown && (
            <div className="absolute right-0 mt-11 w-45 bg-red-500 border border-red-500 rounded-2xl shadow-lg p-2 z-50">
              <h3 className="text-white font-bold mb-6">Sort By:</h3>
              <div className="p-2 bg-white border rounded">
                <label className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="sort"
                    value="name"
                    checked={sortOption === 'name'}
                    onChange={() => handleSortChange('name')}
                    className="mr-2 text-red-500 focus:ring-red-500"
                  />
                  <span>Name</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="number"
                    checked={sortOption === 'number'}
                    onChange={() => handleSortChange('number')}
                    className="mr-2 text-red-500 focus:ring-red-500"
                  />
                  <span>Number</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
