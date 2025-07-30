import { useState, useEffect } from 'react';
import { WishlistService } from '../services/wishlistService';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Cargar wishlist inicial
  useEffect(() => {
    const loadWishlist = () => {
      const currentWishlist = WishlistService.getWishlist();
      setWishlist(currentWishlist);
      setWishlistCount(currentWishlist.length);
    };

    loadWishlist();

    // Escuchar cambios en localStorage
    const handleStorageChange = (e) => {
      if (e.key === WishlistService.WISHLIST_STORAGE_KEY) {
        loadWishlist();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Agregar a wishlist
  const addToWishlist = (productId) => {
    const updatedWishlist = WishlistService.addToWishlist(productId);
    setWishlist(updatedWishlist);
    setWishlistCount(updatedWishlist.length);
  };

  // Remover de wishlist
  const removeFromWishlist = (productId) => {
    const updatedWishlist = WishlistService.removeFromWishlist(productId);
    setWishlist(updatedWishlist);
    setWishlistCount(updatedWishlist.length);
  };

  // Toggle wishlist (agregar/remover)
  const toggleWishlist = (productId) => {
    if (WishlistService.isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  // Verificar si está en wishlist
  const isInWishlist = (productId) => {
    return WishlistService.isInWishlist(productId);
  };

  // Limpiar wishlist
  const clearWishlist = () => {
    WishlistService.clearWishlist();
    setWishlist([]);
    setWishlistCount(0);
  };

  return {
    wishlist,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist
  };
}; 