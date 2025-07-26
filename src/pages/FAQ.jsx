import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FAQ = () => {
  const [openAccordion, setOpenAccordion] = useState(0);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  const faqData = [
    {
      title: "COMPRAS",
      content: (
        <div>
          <strong>¿Cómo comprar?</strong> 1° Mirá nuestros productos: Navegá el catálogo y buscá lo que más te gusta, podes refinar tu búsqueda con nuestros filtros de productos personalizados.
          2° Agregá al carrito lo que más te guste: Seleccioná tus productos deseados y agregalos al carrito.
          3° Finalizá tu compra: Una vez que hayas agregado tus productos avanzá al checkout mediante el link "Finalizar pedido" ubicado en el carrito en la parte superior de la página.
          4° Pago: Completá el formulario con tus datos personales, método de entrega y datos de facturación. <br /> <strong>¿Es seguro comprar en el sitio?</strong> Tus datos personales están resguardados y no serán utilizados para otros fines que no sean el de procesamiento de tu compra
        </div>
      )
    },
    {
      title: "PAGOS",
      content: (
        <div>
          <strong>¿Cuáles son los medios de pago disponibles?</strong> Tarjeta de crédito: Aprovechá las cuotas sin interés vigentes.
          Mercado Pago: Aplican todas las promociones disponibles en Mercado Pago.
          Efectivo: Podes abonar en cualquier sucursal de Rapipago, Pago Fácil o Carga Virtual seleccionando Mercado Pago y obetiendo el cupón de pago al finalizar la compra.
          Modo: podes abonar seleccionando la opción y serás redirigido a MODO o a tu HomeBanking. Debes estar adherido a MODO.
          GoCuotas: Posibilidad de abonar con tarjeta de débito en cuotas. <br /> <strong>¿Cuanto tiempo tengo para pagar el cupón de Rapipago o pago fácil?</strong> El stock estará reservado por 2 días hábiles desde la confirmación del pedido independientemente de la fecha de validez estipulada por el cupón de pago. Una vez cumplido el plazo, el pedido se cancelará automáticamente y el stock volverá a la venta. Cualquier otro medio de pago se debe realizar al instante. <br /> <strong>¿Cómo sé si mi pago fue aprobado?</strong> Una vez que tu pago fue acreditado recibirás un correo electrónico con la confirmación, luego de esto iniciaremos el proceso de facturación y despacho.
        </div>
      )
    },
    {
      title: "ENVÍOS Y RETIRO DE PEDIDOS",
      content: (
        <div>
          <strong>¿Puede otra persona recibir mi pedido?</strong> Sí, cualquier persona de mayor de edad puede recibir la mercadería siempre que se encuentre en el domicilio de entrega indicado. Para retirar tu compra desde alguna de nuestras sucursales debes mostrar tu DNI y la confirmación de compra. Si retira un tercero, deberá acercarse a la sucursal seleccionada con una autorización firmada por el titular de la compra (sin excepción). <br /> <strong>¿Qué pasa si no hay nadie para recibir mi pedido?</strong> La empresa de correos dejará un aviso de visita y volverá al día siguiente nuevamente. Si en la segunda visita que realiza la empresa de correos tampoco encuentra a ninguna persona en el domicilio indicado por el usuario, se procederá a dejar la mercadería en la sucursal de la empresa de correos más cercana al domicilio indicado. Por 5 días la mercadería quedará en la sucursal de correos, cumplido este período de tiempo, si el cliente no pasó a retirarlo se devolverá la mercadería a nuestro depósito. En este caso, el comprador debe comunicarse con ATENCION AL CLIENTE, para coordinar una nueva entrega. La nueva entrega puede tener un costo adicional por reprocesamiento. <br /> <strong>¿En qué días y horarios se entregan los pedidos?</strong>Las entregas de pedidos se realizan de lunes a viernes de 8:00 a 20:00. No se entregan pedidos los días domingos ni feriados, ni los días de paro de transporte. <br /> <strong>¿Puedo reprogramar la entrega de mi pedido?</strong> No es posible establecer una fecha exacta de entrega de tu pedido.
        </div>
      )
    },
    {
      title: "ATENCIÓN AL CLIENTE",
      content: (
        <div>
          <strong>¿Cuál es el horario de atención al cliente?</strong> El horario de Atención al cliente es todos los días de 8 a 21 hs.
        </div>
      )
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

      {/* FAQ Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">PREGUNTAS FRECUENTES</h2>
          
          <div className="max-w-4xl mx-auto">
            {faqData.map((item, index) => (
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

export default FAQ; 