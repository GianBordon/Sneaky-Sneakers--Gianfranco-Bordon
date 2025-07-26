import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ShippingPolicy = () => {
  const [openAccordion, setOpenAccordion] = useState(0);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  const shippingData = [
    {
      title: "JIPINK",
      content: "Envíos de lunes a viernes en tus compras de domingo a viernes (hasta las 12hs). Entregas rápidas a domicilio en 24hs en AMBA. En caso de no poder ser entregado en la primer visita, realizarán en las siguientes 24hs un segundo intento de entrega."
    },
    {
      title: "ESTANDAR A DOMICILIO",
      content: "Válido todos los días. El tiempo de entrega depende de la aprobación del medio de pago. Los días que se indiquen son estimativos, y corren siempre a partir del momento en que el pedido se despacha."
    },
    {
      title: "ANDREANI 24HS",
      content: "Válido de Domingos a Jueves en zona de AMBA. Si el pedido se realiza antes de las 10 hs, llegará el mismo día. En caso de no poder concretar la entrega, se realiza un segunda visita al día siguiente. Horarios de entrega hasta las 21 hs."
    },
    {
      title: "RETIRO EXPRESS TIENDAS",
      content: "Valido todos los días en sucursales seleccionadas. La entrega se realiza en 24 hs HÁBILES, y corren siempre a partir del momento en que el pedido es facturado."
    }
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

      {/* Banner */}
      <section className="banner bg-black text-white py-8 text-center">
        <h1 className="text-4xl font-bold">Sneaky Sneakers</h1>
      </section>

      {/* Shipping Policy Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">POLÍTICA DE ENVÍOS</h2>
          
          <div className="max-w-4xl mx-auto">
            {shippingData.map((item, index) => (
              <div key={index} className="mb-4 border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">{item.title}</span>
                    <span className={`transform transition-transform duration-200 ${openAccordion === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                </button>
                
                {openAccordion === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="text-gray-700 leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                )}
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

export default ShippingPolicy; 