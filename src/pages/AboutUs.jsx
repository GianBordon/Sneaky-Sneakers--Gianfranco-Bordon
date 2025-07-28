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
    <div className="prose prose-lg max-w-none">
      <p className="text-neutral-700 leading-relaxed mb-6">
        We are a company dedicated to selling sneakers, offering a wide variety of top-brand products. Sneaky was born as an idea to create a fashion space inspired by sports for our customers, providing a variety of offers from the best sports and fashion brands, all in one place.
      </p>
      <p className="text-neutral-700 leading-relaxed mb-6">
        Sneaky is a living brand, adapting to the rhythm of the city, which is why we constantly change colors and textures in our logo—we are dynamic, diverse, bold, and like to stay in tune with the latest trends, just like our customers!
      </p>
      <p className="text-neutral-700 leading-relaxed">
        We understand that everyone has their own unique circle, where they interact, relate, and complement each other and their environment. This important element interests us. Your circle interests us.
      </p>
    </div>
  );

  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
    // Aquí iría la lógica para suscribir al newsletter
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
              About Sneaky
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              More than just sneakers. We're a community of enthusiasts, athletes, and style-conscious individuals who believe in the power of great footwear.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl font-display font-bold text-neutral-800 mb-4">Our Story</h2>
              <p className="text-xl text-neutral-600">From passion to purpose</p>
            </div>
            
            <div className="animate-fade-in">
              <ContentSection 
                title=""
                content={aboutContent}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-display font-bold text-neutral-800 mb-4">Our Values</h2>
            <p className="text-xl text-neutral-600">What drives us forward</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center animate-slide-up">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-neutral-800 mb-4">Authenticity</h3>
              <p className="text-neutral-600 leading-relaxed">
                Every product we offer is 100% authentic, sourced directly from authorized dealers and manufacturers.
              </p>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-neutral-800 mb-4">Community</h3>
              <p className="text-neutral-600 leading-relaxed">
                We believe in building a community where sneaker enthusiasts can connect, share, and grow together.
              </p>
            </div>
            
            <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-neutral-800 mb-4">Innovation</h3>
              <p className="text-neutral-600 leading-relaxed">
                Constantly evolving and adapting to bring you the latest trends and technologies in footwear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-bounce-in">
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">10K+</div>
              <div className="text-primary-100">Happy Customers</div>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: '100ms' }}>
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">500+</div>
              <div className="text-primary-100">Products</div>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: '200ms' }}>
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">50+</div>
              <div className="text-primary-100">Brands</div>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: '300ms' }}>
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">24/7</div>
              <div className="text-primary-100">Support</div>
            </div>
          </div>
        </div>
      </section>
      
      <NewsletterSection 
        title="STAY CONNECTED"
        placeholder="Enter your email address"
        buttonText="Subscribe"
        onSubmit={handleNewsletterSubmit}
      />
      
      <Footer />
    </div>
  );
};

export default AboutUs; 