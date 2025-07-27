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
      
      {/* Player Banner */}
      <section className={`${bannerGradient} text-white py-16 text-center`}>
        <h1 className="text-5xl font-bold">{playerName}</h1>
      </section>

      {/* Player Title */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">{playerName}</h2>
        </div>
      </section>

      {/* Player Profile Photo */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <img 
              src={profileImage}
              alt={`foto_perfil_${playerName.toLowerCase().replace(' ', '_')}`}
              className="w-64 h-64 object-cover rounded-full shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Player Stats */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Logros y Estadísticas</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {achievement}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Player Shoes */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Zapatillas de {playerName}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {shoes.map((shoe, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={shoe.src} 
                  alt={shoe.alt}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
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