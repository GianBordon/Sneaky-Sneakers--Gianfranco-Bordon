import { useState, useEffect, useCallback } from 'react';
import supabaseService from '../services/supabaseService.js';

export const useSupabase = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Inicializar conexión
  const initialize = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await supabaseService.initialize();
      setIsConnected(true);
      
      // Obtener usuario actual
      const user = await supabaseService.getCurrentUser();
      setCurrentUser(user);
      
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Inicializar al montar el componente
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Métodos para productos
  const getProducts = useCallback(async (filter = {}) => {
    try {
      return await supabaseService.getProducts(filter);
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, []);

  const getProductById = useCallback(async (id) => {
    try {
      return await supabaseService.getProductById(id);
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  const getProductsByCategory = useCallback(async (category) => {
    try {
      return await supabaseService.getProductsByCategory(category);
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, []);

  const getProductsByBrand = useCallback(async (brand) => {
    try {
      return await supabaseService.getProductsByBrand(brand);
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, []);

  // Métodos para jugadores
  const getPlayers = useCallback(async () => {
    try {
      return await supabaseService.getPlayers();
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, []);

  const getPlayerById = useCallback(async (id) => {
    try {
      return await supabaseService.getPlayerById(id);
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  // Métodos para carrito
  const getCart = useCallback(async () => {
    try {
      return await supabaseService.getCart();
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, []);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    try {
      const result = await supabaseService.addToCart(productId, quantity);
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    try {
      const result = await supabaseService.removeFromCart(productId);
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Métodos para wishlist
  const getWishlist = useCallback(async () => {
    try {
      return await supabaseService.getWishlist();
    } catch (err) {
      setError(err.message);
      return [];
    }
  }, []);

  const addToWishlist = useCallback(async (productId) => {
    try {
      const result = await supabaseService.addToWishlist(productId);
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const removeFromWishlist = useCallback(async (productId) => {
    try {
      const result = await supabaseService.removeFromWishlist(productId);
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Métodos para autenticación
  const signUp = useCallback(async (email, password, userData = {}) => {
    try {
      const result = await supabaseService.signUp(email, password, userData);
      const user = await supabaseService.getCurrentUser();
      setCurrentUser(user);
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    try {
      const result = await supabaseService.signIn(email, password);
      const user = await supabaseService.getCurrentUser();
      setCurrentUser(user);
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const result = await supabaseService.signOut();
      setCurrentUser(null);
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Métodos para migración
  const migrateProducts = useCallback(async (products) => {
    try {
      await supabaseService.migrateProducts(products);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const migratePlayers = useCallback(async (players) => {
    try {
      await supabaseService.migratePlayers(players);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Reconectar
  const reconnect = useCallback(async () => {
    await initialize();
  }, [initialize]);

  return {
    // Estado
    isConnected,
    isLoading,
    error,
    currentUser,
    
    // Métodos de productos
    getProducts,
    getProductById,
    getProductsByCategory,
    getProductsByBrand,
    
    // Métodos de jugadores
    getPlayers,
    getPlayerById,
    
    // Métodos de carrito
    getCart,
    addToCart,
    removeFromCart,
    
    // Métodos de wishlist
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    
    // Métodos de autenticación
    signUp,
    signIn,
    signOut,
    
    // Métodos de migración
    migrateProducts,
    migratePlayers,
    
    // Utilidades
    clearError,
    reconnect
  };
};

export default useSupabase; 