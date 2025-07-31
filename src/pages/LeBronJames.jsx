import React, { useState, useEffect } from "react";
import { useCart, useWishlist } from "../hooks";
import {
  SectionNavigation,
  PageBanner,
  NewsletterSection,
  FooterLinks,
  Footer,
  LoadingSpinner
} from "../components";
import { useSupabase } from "../hooks/useSupabase";

const LeBronJames = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { getPlayerById, getProductsByBrand } = useSupabase();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('shoes');
  const [selectedShoeIndex, setSelectedShoeIndex] = useState(0);
  const [player, setPlayer] = useState(null);
  const [shoes, setShoes] = useState([]);

  const playerName = "LeBron James";

  // Datos específicos de LeBron James
  const playerData = {
    name: "LeBron James",
    bannerGradient: "bg-gradient-to-br from-purple-600 to-orange-500",
    profileImage: "/src/assets/img/jugadores/lebrom.jpg",
    bannerImage: "/src/assets/img/LeBron/lebron-james-with-black-and-white-background-and-lakers-jersey-wallpaper-1920x1080_48.jpg",
    achievements: [
      "4x Campeón de la NBA (2012, 2013, 2016, 2020)",
      "4x MVP de la NBA (2009, 2010, 2012, 2013)",
      "4x MVP de las Finales (2012, 2013, 2016, 2020)",
      "19x All-Star (2005-2023)",
      "18x All-NBA Team",
      "6x All-Defensive Team",
      "Rookie del Año (2004)",
      "Líder histórico en puntos de la NBA",
      "3x MVP del All-Star Game",
      "2x Medalla de Oro Olímpica (2008, 2012)"
    ],
    shoes: [
      {
        src: "/src/assets/img/LeBron/LeBron XX.webp",
        alt: "LeBron XX"
      },
      {
        src: "/src/assets/img/LeBron/LeBron XX Stocking Stuffer.webp",
        alt: "LeBron XX Stocking Stuffer"
      },
      {
        src: "/src/assets/img/LeBron/Nike LeBron IX.webp",
        alt: "Nike LeBron IX"
      },
      {
        src: "/src/assets/img/LeBron/Nike Zoom LeBron 2.webp",
        alt: "Nike Zoom LeBron 2"
      },
      {
        src: "/src/assets/img/LeBron/Nike LeBron 9 Low.webp",
        alt: "Nike LeBron 9 Low"
      },
      {
        src: "/src/assets/img/LeBron/Lebron Witness 7.webp",
        alt: "Lebron Witness 7"
      }
    ]
  };

  useEffect(() => {
    const loadPlayerData = async () => {
      try {
        setIsLoading(true);
        
        // Cargar datos del jugador desde Supabase
        const playerFromDB = await getPlayerById(1); // Asumiendo que LeBron tiene ID 1
        if (playerFromDB) {
          setPlayer(playerFromDB);
        }
        
        // Cargar zapatillas de LeBron desde Supabase
        const shoesFromDB = await getProductsByBrand("LeBron");
        if (shoesFromDB && shoesFromDB.length > 0) {
          setShoes(shoesFromDB.map(product => ({
            src: product.image,
            alt: product.name,
            product: product
          })));
        } else {
          // Usar datos locales si no hay en Supabase
          setShoes(playerData.shoes);
        }
        
      } catch (error) {
        console.error("Error loading LeBron data:", error);
        // Usar datos locales como fallback
        setPlayer({ name: playerName, ...playerData });
        setShoes(playerData.shoes);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlayerData();
  }, [getPlayerById, getProductsByBrand]);

  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
  };

  const handleAddToCart = async (shoe) => {
    setIsAddingToCart(true);
    try {
      if (shoe.product) {
        // Si es un producto de Supabase
        await addToCart(shoe.product.id, 1);
      } else {
        // Si es un producto local
        const tempProduct = {
          id: `lebron-shoe-${Date.now()}`,
          name: `${playerName} - ${shoe.alt}`,
          price: 150,
          image: shoe.src,
          brand: playerName,
          category: 'players'
        };
        await addToCart(tempProduct.id, 1);
      }
      alert('Zapatilla agregada al carrito');
    } catch {
      alert('Error al agregar al carrito');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = (shoe) => {
    const shoeId = shoe.product ? shoe.product.id : `lebron-${shoe.alt}`;
    toggleWishlist(shoeId);
  };

  const handleShoeSelect = (index) => {
    setSelectedShoeIndex(index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <LoadingSpinner size="xl" text={`Cargando ${playerName}...`} />
      </div>
    );
  }

  return (
    <>
      <SectionNavigation />

      {/* Hero Banner Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${playerData.bannerImage || playerData.profileImage})`,
            filter: 'brightness(0.4) blur(1px)'
          }}
        />

        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${playerData.bannerGradient} opacity-70`} />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 animate-fade-in">
              {playerName}
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 mb-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Leyenda del Baloncesto
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Left Side - Player Image */}
              <div className="order-2 lg:order-1">
                <div className="relative group h-full">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={playerData.profileImage}
                      alt={`${playerName} profile`}
                      className="w-full h-auto max-h-[600px] lg:max-h-[700px] object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  {/* Floating Stats Card */}
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 transform group-hover:scale-110 transition-transform duration-500">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-neutral-800 mb-1">
                        {playerData.achievements.length}
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
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-4">
                      Logros y Estadísticas
                    </h2>
                    <p className="text-base md:text-lg text-neutral-600 mb-6">
                      Una carrera llena de éxitos y reconocimientos que lo convierten en uno de los mejores jugadores de la historia.
                    </p>
                  </div>

                  <div className="space-y-4 animate-slide-up flex-1" style={{ animationDelay: '200ms' }}>
                    {playerData.achievements.map((achievement, index) => (
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
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-4">
                Zapatillas de {playerName}
              </h2>
              <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
                Descubre la colección exclusiva de zapatillas que han acompañado a {playerName} en su camino hacia la grandeza.
              </p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex justify-center mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="bg-white rounded-full p-2 shadow-lg">
                <button
                  onClick={() => setActiveTab('shoes')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === 'shoes'
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'text-neutral-600 hover:text-cyan-600'
                  }`}
                >
                  Zapatillas ({shoes.length})
                </button>
                <button
                  onClick={() => setActiveTab('featured')}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === 'featured'
                      ? 'bg-cyan-600 text-white shadow-lg'
                      : 'text-neutral-600 hover:text-cyan-600'
                  }`}
                >
                  Destacadas
                </button>
              </div>
            </div>

            {activeTab === 'shoes' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
                {shoes.map((shoe, index) => {
                  const shoeId = shoe.product ? shoe.product.id : `lebron-${shoe.alt}`;
                  return (
                    <div
                      key={index}
                      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                      style={{ animationDelay: `${400 + index * 100}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={shoe.src}
                          alt={shoe.alt}
                          className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                          onClick={() => handleShoeSelect(index)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                          {/* Wishlist Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWishlistToggle(shoe);
                            }}
                            className={`p-2 rounded-full transition-colors shadow-lg ${
                              isInWishlist(shoeId)
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-white text-neutral-600 hover:bg-neutral-100'
                            }`}
                          >
                            <svg className="w-5 h-5" fill={isInWishlist(shoeId) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>

                          {/* Add to Cart Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(shoe);
                            }}
                            disabled={isAddingToCart}
                            className="bg-cyan-600 text-white p-2 rounded-full hover:bg-cyan-700 transition-colors shadow-lg disabled:bg-neutral-400"
                          >
                            {isAddingToCart ? (
                              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                          {shoe.alt}
                        </h3>
                        <p className="text-neutral-600 text-sm mb-4">
                          Edición especial diseñada para {playerName}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-cyan-600 font-bold text-lg">
                            ${shoe.product ? shoe.product.price : 150}
                          </span>
                          <button
                            onClick={() => handleAddToCart(shoe)}
                            disabled={isAddingToCart}
                            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed text-sm font-semibold"
                          >
                            {isAddingToCart ? 'Agregando...' : 'Agregar al Carrito'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Featured Shoes Section */
              <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Featured Shoe Display */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                      <img
                        src={shoes[selectedShoeIndex]?.src}
                        alt={shoes[selectedShoeIndex]?.alt}
                        className="w-full h-96 object-cover object-center"
                      />
                    </div>
                    {/* Thumbnail Navigation */}
                    <div className="flex space-x-4 justify-center">
                      {shoes.slice(0, 4).map((shoe, index) => (
                        <button
                          key={index}
                          onClick={() => handleShoeSelect(index)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            selectedShoeIndex === index
                              ? 'border-cyan-500 scale-110'
                              : 'border-neutral-200 hover:border-cyan-300'
                          }`}
                        >
                          <img
                            src={shoe.src}
                            alt={shoe.alt}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Featured Shoe Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-display font-bold text-neutral-800 mb-4">
                        {shoes[selectedShoeIndex]?.alt}
                      </h3>
                      <p className="text-lg text-neutral-600 mb-6">
                        La zapatilla más icónica de {playerName}. Diseñada para máximo rendimiento y estilo.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                          <span className="text-neutral-700">Tecnología de amortiguación avanzada</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                          <span className="text-neutral-700">Materiales premium de alta calidad</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                          <span className="text-neutral-700">Diseño exclusivo de {playerName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-neutral-800">
                          ${shoes[selectedShoeIndex]?.product ? shoes[selectedShoeIndex].product.price : 150}
                        </span>
                        <span className="text-sm text-neutral-600">Precio especial</span>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleAddToCart(shoes[selectedShoeIndex])}
                          disabled={isAddingToCart}
                          className="flex-1 bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed font-semibold"
                        >
                          {isAddingToCart ? 'Agregando...' : 'Agregar al Carrito'}
                        </button>
                        <button
                          onClick={() => handleWishlistToggle(shoes[selectedShoeIndex])}
                          className={`p-3 rounded-lg transition-colors ${
                            isInWishlist(shoes[selectedShoeIndex]?.product ? shoes[selectedShoeIndex].product.id : `lebron-${shoes[selectedShoeIndex]?.alt}`)
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-300'
                          }`}
                        >
                          <svg className="w-6 h-6" fill={isInWishlist(shoes[selectedShoeIndex]?.product ? shoes[selectedShoeIndex].product.id : `lebron-${shoes[selectedShoeIndex]?.alt}`) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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

export default LeBronJames; 