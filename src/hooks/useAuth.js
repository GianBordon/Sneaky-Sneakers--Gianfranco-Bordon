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
  const checkAuth = useCallback(async () => {
    try {
      const authenticated = await AuthService.isAuthenticated();
      const currentUser = await AuthService.getCurrentUser();
      
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
        console.log('Usuario logueado exitosamente:', result.user);
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
  const register = useCallback(async (email, password, userData = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Preparar datos para validación
      const registrationData = {
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        correo: email,
        password: password
      };

      console.log('Datos de registro:', registrationData);

      // Validar datos del formulario
      const validationErrors = AuthService.validateRegistration(registrationData);
      
      console.log('Errores de validación:', validationErrors);
      
      if (Object.keys(validationErrors).length > 0) {
        setError('Por favor, corrige los errores en el formulario');
        return { 
          success: false, 
          error: 'Errores de validación',
          validationErrors 
        };
      }

      console.log('Pasando validación, registrando usuario...');
      const result = await AuthService.register(registrationData);
      
      console.log('Resultado del registro:', result);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return result;
      } else {
        setError(result.error);
        return result;
      }
    } catch (err) {
      console.error('Error en registro:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      const result = await AuthService.logout();
      if (result.success) {
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
      }
      return result;
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