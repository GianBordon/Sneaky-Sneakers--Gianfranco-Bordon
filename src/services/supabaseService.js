// Servicio para conectar con Supabase
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const SUPABASE_CONFIG = {
  PROJECT_URL: import.meta.env.VITE_SUPABASE_URL,
  ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  TABLES: {
    PRODUCTS: 'products',
    PLAYERS: 'players',
    USERS: 'users',
    CART: 'cart',
    WISHLIST: 'wishlist'
  },
  get isValid() {
    return this.PROJECT_URL && this.ANON_KEY;
  }
};

class SupabaseService {
  constructor() {
    this.supabase = null;
    this.isInitialized = false;
  }

  async initialize() {
    try {
      if (this.isInitialized) {
        return;
      }
      
      // Validar variables de entorno
      if (!SUPABASE_CONFIG.isValid) {
        throw new Error('Variables de entorno de Supabase no configuradas. Verifica tu archivo .env');
      }
      
      // Crear cliente de Supabase
      this.supabase = createClient(SUPABASE_CONFIG.PROJECT_URL, SUPABASE_CONFIG.ANON_KEY);
      
      // Verificar conexión haciendo una consulta simple
      const { data: _data, error } = await this.supabase
        .from(SUPABASE_CONFIG.TABLES.PRODUCTS)
        .select('*')
        .limit(1);
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = tabla no existe (normal al inicio)
        throw error;
      }
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Error conectando a Supabase:', error);
      throw error;
    }
  }

  // Métodos para productos
  async getProducts(filter = {}) {
    await this.initialize();
    
    let query = this.supabase
      .from(SUPABASE_CONFIG.TABLES.PRODUCTS)
      .select('*');
    
    // Aplicar filtros
    if (filter.category && filter.category !== 'all') {
      query = query.eq('category', filter.category);
    }
    
    if (filter.brand && filter.brand !== 'all') {
      query = query.eq('brand', filter.brand);
    }

    if (filter.limit) {
      query = query.limit(filter.limit);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error obteniendo productos:', error);
      return [];
    }
    
    // Mapear campos de la base de datos al formato esperado por el frontend
    const mappedProducts = (data || []).map(product => ({
      ...product,
      inStock: product.in_stock !== undefined ? product.in_stock : true, // Mapear in_stock a inStock
      originalPrice: product.original_price || product.price, // Mapear original_price a originalPrice
      createdAt: product.created_at,
      updatedAt: product.updated_at
    }));
    
    return mappedProducts;
  }

  async getProductById(id) {
    await this.initialize();
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.TABLES.PRODUCTS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error obteniendo producto:', error);
      return null;
    }
    
    // Mapear campos de la base de datos al formato esperado por el frontend
    return data ? {
      ...data,
      inStock: data.in_stock !== undefined ? data.in_stock : true,
      originalPrice: data.original_price || data.price,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    } : null;
  }

  async getProductsByCategory(category) {
    return this.getProducts({ category });
  }

  async getProductsByBrand(brand) {
    return this.getProducts({ brand });
  }

  async createProduct(productData) {
    await this.initialize();
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.TABLES.PRODUCTS)
      .insert([productData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creando producto:', error);
      throw error;
    }
    
    return data;
  }

  async updateProduct(id, updateData) {
    await this.initialize();
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.TABLES.PRODUCTS)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error actualizando producto:', error);
      throw error;
    }
    
    return data;
  }

  async deleteProduct(id) {
    await this.initialize();
    
    const { error } = await this.supabase
      .from(SUPABASE_CONFIG.TABLES.PRODUCTS)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error eliminando producto:', error);
      throw error;
    }
    
    return true;
  }

  // Métodos para jugadores
  async getPlayers() {
    await this.initialize();
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.TABLES.PLAYERS)
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error obteniendo jugadores:', error);
      return [];
    }
    
    return data || [];
  }

  async getPlayerById(id) {
    await this.initialize();
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.TABLES.PLAYERS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error obteniendo jugador:', error);
      return null;
    }
    
    return data;
  }

  // Métodos de autenticación
  async getCurrentUser() {
    await this.initialize();
    
    const { data: { user }, error } = await this.supabase.auth.getUser();
    
    if (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
    
    return user;
  }

  async signUp(email, password, userData = {}) {
    await this.initialize();
    
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    
    if (error) {
      console.error('Error en registro:', error);
      throw error;
    }
    
    return data;
  }

  async signIn(email, password) {
    await this.initialize();
    
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Error en inicio de sesión:', error);
      throw error;
    }
    
    return data;
  }

  async signOut() {
    await this.initialize();
    
    const { error } = await this.supabase.auth.signOut();
    
    if (error) {
      console.error('Error en cierre de sesión:', error);
      throw error;
    }
    
    return true;
  }

  // Métodos para carrito (simulados por ahora)
  async getCart() {
    // Por ahora retornamos un carrito vacío
    return [];
  }

  async addToCart(productId, quantity = 1) {
    // Por ahora solo simulamos la operación
    return { success: true, productId, quantity };
  }

  async removeFromCart(productId) {
    // Por ahora solo simulamos la operación
    return { success: true, productId };
  }

  // Métodos para wishlist (simulados por ahora)
  async getWishlist() {
    // Por ahora retornamos una wishlist vacía
    return [];
  }

  async addToWishlist(productId) {
    // Por ahora solo simulamos la operación
    return { success: true, productId };
  }

  async removeFromWishlist(productId) {
    // Por ahora solo simulamos la operación
    return { success: true, productId };
  }

  // Métodos de migración de datos
  async migrateProducts(products) {
    await this.initialize();
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.TABLES.PRODUCTS)
      .upsert(products, { onConflict: 'id' })
      .select();
    
    if (error) {
      console.error('Error migrando productos:', error);
      throw error;
    }
    
    return data;
  }

  generateNumericId(originalId) {
    // Convertir string a número para IDs
    if (typeof originalId === 'string') {
      return parseInt(originalId.replace(/\D/g, ''), 10) || Date.now();
    }
    return originalId;
  }

  async migratePlayers(players) {
    await this.initialize();
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.TABLES.PLAYERS)
      .upsert(players, { onConflict: 'id' })
      .select();
    
    if (error) {
      console.error('Error migrando jugadores:', error);
      throw error;
    }
    
    return data;
  }

  async close() {
    if (this.supabase) {
      await this.supabase.auth.signOut();
      this.supabase = null;
      this.isInitialized = false;
    }
  }
}

// Exportar instancia singleton
const supabaseService = new SupabaseService();
export default supabaseService; 