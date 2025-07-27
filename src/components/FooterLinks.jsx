import React from "react";
import { Link } from "react-router-dom";

const FooterLinks = ({ className = "" }) => (
  <section className={`bg-gray-200 py-6 ${className}`}>
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
);

export default FooterLinks; 