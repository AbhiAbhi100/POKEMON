"use client";
import { useState, useCallback } from 'react';
import { getPokemons, getPokemonsByType, searchPokemons } from '@/services/poke-api';

export function usePokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPokemons = useCallback(async (limit, offset, typeFilter = '', searchQuery = '') => {
    setLoading(true);
    setError(null);
    try {
      if (searchQuery) {
        const data = await searchPokemons(searchQuery, limit, offset);
        setPokemons(data.results);
        setTotalCount(data.count);
      } else if (typeFilter) {
        const data = await getPokemonsByType(typeFilter, limit, offset);
        setPokemons(data.results);
        setTotalCount(data.count);
      } else {
        const data = await getPokemons(limit, offset);
        setPokemons(data.results);
        setTotalCount(data.count);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch Pokémons. Please try a valid name or ID.');
      setPokemons([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  return { pokemons, loading, error, totalCount, fetchPokemons };
}
