import React from "react";
import { 
  SectionNavigation, 
  PageBanner, 
  Accordion, 
  NewsletterSection,
  FooterLinks,
  Navbar,
  Footer 
} from "../components";

const FAQ = () => {
  const faqData = [
    {
      title: "COMPRAS",
      content: (
        <div className="space-y-4">
          <div>
            <strong className="text-neutral-800">¿Cómo comprar?</strong>
            <ol className="list-decimal list-inside mt-2 space-y-2 text-neutral-600">
              <li>Mirá nuestros productos: Navegá el catálogo y buscá lo que más te gusta, podes refinar tu búsqueda con nuestros filtros de productos personalizados.</li>
              <li>Agregá al carrito lo que más te guste: Seleccioná tus productos deseados y agregalos al carrito.</li>
              <li>Finalizá tu compra: Una vez que hayas agregado tus productos avanzá al checkout mediante el link "Finalizar pedido" ubicado en el carrito en la parte superior de la página.</li>
              <li>Pago: Completá el formulario con tus datos personales, método de entrega y datos de facturación.</li>
            </ol>
          </div>
          <div>
            <strong className="text-neutral-800">¿Es seguro comprar en el sitio?</strong>
            <p className="mt-2 text-neutral-600">Tus datos personales están resguardados y no serán utilizados para otros fines que no sean el de procesamiento de tu compra.</p>
          </div>
        </div>
      )
    },
    {
      title: "PAGOS",
      content: (
        <div className="space-y-4">
          <div>
            <strong className="text-neutral-800">¿Cuáles son los medios de pago disponibles?</strong>
            <ul className="list-disc list-inside mt-2 space-y-2 text-neutral-600">
              <li><strong>Tarjeta de crédito:</strong> Aprovechá las cuotas sin interés vigentes.</li>
              <li><strong>Mercado Pago:</strong> Aplican todas las promociones disponibles en Mercado Pago.</li>
              <li><strong>Efectivo:</strong> Podes abonar en cualquier sucursal de Rapipago, Pago Fácil o Carga Virtual seleccionando Mercado Pago y obetiendo el cupón de pago al finalizar la compra.</li>
              <li><strong>Modo:</strong> podes abonar seleccionando la opción y serás redirigido a MODO o a tu HomeBanking. Debes estar adherido a MODO.</li>
              <li><strong>GoCuotas:</strong> Posibilidad de abonar con tarjeta de débito en cuotas.</li>
            </ul>
          </div>
          <div>
            <strong className="text-neutral-800">¿Cuanto tiempo tengo para pagar el cupón de Rapipago o pago fácil?</strong>
            <p className="mt-2 text-neutral-600">El stock estará reservado por 2 días hábiles desde la confirmación del pedido independientemente de la fecha de validez estipulada por el cupón de pago. Una vez cumplido el plazo, el pedido se cancelará automáticamente y el stock volverá a la venta. Cualquier otro medio de pago se debe realizar al instante.</p>
          </div>
          <div>
            <strong className="text-neutral-800">¿Cómo sé si mi pago fue aprobado?</strong>
            <p className="mt-2 text-neutral-600">Una vez que tu pago fue acreditado recibirás un correo electrónico con la confirmación, luego de esto iniciaremos el proceso de facturación y despacho.</p>
          </div>
        </div>
      )
    },
    {
      title: "ENVÍOS Y RETIRO DE PEDIDOS",
      content: (
        <div className="space-y-4">
          <div>
            <strong className="text-neutral-800">¿Puede otra persona recibir mi pedido?</strong>
            <p className="mt-2 text-neutral-600">Sí, cualquier persona de mayor de edad puede recibir la mercadería siempre que se encuentre en el domicilio de entrega indicado. Para retirar tu compra desde alguna de nuestras sucursales debes mostrar tu DNI y la confirmación de compra. Si retira un tercero, deberá acercarse a la sucursal seleccionada con una autorización firmada por el titular de la compra (sin excepción).</p>
          </div>
          <div>
            <strong className="text-neutral-800">¿Qué pasa si no hay nadie para recibir mi pedido?</strong>
            <p className="mt-2 text-neutral-600">La empresa de correos dejará un aviso de visita y volverá al día siguiente nuevamente. Si en la segunda visita que realiza la empresa de correos tampoco encuentra a ninguna persona en el domicilio indicado por el usuario, se procederá a dejar la mercadería en la sucursal de la empresa de correos más cercana al domicilio indicado. Por 5 días la mercadería quedará en la sucursal de correos, cumplido este período de tiempo, si el cliente no pasó a retirarlo se devolverá la mercadería a nuestro depósito. En este caso, el comprador debe comunicarse con ATENCION AL CLIENTE, para coordinar una nueva entrega. La nueva entrega puede tener un costo adicional por reprocesamiento.</p>
          </div>
          <div>
            <strong className="text-neutral-800">¿En qué días y horarios se entregan los pedidos?</strong>
            <p className="mt-2 text-neutral-600">Las entregas de pedidos se realizan de lunes a viernes de 8:00 a 20:00. No se entregan pedidos los días domingos ni feriados, ni los días de paro de transporte.</p>
          </div>
          <div>
            <strong className="text-neutral-800">¿Puedo reprogramar la entrega de mi pedido?</strong>
            <p className="mt-2 text-neutral-600">No es posible establecer una fecha exacta de entrega de tu pedido.</p>
          </div>
        </div>
      )
    },
    {
      title: "ATENCIÓN AL CLIENTE",
      content: (
        <div>
          <strong className="text-neutral-800">¿Cuál es el horario de atención al cliente?</strong>
          <p className="mt-2 text-neutral-600">El horario de Atención al cliente es todos los días de 8 a 21 hs.</p>
        </div>
      )
    }
  ];

  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
    // Aquí iría la lógica para suscribir al newsletter
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Navbar />
      <SectionNavigation />
      <PageBanner title="Sneaky Sneakers" />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              FAQ
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Find answers to the most frequently asked questions about our products, services, and policies
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl font-display font-bold text-neutral-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-neutral-600">Everything you need to know about Sneaky Sneakers</p>
            </div>
            
            <div className="animate-fade-in">
              <Accordion 
                items={faqData}
                title=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl font-display font-bold text-neutral-800 mb-6">Still Have Questions?</h2>
              <p className="text-xl text-neutral-600 mb-8">
                Can't find what you're looking for? Our customer support team is here to help you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">Email Support</h3>
                  <p className="text-neutral-600 mb-4">Get help via email</p>
                  <a href="mailto:support@sneakysneakers.com" className="text-primary-600 hover:text-primary-700 font-medium">
                    support@sneakysneakers.com
                  </a>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">Phone Support</h3>
                  <p className="text-neutral-600 mb-4">Call us directly</p>
                  <a href="tel:+1234567890" className="text-primary-600 hover:text-primary-700 font-medium">
                    +1 (234) 567-890
                  </a>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">Live Chat</h3>
                  <p className="text-neutral-600 mb-4">Chat with our team</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <NewsletterSection 
        title="STAY UPDATED"
        placeholder="Enter your email address"
        buttonText="Subscribe"
        onSubmit={handleNewsletterSubmit}
      />
      
      <FooterLinks />
      <Footer />
    </div>
  );
};

export default FAQ; 