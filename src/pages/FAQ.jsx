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
        items={faqData}
        title="PREGUNTAS FRECUENTES"
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

export default FAQ; 