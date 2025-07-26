import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const carouselImages = [
  "/src/assets/img/Nike SB/102.webp",
  "/src/assets/img/Nike SB/186.webp",
  "/src/assets/img/Nike SB/189.webp",
  "/src/assets/img/Nike SB/22.webp",
  "/src/assets/img/Nike SB/57.webp",
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <>
      <Navbar />

      {/* Section navigation */}
      <section className="bg-gray-100 py-2">
        <div className="container mx-auto flex justify-center">
          <nav className="flex gap-6">
            <Link to="/men" className="text-lg font-semibold hover:text-blue-600">Men</Link>
            <Link to="/women" className="text-lg font-semibold hover:text-pink-600">Women</Link>
            <Link to="/kids" className="text-lg font-semibold hover:text-green-600">Kids</Link>
            <Link to="/new-arrivals" className="text-lg font-semibold hover:text-yellow-600">New Arrivals</Link>
            <Link to="/sale" className="text-lg font-semibold hover:text-red-600">SALE</Link>
          </nav>
        </div>
      </section>

      {/* Banner */}
      <section className="banner bg-black text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Sneaky Sneakers</h1>
      </section>

      {/* Brands section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Brands</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {['Jordan', 'Nike', 'Adidas', 'Nike SB'].map((brand) => (
              <div key={brand} className="bg-gray-100 rounded-lg shadow p-6 w-40 text-center">
                <Link to="/all-products"><h3 className="text-lg font-semibold">{brand}</h3></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel section */}
      <section className="py-8">
        <div className="container mx-auto max-w-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Featured Sneakers</h2>
          <div className="relative flex items-center justify-center">
            <button onClick={prevSlide} className="absolute left-0 z-10 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition"><span className="text-2xl">&#8592;</span></button>
            <img
              src={carouselImages[current]}
              alt={`Featured ${current}`}
              className="rounded-lg w-full h-64 object-cover shadow-lg"
            />
            <button onClick={nextSlide} className="absolute right-0 z-10 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition"><span className="text-2xl">&#8594;</span></button>
          </div>
          <div className="flex justify-center gap-2 mt-2">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${idx === current ? 'bg-black' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured players section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">Featured Players</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { name: 'LeBron James', path: '/lebron-james' },
              { name: 'Kevin Durant', path: '/kevin-durant' },
              { name: 'Giannis Antetokounmpo', path: '/giannis-antetokounmpo' },
              { name: 'Paul George', path: '/paul-george' },
              { name: 'James Harden', path: '/james-harden' },
            ].map((player) => (
              <div key={player.name} className="bg-gray-100 rounded-lg shadow p-6 w-56 text-center">
                <Link to={player.path}><h3 className="text-lg font-semibold">{player.name}</h3></Link>
                <Link to={player.path} className="mt-2 inline-block">
                  <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition">+ Info</button>
                </Link>
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
            <li><Link to="/about-us" className="text-gray-700 hover:text-gray-900">Quienes somos</Link></li>
            <li><Link to="/faq" className="text-gray-700 hover:text-gray-900">Preguntas Frecuentes</Link></li>
            <li><Link to="/exchange-policy" className="text-gray-700 hover:text-gray-900">Politica de cambios</Link></li>
            <li><a href="https://autogestion.produccion.gob.ar/consumidores" className="text-gray-700 hover:text-gray-900">Defensa del consumidor</a></li>
            <li><Link to="/shipping-policy" className="text-gray-700 hover:text-gray-900">Politica de envios</Link></li>
            <li><Link to="/payment-methods" className="text-gray-700 hover:text-gray-900">Formas de pago</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home; 