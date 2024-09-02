import React, { useEffect, useState, useCallback } from 'react';
import { getPokemonList, getPokemonDetailByNameOrNumber } from '../lib/api';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import PokemonDetail from './detail';
import Loading from '../components/Loading';

type Pokemon = {
  name: string;
  url: string;
};

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filteredPokemonList, setFilteredPokemonList] = useState<
    Pokemon[] | null
  >(null);
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);
  const [sortOption, setSortOption] = useState<'name' | 'number' | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    fetchPokemonList();
    loadFavorites();
  }, [offset]);

  const fetchPokemonList = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await getPokemonList(offset, 20);
      setPokemonList((prevList) =>
        offset === 0 ? data.results : [...prevList, ...data.results],
      );
      setHasMore(data.results.length > 0);
    } catch (error) {
      console.error('Failed to fetch Pokemon list:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  const toggleFavorite = (name: string) => {
    let updatedFavorites;
    if (favorites.includes(name)) {
      updatedFavorites = favorites.filter((fav) => fav !== name);
    } else {
      updatedFavorites = [...favorites, name];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setOffset(0);

    if (value === '') {
      setFilteredPokemonList(null);
      return;
    }

    setLoadingSearch(true);

    const localFiltered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase()),
    );

    if (localFiltered.length > 0) {
      setFilteredPokemonList(localFiltered);
    } else {
      try {
        const pokemonDetail = await getPokemonDetailByNameOrNumber(
          value.toLowerCase(),
        );
        setFilteredPokemonList([
          { name: pokemonDetail.name, url: pokemonDetail.url },
        ]);
      } catch (error) {
        console.error('No se encontró Pokémon:', error);
        setFilteredPokemonList([]);
      }
    }

    setLoadingSearch(false);
  };

  const handleSortChange = (option: 'name' | 'number') => {
    setSortOption(option);
    setOffset(0);
    setFilteredPokemonList(null);
  };

  const getSortedPokemonList = (list: Pokemon[]) => {
    if (sortOption === 'name') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'number') {
      return [...list].sort((a, b) => {
        const numberA = parseInt(a.url.split('/').filter(Boolean).pop()!);
        const numberB = parseInt(b.url.split('/').filter(Boolean).pop()!);
        return numberA - numberB;
      });
    }
    return list;
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 &&
      hasMore &&
      !loadingMore &&
      !loadingSearch
    ) {
      setOffset((prevOffset) => prevOffset + 20);
    }
  }, [loadingMore, hasMore, loadingSearch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleCardClick = async (pokemon: Pokemon) => {
    setLoadingDetail(true);

    try {
      const existingPokemon = pokemonList.find((p) => p.name === pokemon.name);

      if (!existingPokemon || !existingPokemon.url.includes('sprites')) {
        const detail = await getPokemonDetailByNameOrNumber(pokemon.name);
        setSelectedPokemon({
          name: detail.name,
          id: detail.id,
          weight: detail.weight,
          height: detail.height,
          abilities: detail.abilities,
          types: detail.types,
          stats: detail.stats,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detail.id}.png`,
        });
      } else {
        const number = parseInt(pokemon.url.split('/').filter(Boolean).pop()!);
        setSelectedPokemon({
          name: pokemon.name,
          id: number,
          weight: 0,
          height: 0,
          abilities: [],
          types: [],
          stats: [],
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`,
        });
      }
    } catch (error) {
      console.error('Failed to fetch Pokemon details:', error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const displayList = getSortedPokemonList(
    filteredPokemonList !== null ? filteredPokemonList : pokemonList,
  );

  const favoriteList = pokemonList.filter((pokemon) =>
    favorites.includes(pokemon.name),
  );

  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-red-500">
      <div className="mx-auto w-full max-w-6xl rounded-b-3xl bg-red-500 p-4 shadow-lg lg:p-8">
      <header className="sticky top-0 z-50 flex w-full flex-col items-center justify-between bg-red-500 p-4 lg:flex-row lg:items-center lg:justify-between lg:max-w-[50%] lg:mx-auto lg:p-2 lg:gap-4">
  <div className="w-full lg:w-1/">
    {/* Contenedor del SearchBar ajustado para pantallas grandes */}
    <SearchBar
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      onSortChange={handleSortChange}
    />
  </div>

  {/* Botón para mostrar favoritos */}
  <button
    onClick={() => setShowFavorites(!showFavorites)}
    className="mt-4 bg-white py-2 px-4 rounded-lg shadow-md lg:mt-0 lg:w-1/2 lg:max-w-[150px]"
  >
    {showFavorites ? 'Mostrar Todos' : 'Mostrar Favoritos'}
  </button>
</header>

        <div className="rounded-3xl bg-white p-4 shadow-lg lg:p-6">
          {loadingSearch ? (
            <p className="text-center">Buscando Pokémon...</p>
          ) : (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
              {(showFavorites ? favoriteList : displayList).map((pokemon) => (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                  onClick={() => handleCardClick(pokemon)}
                  isFavorite={favorites.includes(pokemon.name)}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
          {loadingMore && <p className="text-center">Cargando más...</p>}
          {!hasMore && !loadingMore && !loadingSearch && (
            <p className="text-center">No hay más Pokémon.</p>
          )}
        </div>
      </div>

      {selectedPokemon && (
        <PokemonDetail
          name={selectedPokemon.name}
          id={selectedPokemon.id}
          weight={selectedPokemon.weight}
          height={selectedPokemon.height}
          abilities={selectedPokemon.abilities}
          types={selectedPokemon.types}
          stats={selectedPokemon.stats}
          onClose={() => {
            setSelectedPokemon(null);
          }}
          imageUrl={selectedPokemon.imageUrl}
        />
      )}

      {loadingDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Home;
