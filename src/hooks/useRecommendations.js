import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAnalytics } from './useAnalytics';
import { useCart } from './useCart';
import { useWishlist } from './useWishlist';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState({
    similar: [],
    personalized: [],
    trending: [],
    recentlyViewed: [],
    frequentlyBought: [],
    seasonal: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState({});

  const { trackUserBehavior } = useAnalytics();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Cargar preferencias del usuario desde localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('user_preferences');
    if (savedPreferences) {
      try {
        setUserPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Error loading user preferences:', error);
      }
    }
  }, []);

  // Guardar preferencias del usuario
  const saveUserPreferences = useCallback((preferences) => {
    const updatedPreferences = { ...userPreferences, ...preferences };
    setUserPreferences(updatedPreferences);
    localStorage.setItem('user_preferences', JSON.stringify(updatedPreferences));
  }, [userPreferences]);

  // Trackear interacción con recomendaciones
  const trackRecommendationInteraction = useCallback((recommendationType, productId, action = 'view') => {
    trackUserBehavior('recommendation_interaction', {
      type: recommendationType,
      product_id: productId,
      action,
      timestamp: new Date().toISOString()
    });
  }, [trackUserBehavior]);

  // Generar recomendaciones basadas en productos similares
  const generateSimilarProducts = useCallback((product, allProducts, limit = 6) => {
    if (!product || !allProducts.length) return [];

    const productFeatures = {
      category: product.category,
      brand: product.brand,
      price: product.price,
      tags: product.tags || []
    };

    const scoredProducts = allProducts
      .filter(p => p.id !== product.id)
      .map(p => {
        let score = 0;
        
        // Categoría (peso alto)
        if (p.category === productFeatures.category) score += 30;
        
        // Marca (peso alto)
        if (p.brand === productFeatures.brand) score += 25;
        
        // Rango de precio similar (peso medio)
        const priceDiff = Math.abs(p.price - productFeatures.price);
        const priceRange = productFeatures.price * 0.3; // 30% del precio
        if (priceDiff <= priceRange) score += 20;
        
        // Tags similares (peso medio)
        const commonTags = (p.tags || []).filter(tag => 
          productFeatures.tags.includes(tag)
        );
        score += commonTags.length * 5;
        
        // Popularidad (peso bajo)
        score += (p.rating || 0) * 2;
        
        return { ...p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return scoredProducts;
  }, []);

  // Generar recomendaciones personalizadas basadas en comportamiento
  const generatePersonalizedRecommendations = useCallback((allProducts, limit = 6) => {
    if (!allProducts.length) return [];

    // Analizar comportamiento del usuario
    const userBehavior = analyzeUserBehavior();
    
    const scoredProducts = allProducts.map(product => {
      let score = 0;
      
      // Preferencias explícitas del usuario
      if (userPreferences.favoriteBrands?.includes(product.brand)) score += 20;
      if (userPreferences.favoriteCategories?.includes(product.category)) score += 15;
      
      // Rango de precio preferido
      if (userPreferences.priceRange) {
        const [min, max] = userPreferences.priceRange;
        if (product.price >= min && product.price <= max) score += 10;
      }
      
      // Productos en carrito (categorías relacionadas)
      const cartCategories = cart.map(item => item.category);
      if (cartCategories.includes(product.category)) score += 8;
      
      // Productos en wishlist (marcas relacionadas)
      const wishlistBrands = wishlist.map(item => item.brand);
      if (wishlistBrands.includes(product.brand)) score += 8;
      
      // Comportamiento de navegación
      if (userBehavior.frequentlyViewedCategories?.includes(product.category)) score += 12;
      if (userBehavior.frequentlyViewedBrands?.includes(product.brand)) score += 10;
      
      // Productos populares (fallback)
      score += (product.rating || 0) * 2;
      
      return { ...product, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

    return scoredProducts;
  }, [cart, wishlist, userPreferences]);

  // Analizar comportamiento del usuario
  const analyzeUserBehavior = useCallback(() => {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const userEvents = events.filter(e => e.event === 'view_item' || e.event === 'add_to_cart');
    
    const categoryCount = {};
    const brandCount = {};
    
    userEvents.forEach(event => {
      const category = event.parameters?.items?.[0]?.item_category;
      const brand = event.parameters?.items?.[0]?.item_brand;
      
      if (category) categoryCount[category] = (categoryCount[category] || 0) + 1;
      if (brand) brandCount[brand] = (brandCount[brand] || 0) + 1;
    });
    
    return {
      frequentlyViewedCategories: Object.entries(categoryCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([category]) => category),
      frequentlyViewedBrands: Object.entries(brandCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([brand]) => brand)
    };
  }, []);

  // Generar productos trending
  const generateTrendingProducts = useCallback((allProducts, limit = 6) => {
    if (!allProducts.length) return [];

    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const recentEvents = events.filter(e => {
      const eventTime = new Date(e.timestamp).getTime();
      const dayAgo = Date.now() - (24 * 60 * 60 * 1000);
      return eventTime > dayAgo;
    });

    const productViews = {};
    const productAdds = {};

    recentEvents.forEach(event => {
      const productId = event.parameters?.items?.[0]?.item_id;
      if (productId) {
        if (event.event === 'view_item') {
          productViews[productId] = (productViews[productId] || 0) + 1;
        } else if (event.event === 'add_to_cart') {
          productAdds[productId] = (productAdds[productId] || 0) + 1;
        }
      }
    });

    const scoredProducts = allProducts.map(product => {
      const views = productViews[product.id] || 0;
      const adds = productAdds[product.id] || 0;
      const score = views + (adds * 3); // Adds tienen más peso
      
      return { ...product, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

    return scoredProducts;
  }, []);

  // Generar productos frecuentemente comprados juntos
  const generateFrequentlyBoughtTogether = useCallback((product, allProducts, limit = 4) => {
    if (!product || !allProducts.length) return [];

    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const purchaseEvents = events.filter(e => e.event === 'purchase');
    
    // Encontrar productos que se compran junto con el producto actual
    const coPurchased = {};
    
    purchaseEvents.forEach(event => {
      const items = event.parameters?.items || [];
      const hasCurrentProduct = items.some(item => item.item_id === product.id);
      
      if (hasCurrentProduct) {
        items.forEach(item => {
          if (item.item_id !== product.id) {
            coPurchased[item.item_id] = (coPurchased[item.item_id] || 0) + 1;
          }
        });
      }
    });

    const scoredProducts = allProducts
      .filter(p => p.id !== product.id)
      .map(p => ({
        ...p,
        score: coPurchased[p.id] || 0
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return scoredProducts;
  }, []);

  // Generar recomendaciones estacionales
  const generateSeasonalRecommendations = useCallback((allProducts, limit = 6) => {
    if (!allProducts.length) return [];

    const currentMonth = new Date().getMonth();
    const season = getCurrentSeason(currentMonth);
    
    const seasonalTags = {
      spring: ['spring', 'light', 'breathable', 'pastel'],
      summer: ['summer', 'lightweight', 'ventilated', 'bright'],
      autumn: ['autumn', 'warm', 'comfortable', 'earth'],
      winter: ['winter', 'warm', 'insulated', 'dark']
    };

    const currentSeasonTags = seasonalTags[season] || [];
    
    const scoredProducts = allProducts.map(product => {
      const tags = product.tags || [];
      const matchingTags = tags.filter(tag => 
        currentSeasonTags.some(seasonTag => 
          tag.toLowerCase().includes(seasonTag.toLowerCase())
        )
      );
      
      const score = matchingTags.length * 10 + (product.rating || 0) * 2;
      
      return { ...product, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

    return scoredProducts;
  }, []);

  // Obtener estación actual
  const getCurrentSeason = (month) => {
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  // Cargar productos recientemente vistos
  const loadRecentlyViewed = useCallback(() => {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const viewEvents = events
      .filter(e => e.event === 'view_item')
      .map(e => ({
        productId: e.parameters?.items?.[0]?.item_id,
        timestamp: e.timestamp
      }))
      .filter(e => e.productId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Obtener productos únicos (últimos vistos primero)
    const uniqueProducts = [];
    const seenIds = new Set();
    
    viewEvents.forEach(event => {
      if (!seenIds.has(event.productId)) {
        uniqueProducts.push(event.productId);
        seenIds.add(event.productId);
      }
    });

    return uniqueProducts.slice(0, 6);
  }, []);

  // Generar todas las recomendaciones
  const generateAllRecommendations = useCallback(async (currentProduct = null, allProducts = []) => {
    setIsLoading(true);
    
    try {
      const newRecommendations = {
        similar: currentProduct ? generateSimilarProducts(currentProduct, allProducts) : [],
        personalized: generatePersonalizedRecommendations(allProducts),
        trending: generateTrendingProducts(allProducts),
        recentlyViewed: loadRecentlyViewed(),
        frequentlyBought: currentProduct ? generateFrequentlyBoughtTogether(currentProduct, allProducts) : [],
        seasonal: generateSeasonalRecommendations(allProducts)
      };

      setRecommendations(newRecommendations);
      
      // Trackear generación de recomendaciones
      trackUserBehavior('recommendations_generated', {
        similar_count: newRecommendations.similar.length,
        personalized_count: newRecommendations.personalized.length,
        trending_count: newRecommendations.trending.length,
        has_current_product: !!currentProduct
      });

    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  }, [generateSimilarProducts, generatePersonalizedRecommendations, generateTrendingProducts, generateFrequentlyBoughtTogether, generateSeasonalRecommendations, loadRecentlyViewed, trackUserBehavior]);

  // Actualizar preferencias del usuario
  const updatePreferences = useCallback((newPreferences) => {
    saveUserPreferences(newPreferences);
    
    // Regenerar recomendaciones personalizadas
    if (recommendations.personalized.length > 0) {
      generateAllRecommendations();
    }
  }, [saveUserPreferences, recommendations.personalized.length, generateAllRecommendations]);

  // Obtener recomendaciones por tipo
  const getRecommendationsByType = useCallback((type) => {
    return recommendations[type] || [];
  }, [recommendations]);

  // Verificar si hay recomendaciones disponibles
  const hasRecommendations = useMemo(() => {
    return Object.values(recommendations).some(recs => recs.length > 0);
  }, [recommendations]);

  return {
    // Estado
    recommendations,
    isLoading,
    userPreferences,
    hasRecommendations,

    // Acciones principales
    generateAllRecommendations,
    generateSimilarProducts,
    generatePersonalizedRecommendations,
    generateTrendingProducts,
    generateFrequentlyBoughtTogether,
    generateSeasonalRecommendations,
    
    // Utilidades
    getRecommendationsByType,
    updatePreferences,
    trackRecommendationInteraction,
    saveUserPreferences,
    
    // Análisis
    analyzeUserBehavior
  };
}; 