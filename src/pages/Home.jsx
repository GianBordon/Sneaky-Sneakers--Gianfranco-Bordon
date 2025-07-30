import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  SectionNavigation,
  PageBanner,
  PlayerCard,
  ImageCarousel,
  BrandCard,
  Footer,
  LoadingSpinner
} from "../components";
import { 
  getCarouselImages, 
  getCarouselConfig, 
  getFeaturedBrands, 
  getAllPlayers 
} from "../data";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Obtener datos desde los archivos centralizados
  const carouselImages = getCarouselImages('featured');
  const carouselConfig = getCarouselConfig('featured');
  const brands = getFeaturedBrands();
  const players = getAllPlayers();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate data fetching
        await new Promise(resolve => setTimeout(resolve, 1000)); 
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleShopNow = () => {
    navigate('/all-products');
  };

  const handleBrowseCollection = () => {
    navigate('/all-products');
  };

  const handleLearnMore = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <SectionNavigation />

      {/* Hero Section - Full Screen with Background Image */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/src/assets/img/banners/pexels-kaique-rocha-250356.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-neutral-900/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6">
              Discover Your
              <span className="block text-cyan-400 animate-float">Perfect Fit</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
              Explore our curated collection of premium sneakers from the world's top brands
            </p>
            <button 
              onClick={handleShopNow}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Brands section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center bg-white py-8 md:py-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-800 mb-4 md:mb-6">Featured Brands</h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto px-4">Discover the world's most iconic sneaker brands</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
            {brands.map((brand, index) => (
              <div 
                key={brand.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BrandCard {...brand} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center bg-neutral-100 py-8 md:py-0">
        <div className="container mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto">
            {/* Men Category Card */}
            <Link to="/men" className="block h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
              <div 
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in cursor-pointer h-full"
                style={{ animationDelay: '200ms' }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: "url('/src/assets/img/banners/zapatilas-banner-hombre.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            </Link>

            {/* Women Category Card */}
            <Link to="/women" className="block h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
              <div 
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in cursor-pointer h-full"
                style={{ animationDelay: '400ms' }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: "url('/src/assets/img/banners/zapatilla-banner-mujer.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Carousel section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center bg-white py-8 md:py-0">
        <div className="container mx-auto px-4 w-full">
          <div className="animate-slide-up">
            <ImageCarousel
              images={carouselImages}
              title={carouselConfig.title}
              autoPlay={carouselConfig.autoPlay}
              interval={carouselConfig.interval}
            />
          </div>
        </div>
      </section>

      {/* Featured players section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center bg-neutral-100 py-8 md:py-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-800 mb-4 md:mb-6">Featured Athletes</h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto px-4">Get inspired by the legends of the game</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 max-w-7xl mx-auto">
            {players.map((player, index) => (
              <div 
                key={player.id}
                className="animate-bounce-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <PlayerCard {...player} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Footer Section - Full Screen Combined */}
      <section className="min-h-screen flex flex-col bg-neutral-800">
        {/* CTA Section */}
        <div className="flex-1 flex items-center justify-center py-8 md:py-0">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 md:mb-8">
                Ready to Step Up Your Game?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-neutral-300 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
                Join thousands of sneaker enthusiasts and discover your next favorite pair
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                <button 
                  onClick={handleBrowseCollection}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 md:px-10 py-3 md:py-5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm md:text-lg"
                >
                  Browse Collection
                </button>
                <button 
                  onClick={handleLearnMore}
                  className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-6 md:px-10 py-3 md:py-5 rounded-full font-semibold transition-all duration-300 text-sm md:text-lg"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-auto">
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default Home; 