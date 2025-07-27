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
    <>
      <Navbar />
      <SectionNavigation />
      <PageBanner title="Sneaky Sneakers" />

      {/* Simple Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-600">
            🎉 ¡Página Men Funcionando!
          </h2>
          <div className="text-center">
            <p className="text-xl mb-4">
              Esta es la página Men simplificada para probar el routing.
            </p>
            <p className="text-lg text-gray-600">
              Si puedes ver esta página, el routing está funcionando correctamente.
            </p>
          </div>
        </div>
      </section>

      <NewsletterSection onSubmit={handleNewsletterSubmit} />
      <Footer />
    </>
  );
};

export default MenSimple; 