import React from 'react';

type PokemonCardProps = {
  name: string;
  url: string;
  onClick: () => void;
  isFavorite: boolean; // Propiedad para indicar si es favorito
  toggleFavorite: (name: string) => void; // Función para alternar el estado de favorito
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  url,
  onClick,
  isFavorite,
  toggleFavorite,
}) => {
  const getPokemonIdFromUrl = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const pokemonId = getPokemonIdFromUrl(url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <div
      className="relative flex cursor-pointer flex-col items-center overflow-hidden rounded-xl bg-white p-3 shadow-md transition-shadow duration-300 hover:shadow-xl"
      onClick={onClick} // Manejar clic
    >
      {/* Botón de favorito */}
      <button
        className={`absolute left-2 top-2 z-30 text-xl ${
          isFavorite ? 'text-yellow-500' : 'text-gray-400'
        }`}
        onClick={(e) => {
          e.stopPropagation(); // Evitar que el clic active el onClick del card
          toggleFavorite(name);
        }}
      >
        {isFavorite ? '★' : '☆'} {/* Estrella llena para favorito, estrella vacía para no favorito */}
      </button>

      {/* ID del Pokémon */}
      <span className="absolute right-2 top-2 z-20 text-sm text-gray-400">
        #{pokemonId}
      </span>

      {/* Imagen del Pokémon */}
      <div className="relative z-20 flex h-24 w-full items-center justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="h-full object-contain"
          style={{ marginBottom: '-2.5rem' }}
        />
      </div>

      {/* Fondo gris en la parte inferior para el efecto de "piso" */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-14 rounded-xl bg-gray-200"></div>

      {/* Nombre del Pokémon */}
      <div className="relative z-30 mt-2 text-center">
        <p className="text-gray-800">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;
