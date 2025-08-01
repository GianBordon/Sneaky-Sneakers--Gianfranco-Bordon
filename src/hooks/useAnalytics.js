import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  trackEvent, 
  trackPageView, 
  trackProductView, 
  trackAddToCart, 
  trackPurchase, 
  trackSearch, 
  trackReview,
  getAnalyticsData 
} from '../utils/analytics';

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionData, setSessionData] = useState({
    startTime: Date.now(),
    pageViews: 0,
    interactions: 0,
    lastActivity: Date.now()
  });
  const sessionRef = useRef(null);

  // Inicializar sesión de analytics
  useEffect(() => {
    sessionRef.current = {
      id: generateSessionId(),
      startTime: Date.now(),
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    // Track session start
    trackEvent('session_start', {
      session_id: sessionRef.current.id,
      user_agent: sessionRef.current.userAgent,
      screen_resolution: sessionRef.current.screenResolution,
      language: sessionRef.current.language,
      timezone: sessionRef.current.timezone
    });

    // Track page view on mount
    trackPageView(document.title, window.location.pathname);

    // Cleanup on unmount
    return () => {
      if (sessionRef.current) {
        const sessionDuration = Date.now() - sessionRef.current.startTime;
        trackEvent('session_end', {
          session_id: sessionRef.current.id,
          duration: sessionDuration,
          page_views: sessionData.pageViews,
          interactions: sessionData.interactions
        });
      }
    };
  }, []);

  // Función para generar ID de sesión único
  const generateSessionId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Función para cargar datos de analytics
  const loadAnalyticsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = getAnalyticsData();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Función para trackear vista de página
  const trackPageViewEvent = useCallback((title, path) => {
    trackPageView(title, path);
    setSessionData(prev => ({
      ...prev,
      pageViews: prev.pageViews + 1,
      lastActivity: Date.now()
    }));
  }, []);

  // Función para trackear vista de producto
  const trackProductViewEvent = useCallback((product) => {
    trackProductView(product);
    setSessionData(prev => ({
      ...prev,
      interactions: prev.interactions + 1,
      lastActivity: Date.now()
    }));
  }, []);

  // Función para trackear agregar al carrito
  const trackAddToCartEvent = useCallback((product, quantity = 1) => {
    trackAddToCart(product, quantity);
    setSessionData(prev => ({
      ...prev,
      interactions: prev.interactions + 1,
      lastActivity: Date.now()
    }));
  }, []);

  // Función para trackear compra
  const trackPurchaseEvent = useCallback((order) => {
    trackPurchase(order);
    setSessionData(prev => ({
      ...prev,
      interactions: prev.interactions + 1,
      lastActivity: Date.now()
    }));
  }, []);

  // Función para trackear búsqueda
  const trackSearchEvent = useCallback((searchTerm, resultsCount) => {
    trackSearch(searchTerm, resultsCount);
    setSessionData(prev => ({
      ...prev,
      interactions: prev.interactions + 1,
      lastActivity: Date.now()
    }));
  }, []);

  // Función para trackear review
  const trackReviewEvent = useCallback((productId, rating) => {
    trackReview(productId, rating);
    setSessionData(prev => ({
      ...prev,
      interactions: prev.interactions + 1,
      lastActivity: Date.now()
    }));
  }, []);

  // Función para trackear evento personalizado
  const trackCustomEvent = useCallback((eventName, parameters = {}) => {
    trackEvent(eventName, {
      ...parameters,
      session_id: sessionRef.current?.id,
      timestamp: new Date().toISOString()
    });
    setSessionData(prev => ({
      ...prev,
      interactions: prev.interactions + 1,
      lastActivity: Date.now()
    }));
  }, []);

  // Función para trackear comportamiento del usuario
  const trackUserBehavior = useCallback((action, details = {}) => {
    trackCustomEvent('user_behavior', {
      action,
      details,
      session_id: sessionRef.current?.id,
      page_url: window.location.href,
      user_agent: navigator.userAgent
    });
  }, [trackCustomEvent]);

  // Función para trackear errores
  const trackErrorEvent = useCallback((error, context = {}) => {
    trackCustomEvent('error', {
      error_message: error.message,
      error_stack: error.stack,
      context,
      session_id: sessionRef.current?.id
    });
  }, [trackCustomEvent]);

  // Función para trackear performance
  const trackPerformanceEvent = useCallback((metrics) => {
    trackCustomEvent('performance', {
      ...metrics,
      session_id: sessionRef.current?.id
    });
  }, [trackCustomEvent]);

  // Función para obtener estadísticas de sesión
  const getSessionStats = useCallback(() => {
    if (!sessionRef.current) return null;

    const currentTime = Date.now();
    const sessionDuration = currentTime - sessionRef.current.startTime;
    const idleTime = currentTime - sessionData.lastActivity;

    return {
      sessionId: sessionRef.current.id,
      duration: sessionDuration,
      pageViews: sessionData.pageViews,
      interactions: sessionData.interactions,
      idleTime,
      isActive: idleTime < 300000 // 5 minutos
    };
  }, [sessionData]);

  // Función para obtener datos de analytics en tiempo real
  const getRealTimeAnalytics = useCallback(() => {
    if (!analyticsData) return null;

    const currentTime = Date.now();
    const last24Hours = currentTime - (24 * 60 * 60 * 1000);

    // Filtrar eventos de las últimas 24 horas
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const recentEvents = events.filter(event => 
      new Date(event.timestamp).getTime() > last24Hours
    );

    return {
      ...analyticsData,
      realTime: {
        activeUsers: recentEvents.length > 0 ? Math.ceil(recentEvents.length / 10) : 0,
        eventsLastHour: recentEvents.filter(event => 
          new Date(event.timestamp).getTime() > currentTime - (60 * 60 * 1000)
        ).length,
        topEvents: getTopEvents(recentEvents, 5)
      }
    };
  }, [analyticsData]);

  // Función auxiliar para obtener eventos más populares
  const getTopEvents = (events, limit = 5) => {
    const eventCount = {};
    events.forEach(event => {
      eventCount[event.event] = (eventCount[event.event] || 0) + 1;
    });

    return Object.entries(eventCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([event, count]) => ({ event, count }));
  };

  // Función para exportar datos de analytics
  const exportAnalyticsData = useCallback((format = 'json') => {
    const data = {
      analytics: analyticsData,
      session: getSessionStats(),
      realTime: getRealTimeAnalytics(),
      exportDate: new Date().toISOString()
    };

    if (format === 'json') {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      // Implementar exportación CSV si es necesario
      console.log('CSV export not implemented yet');
    }
  }, [analyticsData, getSessionStats, getRealTimeAnalytics]);

  // Función para limpiar datos de analytics
  const clearAnalyticsData = useCallback(() => {
    localStorage.removeItem('analytics_events');
    setAnalyticsData(null);
  }, []);

  return {
    // Estado
    analyticsData,
    isLoading,
    sessionData: getSessionStats(),
    realTimeData: getRealTimeAnalytics(),

    // Acciones de tracking
    trackPageView: trackPageViewEvent,
    trackProductView: trackProductViewEvent,
    trackAddToCart: trackAddToCartEvent,
    trackPurchase: trackPurchaseEvent,
    trackSearch: trackSearchEvent,
    trackReview: trackReviewEvent,
    trackCustomEvent,
    trackUserBehavior,
    trackError: trackErrorEvent,
    trackPerformance: trackPerformanceEvent,

    // Utilidades
    loadAnalyticsData,
    exportAnalyticsData,
    clearAnalyticsData,
    getSessionStats,
    getRealTimeAnalytics
  };
}; 