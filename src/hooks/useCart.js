import { useState, useEffect, useCallback } from 'react';
import { CartService } from '../services/cartService';
import { useSupabase } from './useSupabase';

// Hook personalizado para manejar el carrito
export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsWithProducts, setCartItemsWithProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getProductById } = useSupabase();

  // Cargar carrito inicial
  useEffect(() => {
    loadCart();
  }, []);

  // Cargar carrito con información de productos
  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      const items = CartService.getCartItems();
      const count = CartService.getCartItemCount();
      
      // Obtener información de productos desde Supabase
      const itemsWithProducts = await Promise.all(
        items.map(async (item) => {
          try {
            const product = await getProductById(item.productId);
            return {
              ...item,
              product: product || { name: 'Producto no encontrado', price: 0, image: '' }
            };
          } catch (error) {
            console.error(`Error loading product ${item.productId}:`, error);
            return {
              ...item,
              product: { name: 'Producto no encontrado', price: 0, image: '' }
            };
          }
        })
      );

      const subtotal = CartService.getCartSubtotal(itemsWithProducts);
      const total = CartService.getCartTotal(itemsWithProducts);

      setCartItems(items);
      setCartItemsWithProducts(itemsWithProducts);
      setCartCount(count);
      setCartSubtotal(subtotal);
      setCartTotal(total);
      setError(null);
    } catch (err) {
      setError('Error al cargar el carrito');
      console.error('Error loading cart:', err);
    } finally {
      setLoading(false);
    }
  }, [getProductById]);

  // Agregar producto al carrito
  const addToCart = useCallback(async (productId, quantity = 1, size = null, color = null) => {
    setLoading(true);
    setError(null);
    
    try {
      CartService.addToCart(productId, quantity, size, color);
      await loadCart(); // Recargar carrito con productos
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [loadCart]);

  // Remover producto del carrito
  const removeFromCart = useCallback((itemId) => {
    try {
      CartService.removeFromCart(itemId);
      loadCart();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [loadCart]);

  // Actualizar cantidad
  const updateQuantity = useCallback((itemId, quantity) => {
    try {
      CartService.updateQuantity(itemId, quantity);
      loadCart();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, [loadCart]);

  // Limpiar carrito
  const clearCart = useCallback(() => {
    try {
      CartService.clearCart();
      setCartItems([]);
      setCartCount(0);
      setCartSubtotal(0);
      setCartTotal(0);
      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Verificar si el carrito está vacío
  const isCartEmpty = useCallback(() => {
    return cartCount === 0;
  }, [cartCount]);

  // Obtener item por ID
  const getCartItem = useCallback((itemId) => {
    return cartItems.find(item => item.id === itemId);
  }, [cartItems]);

  // Calcular descuento total
  const getCartDiscount = useCallback(() => {
    return CartService.getCartDiscount(cartItemsWithProducts);
  }, [cartItemsWithProducts]);

  // Aplicar cupón
  const applyCoupon = useCallback((couponCode) => {
    try {
      const coupon = CartService.applyCoupon(couponCode);
      return { success: true, coupon };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Verificar stock
  const checkStock = useCallback(() => {
    return CartService.checkStock(cartItemsWithProducts);
  }, [cartItemsWithProducts]);

  // Procesar checkout
  const processCheckout = useCallback(async (paymentInfo, shippingInfo) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await CartService.processCheckout(cartItemsWithProducts, paymentInfo, shippingInfo);
      
      if (result.success) {
        // Limpiar carrito después del checkout exitoso
        setCartItems([]);
        setCartItemsWithProducts([]);
        setCartCount(0);
        setCartSubtotal(0);
        setCartTotal(0);
      }
      
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [cartItemsWithProducts]);

  return {
    // Estado
    cartItems,
    cartItemsWithProducts,
    cartCount,
    cartSubtotal,
    cartTotal,
    loading,
    error,
    
    // Métodos
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    isCartEmpty,
    getCartItem,
    getCartDiscount,
    applyCoupon,
    checkStock,
    processCheckout
  };
}; 