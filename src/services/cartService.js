// Este servicio ahora usa Supabase a través del hook useSupabase
// Las funciones que necesitan getProductById se manejan en los componentes

// Servicio para manejar el carrito de compras
export class CartService {
  static CART_STORAGE_KEY = 'sneaky_sneakers_cart';

  // Obtener carrito del localStorage
  static getCart() {
    const cart = localStorage.getItem(this.CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  // Guardar carrito en localStorage
  static saveCart(cart) {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
  }

  // Agregar producto al carrito
  static addToCart(productId, quantity = 1, size = null, color = null) {
    const cart = this.getCart();
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cart.findIndex(item => 
      item.productId === productId && 
      item.size === size && 
      item.color === color
    );

    if (existingItemIndex >= 0) {
      // Actualizar cantidad si ya existe
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Agregar nuevo item
      cart.push({
        id: Date.now(), // ID único para el item
        productId,
        quantity,
        size,
        color,
        addedAt: new Date().toISOString()
      });
    }

    this.saveCart(cart);
    return cart;
  }

  // Remover producto del carrito
  static removeFromCart(itemId) {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    this.saveCart(updatedCart);
    return updatedCart;
  }

  // Actualizar cantidad de un producto
  static updateQuantity(itemId, quantity) {
    if (quantity <= 0) {
      return this.removeFromCart(itemId);
    }

    const cart = this.getCart();
    const updatedCart = cart.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    this.saveCart(updatedCart);
    return updatedCart;
  }

  // Limpiar carrito
  static clearCart() {
    this.saveCart([]);
    return [];
  }

  // Obtener items del carrito (sin información del producto - se obtiene en los componentes)
  static getCartItems() {
    const cart = this.getCart();
    return cart;
  }

  // Obtener cantidad total de items en el carrito
  static getCartItemCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Calcular subtotal del carrito (requiere productos como parámetro)
  static getCartSubtotal(itemsWithProducts) {
    return itemsWithProducts.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  // Calcular total con impuestos y envío (requiere productos como parámetro)
  static getCartTotal(itemsWithProducts, shippingCost = 0, taxRate = 0.21) {
    const subtotal = this.getCartSubtotal(itemsWithProducts);
    const tax = subtotal * taxRate;
    return subtotal + tax + shippingCost;
  }

  // Calcular descuento total (requiere productos como parámetro)
  static getCartDiscount(itemsWithProducts) {
    return itemsWithProducts.reduce((total, item) => {
      const originalPrice = item.product.originalPrice;
      const currentPrice = item.product.price;
      const discount = originalPrice - currentPrice;
      return total + (discount * item.quantity);
    }, 0);
  }

  // Verificar si el carrito está vacío
  static isCartEmpty() {
    return this.getCartItemCount() === 0;
  }

  // Obtener productos recomendados basados en el carrito
  static getRecommendedProducts() {
    const items = this.getCartItems();
    if (items.length === 0) return [];

    // Aquí podrías implementar lógica más compleja para recomendaciones
    // Por ahora, retornamos un array vacío
    return [];
  }

  // Aplicar cupón de descuento (simulado)
  static applyCoupon(couponCode) {
    const validCoupons = {
      'WELCOME10': { discount: 0.10, type: 'percentage' },
      'SAVE20': { discount: 0.20, type: 'percentage' },
      'FREESHIP': { discount: 10, type: 'shipping' }
    };

    const coupon = validCoupons[couponCode];
    if (!coupon) {
      throw new Error('Cupón inválido');
    }

    return coupon;
  }

  // Verificar stock de productos en el carrito (requiere productos como parámetro)
  static checkStock(itemsWithProducts) {
    const stockIssues = [];

    itemsWithProducts.forEach(item => {
      if (!item.product.inStock) {
        stockIssues.push({
          itemId: item.id,
          productName: item.product.name,
          issue: 'Producto sin stock'
        });
      }
    });

    return stockIssues;
  }

  // Procesar checkout (simulado) - requiere items con productos
  static async processCheckout(itemsWithProducts, paymentInfo, shippingInfo) {
    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría la lógica real de procesamiento de pago
      const order = {
        id: Date.now(),
        items: itemsWithProducts,
        subtotal: this.getCartSubtotal(itemsWithProducts),
        total: this.getCartTotal(itemsWithProducts),
        paymentInfo,
        shippingInfo,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Limpiar carrito después del checkout exitoso
      this.clearCart();

      return {
        success: true,
        order
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
} 