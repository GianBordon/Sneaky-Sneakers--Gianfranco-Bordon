// Service Worker para Sneaky Sneakers PWA
const CACHE_NAME = 'sneaky-sneakers-v1.0.0';
const STATIC_CACHE = 'sneaky-static-v1.0.0';
const DYNAMIC_CACHE = 'sneaky-dynamic-v1.0.0';
const API_CACHE = 'sneaky-api-v1.0.0';

// Archivos estáticos para cache inmediato
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo192.svg',
  '/logo512.svg'
];

// Rutas de la API para cache
const API_ROUTES = [
  '/api/products',
  '/api/categories',
  '/api/brands',
  '/api/players'
];

// Estrategias de cache
const CACHE_STRATEGIES = {
  STATIC: 'cache-first',
  DYNAMIC: 'network-first',
  API: 'stale-while-revalidate',
  IMAGES: 'cache-first'
};

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker instalando...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Cacheando archivos estáticos...');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker instalado correctamente');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Error instalando Service Worker:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Limpiar caches antiguos
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE) {
              console.log('🗑️ Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activado');
        return self.clients.claim();
      })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorar requests no GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar schemes no soportados (chrome-extension, data:, etc.)
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Estrategia para archivos estáticos
  if (isStaticFile(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Estrategia para imágenes
  if (isImage(url.pathname)) {
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Estrategia para API
  if (isApiRequest(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, API_CACHE));
    return;
  }

  // Estrategia para páginas dinámicas
  if (isPageRequest(url.pathname)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Estrategia por defecto: network first
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// Estrategia: Cache First
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Error en cache first:', error);
    return new Response('Error de conexión', { status: 503 });
  }
}

// Estrategia: Network First
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('🌐 Red no disponible, usando cache...');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback para páginas
    if (isPageRequest(request.url)) {
      return caches.match('/index.html');
    }
    
    return new Response('Contenido no disponible offline', { status: 503 });
  }
}

// Estrategia: Stale While Revalidate
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Si falla la red, no actualizamos el cache
    return null;
  });

  return cachedResponse || fetchPromise;
}

// Funciones de utilidad
function isStaticFile(pathname) {
  return STATIC_FILES.includes(pathname) || 
         pathname.startsWith('/static/') ||
         pathname.includes('.css') ||
         pathname.includes('.js') ||
         pathname.includes('.woff') ||
         pathname.includes('.woff2');
}

function isImage(pathname) {
  return pathname.includes('.jpg') ||
         pathname.includes('.jpeg') ||
         pathname.includes('.png') ||
         pathname.includes('.webp') ||
         pathname.includes('.svg') ||
         pathname.includes('.gif');
}

function isApiRequest(pathname) {
  return API_ROUTES.some(route => pathname.startsWith(route)) ||
         pathname.includes('/api/') ||
         pathname.includes('supabase.co');
}

function isPageRequest(pathname) {
  return !pathname.includes('.') || 
         pathname.endsWith('.html') ||
         pathname === '/' ||
         pathname.startsWith('/product/') ||
         pathname.startsWith('/category/');
}

// Background Sync para datos offline
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync:', event.tag);
  
  if (event.tag === 'sync-cart') {
    event.waitUntil(syncCartData());
  }
  
  if (event.tag === 'sync-wishlist') {
    event.waitUntil(syncWishlistData());
  }
});

// Sincronizar datos del carrito
async function syncCartData() {
  try {
    const cartData = await getIndexedDBData('cart');
    if (cartData && cartData.length > 0) {
      // Aquí se enviarían los datos al servidor
      console.log('🛒 Sincronizando carrito:', cartData);
    }
  } catch (error) {
    console.error('Error sincronizando carrito:', error);
  }
}

// Sincronizar wishlist
async function syncWishlistData() {
  try {
    const wishlistData = await getIndexedDBData('wishlist');
    if (wishlistData && wishlistData.length > 0) {
      console.log('❤️ Sincronizando wishlist:', wishlistData);
    }
  } catch (error) {
    console.error('Error sincronizando wishlist:', error);
  }
}

// Obtener datos de IndexedDB
async function getIndexedDBData(storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SneakySneakersDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const getRequest = store.getAll();
      
      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = () => reject(getRequest.error);
    };
  });
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('📱 Push notification recibida');
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación de Sneaky Sneakers',
    icon: '/logo192.svg',
    badge: '/logo192.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver ofertas',
        icon: '/logo192.svg'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/logo192.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Sneaky Sneakers', options)
  );
});

// Click en notificación
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Notificación clickeada:', event.action);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/all-products')
    );
  } else if (event.action === 'close') {
    // Solo cerrar la notificación
  } else {
    // Click en el cuerpo de la notificación
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Mensajes del cliente
self.addEventListener('message', (event) => {
  console.log('💬 Mensaje recibido:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('🎯 Service Worker cargado para Sneaky Sneakers PWA'); 