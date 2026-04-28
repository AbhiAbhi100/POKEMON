"use client";
import React from 'react';
import { formatPokemonId } from '@/lib/formatters';
import { TYPE_COLORS } from '@/lib/constants';

export const PokemonDetail = ({ pokemon }) => {
  if (!pokemon) return null;

  const image = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default;

  return (
    <div className="flex flex-col items-center bg-[#0a0a0a] text-white p-6 md:p-8 rounded-[2rem]">
      <div className="w-48 h-48 mb-8 relative">
        <div className={`absolute inset-0 ${TYPE_COLORS[pokemon.types?.[0]?.type?.name || 'normal']} rounded-full blur-[64px] opacity-20`}></div>
        <img 
          src={image} 
          alt={pokemon.name} 
          className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
        />
      </div>

      <div className="text-gray-500 font-mono font-bold text-sm tracking-widest mb-2">{formatPokemonId(pokemon.id)}</div>
      
      <div className="flex gap-2 mb-10">
        {pokemon.types?.map(t => (
          <span 
            key={t.type.name} 
            className={`px-4 py-1.5 rounded-md text-xs font-mono uppercase tracking-widest text-white shadow-sm border border-white/10 ${TYPE_COLORS[t.type.name] || 'bg-gray-800'}`}
          >
            {t.type.name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 w-full mb-10">
        <div className="bg-[#1a1c1d] rounded-2xl p-6 text-center border border-white/5 shadow-inner">
          <div className="text-gray-500 text-xs font-mono tracking-widest mb-2 uppercase">Height</div>
          <div className="text-2xl font-bold text-white">{pokemon.height / 10} m</div>
        </div>
        <div className="bg-[#1a1c1d] rounded-2xl p-6 text-center border border-white/5 shadow-inner">
          <div className="text-gray-500 text-xs font-mono tracking-widest mb-2 uppercase">Weight</div>
          <div className="text-2xl font-bold text-white">{pokemon.weight / 10} kg</div>
        </div>
      </div>

      <div className="w-full bg-[#1a1c1d] p-6 rounded-[2rem] border border-white/5">
        <h4 className="font-mono text-sm uppercase tracking-widest text-gray-400 mb-6 border-b border-white/10 pb-4">Base Stats</h4>
        <div className="space-y-4">
          {pokemon.stats?.map(stat => (
            <div key={stat.stat.name} className="flex items-center gap-4">
              <div className="w-36 text-xs text-gray-300 font-mono uppercase tracking-wider flex justify-between">
                <span>{stat.stat.name.replace('-', ' ')}</span>
                <span className="font-bold text-white w-8 text-right">{stat.base_stat}</span>
              </div>
              <div className="flex-1 h-2 bg-black rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${stat.base_stat > 80 ? 'from-green-600 to-emerald-400' : stat.base_stat > 45 ? 'from-yellow-600 to-amber-400' : 'from-red-600 to-rose-400'}`}
                  style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
