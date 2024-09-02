import axios from 'axios';

// Configuración de la instancia de Axios con la URL base de la API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Tipos de respuesta esperados
type PokemonListResponse = {
  results: { name: string; url: string }[];
};

type PokemonDetail = {
  id: number;
  name: string;
  url: string;
  sprites: { front_default: string };
  weight: number; // Asegúrate de incluir todas las propiedades necesarias
  height: number;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

// Función para obtener detalles de un Pokémon específico por ID
export const getPokemonDetail = async (id: string): Promise<PokemonDetail> => {
  try {
    const response = await api.get<PokemonDetail>(`/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon detail:', error);
    throw error;
  }
};

// Función para obtener la lista de Pokémon con parámetros de paginación
export const getPokemonList = async (
  offset = 0,
  limit = 20,
): Promise<PokemonListResponse> => {
  try {
    const response = await api.get<PokemonListResponse>('/pokemon', {
      params: { offset, limit },
    });

    if (response.status === 200 && response.data.results) {
      return response.data;
    } else {
      console.error('Unexpected API response structure:', response);
      throw new Error('Unexpected API response structure');
    }
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

// Función para obtener detalles de un Pokémon específico por nombre o número
export const getPokemonDetailByNameOrNumber = async (
  idOrName: string,
): Promise<PokemonDetail> => {
  try {
    const response = await api.get<PokemonDetail>(`/pokemon/${idOrName}`);

    if (response.status === 200 && response.data) {
      // Agrega la URL de detalle del Pokémon
      return { ...response.data, url: `/pokemon/${idOrName}` };
    } else {
      console.error('Unexpected API response structure:', response);
      throw new Error('Unexpected API response structure');
    }
  } catch (error) {
    console.error('Error fetching Pokemon detail:', error);
    throw error;
  }
};

// Elimina la redeclaración duplicada de `getPokemonDetail`
