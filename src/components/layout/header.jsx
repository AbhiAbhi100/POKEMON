import React from 'react';
import Link from 'next/link';
import { AuthButton } from './auth-button';

export const Header = () => {
  return (
    <header className="bg-[#0a0a0a]/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden group-hover:rotate-180 transition-transform duration-700">
             <div className="absolute top-0 w-full h-1/2 bg-white/20"></div>
             <div className="absolute w-full h-[2px] bg-[#0a0a0a]"></div>
             <div className="absolute w-3 h-3 bg-[#0a0a0a] rounded-full border border-white/20"></div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter">Pokédex<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Lite</span></h1>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/favorites" className="text-gray-300 hover:text-white font-mono text-sm transition-all flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            Favorites
          </Link>
          <AuthButton />
        </nav>
      </div>
    </header>
  );
};
