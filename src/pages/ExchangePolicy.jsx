import React, { useState, useEffect } from "react";
import {
  SectionNavigation,
  PageBanner,
  ContentSection,
  NewsletterSection,
  FooterLinks,
  Footer,
  LoadingSpinner
} from "../components";

const ExchangePolicy = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simular loading inicial muy corto
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <LoadingSpinner size="xl" text="Cargando..." />
      </div>
    );
  }

  const exchangeData = [
    {
      title: "A TRAVÉS DE SUCURSALES",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-700 leading-relaxed">
            Puede dirigirse a cualquiera de nuestras sucursales y cambiar o devolver el producto en el momento cumpliendo con los requisitos de cambio. O realizar la devolución del producto para que podamos enviar uno nuevo desde el centro de distribución centralizado que se encuentra ajeno a las sucursales.
          </p>
          <p className="text-neutral-700 leading-relaxed">
            La modalidad es la siguiente, debes acercarte a una sucursal ANDREANI próxima a tu domicilio para despachar el producto a ser cambiado. Si nos confirmas esta opción te enviaremos una etiqueta a tu correo electrónico para que puedas despachar el pedido. En cuanto al envoltorio, el producto debe ser devuelto en su packaging original o en una bolsa negra bien cerrada y etiqueta de despacho visible. Una vez que lo recibamos debemos validar que esté en perfecto estado según nuestros términos y condiciones de cambios/devoluciones. Seguido a ello nos pondremos en contacto para gestionar el cambio/devolución.
          </p>
          <p className="text-neutral-700 leading-relaxed">
            En el caso de que se trate de un segundo cambio, el costo logístico te será informado vía mail. Te enviaremos juntos con la etiqueta un link de pago a tu correo electrónico.
          </p>
        </div>
      )
    },
    {
      title: "REQUISITOS DE CAMBIO",
      content: (
        <div className="space-y-4">
          <ul className="list-disc list-inside space-y-3 text-neutral-700">
            <li>El producto deberá estar sin uso y en perfecto estado.</li>
            <li>El producto debe poseer sus etiquetas, envoltorios y todos los accesorios adicionales que pudieren corresponder.</li>
            <li>Preparar el producto envuelto en una bolsa negra o en papel madera, perfectamente cerrado y con la etiqueta de Andreani (enviada por mail) pegada en lugar visible.</li>
            <li>Presentar la factura y/o ticket de cambio.</li>
          </ul>
        </div>
      )
    },
    {
      title: "INFORMACIÓN",
      content: (
        <div className="space-y-4">
          <div>
            <strong className="text-neutral-800">Cambio de Talle:</strong>
            <p className="text-neutral-700 mt-1">Podrá hacerlo normalmente a través de una sucursal o por correo vía logística inversa.</p>
          </div>
          <div>
            <strong className="text-neutral-800">Cambio de Producto:</strong>
            <p className="text-neutral-700 mt-1">El monto a considerar será el facturado, es decir, lo que se ha abonado por el producto. En caso que desee un producto mas costoso deberá abonar la diferencia.</p>
          </div>
        </div>
      )
    },
    {
      title: "¿CUÁNTO TARDA EN LLEGAR EL PRODUCTO UNA VEZ QUE SOLICITO EL CAMBIO?",
      content: (
        <p className="text-neutral-700 leading-relaxed">
          Una vez que hemos recibido tu producto en nuestro centro de distribución, despacharemos un nuevo envío dentro de los 7 días hábiles. Si realizas el cambio en cualquiera de nuestras Sucursales, el cambio es inmediato.
        </p>
      )
    },
    {
      title: "POLÍTICA DE REEMBOLSO",
      content: (
        <p className="text-neutral-700 leading-relaxed">
          Luego de haber agotado instancias de cambio o reemplazo del producto adquirido, la empresa recurrirá a la instancia de reembolso del dinero, previa recepción del producto sin fallas ni uso, en el centro de distribución central o cualquier sucursal de la empresa. También se recurrirá al reembolso de dinero cuando la empresa por algún error no cuenta con el stock del producto adquirido en nuestra tienda online. Y por último, se devolverá el dinero cuando el cliente no cumple con la política de compra, no presente documentación adicional si se solicita para facturar el producto.
        </p>
      )
    }
  ];

  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <SectionNavigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-orange-500 to-red-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              Exchange Policy
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Learn about our exchange and return policies to ensure a smooth shopping experience
            </p>
          </div>
        </div>
      </section>

      {/* Policy Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl font-display font-bold text-neutral-800 mb-4">Exchange & Return Policies</h2>
              <p className="text-xl text-neutral-600">Everything you need to know about exchanges and returns</p>
            </div>
            
            <div className="animate-fade-in">
              <Accordion 
                items={exchangeData}
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
              <h2 className="text-4xl font-display font-bold text-neutral-800 mb-6">Need Help with an Exchange?</h2>
              <p className="text-xl text-neutral-600 mb-8">
                Our customer service team is here to help you with any exchange or return questions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">Email Support</h3>
                  <p className="text-neutral-600 mb-4">Get help via email</p>
                  <a href="mailto:support@sneakysneakers.com" className="text-orange-600 hover:text-orange-700 font-medium">
                    support@sneakysneakers.com
                  </a>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">Phone Support</h3>
                  <p className="text-neutral-600 mb-4">Call us directly</p>
                  <a href="tel:+1234567890" className="text-orange-600 hover:text-orange-700 font-medium">
                    +1 (234) 567-890
                  </a>
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

export default ExchangePolicy; 