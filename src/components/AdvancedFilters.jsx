import React, { useState, useEffect } from 'react';

const AdvancedFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen = false,
  onToggle
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [availability, setAvailability] = useState('all');

  // Sincronizar filtros locales con props
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    onFiltersChange(localFilters);
  }, [localFilters, onFiltersChange]);

  const handleFilterChange = (filterType, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange([min, max]);
    handleFilterChange('priceRange', { min, max });
  };

  const handleSizeToggle = (size) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    
    setSelectedSizes(newSizes);
    handleFilterChange('sizes', newSizes);
  };

  const handleColorToggle = (color) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    
    setSelectedColors(newColors);
    handleFilterChange('colors', newColors);
  };

  const handleClearAll = () => {
    setLocalFilters({
      category: 'all',
      brand: 'all',
      sortBy: 'featured',
      priceRange: { min: 0, max: 1000 },
      sizes: [],
      colors: [],
      availability: 'all',
      rating: 0,
      onSale: false,
      newArrivals: false
    });
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setAvailability('all');
    onClearFilters();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.category !== 'all') count++;
    if (localFilters.brand !== 'all') count++;
    if (localFilters.priceRange.min > 0 || localFilters.priceRange.max < 1000) count++;
    if (localFilters.sizes.length > 0) count++;
    if (localFilters.colors.length > 0) count++;
    if (localFilters.availability !== 'all') count++;
    if (localFilters.rating > 0) count++;
    if (localFilters.onSale) count++;
    if (localFilters.newArrivals) count++;
    return count;
  };

  const sizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];
  const colors = [
    { name: 'Black', value: 'black', hex: '#000000' },
    { name: 'White', value: 'white', hex: '#FFFFFF' },
    { name: 'Red', value: 'red', hex: '#FF0000' },
    { name: 'Blue', value: 'blue', hex: '#0000FF' },
    { name: 'Green', value: 'green', hex: '#008000' },
    { name: 'Yellow', value: 'yellow', hex: '#FFFF00' },
    { name: 'Purple', value: 'purple', hex: '#800080' },
    { name: 'Orange', value: 'orange', hex: '#FFA500' },
    { name: 'Pink', value: 'pink', hex: '#FFC0CB' },
    { name: 'Gray', value: 'gray', hex: '#808080' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg border border-neutral-200">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-800">
            Filtros Avanzados
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 bg-cyan-600 text-white text-xs px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearAll}
              className="text-sm text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              Limpiar todo
            </button>
            <button
              onClick={onToggle}
              className="text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filters Content */}
      <div className="p-4 space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="font-medium text-neutral-800 mb-3">Categoría</h4>
          <div className="space-y-2">
            {['all', 'men', 'women', 'kids'].map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={localFilters.category === category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-neutral-700 capitalize">
                  {category === 'all' ? 'Todas las categorías' : category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h4 className="font-medium text-neutral-800 mb-3">Marca</h4>
          <div className="space-y-2">
            {['all', 'nike', 'jordan', 'adidas', 'nike-sb'].map(brand => (
              <label key={brand} className="flex items-center">
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={localFilters.brand === brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-neutral-700 capitalize">
                  {brand === 'all' ? 'Todas las marcas' : brand === 'nike-sb' ? 'Nike SB' : brand}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-neutral-800 mb-3">
            Rango de Precio: ${priceRange[0]} - ${priceRange[1]}
          </h4>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceRangeChange(priceRange[0], parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-neutral-600">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h4 className="font-medium text-neutral-800 mb-3">Tallas</h4>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  selectedSizes.includes(size)
                    ? 'bg-cyan-600 text-white border-cyan-600'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-cyan-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h4 className="font-medium text-neutral-800 mb-3">Colores</h4>
          <div className="grid grid-cols-5 gap-2">
            {colors.map(color => (
              <button
                key={color.value}
                onClick={() => handleColorToggle(color.value)}
                className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColors.includes(color.value)
                    ? 'border-cyan-600 scale-110'
                    : 'border-neutral-300 hover:border-neutral-400'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColors.includes(color.value) && (
                  <svg className="absolute inset-0 m-auto w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h4 className="font-medium text-neutral-800 mb-3">Disponibilidad</h4>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'Todos los productos' },
              { value: 'in-stock', label: 'En stock' },
              { value: 'out-of-stock', label: 'Agotado' },
              { value: 'pre-order', label: 'Pre-orden' }
            ].map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="availability"
                  value={option.value}
                  checked={availability === option.value}
                  onChange={(e) => {
                    setAvailability(e.target.value);
                    handleFilterChange('availability', e.target.value);
                  }}
                  className="mr-2"
                />
                <span className="text-sm text-neutral-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h4 className="font-medium text-neutral-800 mb-3">Calificación mínima</h4>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                onClick={() => handleFilterChange('rating', rating)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-colors ${
                  localFilters.rating === rating
                    ? 'bg-cyan-600 text-white border-cyan-600'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-cyan-400'
                }`}
              >
                <span className="text-sm">{rating}+</span>
                <div className="flex">
                  {Array.from({ length: rating }, (_, i) => (
                    <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Special Filters */}
        <div>
          <h4 className="font-medium text-neutral-800 mb-3">Filtros especiales</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.onSale}
                onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-neutral-700">En oferta</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.newArrivals}
                onChange={(e) => handleFilterChange('newArrivals', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-neutral-700">Nuevos lanzamientos</span>
            </label>
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <h4 className="font-medium text-neutral-800 mb-3">Ordenar por</h4>
          <select
            value={localFilters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="featured">Destacados</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="popular">Más Populares</option>
            <option value="newest">Más Recientes</option>
            <option value="rating">Mejor Calificados</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters; 