import React, { useState } from 'react';
import { useRecommendations } from '../hooks/useRecommendations';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import LoadingSkeleton from './LoadingSkeleton';
import UserPreferencesModal from './UserPreferencesModal';

const ProductRecommendations = ({ currentProduct, className = "" }) => {
  const { recommendations, isLoading, trackRecommendationInteraction } = useRecommendations();
  const { products } = useProducts();
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [activeSection, setActiveSection] = useState('similar');

  const handleProductClick = (product, type) => {
    trackRecommendationInteraction(type, product.id, 'click');
  };

  const handleProductView = (product, type) => {
    trackRecommendationInteraction(type, product.id, 'view');
  };

  const getSectionData = (type) => {
    const data = {
      similar: {
        title: 'Productos similares',
        icon: '🔄',
        description: 'Basado en características similares',
        products: recommendations.similar || []
      },
      frequentlyBought: {
        title: 'Frecuentemente comprados juntos',
        icon: '🛒',
        description: 'Otros clientes también compraron',
        products: recommendations.frequentlyBought || []
      },
      personalized: {
        title: 'Personalizado para ti',
        icon: '⭐',
        description: 'Adaptado a tus preferencias',
        products: recommendations.personalized || []
      }
    };
    return data[type];
  };

  const availableSections = ['similar', 'frequentlyBought', 'personalized'].filter(
    section => recommendations[section] && recommendations[section].length > 0
  );

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <LoadingSkeleton key={index} height="300px" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (availableSections.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🤔</div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
            No hay recomendaciones disponibles
          </h3>
          <p className="text-neutral-600 mb-4">
            Explora más productos para recibir recomendaciones personalizadas
          </p>
          <button
            onClick={() => setShowPreferencesModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Personalizar Preferencias
          </button>
        </div>
      </div>
    );
  }

  const currentSection = getSectionData(activeSection);

  return (
    <>
      <div className={`bg-white rounded-lg shadow-lg ${className}`}>
        {/* Header */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-800">
                También te puede interesar
              </h2>
              <p className="text-neutral-600 mt-1">
                Descubre productos relacionados
              </p>
            </div>
            <button
              onClick={() => setShowPreferencesModal(true)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Personalizar
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        {availableSections.length > 1 && (
          <div className="px-6 pt-4">
            <div className="flex flex-wrap gap-2">
              {availableSections.map(section => {
                const sectionData = getSectionData(section);
                return (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeSection === section
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <span className="mr-2">{sectionData.icon}</span>
                    {sectionData.title}
                    <span className="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                      {sectionData.products.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Section Header */}
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-2xl">{currentSection.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">
                {currentSection.title}
              </h3>
              <p className="text-sm text-neutral-600">
                {currentSection.description}
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentSection.products.map((product) => (
              <div key={product.id} onMouseEnter={() => handleProductView(product, activeSection)}>
                <ProductCard 
                  product={product}
                  onClick={() => handleProductClick(product, activeSection)}
                  showWishlist={true}
                  showRating={true}
                  className="h-full"
                />
              </div>
            ))}
          </div>

          {/* Empty State for Current Section */}
          {currentSection.products.length === 0 && (
            <div className="text-center py-8">
              <div className="text-3xl mb-2">📦</div>
              <p className="text-neutral-600">
                No hay productos disponibles en esta categoría
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Preferences Modal */}
      <UserPreferencesModal 
        isOpen={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
      />
    </>
  );
};

export default ProductRecommendations; 