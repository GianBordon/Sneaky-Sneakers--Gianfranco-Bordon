import React from "react";
import { Link } from "react-router-dom";

const SectionNavigation = () => (
  <section className="bg-gray-100 py-2">
    <div className="container mx-auto">
      <nav className="flex justify-center space-x-8 flex-wrap">
        <Link to="/men" className="text-gray-700 hover:text-gray-900 font-semibold">Hombre</Link>
        <Link to="/women" className="text-gray-700 hover:text-gray-900 font-semibold">Mujer</Link>
        <Link to="/kids" className="text-gray-700 hover:text-gray-900 font-semibold">Niños</Link>
        <Link to="/new-arrivals" className="text-gray-700 hover:text-gray-900 font-semibold">New Arrivals</Link>
        <Link to="/sale" className="text-gray-700 hover:text-gray-900 font-semibold">SALE</Link>
        <Link to="/all-products" className="text-gray-700 hover:text-gray-900 font-semibold">Todos los Productos</Link>
      </nav>
    </div>
  </section>
);

export default SectionNavigation; 