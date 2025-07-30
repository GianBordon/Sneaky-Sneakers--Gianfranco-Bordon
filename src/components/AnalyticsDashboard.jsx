import React, { useState, useEffect } from 'react';
import { getAnalyticsData } from '../utils/analytics';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = () => {
      const data = getAnalyticsData();
      setAnalytics(data);
      setIsLoading(false);
    };

    loadAnalytics();
    
    // Actualizar cada 30 segundos
    const interval = setInterval(loadAnalytics, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-500 text-center">No hay datos de analytics disponibles</p>
      </div>
    );
  }

  const StatCard = ({ title, value, subtitle, color = 'blue' }) => (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4`}>
      <h3 className={`text-${color}-800 font-semibold text-sm`}>{title}</h3>
      <p className={`text-${color}-900 text-2xl font-bold`}>{value}</p>
      {subtitle && <p className={`text-${color}-600 text-xs mt-1`}>{subtitle}</p>}
    </div>
  );

  const ProgressBar = ({ value, max, label, color = 'blue' }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-800 font-medium">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`bg-${color}-600 h-2 rounded-full transition-all duration-300`}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard de Analytics</h2>
      
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Páginas Vistas" 
          value={analytics.pageViews} 
          subtitle="Total de visitas"
          color="blue"
        />
        <StatCard 
          title="Productos Vistos" 
          value={analytics.productViews} 
          subtitle="Visualizaciones de productos"
          color="green"
        />
        <StatCard 
          title="Agregados al Carrito" 
          value={analytics.addToCart} 
          subtitle="Productos en carrito"
          color="yellow"
        />
        <StatCard 
          title="Compras" 
          value={analytics.purchases} 
          subtitle="Transacciones completadas"
          color="purple"
        />
      </div>

      {/* Tasa de conversión */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasa de Conversión</h3>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-800">{analytics.conversionRate}%</p>
              <p className="text-green-600 text-sm">Tasa de conversión</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {analytics.purchases} compras / {analytics.pageViews} vistas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Productos más vistos */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Productos Más Vistos</h3>
        <div className="space-y-3">
          {analytics.topProducts.slice(0, 5).map((product, index) => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-gray-500 text-sm w-6">#{index + 1}</span>
                <span className="text-gray-800 font-medium">Producto {product.id}</span>
              </div>
              <span className="text-blue-600 font-semibold">{product.views} vistas</span>
            </div>
          ))}
        </div>
      </div>

      {/* Páginas más visitadas */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Páginas Más Visitadas</h3>
        <div className="space-y-3">
          {analytics.topPages.slice(0, 5).map((page, index) => (
            <div key={page.page} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-gray-500 text-sm w-6">#{index + 1}</span>
                <span className="text-gray-800 font-medium">{page.page}</span>
              </div>
              <span className="text-green-600 font-semibold">{page.views} vistas</span>
            </div>
          ))}
        </div>
      </div>

      {/* Búsquedas más populares */}
      {analytics.topSearches.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Búsquedas Más Populares</h3>
          <div className="space-y-3">
            {analytics.topSearches.slice(0, 5).map((search, index) => (
              <div key={search.term} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm w-6">#{index + 1}</span>
                  <span className="text-gray-800 font-medium">"{search.term}"</span>
                </div>
                <span className="text-purple-600 font-semibold">{search.searches} búsquedas</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actividad reciente */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Actividad Reciente</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Reviews:</span>
              <span className="text-gray-800 font-medium">{analytics.reviews}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Búsquedas:</span>
              <span className="text-gray-800 font-medium">{analytics.searches}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Eventos totales:</span>
              <span className="text-gray-800 font-medium">{analytics.totalEvents}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botón para exportar datos */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => {
            const dataStr = JSON.stringify(analytics, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'analytics-data.json';
            link.click();
            URL.revokeObjectURL(url);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Exportar Datos
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 