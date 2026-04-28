"use client";
import React, { useState, useEffect, useRef } from 'react';
import { getPokemonTypes } from '@/services/poke-api';
import { TYPE_COLORS } from '@/lib/constants';

export const TypeFilter = ({ selectedType, onTypeSelect }) => {
  const [types, setTypes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    getPokemonTypes().then(setTypes).catch(console.error);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (type) => {
    onTypeSelect(type);
    setIsOpen(false);
  }

  const selectedColor = selectedType ? TYPE_COLORS[selectedType] : '';

  return (
    <div className="relative w-full md:w-64" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-sm font-mono text-white hover:bg-black/60 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-500">Type:</span>
          {selectedType ? (
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${selectedColor} shadow-[0_0_8px_currentColor]`}></span>
              <span className="uppercase tracking-wider font-bold">{selectedType}</span>
            </span>
          ) : (
            <span className="uppercase tracking-wider font-bold">All</span>
          )}
        </div>
        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full mt-3 right-0 w-[calc(100vw-3rem)] md:w-[500px] p-5 bg-[#0a0c10]/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-h-[420px] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => handleSelect('')}
              className={`group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 ${selectedType === '' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-white/5 text-gray-400 hover:bg-white/15 hover:text-white border border-white/5 hover:border-white/20'}`}
            >
              <span className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedType === '' ? 'bg-black' : 'bg-white/30 group-hover:bg-white'}`}></span>
              All Types
            </button>
            {types.map(type => {
              const typeColor = TYPE_COLORS[type] || 'bg-gray-500';
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => handleSelect(type)}
                  className={`group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 border ${isSelected ? `bg-[#1a1c23] text-white border-transparent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),0_0_20px_rgba(0,0,0,0.5)]` : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/20'}`}
                >
                  <span className={`w-3 h-3 rounded-full transition-all duration-300 ${typeColor} ${isSelected ? 'shadow-[0_0_12px_currentColor] scale-125' : 'opacity-70 group-hover:opacity-100 group-hover:scale-110'}`}></span>
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
