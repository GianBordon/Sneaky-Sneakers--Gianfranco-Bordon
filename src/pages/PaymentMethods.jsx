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

const PaymentMethods = () => {
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

  const accordionData = [
    {
      title: "Tarjetas de crédito",
      content: (
        <p className="text-neutral-700 leading-relaxed">
          Tarjeta Naranja, Cabal, y NO bancarias: cuotas FIJAS con intereses (dependiendo del tipo de tarjeta y la cantidad de cuotas).
        </p>
      )
    },
    {
      title: "GO CUOTAS",
      content: (
        <p className="text-neutral-700 leading-relaxed">
          Podes abonar en cuotas con TARJETA DE DÉBITO. En el momento pagarás solo la primera cuota. Luego en 30, 60 y 90 días las cuotas restantes. Las cuotas se debitarán en forma automática de tu tarjeta de DÉBITO.
        </p>
      )
    },
    {
      title: "MODO",
      content: (
        <p className="text-neutral-700 leading-relaxed">
          Con la aplicación de MODO o desde tu Homebanking, podes escanear el QR y abonar con la forma de pago que prefieras. Podes acceder a descuentos exclusivos y beneficios que ofrece MODO.
        </p>
      )
    },
    {
      title: "MERCADOPAGO",
      content: (
        <p className="text-neutral-700 leading-relaxed">
          Podes abonar con tarjeta de crédito, débito, efectivo o MercadoCrédito, según prefieras. Cuotas y promociones vigentes establecidas por MercadoPago.
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
      <section className="relative py-20 bg-gradient-to-r from-green-500 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              Payment Methods
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Multiple secure payment options to make your shopping experience convenient and safe
            </p>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl font-display font-bold text-neutral-800 mb-4">Accepted Payment Methods</h2>
              <p className="text-xl text-neutral-600">Choose the payment option that works best for you</p>
            </div>
            
            <div className="animate-fade-in">
              <Accordion 
                items={accordionData}
                title=""
              />
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-gradient-to-r from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl font-display font-bold text-neutral-800 mb-4">Secure Payments</h2>
              <p className="text-xl text-neutral-600">Your security is our top priority</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-slide-up">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">SSL Encryption</h3>
                <p className="text-neutral-600">All transactions are protected with bank-level security</p>
              </div>
              
              <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">PCI Compliant</h3>
                <p className="text-neutral-600">We meet the highest security standards for payment processing</p>
              </div>
              
              <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Fraud Protection</h3>
                <p className="text-neutral-600">Advanced fraud detection systems protect your transactions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Icons Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-display font-bold text-neutral-800 mb-4">Accepted Cards</h2>
            <p className="text-neutral-600">We accept all major credit and debit cards</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center animate-slide-up">
              <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-600">💳</span>
              </div>
              <h3 className="font-semibold text-neutral-800">Visa</h3>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-red-600">💳</span>
              </div>
              <h3 className="font-semibold text-neutral-800">Mastercard</h3>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-purple-600">💳</span>
              </div>
              <h3 className="font-semibold text-neutral-800">American Express</h3>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-orange-600">💳</span>
              </div>
              <h3 className="font-semibold text-neutral-800">Discover</h3>
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
      
      <Footer />
    </div>
  );
};

export default PaymentMethods; 