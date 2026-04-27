import React from 'react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-6 my-16">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-6 py-2.5 rounded-full font-mono text-sm border border-white/10 bg-[#1a1c1d] text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Previous
      </button>
      <span className="text-gray-400 font-mono text-sm tracking-widest uppercase">
        Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-6 py-2.5 rounded-full font-mono text-sm border border-white/10 bg-[#1a1c1d] text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Next
      </button>
    </div>
  );
};
