"use client";
import React from 'react';
import { useFavoritesContext } from '@/store/favorites';
import { useSession } from 'next-auth/react';

export const FavoriteButton = ({ pokemon }) => {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const { data: session } = useSession();
  
  if (!pokemon) return null;
  
  const favorite = isFavorite(pokemon.id);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      alert("Please sign in to save your favorite Pokémon!");
      return;
    }
    toggleFavorite(pokemon);
  };

  return (
    <button 
      onClick={handleToggle}
      className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors border border-white/10 text-white font-mono font-bold text-sm shadow-xl hover:scale-105 active:scale-95"
    >
      <svg className={`w-5 h-5 transition-all ${favorite ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-400 fill-none group-hover:text-white'}`} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
      {favorite ? 'Saved' : 'Favorite'}
    </button>
  );
};
