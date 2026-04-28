"use client";
import React, { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/use-debounce';

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="w-full max-w-md relative group">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Pokémon..."
        className="w-full bg-[#1F2121] text-white placeholder-gray-500 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-mono text-sm shadow-inner"
      />
      <svg className="w-5 h-5 text-gray-500 absolute left-4 top-4 group-focus-within:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
  );
};
