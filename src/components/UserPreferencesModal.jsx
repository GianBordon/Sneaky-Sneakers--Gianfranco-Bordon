import React, { useState, useEffect } from 'react';
import { useRecommendations } from '../hooks/useRecommendations';
import { useProducts } from '../hooks/useProducts';

const UserPreferencesModal = ({ isOpen, onClose }) => {
  const { userPreferences, updatePreferences } = useRecommendations();
  const { products } = useProducts();
  
  const [formData, setFormData] = useState({
    favoriteBrands: [],
    favoriteCategories: [],
    priceRange: [0, 1000],
    preferredStyles: [],
    sizePreferences: [],
    colorPreferences: []
  });

  useEffect(() => {
    if (isOpen && userPreferences) {
      setFormData({
        favoriteBrands: userPreferences.favoriteBrands || [],
        favoriteCategories: userPreferences.favoriteCategories || [],
        priceRange: userPreferences.priceRange || [0, 1000],
        preferredStyles: userPreferences.preferredStyles || [],
        sizePreferences: userPreferences.sizePreferences || [],
        colorPreferences: userPreferences.colorPreferences || []
      });
    }
  }, [isOpen, userPreferences]);

  // Extraer opciones únicas de los productos
  const availableBrands = [...new Set(products.map(p => p.brand))].sort();
  const availableCategories = [...new Set(products.map(p => p.category))].sort();
  const availableStyles = [...new Set(products.flatMap(p => p.tags || []))].sort();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handlePriceRangeChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      priceRange: prev.priceRange.map((price, i) => i === index ? value : price)
    }));
  };

  const handleSave = () => {
    updatePreferences(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({
      favoriteBrands: [],
      favoriteCategories: [],
      priceRange: [0, 1000],
      preferredStyles: [],
      sizePreferences: [],
      colorPreferences: []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-800">
                Personalizar Recomendaciones
              </h2>
              <p className="text-neutral-600 mt-1">
                Ayúdanos a mejorar tus recomendaciones
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Marcas favoritas */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Marcas favoritas
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableBrands.map(brand => (
                <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.favoriteBrands.includes(brand)}
                    onChange={() => handleMultiSelect('favoriteBrands', brand)}
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-neutral-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Categorías favoritas */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Categorías favoritas
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableCategories.map(category => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.favoriteCategories.includes(category)}
                    onChange={() => handleMultiSelect('favoriteCategories', category)}
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-neutral-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rango de precio */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Rango de precio preferido
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-xs text-neutral-500 mb-1">Mínimo</label>
                <input
                  type="number"
                  value={formData.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
              </div>
              <div className="text-neutral-400">-</div>
              <div className="flex-1">
                <label className="block text-xs text-neutral-500 mb-1">Máximo</label>
                <input
                  type="number"
                  value={formData.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value) || 1000)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Estilos preferidos */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Estilos preferidos
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableStyles.map(style => (
                <label key={style} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferredStyles.includes(style)}
                    onChange={() => handleMultiSelect('preferredStyles', style)}
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-neutral-700 capitalize">{style}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tamaños preferidos */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Tamaños preferidos
            </label>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'].map(size => (
                <label key={size} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sizePreferences.includes(size)}
                    onChange={() => handleMultiSelect('sizePreferences', size)}
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-neutral-700">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colores preferidos */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Colores preferidos
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { name: 'Negro', color: 'bg-black' },
                { name: 'Blanco', color: 'bg-white border' },
                { name: 'Rojo', color: 'bg-red-500' },
                { name: 'Azul', color: 'bg-blue-500' },
                { name: 'Verde', color: 'bg-green-500' },
                { name: 'Amarillo', color: 'bg-yellow-500' },
                { name: 'Gris', color: 'bg-gray-500' },
                { name: 'Multicolor', color: 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500' }
              ].map(colorOption => (
                <label key={colorOption.name} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.colorPreferences.includes(colorOption.name)}
                    onChange={() => handleMultiSelect('colorPreferences', colorOption.name)}
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className={`w-4 h-4 rounded-full ${colorOption.color}`}></div>
                  <span className="text-sm text-neutral-700">{colorOption.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 flex justify-between">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
          >
            Restablecer
          </button>
          <div className="space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Guardar Preferencias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesModal; 