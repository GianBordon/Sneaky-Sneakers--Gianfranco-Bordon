import React from "react";
import { 
  SectionNavigation, 
  PageBanner, 
  Accordion, 
  NewsletterSection,
  Navbar,
  Footer 
} from "../components";

const PaymentMethods = () => {
  const accordionData = [
    {
      title: "Tarjetas de crédito",
      content: "Tarjeta Naranja, Cabal, y NO bancarias: cuotas FIJAS con intereses (dependiendo del tipo de tarjeta y la cantidad de cuotas)."
    },
    {
      title: "GO CUOTAS",
      content: "Podes abonar en cuotas con TARJETA DE DÉBITO. En el momento pagarás solo la primera cuota. Luego en 30, 60 y 90 días las cuotas restantes. Las cuotas se debitarán en forma automática de tu tarjeta de DÉBITO."
    },
    {
      title: "MODO",
      content: "Con la aplicación de MODO o desde tu Homebanking, podes escanear el QR y abonar con la forma de pago que prefieras. Podes acceder a descuentos exclusivos y beneficios que ofrece MODO."
    },
    {
      title: "MERCADOPAGO",
      content: "Podes abonar con tarjeta de crédito, débito, efectivo o MercadoCrédito, según prefieras. Cuotas y promociones vigentes establecidas por MercadoPago"
    }
  ];

  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
    // Aquí iría la lógica para suscribir al newsletter
  };

  return (
    <>
      <Navbar />
      <SectionNavigation />
      <PageBanner title="Sneaky Sneakers" />
      
      <Accordion 
        items={accordionData}
        title="PAYMENT METHODS"
      />
      
      <NewsletterSection 
        title="SUBSCRIBE TO THE NEWSLETTER"
        placeholder="Enter your E-mail"
        buttonText="Subscribe"
        onSubmit={handleNewsletterSubmit}
      />
      
      <Footer />
    </>
  );
};

export default PaymentMethods; 