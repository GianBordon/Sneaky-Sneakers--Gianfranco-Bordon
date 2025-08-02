import React, { useState, useEffect } from 'react';
import { usePWA } from '../hooks/usePWA';

const OfflineIndicator = ({ 
  showBanner = true, 
  showIcon = true, 
  className = "",
  onOnline,
  onOffline 
}) => {
  const { isOnline, isPWA } = usePWA();
  const [wasOffline, setWasOffline] = useState(false);
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);

  useEffect(() => {
    if (!isOnline && !wasOffline) {
      setWasOffline(true);
      setShowOfflineBanner(true);
      onOffline?.();
    } else if (isOnline && wasOffline) {
      setWasOffline(false);
      setShowOfflineBanner(false);
      onOnline?.();
    }
  }, [isOnline, wasOffline, onOnline, onOffline]);

  // Ocultar banner offline después de 5 segundos
  useEffect(() => {
    if (showOfflineBanner && isOnline) {
      const timer = setTimeout(() => {
        setShowOfflineBanner(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showOfflineBanner, isOnline]);

  if (!showBanner && !showIcon) {
    return null;
  }

  return (
    <>
      {/* Banner de estado offline */}
      {showBanner && !isOnline && (
        <div className={`fixed top-0 left-0 right-0 bg-yellow-500 text-white px-4 py-2 text-center text-sm font-medium z-50 ${className}`}>
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>Modo offline - Algunas funciones pueden no estar disponibles</span>
          </div>
        </div>
      )}

      {/* Banner de reconexión */}
      {showBanner && showOfflineBanner && isOnline && (
        <div className={`fixed top-0 left-0 right-0 bg-green-500 text-white px-4 py-2 text-center text-sm font-medium z-50 animate-slide-down ${className}`}>
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Conexión restaurada - Sincronizando datos...</span>
          </div>
        </div>
      )}

      {/* Icono de estado en navbar */}
      {showIcon && (
        <div className={`flex items-center space-x-2 ${className}`}>
          {!isOnline && (
            <div className="flex items-center space-x-1 text-yellow-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
              </svg>
              <span className="text-xs font-medium">Offline</span>
            </div>
          )}
          
          {isPWA && (
            <div className="flex items-center space-x-1 text-cyan-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-medium">PWA</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OfflineIndicator; 