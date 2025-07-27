import { useState, useEffect, useCallback } from 'react';
import { CartService } from '../services/cartService';

// Hook simplificado para manejar el carrito
export const useCartSimple = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar carrito inicial solo una vez
  useEffect(() => {
    try {
      const items = CartService.getCartItems();
      const count = CartService.getCartItemCount();
      
      setCartItems(items);
      setCartCount(count);
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Error al cargar el carrito');
    }
  }, []);

  // Agregar producto al carrito
  const addToCart = useCallback(async (productId, quantity = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      CartService.addToCart(productId, quantity);
      
      // Recargar datos del carrito
      const items = CartService.getCartItems();
      const count = CartService.getCartItemCount();
      
      setCartItems(items);
      setCartCount(count);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Remover producto del carrito
  const removeFromCart = useCallback((itemId) => {
    try {
      CartService.removeFromCart(itemId);
      
      // Recargar datos del carrito
      const items = CartService.getCartItems();
      const count = CartService.getCartItemCount();
      
      setCartItems(items);
      setCartCount(count);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Limpiar carrito
  const clearCart = useCallback(() => {
    try {
      CartService.clearCart();
      setCartItems([]);
      setCartCount(0);
      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  return {
    // Estado
    cartItems,
    cartCount,
    loading,
    error,
    
    // Métodos
    addToCart,
    removeFromCart,
    clearCart
  };
}; 