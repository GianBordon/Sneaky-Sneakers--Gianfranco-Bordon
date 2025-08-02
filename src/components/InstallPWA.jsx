import React, { useState, useEffect } from 'react';
import { usePWA } from '../hooks/usePWA';

const InstallPWA = ({ 
  showBanner = true, 
  showButton = true, 
  className = "",
  onInstall,
  onDismiss 
}) => {
  const { 
    isInstalled, 
    isInstallable, 
    canInstall, 
    installApp,
    updateAvailable,
    updateApp,
    isOnline 
  } = usePWA();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // Verificar si debe mostrar el banner
  useEffect(() => {
    const shouldShow = showBanner && 
                      !isInstalled && 
                      (isInstallable || canInstall) && 
                      !isDismissed &&
                      isOnline;
    
    setIsVisible(shouldShow);
  }, [showBanner, isInstalled, isInstallable, canInstall, isDismissed, isOnline]);

  // Verificar si fue descartado anteriormente
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await installApp();
      if (success) {
        setIsVisible(false);
        onInstall?.();
      }
    } catch (error) {
      console.error('Error instalando PWA:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('pwa-install-dismissed', 'true');
    onDismiss?.();
  };

  const handleUpdate = () => {
    updateApp();
  };

  // Si no hay nada que mostrar, no renderizar nada
  if (!isVisible && !updateAvailable) {
    return null;
  }

  return (
    <>
      {/* Banner de instalación */}
      {isVisible && (
        <div className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-xl border border-neutral-200 z-50 ${className}`}>
          <div className="p-4">
            <div className="flex items-start space-x-3">
              {/* Icono */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-neutral-800">
                  Instalar Sneaky Sneakers
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Accede rápidamente desde tu pantalla de inicio y disfruta de una experiencia offline
                </p>
              </div>

              {/* Botón cerrar */}
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Botones de acción */}
            <div className="flex space-x-2 mt-3">
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="flex-1 bg-cyan-600 text-white text-xs font-medium py-2 px-3 rounded-md hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInstalling ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Instalando...</span>
                  </div>
                ) : (
                  'Instalar'
                )}
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-2 text-xs text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                Más tarde
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner de actualización */}
      {updateAvailable && (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-blue-50 border border-blue-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-start space-x-3">
              {/* Icono */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-blue-800">
                  Nueva versión disponible
                </h3>
                <p className="text-xs text-blue-600 mt-1">
                  Una nueva versión de Sneaky Sneakers está lista para instalar
                </p>
              </div>

              {/* Botón cerrar */}
              <button
                onClick={() => setUpdateAvailable(false)}
                className="flex-shrink-0 text-blue-400 hover:text-blue-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Botón de actualización */}
            <div className="mt-3">
              <button
                onClick={handleUpdate}
                className="w-full bg-blue-600 text-white text-xs font-medium py-2 px-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Actualizar ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante de instalación (opcional) */}
      {showButton && isInstallable && !isInstalled && !isVisible && (
        <button
          onClick={handleInstall}
          className="fixed bottom-4 right-4 w-12 h-12 bg-cyan-600 text-white rounded-full shadow-lg hover:bg-cyan-700 transition-colors z-40 flex items-center justify-center"
          title="Instalar app"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </button>
      )}
    </>
  );
};

export default InstallPWA; 