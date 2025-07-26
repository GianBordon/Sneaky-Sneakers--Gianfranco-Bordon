import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const KevinDurant = () => {
  const achievements = [
    "1 vez Jugador Más Valioso de la NBA (2014)",
    "2 veces Jugador Más Valioso de las Finales de la NBA (2017, 2018)",
    "4 veces Máximo anotador de la NBA (2010, 2011, 2012, 2014)",
    "1 vez Líder en eficiencia de la NBA (PER) (2014)",
    "12 veces Elegido para el All-Star de la NBA (2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2022)",
    "2 veces MVP del All-Star de la NBA (2012, 2019)",
    "6 veces Mejor Equipo de la NBA (2010, 2011, 2012, 2013, 2014, 2018)",
    "4 veces Segundo Mejor Equipo de la NBA (2016, 2017, 2019, 2022)",
    "1 vez Novato del Año en la NBA (2008)",
    "1 vez Mejor Equipo de Novatos de la NBA (2008)"
  ];

  const shoes = [
    { src: "/src/assets/img/KD/KD 8.webp", alt: "kd_01" },
    { src: "/src/assets/img/KD/KD 9.webp", alt: "kd_02" },
    { src: "/src/assets/img/KD/KD10.webp", alt: "kd_03" }
  ];

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

      {/* Player Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-16 text-center">
        <h1 className="text-5xl font-bold">Kevin Durant</h1>
      </section>

      {/* Player Title */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">Kevin Durant</h2>
        </div>
      </section>

      {/* Player Profile Photo */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <img 
              src="/src/assets/img/KD/kevin-durant foto perfil.jpg" 
              alt="foto_perfil_kevin_durant"
              className="w-64 h-64 object-cover rounded-full shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Player Stats */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Logros y Estadísticas</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {achievement}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Player Shoes */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Zapatillas de Kevin Durant</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {shoes.map((shoe, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={shoe.src} 
                  alt={shoe.alt}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
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

export default KevinDurant; 