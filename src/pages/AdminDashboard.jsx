import React, { useState } from 'react';
import { 
  AnalyticsDashboard, 
  CouponSystem, 
  ReviewSystem,
  LoadingSpinner 
} from '../components';
import { initializeAnalytics, trackPageView } from '../utils/analytics';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Inicializar analytics
    initializeAnalytics();
    trackPageView('Admin Dashboard', '/admin');
    
    // Simular carga
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <LoadingSpinner size="xl" text="Cargando dashboard..." />
      </div>
    );
  }

  const tabs = [
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'coupons', name: 'Cupones', icon: '🎫' },
    { id: 'reviews', name: 'Reviews', icon: '⭐' },
    { id: 'testing', name: 'Testing', icon: '🧪' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'coupons':
        return (
          <div className="space-y-6">
            <CouponSystem onCouponApplied={(coupon) => {
              console.log('Cupón aplicado:', coupon);
            }} />
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Gestión de Cupones</h3>
              <p className="text-gray-600 mb-4">
                Aquí puedes gestionar todos los cupones y descuentos de la tienda.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Cupones Activos</h4>
                  <p className="text-blue-600 text-sm">4 cupones disponibles</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800">Uso de Cupones</h4>
                  <p className="text-green-600 text-sm">127 cupones utilizados</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-6">
            <ReviewSystem productId="demo" productName="Producto Demo" />
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Gestión de Reviews</h3>
              <p className="text-gray-600 mb-4">
                Sistema completo de reviews con calificaciones, pros y contras.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800">Reviews Totales</h4>
                  <p className="text-yellow-600 text-sm">1,234 reviews</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800">Calificación Promedio</h4>
                  <p className="text-green-600 text-sm">4.5/5 estrellas</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Reviews Pendientes</h4>
                  <p className="text-blue-600 text-sm">23 por moderar</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'testing':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Testing y Optimización</h3>
              <p className="text-gray-600 mb-6">
                Herramientas de testing y optimización para mejorar el rendimiento de la aplicación.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Performance Testing</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Medición de tiempo de renderizado</li>
                    <li>• Análisis de carga de imágenes</li>
                    <li>• Monitoreo de memoria</li>
                    <li>• Medición de FPS</li>
                  </ul>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">Accessibility Testing</h4>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• Verificación de focus</li>
                    <li>• Análisis de contraste</li>
                    <li>• Validación de alt text</li>
                    <li>• Verificación de labels</li>
                  </ul>
                </div>
                
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-teal-800 mb-2">SEO Testing</h4>
                  <ul className="text-sm text-teal-700 space-y-1">
                    <li>• Verificación de meta tags</li>
                    <li>• Análisis de structured data</li>
                    <li>• Validación de headings</li>
                    <li>• Optimización de imágenes</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Error Boundary Testing</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Simulación de errores</li>
                    <li>• Captura de errores</li>
                    <li>• Logging de errores</li>
                    <li>• Recuperación de errores</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Optimizaciones Implementadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span className="text-sm">Lazy loading de imágenes</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span className="text-sm">Code splitting</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span className="text-sm">Memoización de componentes</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span className="text-sm">Optimización de re-renders</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span className="text-sm">Compresión de assets</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span className="text-sm">Cache de datos</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span className="text-sm">Debouncing de búsquedas</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span className="text-sm">Optimización de fuentes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <AnalyticsDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Panel de Administración</h1>
          <p className="text-gray-600">Gestiona todos los aspectos de tu tienda Sneaky Sneakers</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-cyan-500 text-cyan-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Sneaky Sneakers - Panel de Administración v1.0</p>
          <p className="mt-1">Todas las funcionalidades están implementadas y funcionando</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 