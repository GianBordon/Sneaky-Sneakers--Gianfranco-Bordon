// Este servicio ahora usa Supabase a través del hook useSupabase
// Las funciones se manejan directamente en los componentes que usan useSupabase

// Servicio para manejar productos
export class ProductService {
  // Nota: Estas funciones ahora se manejan directamente en los componentes
  // usando el hook useSupabase para obtener datos de la base de datos
  
  // Obtener todos los productos
  static async getAllProducts() {
    // Esta función se maneja en los componentes con useSupabase
    throw new Error('Use useSupabase hook instead');
  }

  // Obtener productos por categoría
  static async getProductsByCategory(_category) {
    // Esta función se maneja en los componentes con useSupabase
    throw new Error('Use useSupabase hook instead');
  }

  // Obtener producto por ID
  static async getProductById(_id) {
    // Esta función se maneja en los componentes con useSupabase
    throw new Error('Use useSupabase hook instead');
  }

  // Obtener productos por marca
  static async getProductsByBrand(_brand) {
    // Esta función se maneja en los componentes con useSupabase
    throw new Error('Use useSupabase hook instead');
  }

  // Obtener productos en oferta
  static async getProductsOnSale() {
    // Esta función se maneja en los componentes con useSupabase
    throw new Error('Use useSupabase hook instead');
  }

  // Filtrar productos por precio
  static filterByPrice(products, minPrice = 0, maxPrice = Infinity) {
    return products.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
  }

  // Filtrar productos por talla
  static filterBySize(products, size) {
    return products.filter(product => 
      product.sizes.includes(size)
    );
  }

  // Filtrar productos por color
  static filterByColor(products, color) {
    return products.filter(product => 
      product.colors.includes(color)
    );
  }

  // Ordenar productos
  static sortProducts(products, sortBy = 'name', order = 'asc') {
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case 'price':
        sortedProducts.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
        break;
      case 'name':
        sortedProducts.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          return order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
        break;
      case 'rating':
        sortedProducts.sort((a, b) => order === 'asc' ? a.rating - b.rating : b.rating - a.rating);
        break;
      case 'reviews':
        sortedProducts.sort((a, b) => order === 'asc' ? a.reviews - b.reviews : b.reviews - a.reviews);
        break;
      default:
        break;
    }
    
    return sortedProducts;
  }

  // Buscar productos (ahora requiere productos como parámetro)
  static searchProducts(products, query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Obtener productos recomendados (basado en rating)
  static getRecommendedProducts(products, limit = 6) {
    return this.sortProducts(products, 'rating', 'desc').slice(0, limit);
  }

  // Obtener productos más vendidos (basado en reviews)
  static getBestSellers(products, limit = 6) {
    return this.sortProducts(products, 'reviews', 'desc').slice(0, limit);
  }

  // Obtener productos nuevos (últimos agregados)
  static getNewProducts(products, limit = 6) {
    return products.slice(-limit).reverse();
  }

  // Calcular descuento
  static calculateDiscount(originalPrice, currentPrice) {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }

  // Verificar si un producto está en oferta
  static isOnSale(product) {
    return product.price < product.originalPrice;
  }

  // Obtener productos con descuento mayor a X%
  static getProductsWithDiscount(products, minDiscount = 10) {
    return products.filter(product => {
      if (this.isOnSale(product)) {
        const discount = this.calculateDiscount(product.originalPrice, product.price);
        return discount >= minDiscount;
      }
      return false;
    });
  }
} 