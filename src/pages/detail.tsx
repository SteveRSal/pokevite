import React, { useState } from 'react';

type PokemonDetailProps = {
  id: number;
  name: string;
  weight: number;
  height: number;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  onClose: () => void;
  imageUrl: string;
};

const typeColors: Record<string, string> = {
  bug: '#A7B723',
  dark: '#75574C',
  dragon: '#7037FF',
  electric: '#F9CF30',
  fairy: '#E69EAC',
  fighting: '#C12239',
  fire: '#F57D31',
  flying: '#A891EC',
  ghost: '#70559B',
  normal: '#AAA67F',
  grass: '#74CB48',
  ground: '#DEC16B',
  ice: '#9AD6DF',
  poison: '#A43E9E',
  psychic: '#FB5584',
  rock: '#B69E31',
  steel: '#b7b9d0',
  water: '#6493EB',
};

const statAcronyms: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SATK',
  'special-defense': 'SDEF',
  speed: 'SPD',
};

const PokemonDetail: React.FC<PokemonDetailProps> = ({
  id,
  name,
  weight,
  height,
  abilities,
  types,
  stats,
  onClose,
  imageUrl,
}) => {
  const mainType = types[0]?.type.name;
  const mainColor = typeColors[mainType] || '#AAA67F';

  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    return favorites.includes(id);
  });

  const handleFavoriteToggle = () => {
    const storedFavorites = localStorage.getItem('favorites');
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    if (favorites.includes(id)) {
      const newFavorites = favorites.filter((favId: number) => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...favorites, id];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: mainColor }}
    >
      <div
        className="relative flex h-screen w-full max-w-lg flex-col overflow-hidden shadow-lg md:h-auto md:max-h-[90vh] md:flex-row md:max-w-3xl md:p-4"
        style={{ padding: 0, margin: 0 }}
      >
        {/* Contenedor de la imagen y la cabecera */}
        <div
          className="relative flex w-full flex-col justify-start p-4 md:w-1/2"
          style={{
            backgroundColor: mainColor,
            height: '35%',
            position: 'relative',
            margin: 0,
          }}
        >
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between text-white">
            <div className="flex items-center">
              <button onClick={onClose} className="mr-4 text-2xl text-white">
                &#8592;
              </button>
              <h2 className="text-2xl font-bold">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </h2>
            </div>
            <span className="text-sm font-bold">#{id}</span>
          </div>

          {/* Botón de Favorito */}
          <button
            className="absolute right-16 top-4 text-2xl"
            onClick={handleFavoriteToggle}
            style={{ color: isFavorite ? 'red' : 'white' }}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>

          {/* Imagen con animación */}
          <div className="relative z-50 mt-10 md:mt-4">
            <img
              src={imageUrl}
              alt={name}
              className="animate-fadeIn mx-auto object-contain"
              style={{ zIndex: 50, marginTop: '3.5rem', width: '17rem' }}
            />
          </div>

          <div className="z-10 mt-4 flex justify-center">
            {types.map((type) => (
              <span
                key={type.type.name}
                className="mx-1 transform rounded-full px-3 py-1 text-sm font-medium text-white transition-transform duration-200 hover:scale-105"
                style={{ backgroundColor: typeColors[type.type.name] }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div
          className="relative w-full flex-grow rounded-t-3xl bg-white p-6 md:w-1/2 md:rounded-t-none md:rounded-r-3xl"
          style={{ zIndex: 1, border: `8px solid ${mainColor}`, margin: 0 }}
        >
          <div className="mb-6 text-center md:text-left mt-32 md:mt-2">
            <h3 className="mb-2 text-lg font-bold" style={{ color: mainColor }}>
              About
            </h3>
            <div className="mb-4 flex items-center justify-around border-b pb-4 md:justify-start">
              <div className="flex flex-col items-center border-r border-gray-300 pr-9 text-gray-700">
                <span>{(weight / 10).toFixed(1)} kg</span>
                <span className="text-sm">Weight</span>
              </div>
              <div className="flex flex-col items-center text-gray-700">
                <span>{(height / 10).toFixed(1)} m</span>
                <span className="text-sm">Height</span>
              </div>
              <div className="flex flex-col items-center border-l border-gray-300 pl-4 text-gray-700">
                <span>{abilities.map((a) => a.ability.name).join(', ')}</span>
                <span className="text-sm">Abilities</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-700">
              There is a plant seed on its back right from the day this Pokémon
              is born. The seed slowly grows larger.
            </p>
          </div>

          <div className="w-full">
            <h3
              className="mb-4 text-center md:text-left text-lg font-bold"
              style={{ color: mainColor }}
            >
              Base Stats
            </h3>
            <div className="relative flex flex-col space-y-4">
              <div className="absolute bottom-0 left-16 top-0 border-r-2 border-gray-300 md:left-0"></div>
              {stats.map((stat) => (
                <div
                  key={stat.stat.name}
                  className="relative flex items-center justify-between"
                >
                  <div className="flex w-16 items-center justify-end pr-4">
                    <span
                      className="text-xs font-bold capitalize"
                      style={{ color: mainColor }}
                    >
                      {statAcronyms[stat.stat.name]}
                    </span>
                  </div>

                  <span className="ml-4 w-12 text-center font-medium text-gray-600">
                    {stat.base_stat.toString().padStart(3, '0')}
                  </span>

                  <div className="relative ml-2 h-2 flex-grow rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(stat.base_stat / 255) * 100}%`,
                        backgroundColor: mainColor,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
