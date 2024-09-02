import React, { useState } from 'react';
import { FaSearch, FaBars, FaHashtag, FaAsterisk } from 'react-icons/fa';

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortChange: (sortOption: 'name' | 'number') => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSortChange,
}) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<'name' | 'number'>('name');

  const handleSortChange = (option: 'name' | 'number') => {
    setSortOption(option);
    setShowDropdown(false);
    onSortChange(option);
  };

  return (
    <div className="relative flex w-full flex-col rounded-lg bg-red-500 lg:mx-auto lg:max-w-2xl lg:flex-row lg:items-center lg:justify-between lg:px-6 lg:py-4">
      <div className="mb-1 flex items-center space-x-3 lg:mb-0">
        <img
          src="../../public/pokelogo.png"
          alt="Pokédex"
          className="h-10 lg:h-12"
        />
        <h1 className="text-2xl font-bold text-white lg:text-3xl">Pokédex</h1>
      </div>
      <div className="relative flex w-full items-center lg:w-auto lg:flex-grow">
        {/* Contenedor del input de búsqueda */}
        <div className="relative w-full lg:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-red-500" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search..."
            className="shadow-inner-lg w-full rounded-full border border-red-500 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-300 lg:py-3"
          />
        </div>

        {/* Botón del filtro */}
        <div className="relative lg:ml-4">
          <button
            className="ml-4 flex h-full items-center justify-center rounded-full border border-red-500 bg-white p-2 text-red-500 shadow-inner focus:outline-none"
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            {sortOption === 'name' ? <FaAsterisk /> : <FaHashtag />}
          </button>

          {/* Menú desplegable */}
          {showDropdown && (
            <div className="w-45 absolute right-0 z-50 mt-11 rounded-2xl border border-red-500 bg-red-500 p-2 shadow-lg">
              <h3 className="mb-6 font-bold text-white">Sort By:</h3>
              <div className="rounded border bg-white p-2">
                <label className="mb-2 flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="name"
                    checked={sortOption === 'name'}
                    onChange={() => {
                      handleSortChange('name');
                    }}
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
                    onChange={() => {
                      handleSortChange('number');
                    }}
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
