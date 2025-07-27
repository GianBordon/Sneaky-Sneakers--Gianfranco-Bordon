import { useState, useEffect, useCallback } from 'react';
import { ProductService } from '../services/productService';

// Hook personalizado para manejar productos
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: null,
    brand: null,
    minPrice: null,
    maxPrice: null,
    size: null,
    color: null,
    inStock: null
  });
  const [sortBy, setSortBy] = useState({ field: 'name', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');

  // Cargar productos iniciales
  useEffect(() => {
    loadProducts();
  }, []);

  // Aplicar filtros y búsqueda cuando cambien
  useEffect(() => {
    applyFiltersAndSearch();
  }, [products, filters, sortBy, searchQuery]);

  // Cargar productos
  const loadProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    
    try {
      const allProducts = ProductService.getAllProducts();
      setProducts(allProducts);
    } catch (err) {
      setError('Error al cargar productos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Aplicar filtros y búsqueda
  const applyFiltersAndSearch = useCallback(() => {
    let filtered = [...products];

    // Aplicar búsqueda
    if (searchQuery.trim()) {
      filtered = ProductService.searchProducts(searchQuery);
    }

    // Aplicar filtros
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    if (filters.minPrice !== null || filters.maxPrice !== null) {
      filtered = ProductService.filterByPrice(
        filtered, 
        filters.minPrice || 0, 
        filters.maxPrice || Infinity
      );
    }

    if (filters.size) {
      filtered = ProductService.filterBySize(filtered, filters.size);
    }

    if (filters.color) {
      filtered = ProductService.filterByColor(filtered, filters.color);
    }

    if (filters.inStock !== null) {
      filtered = filtered.filter(product => product.inStock === filters.inStock);
    }

    // Aplicar ordenamiento
    filtered = ProductService.sortProducts(filtered, sortBy.field, sortBy.order);

    setFilteredProducts(filtered);
  }, [products, filters, sortBy, searchQuery]);

  // Obtener productos por categoría
  const getProductsByCategory = useCallback((category) => {
    setLoading(true);
    setError(null);
    
    try {
      const categoryProducts = ProductService.getProductsByCategory(category);
      setProducts(categoryProducts);
      setFilters(prev => ({ ...prev, category }));
    } catch (err) {
      setError('Error al cargar productos de la categoría');
      console.error('Error loading category products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener productos por marca
  const getProductsByBrand = useCallback((brand) => {
    setLoading(true);
    setError(null);
    
    try {
      const brandProducts = ProductService.getProductsByBrand(brand);
      setProducts(brandProducts);
      setFilters(prev => ({ ...prev, brand }));
    } catch (err) {
      setError('Error al cargar productos de la marca');
      console.error('Error loading brand products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener productos en oferta
  const getProductsOnSale = useCallback(() => {
    setLoading(true);
    setError(null);
    
    try {
      const saleProducts = ProductService.getProductsOnSale();
      setProducts(saleProducts);
    } catch (err) {
      setError('Error al cargar productos en oferta');
      console.error('Error loading sale products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener productos recomendados
  const getRecommendedProducts = useCallback((limit = 6) => {
    try {
      return ProductService.getRecommendedProducts(limit);
    } catch (err) {
      setError('Error al cargar productos recomendados');
      console.error('Error loading recommended products:', err);
      return [];
    }
  }, []);

  // Obtener productos más vendidos
  const getBestSellers = useCallback((limit = 6) => {
    try {
      return ProductService.getBestSellers(limit);
    } catch (err) {
      setError('Error al cargar productos más vendidos');
      console.error('Error loading best sellers:', err);
      return [];
    }
  }, []);

  // Obtener productos nuevos
  const getNewProducts = useCallback((limit = 6) => {
    try {
      return ProductService.getNewProducts(limit);
    } catch (err) {
      setError('Error al cargar productos nuevos');
      console.error('Error loading new products:', err);
      return [];
    }
  }, []);

  // Aplicar filtro
  const applyFilter = useCallback((filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  }, []);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({
      category: null,
      brand: null,
      minPrice: null,
      maxPrice: null,
      size: null,
      color: null,
      inStock: null
    });
    setSearchQuery('');
    loadProducts();
  }, [loadProducts]);

  // Cambiar ordenamiento
  const changeSort = useCallback((field, order = 'asc') => {
    setSortBy({ field, order });
  }, []);

  // Buscar productos
  const searchProducts = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Obtener producto por ID
  const getProductById = useCallback((id) => {
    try {
      return ProductService.getProductById(id);
    } catch (err) {
      setError('Error al obtener producto');
      console.error('Error getting product:', err);
      return null;
    }
  }, []);

  // Obtener productos con descuento
  const getProductsWithDiscount = useCallback((minDiscount = 10) => {
    try {
      return ProductService.getProductsWithDiscount(minDiscount);
    } catch (err) {
      setError('Error al cargar productos con descuento');
      console.error('Error loading discounted products:', err);
      return [];
    }
  }, []);

  // Obtener estadísticas de productos
  const getProductStats = useCallback(() => {
    const allProducts = ProductService.getAllProducts();
    const onSale = ProductService.getProductsOnSale();
    const withDiscount = ProductService.getProductsWithDiscount(10);
    
    return {
      total: allProducts.length,
      onSale: onSale.length,
      withDiscount: withDiscount.length,
      averagePrice: allProducts.reduce((sum, p) => sum + p.price, 0) / allProducts.length,
      averageRating: allProducts.reduce((sum, p) => sum + p.rating, 0) / allProducts.length
    };
  }, []);

  return {
    // Estado
    products,
    filteredProducts,
    loading,
    error,
    filters,
    sortBy,
    searchQuery,
    
    // Métodos
    loadProducts,
    getProductsByCategory,
    getProductsByBrand,
    getProductsOnSale,
    getRecommendedProducts,
    getBestSellers,
    getNewProducts,
    getProductById,
    getProductsWithDiscount,
    getProductStats,
    applyFilter,
    clearFilters,
    changeSort,
    searchProducts
  };
}; 