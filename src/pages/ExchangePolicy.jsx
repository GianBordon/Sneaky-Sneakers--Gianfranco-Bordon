import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ExchangePolicy = () => {
  const [openAccordion, setOpenAccordion] = useState(0);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  const exchangeData = [
    {
      title: "A TRAVÉS DE SUCURSALES",
      content: (
        <div>
          Puede dirigirse a cualquiera de nuestras sucursales y cambiar o devolver el producto en el momento cumpliendo con los requisitos de cambio. O realizar la devolución del producto para que podamos enviar uno nuevo desde el centro de distribución centralizado que se encuentra ajeno a las sucursales.
          <br /><br />
          La modalidad es la siguiente, debes acercarte a una sucursal ANDREANI próxima a tu domicilio para despachar el producto a ser cambiado. Si nos confirmas esta opción te enviaremos una etiqueta a tu correo electrónico para que puedas despachar el pedido. En cuanto al envoltorio, el producto debe ser devuelto en su packaging original o en una bolsa negra bien cerrada y etiqueta de despacho visible. Una vez que lo recibamos debemos validar que esté en perfecto estado según nuestros términos y condiciones de cambios/devoluciones. Seguido a ello nos pondremos en contacto para gestionar el cambio/devolución.
          <br /><br />
          En el caso de que se trate de un segundo cambio, el costo logístico te será informado vía mail. Te enviaremos juntos con la etiqueta un link de pago a tu correo electrónico.
        </div>
      )
    },
    {
      title: "REQUISITOS DE CAMBIO",
      content: (
        <div>
          • El producto deberá estar sin uso y en perfecto estado.
          <br /><br />
          • El producto debe poseer sus etiquetas, envoltorios y todos los accesorios adicionales que pudieren corresponder.
          <br /><br />
          • Preparar el producto envuelto en una bolsa negra o en papel madera, perfectamente cerrado y con la etiqueta de Andreani (enviada por mail) pegada en lugar visible.
          <br /><br />
          • Presentar la factura y/o ticket de cambio.
        </div>
      )
    },
    {
      title: "INFORMACIÓN",
      content: (
        <div>
          <strong>Cambio de Talle:</strong> Podrá hacerlo normalmente a través de una sucursal o por correo vía logística inversa.
          <br /><br />
          <strong>Cambio de Producto:</strong> El monto a considerar será el facturado, es decir, lo que se ha abonado por el producto. En caso que desee un producto mas costoso deberá abonar la diferencia.
        </div>
      )
    },
    {
      title: "¿CUÁNTO TARDA EN LLEGAR EL PRODUCTO UNA VEZ QUE SOLICITO EL CAMBIO?",
      content: "Una vez que hemos recibido tu producto en nuestro centro de distribución, despacharemos un nuevo envío dentro de los 7 días hábiles. Si realizas el cambio en cualquiera de nuestras Sucursales, el cambio es inmediato."
    },
    {
      title: "POLÍTICA DE REEMBOLSO",
      content: "Luego de haber agotado instancias de cambio o reemplazo del producto adquirido, la empresa recurrirá a la instancia de reembolso del dinero, previa recepción del producto sin fallas ni uso, en el centro de distribución central o cualquier sucursal de la empresa. También se recurrirá al reembolso de dinero cuando la empresa por algún error no cuenta con el stock del producto adquirido en nuestra tienda online. Y por último, se devolverá el dinero cuando el cliente no cumple con la política de compra, no presente documentación adicional si se solicita para facturar el producto."
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

      {/* Exchange Policy Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">POLÍTICAS DE CAMBIOS</h2>
          
          <div className="max-w-4xl mx-auto">
            {exchangeData.map((item, index) => (
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

export default ExchangePolicy; 