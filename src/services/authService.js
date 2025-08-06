// Servicio para manejar autenticación con Supabase
import { getSupabase } from '../config/supabaseSecure.js';

export class AuthService {
  static supabase = null;

  // Inicializar Supabase
  static async initialize() {
    if (!this.supabase) {
      this.supabase = getSupabase();
    }
  }

  // Verificar si el usuario está autenticado
  static async isAuthenticated() {
    try {
      await this.initialize();
      const { data: { session } } = await this.supabase.auth.getSession();
      return !!session;
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      return false;
    }
  }

  // Obtener usuario actual
  static async getCurrentUser() {
    try {
      await this.initialize();
      const { data: { user }, error } = await this.supabase.auth.getUser();
      
      if (error) {
        // AuthSessionMissingError es normal cuando no hay sesión activa
        if (error.message.includes('Auth session missing')) {
          return null;
        }
        console.error('Error obteniendo usuario actual:', error);
        return null;
      }
      
      return user;
    } catch (error) {
      // AuthSessionMissingError es normal cuando no hay sesión activa
      if (error.message && error.message.includes('Auth session missing')) {
        return null;
      }
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
  }

  // Login
  static async login(email, password) {
    try {
      await this.initialize();
      
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true,
        user: data.user,
        session: data.session
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Registro
  static async register(userData) {
    try {
      await this.initialize();
      
      // Registrar usuario en Supabase Auth
      const { data, error } = await this.supabase.auth.signUp({
        email: userData.correo,
        password: userData.password,
        options: {
          data: {
            nombres: userData.nombres,
            apellidos: userData.apellidos
          }
        }
      });

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }

      // Si el registro es exitoso, también crear el perfil en la tabla users
      if (data.user) {
        try {
          const { error: profileError } = await this.supabase
            .from('users')
            .insert([
              {
                id: data.user.id,
                nombres: userData.nombres,
                apellidos: userData.apellidos,
                correo: userData.correo,
                is_admin: false, // Usar is_admin en lugar de role
                created_at: new Date().toISOString()
              }
            ]);

          if (profileError) {
            console.warn('Error creando perfil de usuario:', profileError);
            // No fallar el registro si hay error en el perfil
          }
        } catch (profileError) {
          console.warn('Error creando perfil de usuario:', profileError);
        }
      }

      return {
        success: true,
        user: data.user,
        session: data.session
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Logout
  static async logout() {
    try {
      await this.initialize();
      const { error } = await this.supabase.auth.signOut();
      if (error) {
        console.error('Error al cerrar sesión:', error);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return { success: false, error: error.message };
    }
  }

  // Generar token (simulado)
  static generateToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Validar formulario de registro
  static validateRegistration(formData) {
    console.log('Validando datos:', formData);
    const errors = {};

    if (!formData.nombres?.trim()) {
      errors.nombres = 'El nombre es requerido';
      console.log('Error: nombres faltante');
    }

    if (!formData.apellidos?.trim()) {
      errors.apellidos = 'El apellido es requerido';
      console.log('Error: apellidos faltante');
    }

    // Manejar tanto 'email' como 'correo'
    const email = formData.email || formData.correo;
    console.log('Email a validar:', email);
    if (!email?.trim()) {
      errors.correo = 'El correo es requerido';
      console.log('Error: correo faltante');
    } else if (!this.isValidEmail(email)) {
      errors.correo = 'El correo no es válido';
      console.log('Error: correo inválido');
    }

    if (!formData.password?.trim()) {
      errors.password = 'La contraseña es requerida';
      console.log('Error: password faltante');
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
      console.log('Error: password muy corta');
    }

    console.log('Errores encontrados:', errors);
    return errors;
  }

  // Validar email
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Cambiar contraseña
  static async changePassword(userId, currentPassword, newPassword) {
    try {
      await this.initialize();
      const { error } = await this.supabase.auth.updateUser({
        id: userId,
        password: newPassword
      });

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Recuperar contraseña (simulado)
  static async forgotPassword(email) {
    try {
      await this.initialize();
      const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password` // URL de redirección para el restablecimiento de contraseña
      });

      if (error) {
        return {
          success: false,
          error: error.message
        };
      }
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Verificar permisos de admin
  static async isAdmin() {
    const user = await this.getCurrentUser();
    return user?.is_admin;
  }

  // Verificar permisos de usuario
  static async hasRole(role) {
    const user = await this.getCurrentUser();
    if (role === 'admin') {
      return user?.is_admin === true;
    }
    return true; // Por defecto, todos los usuarios tienen rol 'user'
  }
} 