import React from "react";
import { 
  SectionNavigation, 
  PageBanner, 
  ContentSection, 
  NewsletterSection,
  Navbar,
  Footer 
} from "../components";

const AboutUs = () => {
  const aboutContent = (
    <p className="text-gray-700">
      We are a company dedicated to selling sneakers, offering a wide variety of top-brand products. Sneaky was born as an idea to create a fashion space inspired by sports for our customers, providing a variety of offers from the best sports and fashion brands, all in one place. Sneaky is a living brand, adapting to the rhythm of the city, which is why we constantly change colors and textures in our logo—we are dynamic, diverse, bold, and like to stay in tune with the latest trends, just like our customers! We understand that everyone has their own unique circle, where they interact, relate, and complement each other and their environment. This important element interests us. Your circle interests us.
    </p>
  );

  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
    // Aquí iría la lógica para suscribir al newsletter
  };

  return (
    <>
      <Navbar />
      <SectionNavigation />
      <PageBanner title="Sneaky Sneakers" />
      
      <ContentSection 
        title="About Us"
        content={aboutContent}
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

export default AboutUs; 