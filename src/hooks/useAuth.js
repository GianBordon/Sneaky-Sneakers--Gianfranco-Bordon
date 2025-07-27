import { useState, useEffect, useCallback } from 'react';
import { AuthService } from '../services/authService';

// Hook personalizado para manejar autenticación
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar autenticación inicial
  useEffect(() => {
    checkAuth();
  }, []);

  // Verificar estado de autenticación
  const checkAuth = useCallback(() => {
    try {
      const authenticated = AuthService.isAuthenticated();
      const currentUser = AuthService.getCurrentUser();
      
      setIsAuthenticated(authenticated);
      setUser(currentUser);
      setError(null);
    } catch (err) {
      setError('Error al verificar autenticación');
      console.error('Auth check error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await AuthService.login(email, password);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Registro
  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validar datos del formulario
      const validationErrors = AuthService.validateRegistration(userData);
      
      if (Object.keys(validationErrors).length > 0) {
        setError('Por favor, corrige los errores en el formulario');
        return { 
          success: false, 
          error: 'Errores de validación',
          validationErrors 
        };
      }

      const result = await AuthService.register(userData);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    try {
      AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Cambiar contraseña
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    if (!user) {
      setError('Usuario no autenticado');
      return { success: false, error: 'Usuario no autenticado' };
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await AuthService.changePassword(user.id, currentPassword, newPassword);
      
      if (result.success) {
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Recuperar contraseña
  const forgotPassword = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await AuthService.forgotPassword(email);
      
      if (result.success) {
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Verificar si es admin
  const isAdmin = useCallback(() => {
    return AuthService.isAdmin();
  }, []);

  // Verificar rol
  const hasRole = useCallback((role) => {
    return AuthService.hasRole(role);
  }, []);

  // Limpiar error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Estado
    user,
    isAuthenticated,
    loading,
    error,
    
    // Métodos
    login,
    register,
    logout,
    changePassword,
    forgotPassword,
    checkAuth,
    isAdmin,
    hasRole,
    clearError
  };
}; 