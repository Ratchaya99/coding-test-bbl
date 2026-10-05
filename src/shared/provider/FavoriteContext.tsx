import React, { createContext, useContext, useState } from 'react';
import { Product } from '../type/product.type';

interface FavoriteContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
}

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const isFavorite = prev.some(item => item.id === product.id);
      if (isFavorite) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error('FavoriteProvider is missing');
  }

  return context;
}
