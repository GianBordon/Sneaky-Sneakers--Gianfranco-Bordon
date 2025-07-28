import React from "react";
import { 
  SectionNavigation, 
  PageBanner, 
  NewsletterSection,
  FooterLinks,
  Navbar,
  Footer 
} from "../components";

const PlayerPage = ({ 
  playerName,
  bannerGradient,
  profileImage,
  bannerImage,
  achievements,
  shoes,
  className = "" 
}) => {
  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
    // Aquí iría la lógica para suscribir al newsletter
  };

  return (
    <>
      <Navbar />
      <SectionNavigation />
      
      {/* Hero Banner Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${bannerImage || profileImage})`,
            filter: 'brightness(0.4) blur(1px)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${bannerGradient} opacity-70`} />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 animate-fade-in">
              {playerName}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-200 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Leyenda del Baloncesto
            </p>
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-8 py-3 border border-white/30">
                <span className="text-lg font-semibold">NBA Superstar</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Player Profile & Achievements Section (Book Style) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              
              {/* Left Side - Player Image */}
              <div className="order-2 lg:order-1">
                <div className="relative group h-full">
                  {/* Main Image Container - Same height as achievements */}
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500 h-full min-h-[600px] lg:min-h-[800px]">
                    <img 
                      src={profileImage}
                      alt={`${playerName} profile`}
                      className="w-full h-full object-cover object-center"
                      style={{ objectPosition: 'center 20%' }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  
                  {/* Floating Stats Card */}
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 transform group-hover:scale-110 transition-transform duration-500">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-neutral-800 mb-1">
                        {achievements.length}
                      </div>
                      <div className="text-sm text-neutral-600 font-medium">
                        Logros Principales
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Achievements */}
              <div className="order-1 lg:order-2">
                <div className="space-y-8 h-full flex flex-col justify-center">
                  <div className="animate-slide-up">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-800 mb-4">
                      Logros y Estadísticas
                    </h2>
                    <p className="text-lg text-neutral-600 mb-8">
                      Una carrera llena de éxitos y reconocimientos que lo convierten en uno de los mejores jugadores de la historia.
                    </p>
                  </div>
                  
                  <div className="space-y-4 animate-slide-up flex-1" style={{ animationDelay: '200ms' }}>
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index} 
                        className="flex items-start space-x-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors duration-300"
                        style={{ animationDelay: `${300 + index * 50}ms` }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-neutral-700 leading-relaxed font-medium">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Player Shoes Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-800 mb-4">
                Zapatillas de {playerName}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Descubre la colección exclusiva de zapatillas que han acompañado a {playerName} en su camino hacia la grandeza.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              {shoes.map((shoe, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={shoe.src} 
                      alt={shoe.alt}
                      className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                      {shoe.alt.replace('_', ' ').toUpperCase()}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      Edición especial diseñada para {playerName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

export default PlayerPage; 