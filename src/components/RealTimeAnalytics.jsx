import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

const RealTimeAnalytics = () => {
  const { realTimeData, sessionData, loadAnalyticsData } = useAnalytics();
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    loadAnalyticsData();
    
    // Actualizar cada 30 segundos
    const interval = setInterval(() => {
      loadAnalyticsData();
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [loadAnalyticsData]);

  if (!realTimeData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDuration = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-neutral-200">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-neutral-800">
              Analytics en Tiempo Real
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-neutral-500">
              Última actualización: {formatTime(lastUpdate)}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-neutral-600 hover:text-neutral-800 transition-colors"
            >
              <svg 
                className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-4">
        {/* Métricas principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {realTimeData.realTime?.activeUsers || 0}
            </div>
            <div className="text-sm text-neutral-600">Usuarios activos</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {realTimeData.realTime?.eventsLastHour || 0}
            </div>
            <div className="text-sm text-neutral-600">Eventos (última hora)</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {realTimeData.pageViews || 0}
            </div>
            <div className="text-sm text-neutral-600">Páginas vistas</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {realTimeData.addToCart || 0}
            </div>
            <div className="text-sm text-neutral-600">Agregados al carrito</div>
          </div>
        </div>

        {/* Información de sesión actual */}
        {sessionData && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">Sesión Actual</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-600 font-medium">Duración:</span>
                <div className="text-blue-800">{formatDuration(sessionData.duration)}</div>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Páginas vistas:</span>
                <div className="text-blue-800">{sessionData.pageViews}</div>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Interacciones:</span>
                <div className="text-blue-800">{sessionData.interactions}</div>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Estado:</span>
                <div className={`font-medium ${sessionData.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {sessionData.isActive ? 'Activo' : 'Inactivo'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contenido expandible */}
        {isExpanded && (
          <div className="space-y-6">
            {/* Eventos más populares */}
            {realTimeData.realTime?.topEvents && realTimeData.realTime.topEvents.length > 0 && (
              <div>
                <h4 className="font-semibold text-neutral-800 mb-3">Eventos Más Populares (24h)</h4>
                <div className="space-y-2">
                  {realTimeData.realTime.topEvents.map((event, index) => (
                    <div key={event.event} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-neutral-500 text-sm">#{index + 1}</span>
                        <span className="font-medium text-neutral-800 capitalize">
                          {event.event.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <span className="text-blue-600 font-semibold">{event.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Productos más vistos */}
            {realTimeData.topProducts && realTimeData.topProducts.length > 0 && (
              <div>
                <h4 className="font-semibold text-neutral-800 mb-3">Productos Más Vistos</h4>
                <div className="space-y-2">
                  {realTimeData.topProducts.slice(0, 5).map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-neutral-500 text-sm">#{index + 1}</span>
                        <span className="font-medium text-neutral-800">Producto {product.id}</span>
                      </div>
                      <span className="text-green-600 font-semibold">{product.views} vistas</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Búsquedas más populares */}
            {realTimeData.topSearches && realTimeData.topSearches.length > 0 && (
              <div>
                <h4 className="font-semibold text-neutral-800 mb-3">Búsquedas Más Populares</h4>
                <div className="space-y-2">
                  {realTimeData.topSearches.slice(0, 5).map((search, index) => (
                    <div key={search.term} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-neutral-500 text-sm">#{index + 1}</span>
                        <span className="font-medium text-neutral-800">"{search.term}"</span>
                      </div>
                      <span className="text-purple-600 font-semibold">{search.searches} búsquedas</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Métricas de conversión */}
            <div>
              <h4 className="font-semibold text-neutral-800 mb-3">Métricas de Conversión</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">{realTimeData.conversionRate}%</div>
                  <div className="text-sm text-green-600">Tasa de conversión</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-800">{realTimeData.purchases || 0}</div>
                  <div className="text-sm text-blue-600">Compras completadas</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeAnalytics; 