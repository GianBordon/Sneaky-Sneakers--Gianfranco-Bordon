import React, { useState, useEffect } from 'react';
import { useRecommendations } from '../hooks/useRecommendations';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import LoadingSkeleton from './LoadingSkeleton';

const RecommendationsSection = ({ 
  currentProduct = null, 
  showTypes = ['similar', 'personalized', 'trending'],
  maxProducts = 6,
  title = "Recomendaciones para ti",
  className = ""
}) => {
  const { recommendations, isLoading, generateAllRecommendations, trackRecommendationInteraction } = useRecommendations();
  const { products } = useProducts();
  const [activeType, setActiveType] = useState(showTypes[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      generateAllRecommendations(currentProduct, products);
    }
  }, [currentProduct, products, generateAllRecommendations]);

  const handleProductClick = (product, type) => {
    trackRecommendationInteraction(type, product.id, 'click');
  };

  const handleProductView = (product, type) => {
    trackRecommendationInteraction(type, product.id, 'view');
  };

  const getRecommendationTitle = (type) => {
    const titles = {
      similar: 'Productos similares',
      personalized: 'Personalizado para ti',
      trending: 'Tendencias',
      recentlyViewed: 'Vistos recientemente',
      frequentlyBought: 'Frecuentemente comprados juntos',
      seasonal: 'Para esta temporada'
    };
    return titles[type] || type;
  };

  const getRecommendationIcon = (type) => {
    const icons = {
      similar: '🔄',
      personalized: '⭐',
      trending: '🔥',
      recentlyViewed: '👁️',
      frequentlyBought: '🛒',
      seasonal: '🌤️'
    };
    return icons[type] || '📦';
  };

  const getRecommendationDescription = (type) => {
    const descriptions = {
      similar: 'Basado en características similares',
      personalized: 'Adaptado a tus preferencias',
      trending: 'Los más populares ahora',
      recentlyViewed: 'Productos que has visto',
      frequentlyBought: 'Otros clientes también compraron',
      seasonal: 'Perfecto para esta época del año'
    };
    return descriptions[type] || '';
  };

  const renderRecommendationType = (type) => {
    const products = recommendations[type] || [];
    
    if (products.length === 0) return null;

    const displayProducts = isExpanded ? products : products.slice(0, maxProducts);

    return (
      <div key={type} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getRecommendationIcon(type)}</span>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">
                {getRecommendationTitle(type)}
              </h3>
              <p className="text-sm text-neutral-600">
                {getRecommendationDescription(type)}
              </p>
            </div>
          </div>
          {products.length > maxProducts && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              {isExpanded ? 'Ver menos' : `Ver todos (${products.length})`}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayProducts.map((product) => (
            <div key={product.id} onMouseEnter={() => handleProductView(product, type)}>
              <ProductCard 
                product={product}
                onClick={() => handleProductClick(product, type)}
                showWishlist={true}
                showRating={true}
                className="h-full"
              />
            </div>
          ))}
        </div>

        {!isExpanded && products.length > maxProducts && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Ver {products.length - maxProducts} productos más
            </button>
          </div>
        )}
      </div>
    );
  };

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

  const hasAnyRecommendations = showTypes.some(type => 
    recommendations[type] && recommendations[type].length > 0
  );

  if (!hasAnyRecommendations) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🤔</div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
            No hay recomendaciones disponibles
          </h3>
          <p className="text-neutral-600">
            Explora más productos para recibir recomendaciones personalizadas
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="p-6 border-b border-neutral-200">
        <h2 className="text-xl font-bold text-neutral-800">{title}</h2>
        <p className="text-neutral-600 mt-1">
          Descubre productos que te pueden interesar
        </p>
      </div>

      <div className="p-6">
        {showTypes.length > 1 ? (
          // Múltiples tipos de recomendaciones con tabs
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {showTypes.map(type => {
                const products = recommendations[type] || [];
                if (products.length === 0) return null;
                
                return (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    <span className="mr-2">{getRecommendationIcon(type)}</span>
                    {getRecommendationTitle(type)}
                    <span className="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                      {products.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {renderRecommendationType(activeType)}
          </div>
        ) : (
          // Un solo tipo de recomendación
          renderRecommendationType(showTypes[0])
        )}
      </div>
    </div>
  );
};

export default RecommendationsSection; 