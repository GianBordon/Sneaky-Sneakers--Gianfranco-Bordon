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

const ExchangePolicy = () => {
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
        items={exchangeData}
        title="POLÍTICAS DE CAMBIOS"
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

export default ExchangePolicy; 