import { useState, useEffect, useCallback } from 'react';

export const usePWA = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  // Detectar si la app está instalada
  useEffect(() => {
    const checkInstallation = () => {
      // Verificar si está en modo standalone (instalada)
      const standalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone === true;
      setIsStandalone(standalone);
      setIsInstalled(standalone);
    };

    checkInstallation();
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    });
  }, []);

  // Detectar estado de conexión
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Registrar Service Worker
  useEffect(() => {
    const registerSW = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.register('/sw.js');
          setRegistration(reg);
          console.log('✅ Service Worker registrado:', reg);

          // Verificar actualizaciones
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          });

        } catch (error) {
          console.error('❌ Error registrando Service Worker:', error);
        }
      }
    };

    registerSW();
  }, []);

  // Capturar evento de instalación
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Función para instalar la app
  const installApp = useCallback(async () => {
    if (!deferredPrompt) {
      console.log('No hay prompt de instalación disponible');
      return false;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ Usuario aceptó instalar la app');
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      } else {
        console.log('❌ Usuario rechazó instalar la app');
        return false;
      }
    } catch (error) {
      console.error('Error durante la instalación:', error);
      return false;
    }
  }, [deferredPrompt]);

  // Función para actualizar la app
  const updateApp = useCallback(() => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }, [registration]);

  // Función para solicitar permisos de notificación
  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.log('Este navegador no soporta notificaciones');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      console.log('Permisos de notificación denegados');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Error solicitando permisos:', error);
      return false;
    }
  }, []);

  // Función para enviar notificación
  const sendNotification = useCallback(async (title, options = {}) => {
    if (Notification.permission !== 'granted') {
      const granted = await requestNotificationPermission();
      if (!granted) return false;
    }

    try {
      const notification = new Notification(title, {
        icon: '/logo192.png',
        badge: '/logo192.png',
        vibrate: [100, 50, 100],
        ...options
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return true;
    } catch (error) {
      console.error('Error enviando notificación:', error);
      return false;
    }
  }, [requestNotificationPermission]);

  // Función para sincronizar datos en segundo plano
  const syncData = useCallback(async (tag = 'sync-data') => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        await registration.sync.register(tag);
        console.log('🔄 Sincronización registrada:', tag);
        return true;
      } catch (error) {
        console.error('Error registrando sincronización:', error);
        return false;
      }
    }
    return false;
  }, [registration]);

  // Función para cachear recursos
  const cacheResource = useCallback(async (url, cacheName = 'sneaky-dynamic-v1.0.0') => {
    if ('caches' in window) {
      try {
        const cache = await caches.open(cacheName);
        const response = await fetch(url);
        if (response.ok) {
          await cache.put(url, response.clone());
          console.log('📦 Recurso cacheado:', url);
          return true;
        }
      } catch (error) {
        console.error('Error cacheando recurso:', error);
      }
    }
    return false;
  }, []);

  // Función para obtener información del cache
  const getCacheInfo = useCallback(async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        const cacheInfo = {};

        for (const name of cacheNames) {
          const cache = await caches.open(name);
          const keys = await cache.keys();
          cacheInfo[name] = keys.length;
        }

        return cacheInfo;
      } catch (error) {
        console.error('Error obteniendo info del cache:', error);
        return {};
      }
    }
    return {};
  }, []);

  // Función para limpiar cache
  const clearCache = useCallback(async (cacheName) => {
    if ('caches' in window) {
      try {
        if (cacheName) {
          await caches.delete(cacheName);
          console.log('🗑️ Cache eliminado:', cacheName);
        } else {
          const cacheNames = await caches.keys();
          await Promise.all(cacheNames.map(name => caches.delete(name)));
          console.log('🗑️ Todos los caches eliminados');
        }
        return true;
      } catch (error) {
        console.error('Error limpiando cache:', error);
        return false;
      }
    }
    return false;
  }, []);

  // Función para verificar si un recurso está cacheado
  const isCached = useCallback(async (url) => {
    if ('caches' in window) {
      try {
        const response = await caches.match(url);
        return !!response;
      } catch (error) {
        console.error('Error verificando cache:', error);
        return false;
      }
    }
    return false;
  }, []);

  return {
    // Estado
    isInstalled,
    isInstallable,
    isOnline,
    isStandalone,
    updateAvailable,
    registration,

    // Acciones
    installApp,
    updateApp,
    requestNotificationPermission,
    sendNotification,
    syncData,
    cacheResource,
    getCacheInfo,
    clearCache,
    isCached,

    // Utilidades
    canInstall: !!deferredPrompt,
    canUpdate: updateAvailable,
    isPWA: isStandalone || isInstalled
  };
}; 