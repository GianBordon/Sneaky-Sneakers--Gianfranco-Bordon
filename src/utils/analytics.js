// Sistema de Analytics y SEO para Sneaky Sneakers

// Google Analytics (simulado)
export const initializeAnalytics = () => {
  // En un caso real, aquí se inicializaría Google Analytics
  console.log('Analytics inicializado');
  
  // Simular carga de Google Analytics
  if (typeof window !== 'undefined') {
    window.gtag = window.gtag || function() {
      (window.gtag.q = window.gtag.q || []).push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'GA_MEASUREMENT_ID'); // Reemplazar con ID real
  }
};

// Tracking de eventos
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
  
  // También guardar en localStorage para análisis local
  const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
  events.push({
    event: eventName,
    parameters,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent
  });
  localStorage.setItem('analytics_events', JSON.stringify(events.slice(-100))); // Mantener solo los últimos 100 eventos
};

// Tracking de páginas vistas
export const trackPageView = (pageTitle, pagePath) => {
  trackEvent('page_view', {
    page_title: pageTitle,
    page_location: pagePath
  });
};

// Tracking de productos vistos
export const trackProductView = (product) => {
  trackEvent('view_item', {
    currency: 'USD',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      item_brand: product.brand,
      price: product.price
    }]
  });
};

// Tracking de productos agregados al carrito
export const trackAddToCart = (product, quantity = 1) => {
  trackEvent('add_to_cart', {
    currency: 'USD',
    value: product.price * quantity,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      item_brand: product.brand,
      price: product.price,
      quantity: quantity
    }]
  });
};

// Tracking de inicio de checkout
export const trackBeginCheckout = (cartItems) => {
  const totalValue = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  trackEvent('begin_checkout', {
    currency: 'USD',
    value: totalValue,
    items: cartItems.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_brand: item.brand,
      price: item.price,
      quantity: item.quantity
    }))
  });
};

// Tracking de compra completada
export const trackPurchase = (order) => {
  trackEvent('purchase', {
    transaction_id: order.id,
    value: order.total,
    tax: order.tax,
    shipping: order.shipping,
    currency: 'USD',
    items: order.items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category,
      item_brand: item.brand,
      price: item.price,
      quantity: item.quantity
    }))
  });
};

// Tracking de búsquedas
export const trackSearch = (searchTerm, resultsCount) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount
  });
};

// Tracking de reviews
export const trackReview = (productId, rating) => {
  trackEvent('review', {
    item_id: productId,
    rating: rating
  });
};

// Analytics Dashboard (datos locales)
export const getAnalyticsData = () => {
  const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
  
  const analytics = {
    totalEvents: events.length,
    pageViews: events.filter(e => e.event === 'page_view').length,
    productViews: events.filter(e => e.event === 'view_item').length,
    addToCart: events.filter(e => e.event === 'add_to_cart').length,
    purchases: events.filter(e => e.event === 'purchase').length,
    searches: events.filter(e => e.event === 'search').length,
    reviews: events.filter(e => e.event === 'review').length,
    
    // Productos más vistos
    topProducts: getTopProducts(events),
    
    // Páginas más visitadas
    topPages: getTopPages(events),
    
    // Búsquedas más populares
    topSearches: getTopSearches(events),
    
    // Conversión
    conversionRate: calculateConversionRate(events)
  };
  
  return analytics;
};

const getTopProducts = (events) => {
  const productViews = events.filter(e => e.event === 'view_item');
  const productCount = {};
  
  productViews.forEach(event => {
    const productId = event.parameters.items?.[0]?.item_id;
    if (productId) {
      productCount[productId] = (productCount[productId] || 0) + 1;
    }
  });
  
  return Object.entries(productCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([id, count]) => ({ id, views: count }));
};

const getTopPages = (events) => {
  const pageViews = events.filter(e => e.event === 'page_view');
  const pageCount = {};
  
  pageViews.forEach(event => {
    const page = event.parameters.page_location;
    if (page) {
      pageCount[page] = (pageCount[page] || 0) + 1;
    }
  });
  
  return Object.entries(pageCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([page, count]) => ({ page, views: count }));
};

const getTopSearches = (events) => {
  const searches = events.filter(e => e.event === 'search');
  const searchCount = {};
  
  searches.forEach(event => {
    const term = event.parameters.search_term;
    if (term) {
      searchCount[term] = (searchCount[term] || 0) + 1;
    }
  });
  
  return Object.entries(searchCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([term, count]) => ({ term, searches: count }));
};

const calculateConversionRate = (events) => {
  const pageViews = events.filter(e => e.event === 'page_view').length;
  const purchases = events.filter(e => e.event === 'purchase').length;
  
  return pageViews > 0 ? ((purchases / pageViews) * 100).toFixed(2) : 0;
};

// SEO Utilities
export const updatePageMeta = (title, description, keywords = '', image = '') => {
  if (typeof document !== 'undefined') {
    // Actualizar título
    document.title = title;
    
    // Actualizar meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
    
    // Actualizar keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;
    
    // Actualizar Open Graph
    updateOpenGraph(title, description, image);
    
    // Actualizar Twitter Card
    updateTwitterCard(title, description, image);
  }
};

const updateOpenGraph = (title, description, image) => {
  const ogTags = {
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': window.location.href,
    'og:type': 'website'
  };
  
  Object.entries(ogTags).forEach(([property, content]) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  });
};

const updateTwitterCard = (title, description, image) => {
  const twitterTags = {
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image
  };
  
  Object.entries(twitterTags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  });
};

// Structured Data (JSON-LD)
export const addStructuredData = (data) => {
  if (typeof document !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }
};

// Structured Data para productos
export const addProductStructuredData = (product) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "150"
    }
  };
  
  addStructuredData(structuredData);
};

// Structured Data para organización
export const addOrganizationStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sneaky Sneakers",
    "url": "https://sneakysneakers.com",
    "logo": "https://sneakysneakers.com/logo.png",
    "description": "Tu tienda de confianza para las mejores zapatillas deportivas",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Sneaker Street",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "info@sneakysneakers.com"
    }
  };
  
  addStructuredData(structuredData);
};

// Performance tracking
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
        
        trackEvent('performance', {
          load_time: loadTime,
          dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          first_paint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
          first_contentful_paint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
        });
      }, 0);
    });
  }
};

// Error tracking
export const trackError = (error, errorInfo = {}) => {
  trackEvent('error', {
    error_message: error.message,
    error_stack: error.stack,
    error_info: errorInfo,
    url: window.location.href
  });
};

// User behavior tracking
export const trackUserBehavior = () => {
  let sessionStart = Date.now();
  let lastActivity = Date.now();
  
  const trackActivity = () => {
    lastActivity = Date.now();
  };
  
  const events = ['click', 'scroll', 'mousemove', 'keypress'];
  events.forEach(event => {
    document.addEventListener(event, trackActivity, { passive: true });
  });
  
  // Track session duration when user leaves
  window.addEventListener('beforeunload', () => {
    const sessionDuration = Date.now() - sessionStart;
    const idleTime = Date.now() - lastActivity;
    
    trackEvent('session_end', {
      session_duration: sessionDuration,
      idle_time: idleTime,
      page_views: getAnalyticsData().pageViews
    });
  });
}; 