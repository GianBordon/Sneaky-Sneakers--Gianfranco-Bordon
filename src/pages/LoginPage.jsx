import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de registro
    console.log("Datos del formulario:", formData);
  };

  return (
    <>
      <Navbar />
      
      {/* Section navigation */}
      <section className="bg-gray-100 py-2">
        <div className="container mx-auto">
          <nav className="flex justify-center space-x-8">
            <a href="/men" className="text-gray-700 hover:text-gray-900 font-semibold">Hombre</a>
            <a href="/women" className="text-gray-700 hover:text-gray-900 font-semibold">Mujer</a>
            <a href="/kids" className="text-gray-700 hover:text-gray-900 font-semibold">Niños</a>
            <a href="/new-arrivals" className="text-gray-700 hover:text-gray-900 font-semibold">New Arrivals</a>
            <a href="/sale" className="text-gray-700 hover:text-gray-900 font-semibold">SALE</a>
          </nav>
        </div>
      </section>

      {/* Banner */}
      <section className="banner bg-black text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Sneaky Sneakers</h1>
      </section>

      {/* Login Form Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h4 className="text-2xl font-bold text-center mb-6">Formulario Registro</h4>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="nombres"
                  id="nombres"
                  placeholder="Ingrese su Nombre"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                />
                
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="apellidos"
                  id="apellidos"
                  placeholder="Ingrese su Apellido"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                />
                
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  name="correo"
                  id="correo"
                  placeholder="Ingrese su Correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
                
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Ingrese su Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                
                <p className="text-sm text-gray-600">
                  Estoy de acuerdo con{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                    Términos y Condiciones
                  </a>
                </p>
                
                <button
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  type="submit"
                >
                  Registrar
                </button>
                
                <p className="text-center text-sm text-gray-600">
                  <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                    ¿Ya tienes Cuenta?
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">SUSCRIBITE AL NEWSLETTER</h3>
          <form className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ingrese su E-mail"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>

      {/* Footer Links */}
      <section className="bg-gray-200 py-6">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap justify-center gap-6 text-sm">
            <li><a href="/about-us" className="text-gray-700 hover:text-gray-900">Quienes somos</a></li>
            <li><a href="/faq" className="text-gray-700 hover:text-gray-900">Preguntas Frecuentes</a></li>
            <li><a href="/exchange-policy" className="text-gray-700 hover:text-gray-900">Politica de cambios</a></li>
            <li><a href="https://autogestion.produccion.gob.ar/consumidores" className="text-gray-700 hover:text-gray-900">Defensa del consumidor</a></li>
            <li><a href="/shipping-policy" className="text-gray-700 hover:text-gray-900">Politica de envios</a></li>
            <li><a href="/payment-methods" className="text-gray-700 hover:text-gray-900">Formas de pago</a></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LoginPage; 