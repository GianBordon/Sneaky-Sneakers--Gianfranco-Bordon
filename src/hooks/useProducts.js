import { useState, useEffect, useCallback } from 'react';
import { useSupabase } from './useSupabase';
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

  const { supabase } = useSupabase();

  // Cargar productos iniciales
  useEffect(() => {
    loadProducts();
  }, [supabase]);

  // Aplicar filtros y búsqueda cuando cambien
  useEffect(() => {
    if (products && products.length > 0) {
      applyFiltersAndSearch();
    }
  }, [products, filters, sortBy, searchQuery]);

  // Cargar productos desde Supabase
  const loadProducts = useCallback(async () => {
    if (!supabase) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        throw error;
      }

      // Validar que data existe y es un array
      if (!data || !Array.isArray(data)) {
        setProducts([]);
        return;
      }

      // Mapear los datos de Supabase al formato esperado
      const mappedProducts = data.map(product => ({
        ...product,
        inStock: product.in_stock || false,
        sizes: product.sizes || [],
        colors: product.colors || [],
        rating: product.rating || 0,
        reviews: product.reviews || 0
      }));

      setProducts(mappedProducts);
    } catch (err) {
      setError('Error al cargar productos');
      console.error('Error loading products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Aplicar filtros y búsqueda
  const applyFiltersAndSearch = useCallback(() => {
    if (!products || !Array.isArray(products)) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products];

    // Aplicar búsqueda
    if (searchQuery.trim()) {
      filtered = ProductService.searchProducts(filtered, searchQuery);
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
  const getProductsByCategory = useCallback(async (category) => {
    if (!supabase) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('name', { ascending: true });

      if (error) {
        throw error;
      }

      // Validar que data existe y es un array
      if (!data || !Array.isArray(data)) {
        setProducts([]);
        return;
      }

      const mappedProducts = data.map(product => ({
        ...product,
        inStock: product.in_stock || false,
        sizes: product.sizes || [],
        colors: product.colors || [],
        rating: product.rating || 0,
        reviews: product.reviews || 0
      }));

      setProducts(mappedProducts);
      setFilters(prev => ({ ...prev, category }));
    } catch (err) {
      setError('Error al cargar productos por categoría');
      console.error('Error loading products by category:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Obtener producto por ID
  const getProductById = useCallback(async (id) => {
    if (!supabase) return null;
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        return null;
      }

      return {
        ...data,
        inStock: data.in_stock || false,
        sizes: data.sizes || [],
        colors: data.colors || [],
        rating: data.rating || 0,
        reviews: data.reviews || 0
      };
    } catch (err) {
      console.error('Error loading product by ID:', err);
      return null;
    }
  }, [supabase]);

  // Obtener productos por marca
  const getProductsByBrand = useCallback(async (brand) => {
    if (!supabase) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('brand', brand)
        .order('name', { ascending: true });

      if (error) {
        throw error;
      }

      // Validar que data existe y es un array
      if (!data || !Array.isArray(data)) {
        setProducts([]);
        return;
      }

      const mappedProducts = data.map(product => ({
        ...product,
        inStock: product.in_stock || false,
        sizes: product.sizes || [],
        colors: product.colors || [],
        rating: product.rating || 0,
        reviews: product.reviews || 0
      }));

      setProducts(mappedProducts);
      setFilters(prev => ({ ...prev, brand }));
    } catch (err) {
      setError('Error al cargar productos por marca');
      console.error('Error loading products by brand:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Obtener productos en oferta
  const getProductsOnSale = useCallback(async () => {
    if (!supabase) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .gt('discount', 0)
        .order('discount', { ascending: false });

      if (error) {
        throw error;
      }

      // Validar que data existe y es un array
      if (!data || !Array.isArray(data)) {
        setProducts([]);
        return;
      }

      const mappedProducts = data.map(product => ({
        ...product,
        inStock: product.in_stock || false,
        sizes: product.sizes || [],
        colors: product.colors || [],
        rating: product.rating || 0,
        reviews: product.reviews || 0
      }));

      setProducts(mappedProducts);
    } catch (err) {
      setError('Error al cargar productos en oferta');
      console.error('Error loading products on sale:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Actualizar filtros
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Actualizar ordenamiento
  const updateSortBy = useCallback((field, order = 'asc') => {
    setSortBy({ field, order });
  }, []);

  // Actualizar búsqueda
  const updateSearchQuery = useCallback((query) => {
    setSearchQuery(query);
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
    setSortBy({ field: 'name', order: 'asc' });
    setSearchQuery('');
  }, []);

  // Recargar productos
  const refreshProducts = useCallback(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    // Estado
    products,
    filteredProducts,
    loading,
    error,
    filters,
    sortBy,
    searchQuery,

    // Acciones
    loadProducts,
    getProductsByCategory,
    getProductById,
    getProductsByBrand,
    getProductsOnSale,
    updateFilters,
    updateSortBy,
    updateSearchQuery,
    clearFilters,
    refreshProducts,

    // Utilidades
    totalProducts: products.length,
    filteredCount: filteredProducts.length,
    hasFilters: Object.values(filters).some(value => value !== null),
    isFiltered: filteredProducts.length !== products.length
  };
}; 