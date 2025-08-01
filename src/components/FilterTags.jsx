import React from 'react';

const FilterTags = ({ filters, onClearFilter, onClearAll }) => {
  const getActiveFilters = () => {
    const activeFilters = [];

    // Categoría
    if (filters.category !== 'all') {
      activeFilters.push({
        type: 'category',
        label: `Categoría: ${filters.category}`,
        value: filters.category
      });
    }

    // Marca
    if (filters.brand !== 'all') {
      activeFilters.push({
        type: 'brand',
        label: `Marca: ${filters.brand === 'nike-sb' ? 'Nike SB' : filters.brand}`,
        value: filters.brand
      });
    }

    // Rango de precio
    if (filters.priceRange.min > 0 || filters.priceRange.max < 1000) {
      activeFilters.push({
        type: 'priceRange',
        label: `Precio: $${filters.priceRange.min} - $${filters.priceRange.max}`,
        value: filters.priceRange
      });
    }

    // Tallas
    if (filters.sizes.length > 0) {
      activeFilters.push({
        type: 'sizes',
        label: `Tallas: ${filters.sizes.join(', ')}`,
        value: filters.sizes
      });
    }

    // Colores
    if (filters.colors.length > 0) {
      const colorNames = {
        black: 'Negro',
        white: 'Blanco',
        red: 'Rojo',
        blue: 'Azul',
        green: 'Verde',
        yellow: 'Amarillo',
        purple: 'Púrpura',
        orange: 'Naranja',
        pink: 'Rosa',
        gray: 'Gris'
      };
      
      activeFilters.push({
        type: 'colors',
        label: `Colores: ${filters.colors.map(color => colorNames[color] || color).join(', ')}`,
        value: filters.colors
      });
    }

    // Disponibilidad
    if (filters.availability !== 'all') {
      const availabilityLabels = {
        'in-stock': 'En stock',
        'out-of-stock': 'Agotado',
        'pre-order': 'Pre-orden'
      };
      
      activeFilters.push({
        type: 'availability',
        label: `Disponibilidad: ${availabilityLabels[filters.availability]}`,
        value: filters.availability
      });
    }

    // Calificación
    if (filters.rating > 0) {
      activeFilters.push({
        type: 'rating',
        label: `Calificación: ${filters.rating}+ estrellas`,
        value: filters.rating
      });
    }

    // Ofertas
    if (filters.onSale) {
      activeFilters.push({
        type: 'onSale',
        label: 'En oferta',
        value: true
      });
    }

    // Nuevos lanzamientos
    if (filters.newArrivals) {
      activeFilters.push({
        type: 'newArrivals',
        label: 'Nuevos lanzamientos',
        value: true
      });
    }

    // Búsqueda
    if (filters.searchQuery) {
      activeFilters.push({
        type: 'searchQuery',
        label: `Búsqueda: "${filters.searchQuery}"`,
        value: filters.searchQuery
      });
    }

    return activeFilters;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-neutral-700">
          Filtros activos ({activeFilters.length})
        </h3>
        <button
          onClick={onClearAll}
          className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors"
        >
          Limpiar todo
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.type}-${index}`}
            className="flex items-center bg-cyan-50 border border-cyan-200 rounded-full px-3 py-1"
          >
            <span className="text-sm text-cyan-800 mr-2">
              {filter.label}
            </span>
            <button
              onClick={() => onClearFilter(filter.type)}
              className="text-cyan-600 hover:text-cyan-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterTags; 