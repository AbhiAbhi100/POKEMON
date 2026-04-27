"use client";
import React, { useState } from 'react';
import { PokemonCard } from './pokemon-card';
import { PokemonDetail } from './pokemon-detail';
import { Modal } from '../ui/modal';

export const PokemonGrid = ({ pokemons, loading, emptyMessage = "No Pokemon found." }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-80 w-full rounded-[16px] bg-[#1a1c1d] border border-white/5 animate-pulse flex flex-col justify-end p-5">
             <div className="h-4 bg-white/10 rounded w-1/2 mb-4"></div>
             <div className="h-4 bg-white/10 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center bg-[#1a1c1d] rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
        <div className="text-gray-600 mb-6 relative z-10">
          <svg className="w-24 h-24 mx-auto drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <p className="text-2xl text-gray-400 font-mono tracking-tight relative z-10">{emptyMessage}</p>
        <button onClick={() => window.location.reload()} className="mt-8 px-8 py-3 rounded-full border border-white/10 text-gray-300 hover:bg-white/10 transition-colors font-mono text-sm relative z-10">Reset Filters</button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
        {pokemons.map(pokemon => (
          <PokemonCard 
            key={pokemon.id} 
            pokemon={pokemon} 
            onClick={setSelectedPokemon} 
          />
        ))}
      </div>
      
      <Modal 
        isOpen={!!selectedPokemon} 
        onClose={() => setSelectedPokemon(null)}
        title={selectedPokemon?.name}
      >
        <PokemonDetail pokemon={selectedPokemon} />
      </Modal>
    </>
  );
};
