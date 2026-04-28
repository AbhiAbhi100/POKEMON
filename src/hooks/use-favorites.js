"use client";
import { useState, useEffect } from 'react';

export function useFavorites(userEmail = 'guest') {
  const [favorites, setFavorites] = useState([]);
  const storageKey = `pokedex_favorites_${userEmail}`;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites([]); // Reset when switching users
      }
    } catch (error) {
      console.error("Failed to load favorites", error);
    }
  }, [storageKey]);

  const toggleFavorite = (pokemon) => {
    setFavorites(prev => {
      const isFav = prev.some(p => p.id === pokemon.id);
      let newFavs;
      if (isFav) {
        newFavs = prev.filter(p => p.id !== pokemon.id);
      } else {
        newFavs = [...prev, pokemon];
      }
      localStorage.setItem(storageKey, JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const isFavorite = (id) => favorites.some(p => p.id === id);

  return { favorites, toggleFavorite, isFavorite };
}
