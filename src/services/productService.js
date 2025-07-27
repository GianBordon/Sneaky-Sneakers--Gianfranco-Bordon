import { 
  getAllProducts, 
  getProductsByCategory, 
  getProductById, 
  getProductsByBrand, 
  getProductsOnSale 
} from '../data/products';

// Servicio para manejar productos
export class ProductService {
  // Obtener todos los productos
  static getAllProducts() {
    return getAllProducts();
  }

  // Obtener productos por categoría
  static getProductsByCategory(category) {
    return getProductsByCategory(category);
  }

  // Obtener producto por ID
  static getProductById(id) {
    return getProductById(id);
  }

  // Obtener productos por marca
  static getProductsByBrand(brand) {
    return getProductsByBrand(brand);
  }

  // Obtener productos en oferta
  static getProductsOnSale() {
    return getProductsOnSale();
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

  // Buscar productos
  static searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return getAllProducts().filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Obtener productos recomendados (basado en rating)
  static getRecommendedProducts(limit = 6) {
    const allProducts = getAllProducts();
    return this.sortProducts(allProducts, 'rating', 'desc').slice(0, limit);
  }

  // Obtener productos más vendidos (basado en reviews)
  static getBestSellers(limit = 6) {
    const allProducts = getAllProducts();
    return this.sortProducts(allProducts, 'reviews', 'desc').slice(0, limit);
  }

  // Obtener productos nuevos (últimos agregados)
  static getNewProducts(limit = 6) {
    const allProducts = getAllProducts();
    return allProducts.slice(-limit).reverse();
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
  static getProductsWithDiscount(minDiscount = 10) {
    return getAllProducts().filter(product => {
      if (this.isOnSale(product)) {
        const discount = this.calculateDiscount(product.originalPrice, product.price);
        return discount >= minDiscount;
      }
      return false;
    });
  }
} 