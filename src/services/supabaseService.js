// Servicio para conectar con Supabase
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../config/supabase.js';

// Crear cliente de Supabase
const supabase = createClient(
  SUPABASE_CONFIG.PROJECT_URL,
  SUPABASE_CONFIG.ANON_KEY
);

class SupabaseService {
  constructor() {
    this.supabase = supabase;
    this.isInitialized = false;
  }

  // Inicializar servicio
  async initialize() {
    try {
      if (this.isInitialized) {
        console.log('Supabase ya está inicializado');
        return;
      }
      
      console.log('Inicializando Supabase...');
      console.log('Configuración:', {
        url: SUPABASE_CONFIG.PROJECT_URL,
        hasKey: !!SUPABASE_CONFIG.ANON_KEY
      });
      
      // Validar variables de entorno
      if (!SUPABASE_CONFIG.isValid) {
        throw new Error('Variables de entorno de Supabase no configuradas. Verifica tu archivo .env');
      }
      
      // Verificar conexión haciendo una consulta simple
      const { data, error } = await this.supabase
        .from(SUPABASE_CONFIG.TABLES.PRODUCTS)
        .select('*')
        .limit(1);
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = tabla no existe (normal al inicio)
        console.log('Error en consulta de prueba:', error);
        throw error;
      }
      
      this.isInitialized = true;
      console.log('Supabase conectado exitosamente');
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
    
    console.log('🔍 Datos originales de productos:', data?.slice(0, 2)); // Mostrar primeros 2 productos
    
    // Mapear campos de la base de datos al formato esperado por el frontend
    const mappedProducts = (data || []).map(product => {
      const mapped = {
        ...product,
        inStock: product.in_stock !== undefined ? product.in_stock : true, // Mapear in_stock a inStock
        originalPrice: product.original_price || product.price, // Mapear original_price a originalPrice
        createdAt: product.created_at,
        updatedAt: product.updated_at
      };
      
      console.log(`📦 Producto ${product.name}: in_stock=${product.in_stock}, inStock=${mapped.inStock}`);
      return mapped;
    });
    
    console.log('✅ Productos mapeados:', mappedProducts?.slice(0, 2)); // Mostrar primeros 2 productos mapeados
    
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
      inStock: data.in_stock !== undefined ? data.in_stock : true, // Mapear in_stock a inStock
      originalPrice: data.original_price || data.price, // Mapear original_price a originalPrice
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
      .insert([{
        ...productData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
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
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
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
    try {
      await this.initialize();
      console.log('Supabase inicializado, consultando tabla players...');
      
      const { data, error } = await this.supabase
        .from(SUPABASE_CONFIG.TABLES.PLAYERS)
        .select('*');
      
      if (error) {
        console.error('Error obteniendo jugadores:', error);
        return [];
      }
      
      console.log('Datos de jugadores obtenidos:', data);
      return data || [];
    } catch (error) {
      console.error('Error en getPlayers:', error);
      return [];
    }
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

  // Métodos para usuarios
  async getCurrentUser() {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    
    if (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
    
    return user;
  }

  async signUp(email, password, userData = {}) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    
    if (error) {
      console.error('Error registrando usuario:', error);
      throw error;
    }
    
    return data;
  }

  async signIn(email, password) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Error iniciando sesión:', error);
      throw error;
    }
    
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    
    if (error) {
      console.error('Error cerrando sesión:', error);
      throw error;
    }
    
    return true;
  }

  // Métodos para carrito (usando localStorage como fallback)
  async getCart() {
    // Por ahora usamos localStorage, pero se puede migrar a Supabase
    const cart = localStorage.getItem('sneaky_sneakers_cart');
    return cart ? JSON.parse(cart) : [];
  }

  async addToCart(productId, quantity = 1) {
    const cart = await this.getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    
    localStorage.setItem('sneaky_sneakers_cart', JSON.stringify(cart));
    return { success: true };
  }

  async removeFromCart(productId) {
    const cart = await this.getCart();
    const updatedCart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('sneaky_sneakers_cart', JSON.stringify(updatedCart));
    return { success: true };
  }

  // Métodos para wishlist (usando localStorage como fallback)
  async getWishlist() {
    const wishlist = localStorage.getItem('sneaky_sneakers_wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  }

  async addToWishlist(productId) {
    const wishlist = await this.getWishlist();
    
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem('sneaky_sneakers_wishlist', JSON.stringify(wishlist));
    }
    
    return { success: true };
  }

  async removeFromWishlist(productId) {
    const wishlist = await this.getWishlist();
    const updatedWishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('sneaky_sneakers_wishlist', JSON.stringify(updatedWishlist));
    return { success: true };
  }

  // Métodos para migración de datos
  async migrateProducts(products) {
    await this.initialize();
    
    for (const product of products) {
      try {
        // Generar un ID numérico único basado en el ID original
        const numericId = this.generateNumericId(product.id);
        
        // Verificar si el producto ya existe
        const existingProduct = await this.getProductById(numericId);
        
        if (!existingProduct) {
          await this.createProduct({
            id: numericId,
            name: product.name,
            brand: product.brand,
            category: product.category,
            price: product.price,
            original_price: product.originalPrice || product.price,
            description: product.description,
            image: product.image,
            rating: product.rating,
            in_stock: product.inStock,
            featured: product.featured
          });
          console.log(`✅ Producto migrado: ${product.name} (ID: ${numericId})`);
        } else {
          console.log(`⏭️ Producto ya existe: ${product.name}`);
        }
      } catch (error) {
        console.error(`❌ Error migrando producto ${product.name}:`, error);
      }
    }
  }

  // Generar ID numérico único basado en el ID original
  generateNumericId(originalId) {
    // Convertir el string a un número usando hash simple
    let hash = 0;
    for (let i = 0; i < originalId.length; i++) {
      const char = originalId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir a 32-bit integer
    }
    return Math.abs(hash);
  }

  async migratePlayers(players) {
    await this.initialize();
    console.log(`🔄 Iniciando migración de ${players.length} jugadores...`);
    
    for (const player of players) {
      try {
        console.log(`📝 Procesando jugador: ${player.name}`);
        
        // Verificar si el jugador ya existe
        const { data: existingPlayer, error: checkError } = await this.supabase
          .from(SUPABASE_CONFIG.TABLES.PLAYERS)
          .select('*')
          .eq('name', player.name)
          .single();
        
        if (checkError && checkError.code !== 'PGRST116') {
          console.error(`❌ Error verificando jugador ${player.name}:`, checkError);
          continue;
        }
        
        if (!existingPlayer) {
          const playerData = {
            name: player.name,
            team: player.team || 'NBA',
            position: player.position || 'Player',
            image: player.image,
            description: player.description || `Información sobre ${player.name}`,
            stats: player.stats,
            featured: player.featured
          };
          
          console.log(`📤 Insertando datos:`, playerData);
          
          const { data: insertedPlayer, error: insertError } = await this.supabase
            .from(SUPABASE_CONFIG.TABLES.PLAYERS)
            .insert([playerData])
            .select()
            .single();
          
          if (insertError) {
            console.error(`❌ Error insertando jugador ${player.name}:`, insertError);
          } else {
            console.log(`✅ Jugador migrado: ${player.name} (ID: ${insertedPlayer.id})`);
          }
        } else {
          console.log(`⏭️ Jugador ya existe: ${player.name}`);
        }
      } catch (error) {
        console.error(`❌ Error migrando jugador ${player.name}:`, error);
      }
    }
  }

  // Cerrar conexión
  async close() {
    this.isInitialized = false;
  }
}

// Instancia singleton
const supabaseService = new SupabaseService();
export default supabaseService; 