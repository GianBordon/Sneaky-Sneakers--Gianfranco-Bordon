import React, { useState, useEffect } from "react";
import {
  SectionNavigation,
  PageBanner,
  ContentSection,
  NewsletterSection,
  FooterLinks,
  Footer,
  LoadingSpinner,
  Accordion
} from "../components";

const ShippingPolicy = () => {
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
        <LoadingSpinner />
      </div>
    );
  }

  const shippingData = [
    {
      title: "JIPINK",
      content: (
        <p className="text-neutral-700 leading-relaxed">
          Envíos de lunes a viernes en tus compras de domingo a viernes (hasta las 12hs). Entregas rápidas a domicilio en 24hs en AMBA. En caso de no poder ser entregado en la primer visita, realizarán en las siguientes 24hs un segundo intento de entrega.
        </p>
      )
    },
    {
      title: "ESTANDAR A DOMICILIO",
      content: (
        <p className="text-neutral-700 leading-relaxed">
          Válido todos los días. El tiempo de entrega depende de la aprobación del medio de pago. Los días que se indiquen son estimativos, y corren siempre a partir del momento en que el pedido se despacha.
        </p>
      )
    },
    {
      title: "ANDREANI 24HS",
      content: (
        <p className="text-neutral-700 leading-relaxed">
          Válido de Domingos a Jueves en zona de AMBA. Si el pedido se realiza antes de las 10 hs, llegará el mismo día. En caso de no poder concretar la entrega, se realiza un segunda visita al día siguiente. Horarios de entrega hasta las 21 hs.
        </p>
      )
    },
    {
      title: "RETIRO EXPRESS TIENDAS",
      content: (
        <p className="text-neutral-700 leading-relaxed">
          Valido todos los días en sucursales seleccionadas. La entrega se realiza en 24 hs HÁBILES, y corren siempre a partir del momento en que el pedido es facturado.
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
      <section className="relative py-20 bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              Shipping Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Fast and reliable shipping options to get your sneakers to you quickly and safely
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl font-display font-bold text-neutral-800 mb-4">Shipping Options</h2>
              <p className="text-xl text-neutral-600">Choose the shipping method that works best for you</p>
            </div>
            
            <div className="animate-fade-in">
              <Accordion 
                items={shippingData}
                title=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Features Section */}
      <section className="py-20 bg-gradient-to-r from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl font-display font-bold text-neutral-800 mb-4">Why Choose Our Shipping?</h2>
              <p className="text-xl text-neutral-600">We make shipping simple and reliable</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-slide-up">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Fast Delivery</h3>
                <p className="text-neutral-600">Same-day and next-day delivery options available</p>
              </div>
              
              <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Secure Packaging</h3>
                <p className="text-neutral-600">Your sneakers are protected with premium packaging</p>
              </div>
              
              <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Real-time Tracking</h3>
                <p className="text-neutral-600">Track your package every step of the way</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Times Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-display font-bold text-neutral-800 mb-4">Delivery Times</h2>
            <p className="text-neutral-600">Estimated delivery times by shipping method</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl text-center animate-slide-up">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">24h</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Express</h3>
              <p className="text-neutral-600">Same day delivery</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1-2</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Standard</h3>
              <p className="text-neutral-600">1-2 business days</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">3-5</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Economy</h3>
              <p className="text-neutral-600">3-5 business days</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">24h</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Store Pickup</h3>
              <p className="text-neutral-600">Pick up in store</p>
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

export default ShippingPolicy; 