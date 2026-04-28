"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { usePokemons } from '@/hooks/use-pokemons';
import { PokemonGrid } from '@/components/pokemon/pokemon-grid';
import { SearchBar } from '@/components/pokemon/search-bar';
import { TypeFilter } from '@/components/pokemon/type-filter';
import { Pagination } from '@/components/ui/pagination';
import { ITEMS_PER_PAGE } from '@/lib/constants';
import { CanvasText } from '@/components/ui/canvas-text';
import { cn } from "@/lib/utils";

export default function Home() {
  const { pokemons, loading, error, totalCount, fetchPokemons } = usePokemons();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    fetchPokemons(ITEMS_PER_PAGE, offset, typeFilter, searchQuery);
  }, [currentPage, typeFilter, searchQuery, fetchPokemons]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setTypeFilter('');
    setCurrentPage(1);
  }, []);

  const handleTypeSelect = useCallback((type) => {
    setTypeFilter(type);
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      <div className="text-center space-y-6 py-8 md:py-12">
        <h2 className="group relative mx-auto max-w-4xl text-center text-4xl leading-[1.2] font-black tracking-tight text-white md:text-6xl xl:text-7xl">
          Discover Pokémon at{" "}
          <CanvasText
            text="Lightning Speed"
            backgroundClassName="bg-transparent"
            colors={[
              "rgba(168, 85, 247, 1)",
              "rgba(168, 85, 247, 0.8)",
              "rgba(59, 130, 246, 1)",
              "rgba(59, 130, 246, 0.8)",
              "rgba(236, 72, 153, 1)",
              "rgba(236, 72, 153, 0.8)",
              "rgba(255, 255, 255, 0.5)",
            ]}
            lineGap={5}
            animationDuration={15} 
          />
        </h2>
        <p className="text-gray-400 font-mono text-lg max-w-2xl mx-auto">
          Your ultimate premium Pokédex experience. Search by name or filter by type to explore.
        </p>
      </div>

      <div className="flex flex-col gap-6 bg-[#111111]/80 p-6 rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-2xl relative z-50">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <SearchBar onSearch={handleSearch} />
          <div className="w-full md:w-auto relative z-40">
            <TypeFilter selectedType={typeFilter} onTypeSelect={handleTypeSelect} />
          </div>
        </div>
      </div>

      <PokemonGrid pokemons={pokemons} loading={loading} />
      
      {!loading && pokemons.length > 0 && !searchQuery && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  );
}
