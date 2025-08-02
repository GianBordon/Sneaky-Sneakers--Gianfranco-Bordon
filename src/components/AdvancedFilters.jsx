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
  const [activeSection, setActiveSection] = useState(null);

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

  const FilterSection = ({ title, children, sectionKey }) => (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={() => setActiveSection(activeSection === sectionKey ? null : sectionKey)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-50 transition-colors"
      >
        <span className="text-sm font-medium text-neutral-800">{title}</span>
        <svg 
          className={`w-4 h-4 text-neutral-500 transition-transform ${activeSection === sectionKey ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {activeSection === sectionKey && (
        <div className="p-3 bg-neutral-50">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg border border-neutral-200 w-80">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-neutral-800">
            Filtros
            {getActiveFiltersCount() > 0 && (
              <span className="ml-2 bg-cyan-600 text-white text-xs px-2 py-0.5 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearAll}
              className="text-xs text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              Limpiar
            </button>
            <button
              onClick={onToggle}
              className="text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Filters Content */}
      <div className="max-h-96 overflow-y-auto">
        <FilterSection title="Categoría" sectionKey="category">
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
                <span className="text-xs text-neutral-700 capitalize">
                  {category === 'all' ? 'Todas' : category}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Marca" sectionKey="brand">
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
                <span className="text-xs text-neutral-700 capitalize">
                  {brand === 'all' ? 'Todas' : brand === 'nike-sb' ? 'Nike SB' : brand}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Precio" sectionKey="price">
          <div className="space-y-2">
            <div className="text-xs text-neutral-600 mb-2">
              ${priceRange[0]} - ${priceRange[1]}
            </div>
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
        </FilterSection>

        <FilterSection title="Tallas" sectionKey="sizes">
          <div className="grid grid-cols-3 gap-1">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-2 py-1 text-xs rounded border transition-colors ${
                  selectedSizes.includes(size)
                    ? 'bg-cyan-600 text-white border-cyan-600'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-cyan-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Colores" sectionKey="colors">
          <div className="grid grid-cols-4 gap-2">
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
                  <svg className="absolute inset-0 m-auto w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Ordenar" sectionKey="sort">
          <select
            value={localFilters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-2 py-1 text-xs border border-neutral-300 rounded focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="featured">Destacados</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="popular">Más Populares</option>
            <option value="newest">Más Recientes</option>
            <option value="rating">Mejor Calificados</option>
          </select>
        </FilterSection>

        <FilterSection title="Especiales" sectionKey="special">
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.onSale}
                onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                className="mr-2"
              />
              <span className="text-xs text-neutral-700">En oferta</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.newArrivals}
                onChange={(e) => handleFilterChange('newArrivals', e.target.checked)}
                className="mr-2"
              />
              <span className="text-xs text-neutral-700">Nuevos lanzamientos</span>
            </label>
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default AdvancedFilters; 