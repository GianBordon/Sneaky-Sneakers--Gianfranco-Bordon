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
    <>
      <Navbar />
      <SectionNavigation />
      <PageBanner title="Sneaky Sneakers" />

      {/* Login Form Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h4 className="text-2xl font-bold text-center mb-6">Formulario Registro</h4>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                  type="text"
                  name="nombres"
                  placeholder="Ingrese su Nombre"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                  error={errors.nombres}
                />
                
                <FormInput
                  type="text"
                  name="apellidos"
                  placeholder="Ingrese su Apellido"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                  error={errors.apellidos}
                />
                
                <FormInput
                  type="email"
                  name="correo"
                  placeholder="Ingrese su Correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  error={errors.correo}
                />
                
                <FormInput
                  type="password"
                  name="password"
                  placeholder="Ingrese su Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={errors.password}
                />
                
                <p className="text-sm text-gray-600">
                  Al registrarte, aceptas nuestros términos y condiciones de uso.
                </p>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-blue-400"
                >
                  {loading ? "Registrando..." : "Registrarse"}
                </button>
                
                {error && (
                  <div className="text-red-600 text-sm text-center mt-2">
                    {error}
                  </div>
                )}
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-4">O regístrate con:</p>
                <div className="flex justify-center space-x-4">
                  <button className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <i className="bi bi-facebook"></i>
                  </button>
                  <button className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                    <i className="bi bi-google"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LoginPage; 