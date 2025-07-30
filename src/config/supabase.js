// Cargar dotenv solo si estamos en Node.js (no en navegador)
if (typeof process !== 'undefined' && process?.env && !process.env.VITE_SUPABASE_URL) {
  try {
    const dotenv = await import('dotenv');
    dotenv.config();
  } catch (e) {
    // Ignorar error si dotenv no está disponible
  }
}

// Configuración de Supabase
export const SUPABASE_CONFIG = {
  // Valores desde variables de entorno
  PROJECT_URL: typeof window === 'undefined' 
    ? process.env.VITE_SUPABASE_URL 
    : import.meta.env.VITE_SUPABASE_URL,
  ANON_KEY: typeof window === 'undefined' 
    ? process.env.VITE_SUPABASE_ANON_KEY 
    : import.meta.env.VITE_SUPABASE_ANON_KEY,
  
  // Configuración de tablas
  TABLES: {
    PRODUCTS: "products",
    PLAYERS: "players", 
    USERS: "users",
    ORDERS: "orders",
    WISHLISTS: "wishlists",
    CART: "cart",
    CATEGORIES: "categories",
    BRANDS: "brands"
  },
  
  // Validación de variables de entorno
  get isValid() {
    return this.PROJECT_URL && this.ANON_KEY;
  }
};

// Configuración de autenticación
export const AUTH_CONFIG = {
  // Tipos de autenticación disponibles
  PROVIDERS: {
    EMAIL: "email",
    GOOGLE: "google",
    FACEBOOK: "facebook",
    GITHUB: "github"
  }
};

// Configuración de políticas de seguridad (RLS)
export const SECURITY_POLICIES = {
  // Políticas para productos (lectura pública, escritura solo admin)
  PRODUCTS: {
    READ: true, // Cualquiera puede leer productos
    WRITE: false, // Solo admins pueden escribir
    DELETE: false
  },
  
  // Políticas para usuarios (cada usuario solo puede acceder a sus datos)
  USERS: {
    READ: "auth.uid() = user_id",
    WRITE: "auth.uid() = user_id",
    DELETE: false
  },
  
  // Políticas para carrito (cada usuario solo puede acceder a su carrito)
  CART: {
    READ: "auth.uid() = user_id",
    WRITE: "auth.uid() = user_id",
    DELETE: "auth.uid() = user_id"
  },
  
  // Políticas para wishlist (cada usuario solo puede acceder a su wishlist)
  WISHLISTS: {
    READ: "auth.uid() = user_id",
    WRITE: "auth.uid() = user_id",
    DELETE: "auth.uid() = user_id"
  },
  
  // Políticas para órdenes (cada usuario solo puede acceder a sus órdenes)
  ORDERS: {
    READ: "auth.uid() = user_id",
    WRITE: "auth.uid() = user_id",
    DELETE: false
  }
};

export default SUPABASE_CONFIG; 