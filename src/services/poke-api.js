import { fetchClient } from './api-client';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemons = async (limit = 20, offset = 0) => {
  const data = await fetchClient(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  
  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon) => await fetchClient(pokemon.url))
  );
  
  return { count: data.count, results: detailedPokemons };
};

let allPokemonsCache = null;

export const searchPokemons = async (query, limit = 20, offset = 0) => {
  if (!allPokemonsCache) {
    const data = await fetchClient(`${BASE_URL}/pokemon?limit=2000`);
    allPokemonsCache = data.results;
  }
  
  const lowerQuery = query.toLowerCase();
  const filteredList = allPokemonsCache.filter(p => p.name.includes(lowerQuery));
  
  const paginatedList = filteredList.slice(offset, offset + limit);
  
  const detailedPokemons = await Promise.all(
    paginatedList.map(async (p) => await fetchClient(p.url))
  );
  
  return { count: filteredList.length, results: detailedPokemons };
};

export const getPokemonTypes = async () => {
  const data = await fetchClient(`${BASE_URL}/type`);
  return data.results
    .map(type => type.name)
    .filter(name => name !== 'unknown' && name !== 'shadow');
};

export const getPokemonsByType = async (type, limit = 20, offset = 0) => {
  // 1. Fetch the massive array from the PokeAPI
  const data = await fetchClient(`${BASE_URL}/type/${type}`);
  
  // 2. THE FIX: Manually slice the array to simulate standard pagination
  const paginatedList = data.pokemon.slice(offset, offset + limit);
  
  // 3. Safely fetch details only for the current page
  const detailedPokemons = await Promise.all(
    paginatedList.map(async (p) => await fetchClient(p.pokemon.url))
  );
  
  return { count: data.pokemon.length, results: detailedPokemons };
};
