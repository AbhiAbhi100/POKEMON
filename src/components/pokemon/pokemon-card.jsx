"use client";
import React from 'react';
import { useFavoritesContext } from '@/store/favorites';
import { TYPE_COLORS } from '@/lib/constants';
import { formatPokemonId } from '@/lib/formatters';
import { CometCard } from '../ui/comet-card';
import { useSession, signIn } from 'next-auth/react';

import Link from 'next/link';

export const PokemonCard = ({ pokemon, onClick }) => {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const { data: session } = useSession();
  const favorite = isFavorite(pokemon.id);

  const image = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default;
  const mainType = pokemon.types?.[0]?.type?.name || 'normal';

  const typeColorClass = TYPE_COLORS[mainType] || 'bg-gray-800';

  return (
    <Link href={`/pokemon/${pokemon.name}`} className="h-full w-full block">
      <CometCard className="h-full cursor-pointer">
        <div
          className="flex w-full h-full flex-col items-stretch rounded-[16px] bg-[#1a1c1d] border border-white/5 relative overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className={`absolute top-0 inset-x-0 h-32 opacity-20 ${typeColorClass} blur-3xl rounded-full mix-blend-screen`}></div>
          
          <button 
            onClick={(e) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              if (!session) {
                alert("Please sign in to save your favorite Pokémon!");
                return;
              }
              toggleFavorite(pokemon); 
            }}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors border border-white/10"
          >
            <svg className={`w-5 h-5 transition-all ${favorite ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-400 fill-none hover:text-white'}`} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>

          <div className="mx-4 mt-6 flex-1 relative z-10">
            <div className="text-gray-400 font-mono font-bold text-xs tracking-wider absolute top-0 left-0">{formatPokemonId(pokemon.id)}</div>
            
            <div className="relative mt-8 aspect-square w-full flex items-center justify-center">
              {image ? (
                <img 
                  src={image} 
                  alt={pokemon.name} 
                  className="w-[85%] h-[85%] object-contain drop-shadow-2xl filter contrast-125 hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 font-mono text-sm">No Image</div>
              )}
            </div>
          </div>
          
          <div className="mt-2 flex flex-col p-5 bg-gradient-to-t from-black/80 to-transparent relative z-10">
            <h3 className="font-mono text-xl font-bold text-white capitalize mb-3 tracking-tight">{pokemon.name}</h3>
            <div className="flex gap-2">
              {pokemon.types?.map(t => (
                <span 
                  key={t.type.name} 
                  className={`px-3 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-widest border border-white/10 ${TYPE_COLORS[t.type.name] || 'bg-gray-700'}`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CometCard>
    </Link>
  );
};
