import React, { useEffect } from "react";
import { 
  SectionNavigation, 
  PageBanner, 
  ContentSection, 
  NewsletterSection, 
  FooterLinks, 
  Footer, 
  LoadingSpinner 
} from "../components";

const AboutUs = () => {
  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <SectionNavigation />
      
      <PageBanner 
        title="About Sneaky Sneakers"
        subtitle="Discover our story and mission"
        backgroundClass="bg-gradient-to-r from-cyan-600 to-blue-700"
      />

      <ContentSection 
        title="Our Story"
        content="Sneaky Sneakers was born from a passion for authentic sneakers and a desire to provide the best shopping experience. We started as a small local store and have grown into a trusted destination for sneaker enthusiasts worldwide. Our journey began with a simple idea: to create a space where sneaker lovers could find authentic, high-quality products in a welcoming environment."
        image="/src/assets/img/banners/pexels-kaique-rocha-250356.jpg"
        imageAlt="Sneaky Sneakers Store"
        reverse={false}
      />

      <ContentSection 
        title="Our Mission"
        content="We are committed to providing authentic, high-quality sneakers while delivering exceptional customer service. Our goal is to make premium sneakers accessible to everyone who shares our passion. We believe that great sneakers should be available to everyone, regardless of their background or budget."
        image="/src/assets/img/banners/zapatillas-banner-allProducts.jpg"
        imageAlt="Premium Sneakers Collection"
        reverse={true}
      />

      <ContentSection 
        title="Why Choose Us"
        content="With years of experience in the sneaker industry, we've built relationships with the world's top brands to ensure you get only authentic products. Our expert team is always ready to help you find the perfect pair. We understand that every customer is unique, and we take pride in providing personalized service."
        image="/src/assets/img/banners/banner-mujer-page.jpg" 
        imageAlt="Authentic Sneakers"
        reverse={false}
      />

      <NewsletterSection onSubmit={handleNewsletterSubmit} />
      <FooterLinks />
      <Footer />
    </div>
  );
};

export default AboutUs; 