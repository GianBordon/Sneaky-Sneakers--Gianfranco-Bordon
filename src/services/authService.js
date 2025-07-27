// Servicio para manejar autenticación
export class AuthService {
  // Simular base de datos de usuarios
  static users = [
    {
      id: 1,
      nombres: "Admin",
      apellidos: "User",
      correo: "admin@sneakysneakers.com",
      password: "admin123",
      role: "admin"
    },
    {
      id: 2,
      nombres: "Juan",
      apellidos: "Pérez",
      correo: "juan@example.com",
      password: "password123",
      role: "user"
    }
  ];

  // Verificar si el usuario está autenticado
  static isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  // Obtener usuario actual
  static getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Login
  static async login(email, password) {
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = this.users.find(u => 
        u.correo === email && u.password === password
      );

      if (user) {
        const token = this.generateToken();
        const userData = { ...user };
        delete userData.password;

        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));

        return {
          success: true,
          user: userData,
          token
        };
      } else {
        throw new Error('Credenciales inválidas');
      }
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
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar si el email ya existe
      const existingUser = this.users.find(u => u.correo === userData.correo);
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }

      // Crear nuevo usuario
      const newUser = {
        id: this.users.length + 1,
        ...userData,
        role: 'user'
      };

      this.users.push(newUser);

      // Auto login después del registro
      return await this.login(userData.correo, userData.password);
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Logout
  static logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return { success: true };
  }

  // Generar token (simulado)
  static generateToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Validar formulario de registro
  static validateRegistration(formData) {
    const errors = {};

    if (!formData.nombres?.trim()) {
      errors.nombres = 'El nombre es requerido';
    }

    if (!formData.apellidos?.trim()) {
      errors.apellidos = 'El apellido es requerido';
    }

    if (!formData.correo?.trim()) {
      errors.correo = 'El correo es requerido';
    } else if (!this.isValidEmail(formData.correo)) {
      errors.correo = 'El correo no es válido';
    }

    if (!formData.password?.trim()) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

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
      const user = this.users.find(u => u.id === userId);
      if (!user || user.password !== currentPassword) {
        throw new Error('Contraseña actual incorrecta');
      }

      user.password = newPassword;
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
      const user = this.users.find(u => u.correo === email);
      if (!user) {
        throw new Error('Email no encontrado');
      }

      // Aquí se enviaría un email con el link de recuperación
      console.log(`Email de recuperación enviado a: ${email}`);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Verificar permisos de admin
  static isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  // Verificar permisos de usuario
  static hasRole(role) {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
} 