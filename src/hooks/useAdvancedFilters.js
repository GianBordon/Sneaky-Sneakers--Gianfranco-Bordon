import { useState, useCallback, useMemo } from 'react';

export const useAdvancedFilters = (products = []) => {
  const [filters, setFilters] = useState({
    category: 'all',
    brand: 'all',
    sortBy: 'featured',
    priceRange: { min: 0, max: 1000 },
    sizes: [],
    colors: [],
    availability: 'all',
    rating: 0,
    onSale: false,
    newArrivals: false,
    searchQuery: ''
  });

  // Función para aplicar filtros
  const applyFilters = useCallback((productsToFilter) => {
    let filtered = [...productsToFilter];

    // Filtro por búsqueda
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query))
      );
    }

    // Filtro por categoría
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category === filters.category
      );
    }

    // Filtro por marca
    if (filters.brand !== 'all') {
      filtered = filtered.filter(product => 
        product.brand.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    // Filtro por rango de precio
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
      return price >= filters.priceRange.min && price <= filters.priceRange.max;
    });

    // Filtro por tallas
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => 
        filters.sizes.some(size => 
          product.sizes && product.sizes.includes(size)
        )
      );
    }

    // Filtro por colores
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        filters.colors.some(color => 
          product.colors && product.colors.includes(color)
        )
      );
    }

    // Filtro por disponibilidad
    if (filters.availability !== 'all') {
      filtered = filtered.filter(product => {
        switch (filters.availability) {
          case 'in-stock':
            return product.stock > 0;
          case 'out-of-stock':
            return product.stock === 0;
          case 'pre-order':
            return product.preOrder === true;
          default:
            return true;
        }
      });
    }

    // Filtro por calificación mínima
    if (filters.rating > 0) {
      filtered = filtered.filter(product => 
        product.rating >= filters.rating
      );
    }

    // Filtro por ofertas
    if (filters.onSale) {
      filtered = filtered.filter(product => 
        product.onSale === true || product.discount > 0
      );
    }

    // Filtro por nuevos lanzamientos
    if (filters.newArrivals) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      filtered = filtered.filter(product => {
        if (!product.createdAt) return false;
        const productDate = new Date(product.createdAt);
        return productDate >= thirtyDaysAgo;
      });
    }

    return filtered;
  }, [filters]);

  // Función para ordenar productos
  const sortProducts = useCallback((productsToSort) => {
    const sorted = [...productsToSort];

    switch (filters.sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceA - priceB;
        });

      case 'price-high':
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return priceB - priceA;
        });

      case 'popular':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      case 'newest':
        return sorted.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      case 'featured':
      default:
        return sorted.sort((a, b) => {
          // Mostrar productos destacados primero
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          // Luego por calificación
          return (b.rating || 0) - (a.rating || 0);
        });
    }
  }, [filters.sortBy]);

  // Productos filtrados y ordenados
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = applyFilters(products);
    return sortProducts(filtered);
  }, [products, applyFilters, sortProducts]);

  // Estadísticas de filtros
  const filterStats = useMemo(() => {
    const totalProducts = products.length;
    const filteredCount = filteredAndSortedProducts.length;
    const activeFiltersCount = Object.entries(filters).reduce((count, [key, value]) => {
      if (key === 'searchQuery') return count;
      if (Array.isArray(value) && value.length > 0) return count + 1;
      if (typeof value === 'object' && value.min > 0 || value.max < 1000) return count + 1;
      if (value !== 'all' && value !== false && value !== 0) return count + 1;
      return count;
    }, 0);

    return {
      totalProducts,
      filteredCount,
      activeFiltersCount,
      reductionPercentage: totalProducts > 0 ? Math.round(((totalProducts - filteredCount) / totalProducts) * 100) : 0
    };
  }, [products, filteredAndSortedProducts, filters]);

  // Función para actualizar filtros
  const updateFilter = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  // Función para actualizar múltiples filtros
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  // Función para limpiar todos los filtros
  const clearFilters = useCallback(() => {
    setFilters({
      category: 'all',
      brand: 'all',
      sortBy: 'featured',
      priceRange: { min: 0, max: 1000 },
      sizes: [],
      colors: [],
      availability: 'all',
      rating: 0,
      onSale: false,
      newArrivals: false,
      searchQuery: ''
    });
  }, []);

  // Función para limpiar un filtro específico
  const clearFilter = useCallback((filterType) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      switch (filterType) {
        case 'category':
          newFilters.category = 'all';
          break;
        case 'brand':
          newFilters.brand = 'all';
          break;
        case 'priceRange':
          newFilters.priceRange = { min: 0, max: 1000 };
          break;
        case 'sizes':
          newFilters.sizes = [];
          break;
        case 'colors':
          newFilters.colors = [];
          break;
        case 'availability':
          newFilters.availability = 'all';
          break;
        case 'rating':
          newFilters.rating = 0;
          break;
        case 'onSale':
          newFilters.onSale = false;
          break;
        case 'newArrivals':
          newFilters.newArrivals = false;
          break;
        case 'searchQuery':
          newFilters.searchQuery = '';
          break;
        default:
          break;
      }
      
      return newFilters;
    });
  }, []);

  // Función para obtener opciones disponibles para filtros
  const getAvailableOptions = useCallback(() => {
    const options = {
      categories: [...new Set(products.map(p => p.category).filter(Boolean))],
      brands: [...new Set(products.map(p => p.brand).filter(Boolean))],
      sizes: [...new Set(products.flatMap(p => p.sizes || []).filter(Boolean))],
      colors: [...new Set(products.flatMap(p => p.colors || []).filter(Boolean))],
      priceRange: {
        min: Math.min(...products.map(p => parseFloat(p.price.replace(/[^0-9.]/g, '')))),
        max: Math.max(...products.map(p => parseFloat(p.price.replace(/[^0-9.]/g, ''))))
      }
    };

    return options;
  }, [products]);

  return {
    // Estado
    filters,
    filteredAndSortedProducts,
    filterStats,
    
    // Acciones
    updateFilter,
    updateFilters,
    clearFilters,
    clearFilter,
    
    // Utilidades
    getAvailableOptions
  };
}; 