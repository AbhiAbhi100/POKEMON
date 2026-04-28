import React from 'react';
import { fetchClient } from '@/services/api-client';
import { TYPE_COLORS } from '@/lib/constants';
import { formatPokemonId } from '@/lib/formatters';
import { FavoriteButton } from '@/components/pokemon/favorite-button';
import Link from 'next/link';

const BASE_URL = 'https://pokeapi.co/api/v2';

// 1. DYNAMIC METADATA (SEO)
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const name = resolvedParams.name;
  return {
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} | Pokédex Lite`,
    description: `Detailed stats and information for ${name}`,
  };
}

// 2. SERVER-SIDE RENDERING (SSR)
export default async function PokemonSSRPage({ params }) {
  const resolvedParams = await params;
  const name = resolvedParams.name.toLowerCase();
  
  let pokemon = null;
  try {
    pokemon = await fetchClient(`${BASE_URL}/pokemon/${name}`);
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center text-white">
        <h1 className="text-4xl font-black mb-4">404</h1>
        <p className="text-gray-400 font-mono">Pokemon not found.</p>
        <Link href="/" className="mt-8 px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors">Go Home</Link>
      </div>
    );
  }

  const image = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default;

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-8 relative">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm mb-8">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Pokedex
      </Link>
      
      <div className="flex flex-col md:flex-row items-center gap-12 bg-[#111111]/80 p-8 md:p-12 rounded-[3rem] border border-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
          <FavoriteButton pokemon={pokemon} />
        </div>
        <div className={`absolute -top-1/2 -right-1/4 w-[150%] h-[150%] ${TYPE_COLORS[pokemon.types[0]?.type?.name] || 'bg-gray-800'} rounded-full blur-[128px] opacity-10 pointer-events-none`}></div>
        
        <div className="w-64 h-64 relative z-10">
          <img 
            src={image} 
            alt={pokemon.name} 
            className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.3)] animate-in slide-in-from-bottom-8 duration-1000"
          />
        </div>
        
        <div className="flex-1 relative z-10 text-center md:text-left">
          <div className="text-gray-500 font-mono font-bold text-lg tracking-widest mb-2">{formatPokemonId(pokemon.id)}</div>
          <h1 className="text-5xl md:text-6xl font-black text-white capitalize mb-6 tracking-tight">{pokemon.name}</h1>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
            {pokemon.types.map(t => (
              <span 
                key={t.type.name} 
                className={`px-5 py-2 rounded-full text-sm font-mono uppercase tracking-widest text-white shadow-lg ${TYPE_COLORS[t.type.name] || 'bg-gray-800'}`}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-black/50 rounded-2xl p-4 text-center border border-white/5">
              <div className="text-gray-500 text-xs font-mono tracking-widest mb-1 uppercase">Height</div>
              <div className="text-xl font-bold text-white">{pokemon.height / 10} m</div>
            </div>
            <div className="bg-black/50 rounded-2xl p-4 text-center border border-white/5">
              <div className="text-gray-500 text-xs font-mono tracking-widest mb-1 uppercase">Weight</div>
              <div className="text-xl font-bold text-white">{pokemon.weight / 10} kg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
