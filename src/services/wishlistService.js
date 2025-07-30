// Servicio para manejar la wishlist de productos
export class WishlistService {
  static WISHLIST_STORAGE_KEY = 'sneaky_sneakers_wishlist';

  // Obtener wishlist del localStorage
  static getWishlist() {
    const wishlist = localStorage.getItem(this.WISHLIST_STORAGE_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  }

  // Guardar wishlist en localStorage
  static saveWishlist(wishlist) {
    localStorage.setItem(this.WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }

  // Agregar producto a la wishlist
  static addToWishlist(productId) {
    const wishlist = this.getWishlist();
    
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      this.saveWishlist(wishlist);
    }
    
    return wishlist;
  }

  // Remover producto de la wishlist
  static removeFromWishlist(productId) {
    const wishlist = this.getWishlist();
    const updatedWishlist = wishlist.filter(id => id !== productId);
    this.saveWishlist(updatedWishlist);
    return updatedWishlist;
  }

  // Verificar si un producto está en la wishlist
  static isInWishlist(productId) {
    const wishlist = this.getWishlist();
    return wishlist.includes(productId);
  }

  // Obtener cantidad de productos en la wishlist
  static getWishlistCount() {
    const wishlist = this.getWishlist();
    return wishlist.length;
  }

  // Limpiar wishlist
  static clearWishlist() {
    this.saveWishlist([]);
    return [];
  }

  // Obtener productos de la wishlist con información completa
  static getWishlistProducts() {
    const wishlist = this.getWishlist();
    // Aquí necesitarías importar getProductById o pasar los productos como parámetro
    // Por ahora retornamos los IDs
    return wishlist;
  }
} 