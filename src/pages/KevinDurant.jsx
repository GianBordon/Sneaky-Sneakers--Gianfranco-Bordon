import React, { useState, useEffect } from "react";
import { useCart, useWishlist } from "../hooks";
import {
  SectionNavigation,
  PageBanner,
  NewsletterSection,
  FooterLinks,
  Footer,
  LoadingSpinner,
  PlayerProductsSection
} from "../components";
import { useSupabase } from "../hooks/useSupabase";

const KevinDurant = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { getPlayerById, getProductsByBrand } = useSupabase();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [player, setPlayer] = useState(null);
  const [products, setProducts] = useState([]);

  const playerName = "Kevin Durant";

  useEffect(() => {
    const loadPlayerData = async () => {
      try {
        setIsLoading(true);
        
        // Cargar datos del jugador desde Supabase
        const playerFromDB = await getPlayerById(2); // KD tiene ID 2
        if (playerFromDB) {
          setPlayer(playerFromDB);
        }
        
        // Cargar zapatillas de KD desde Supabase
        const productsFromDB = await getProductsByBrand("KD");
        if (productsFromDB && productsFromDB.length > 0) {
          setProducts(productsFromDB);
        }
        
      } catch (error) {
        console.error("Error loading KD data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlayerData();
  }, [getPlayerById, getProductsByBrand]);

  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <LoadingSpinner size="xl" text={`Cargando ${playerName}...`} />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Error</h2>
          <p className="text-neutral-600">No se pudo cargar la información del jugador</p>
        </div>
      </div>
    );
  }

  // Datos del banner basados en el jugador
  const bannerData = {
    gradient: "bg-gradient-to-br from-blue-600 to-orange-500",
    image: "/src/assets/img/KD/Foto-Larga-KD.webp"
  };

  return (
    <>
      <SectionNavigation />

      {/* Hero Banner Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bannerData.image})`,
            filter: 'brightness(0.4) blur(1px)'
          }}
        />

        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${bannerData.gradient} opacity-70`} />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 animate-fade-in">
              {player.name}
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              {player.team} • {player.position}
            </p>
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/30">
                <span className="text-base font-semibold">NBA Superstar</span>
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

      {/* Player Profile & Achievements Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[600px]">

              {/* Left Side - Player Image */}
              <div className="order-2 lg:order-1">
                <div className="relative group h-full">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={player.image}
                      alt={`${player.name} profile`}
                      className="w-full h-[500px] lg:h-[600px] object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  {/* Floating Stats Card */}
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 transform group-hover:scale-110 transition-transform duration-500">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-neutral-800 mb-1">
                        {player.stats ? Object.keys(player.stats).length : 0}
                      </div>
                      <div className="text-sm text-neutral-600 font-medium">
                        Estadísticas
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Player Info */}
              <div className="order-1 lg:order-2">
                <div className="space-y-8 h-full flex flex-col justify-center">
                  <div className="animate-slide-up">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-4">
                      {player.name}
                    </h2>
                    <p className="text-base md:text-lg text-neutral-600 mb-6">
                      {player.description}
                    </p>
                  </div>

                  {/* Stats */}
                  {player.stats && (
                    <div className="space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                      <h3 className="text-xl font-bold text-neutral-800 mb-4">Estadísticas Promedio</h3>
                      {Object.entries(player.stats).map(([stat, value], index) => (
                        <div
                          key={stat}
                          className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors duration-300"
                          style={{ animationDelay: `${300 + index * 50}ms` }}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </div>
                            <span className="text-neutral-700 font-medium capitalize">
                              {stat === 'points' ? 'Puntos' : 
                               stat === 'rebounds' ? 'Rebotes' : 
                               stat === 'assists' ? 'Asistencias' : 
                               stat === 'blocks' ? 'Bloqueos' : 
                               stat === 'steals' ? 'Robos' : stat}
                            </span>
                          </div>
                          <span className="text-blue-600 font-bold text-lg">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Player Products Section */}
      <PlayerProductsSection
        title={`Zapatillas de ${player.name}`}
        description={`Descubre la colección exclusiva de zapatillas que han acompañado a ${player.name} en su camino hacia la grandeza.`}
        products={products}
        isLoading={isLoading}
        playerName={player.name}
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

export default KevinDurant; 