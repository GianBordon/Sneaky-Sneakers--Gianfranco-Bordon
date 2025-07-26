import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const GiannisAntetokounmpo = () => {
  const achievements = [
    "2 veces Jugador Más Valioso de la NBA (2019, 2020)",
    "1 vez Jugador Más Valioso de las Finales de la NBA (2021)",
    "2 veces Líder en eficiencia de la NBA (PER) (2019, 2020)",
    "6 veces Elegido para el All-Star de la NBA (2017, 2018, 2019, 2020, 2021, 2022)",
    "1 vez MVP del All-Star de la NBA (2021)",
    "4 veces Mejor Equipo de la NBA (2019, 2020, 2021, 2022)",
    "2 veces Segundo Mejor Equipo de la NBA (2017, 2018)",
    "1 vez Jugador Defensivo del Año en la NBA (2020)",
    "4 veces Mejor Equipo Defensivo de la NBA (2019, 2020, 2021, 2022)",
    "1 vez Segundo Equipo Defensivo de la NBA (2017)",
    "1 vez Segundo Equipo de Novatos de la NBA (2014)",
    "1 vez Jugador Más Mejorado de la NBA (2017)"
  ];

  const shoes = [
    { src: "/src/assets/img/Giannis/Giannis Frak 4.webp", alt: "Giannis_01" },
    { src: "/src/assets/img/Giannis/Giannis Immortality 2.webp", alt: "Giannis_02" },
    { src: "/src/assets/img/Giannis/Giannis Zoom Freak 4 Letter Bros.webp", alt: "Giannis_03" }
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
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16 text-center">
        <h1 className="text-5xl font-bold">Giannis Antetokounmpo</h1>
      </section>

      {/* Player Title */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">Giannis Antetokounmpo</h2>
        </div>
      </section>

      {/* Player Profile Photo */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <img 
              src="/src/assets/img/Giannis/giannis.webp" 
              alt="foto_perfil_giannis"
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
          <h3 className="text-2xl font-bold text-center mb-8">Zapatillas de Giannis Antetokounmpo</h3>
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

export default GiannisAntetokounmpo; 