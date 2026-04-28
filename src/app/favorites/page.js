"use client";
import React from 'react';
import { useFavoritesContext } from '@/store/favorites';
import { PokemonGrid } from '@/components/pokemon/pokemon-grid';
import { useSession, signIn } from 'next-auth/react';

export default function FavoritesPage() {
  const { favorites } = useFavoritesContext();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="py-32 text-center text-gray-400 font-mono animate-pulse">Checking authentication...</div>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Sign In Required</h2>
        <p className="text-gray-400 font-mono max-w-md mx-auto">You must be signed in to your account to view and manage your favorite Pokémon.</p>
        <button 
          onClick={() => signIn('google')}
          className="mt-4 px-8 py-3 rounded-full font-bold font-mono text-sm bg-white text-black hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4 py-8">
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 tracking-tighter">Your Favorites</h2>
        <p className="text-gray-400 font-mono max-w-2xl mx-auto">Pokémon saved locally to your device.</p>
      </div>

      <PokemonGrid 
        pokemons={favorites} 
        loading={false} 
        emptyMessage="No favorites added yet." 
      />
    </div>
  );
}
