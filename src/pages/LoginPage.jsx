import React, { useState } from "react";
import { 
  SectionNavigation, 
  PageBanner, 
  FormInput,
  Navbar,
  Footer 
} from "../components";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!formData.nombres.trim()) newErrors.nombres = "El nombre es requerido";
    if (!formData.apellidos.trim()) newErrors.apellidos = "El apellido es requerido";
    if (!formData.correo.trim()) newErrors.correo = "El correo es requerido";
    if (!formData.password.trim()) newErrors.password = "La contraseña es requerida";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Registrar usuario
    const result = await register(formData);
    if (result.success) {
      console.log("Usuario registrado exitosamente");
      navigate('/'); // Redirigir a home después del registro
    } else {
      console.error("Error en el registro:", result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Navbar />
      <SectionNavigation />
      <PageBanner title="Sneaky Sneakers" />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-primary-600 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
              Join Sneaky Sneakers
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Create your account and unlock exclusive access to premium sneakers and special offers
            </p>
          </div>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto animate-scale-in">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-neutral-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-display font-bold text-neutral-800 mb-2">Create Account</h2>
                <p className="text-neutral-600">Join our community of sneaker enthusiasts</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    type="text"
                    name="nombres"
                    placeholder="First Name"
                    value={formData.nombres}
                    onChange={handleChange}
                    required
                    error={errors.nombres}
                  />
                  
                  <FormInput
                    type="text"
                    name="apellidos"
                    placeholder="Last Name"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                    error={errors.apellidos}
                  />
                </div>
                
                <FormInput
                  type="email"
                  name="correo"
                  placeholder="Email Address"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  error={errors.correo}
                />
                
                <FormInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={errors.password}
                />
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-neutral-600">
                    I agree to the{" "}
                    <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:bg-primary-400 disabled:transform-none shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
              </form>
              
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <p className="text-center text-neutral-600 mb-6">Or continue with</p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors group">
                    <svg className="w-5 h-5 text-blue-600 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-neutral-700 font-medium">Facebook</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-colors group">
                    <svg className="w-5 h-5 text-red-600 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-neutral-700 font-medium">Google</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-neutral-600">
                  Already have an account?{" "}
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">
                    Sign in here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LoginPage; 