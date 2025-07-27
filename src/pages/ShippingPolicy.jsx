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

const ShippingPolicy = () => {
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
        items={shippingData}
        title="POLÍTICA DE ENVÍOS"
      />
      
      <NewsletterSection 
        title="SUSCRIBITE AL NEWSLETTER"
        placeholder="Ingrese su E-mail"
        buttonText="Suscribirse"
        onSubmit={handleNewsletterSubmit}
      />
      
      <FooterLinks />
      <Footer />
    </>
  );
};

export default ShippingPolicy; 