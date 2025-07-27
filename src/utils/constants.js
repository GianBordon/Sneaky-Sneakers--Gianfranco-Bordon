// Constantes del proyecto

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  MEN: '/men',
  WOMEN: '/women',
  KIDS: '/kids',
  NEW_ARRIVALS: '/new-arrivals',
  SALE: '/sale',
  ALL_PRODUCTS: '/all-products',
  ABOUT_US: '/about-us',
  PAYMENT_METHODS: '/payment-methods',
  FAQ: '/faq',
  SHIPPING_POLICY: '/shipping-policy',
  EXCHANGE_POLICY: '/exchange-policy',
  LOGIN: '/login',
  CART: '/cart',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  ORDERS: '/orders',
  WISHLIST: '/wishlist'
};

// Rutas de jugadores
export const PLAYER_ROUTES = {
  LEBRON_JAMES: '/lebron-james',
  KEVIN_DURANT: '/kevin-durant',
  GIANNIS_ANTETOKOUNMPO: '/giannis-antetokounmpo',
  PAUL_GEORGE: '/paul-george',
  JAMES_HARDEN: '/james-harden'
};

// Categorías de productos
export const PRODUCT_CATEGORIES = {
  MEN: 'men',
  WOMEN: 'women',
  KIDS: 'kids'
};

// Marcas
export const BRANDS = {
  NIKE: 'Nike',
  ADIDAS: 'Adidas',
  JORDAN: 'Jordan',
  NIKE_SB: 'Nike SB'
};

// Estados de pedidos
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Roles de usuario
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50
};

// Configuración de carrusel
export const CAROUSEL_CONFIG = {
  DEFAULT_INTERVAL: 4000,
  MIN_INTERVAL: 2000,
  MAX_INTERVAL: 8000
};

// Configuración de filtros
export const FILTER_CONFIG = {
  PRICE_RANGES: [
    { label: 'Menos de $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $150', min: 100, max: 150 },
    { label: '$150 - $200', min: 150, max: 200 },
    { label: 'Más de $200', min: 200, max: Infinity }
  ],
  SIZES: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  COLORS: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Grey']
};

// Configuración de validación
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-()]+$/
};

// Configuración de localStorage
export const STORAGE_KEYS = {
  CART: 'sneaky_sneakers_cart',
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  WISHLIST: 'sneaky_sneakers_wishlist',
  RECENT_VIEWED: 'sneaky_sneakers_recent_viewed'
};

// Configuración de API
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

// Configuración de notificaciones
export const NOTIFICATION_CONFIG = {
  AUTO_HIDE_DURATION: 5000,
  POSITION: 'top-right'
};

// Configuración de imágenes
export const IMAGE_CONFIG = {
  THUMBNAIL_SIZE: 300,
  PRODUCT_SIZE: 600,
  BANNER_SIZE: 1200,
  SUPPORTED_FORMATS: ['jpg', 'jpeg', 'png', 'webp']
};

// Configuración de SEO
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Sneaky Sneakers - Las mejores zapatillas deportivas',
  DEFAULT_DESCRIPTION: 'Encuentra las mejores zapatillas deportivas de las marcas más reconocidas como Nike, Adidas, Jordan y más.',
  DEFAULT_KEYWORDS: 'zapatillas, sneakers, deportivas, nike, adidas, jordan, basketball, running'
}; 