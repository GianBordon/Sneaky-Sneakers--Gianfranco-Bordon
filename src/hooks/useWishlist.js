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

    // Escuchar eventos personalizados para actualizaciones en tiempo real
    const handleWishlistUpdate = () => {
      loadWishlist();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
    };
  }, []);

  // Agregar a wishlist
  const addToWishlist = (productId) => {
    const updatedWishlist = WishlistService.addToWishlist(productId);
    setWishlist(updatedWishlist);
    setWishlistCount(updatedWishlist.length);
    // Disparar evento personalizado para notificar a otros componentes
    window.dispatchEvent(new CustomEvent('wishlist-updated'));
  };

  // Remover de wishlist
  const removeFromWishlist = (productId) => {
    const updatedWishlist = WishlistService.removeFromWishlist(productId);
    setWishlist(updatedWishlist);
    setWishlistCount(updatedWishlist.length);
    // Disparar evento personalizado para notificar a otros componentes
    window.dispatchEvent(new CustomEvent('wishlist-updated'));
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
    // Disparar evento personalizado para notificar a otros componentes
    window.dispatchEvent(new CustomEvent('wishlist-updated'));
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