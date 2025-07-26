import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const menShoes = [
  { id: 1, name: "Nike Air Max", price: "$120", image: "/src/assets/img/NIKE/10.webp" },
  { id: 2, name: "Adidas Ultraboost", price: "$180", image: "/src/assets/img/NIKE/11.webp" },
  { id: 3, name: "Jordan Retro", price: "$200", image: "/src/assets/img/Jordan/15.webp" },
  { id: 4, name: "Nike SB Dunk", price: "$90", image: "/src/assets/img/Nike SB/102.webp" },
  { id: 5, name: "LeBron James", price: "$150", image: "/src/assets/img/LeBron/LeBron XX.webp" },
  { id: 6, name: "Kevin Durant", price: "$130", image: "/src/assets/img/KD/KD 8.webp" },
];

const Men = () => (
  <>
    <Navbar />

    {/* Section navigation */}
    <section className="bg-gray-100 py-2">
      <div className="container mx-auto">
        <nav className="flex justify-center space-x-8">
          <Link to="/men" className="text-gray-700 hover:text-gray-900 font-semibold">Hombre</Link>
          <Link to="/women" className="text-gray-700 hover:text-gray-900 font-semibold">Mujer</Link>
          <Link to="/kids" className="text-gray-700 hover:text-gray-900 font-semibold">Niños</Link>
          <Link to="/new-arrivals" className="text-gray-700 hover:text-gray-900 font-semibold">New Arrivals</Link>
          <Link to="/sale" className="text-gray-700 hover:text-gray-900 font-semibold">SALE</Link>
        </nav>
      </div>
    </section>

    {/* Banner */}
    <section className="banner bg-black text-white py-8 text-center">
      <h1 className="text-4xl font-bold">Sneaky Sneakers</h1>
    </section>

    {/* Products Grid */}
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Men's Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menShoes.map((shoe) => (
            <div key={shoe.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={shoe.image} alt={shoe.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{shoe.name}</h3>
                <p className="text-gray-600 mb-4">{shoe.price}</p>
                <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors">
                  Add to Cart
                </button>
              </div>
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

export default Men; 