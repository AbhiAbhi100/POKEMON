"use client";
import React, { createContext, useContext } from 'react';
import { useFavorites } from '@/hooks/use-favorites';
import { useSession } from 'next-auth/react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { data: session } = useSession();
  const userId = session?.user?.email || 'guest';
  const favoritesData = useFavorites(userId);

  return (
    <FavoritesContext.Provider value={favoritesData}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
}
