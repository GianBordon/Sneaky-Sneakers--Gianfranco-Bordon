import React from "react";
import {
  SectionNavigation,
  PageBanner,
  NewsletterSection,
  Navbar,
  Footer
} from "../components";

const MenSimple = () => {
  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
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
              Men's Collection
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Discover the latest trends in men's sneakers. From classic to contemporary, find your perfect style.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-4xl font-display font-bold text-neutral-800 mb-6">
              ¡Página Men Funcionando!
            </h2>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Esta es la página Men simplificada para probar el routing. Si puedes ver esta página, el routing está funcionando correctamente.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Routing Working</h3>
                <p className="text-neutral-600">Navigation is functioning properly</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Modern Design</h3>
                <p className="text-neutral-600">Clean and minimalist interface</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Fast Performance</h3>
                <p className="text-neutral-600">Optimized for speed and efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection onSubmit={handleNewsletterSubmit} />
      <Footer />
    </div>
  );
};

export default MenSimple; 