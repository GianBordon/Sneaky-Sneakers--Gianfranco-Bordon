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
import { useSupabase } from "../hooks/useSupabase";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { getPlayers, getProducts, getBrands, isLoading: supabaseLoading, error } = useSupabase();
  const [players, setPlayers] = useState([]);
  const [carouselData, setCarouselData] = useState({ images: [], links: [] });
  const [brands, setBrands] = useState([]);

  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Cargar jugadores desde Supabase
        const playersData = await getPlayers();
        
        // Cargar productos destacados desde Supabase
        const productsData = await getProducts();
        
        // Cargar marcas desde Supabase
        const brandsData = await getBrands();
        
        // Procesar jugadores
        if (playersData && playersData.length > 0) {
          const mappedPlayers = playersData.map((player, index) => {
            // Crear path específico para jugadores conocidos
            let path;
            if (player.name.toLowerCase().includes('harden')) {
              path = '/james-harden';
            } else if (player.name.toLowerCase().includes('lebron') || (player.name.toLowerCase().includes('james') && !player.name.toLowerCase().includes('harden'))) {
              path = '/lebron-james';
            } else if (player.name.toLowerCase().includes('kevin') || player.name.toLowerCase().includes('durant') || player.name.toLowerCase().includes('kd')) {
              path = '/kevin-durant';
            } else if (player.name.toLowerCase().includes('paul') || player.name.toLowerCase().includes('george')) {
              path = '/paul-george';
            } else if (player.name.toLowerCase().includes('giannis') || player.name.toLowerCase().includes('antetokounmpo')) {
              path = '/giannis-antetokounmpo';
            } else {
              path = `/player/${player.id}`;
            }
            
            return {
              id: player.id || `player-${index}`,
              name: player.name,
              path: path,
              image: player.image || '/src/assets/img/jugadores/default-player.webp',
              team: player.team,
              position: player.position,
              description: player.description,
              stats: player.stats,
              featured: player.featured
            };
          });
          setPlayers(mappedPlayers);
        } else {
          setPlayers([]);
        }

        // Procesar productos para el carrusel
        if (productsData && productsData.length > 0) {
          // Tomar los primeros 5 productos destacados o con mejor rating
          const featuredProducts = productsData
            .filter(product => product.featured || (product.rating && product.rating >= 4))
            .slice(0, 5);
          
          // Crear datos del carrusel con imágenes y links reales de productos
          const carouselImages = featuredProducts.map(product => product.image || '/src/assets/img/default-product.webp');
          const carouselLinks = featuredProducts.map(product => `/product/${product.id}`);
          
          setCarouselData({
            images: carouselImages,
            links: carouselLinks
          });
        } else {
          setCarouselData({ images: [], links: [] });
        }

        // Procesar marcas desde Supabase
        if (brandsData && brandsData.length > 0) {
          const mappedBrands = brandsData.map(brand => ({
            id: brand.id,
            name: brand.name,
            image: brand.logo_url || `/src/assets/img/seccion-zapas/${brand.name.toLowerCase()}.webp`,
            description: brand.description,
            path: `/all-products?brand=${brand.name.toLowerCase()}`
          }));
          setBrands(mappedBrands);
        } else {
          setBrands([]);
        }
      } catch (error) {
        console.error("Error loading data from Supabase:", error);
        setPlayers([]);
        setCarouselData({ images: [], links: [] });
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [getPlayers, getProducts, getBrands]);

  const handleShopNow = () => {
    navigate('/all-products');
  };

  const handleBrowseCollection = () => {
    navigate('/all-products');
  };

  const handleLearnMore = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading || supabaseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    console.error("Supabase error:", error);
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-bold text-white mb-6 md:mb-8">
              Discover Your
              <span className="block text-cyan-400 animate-float">Perfect Fit</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
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
          <div className="text-center mb-12 md:mb-16 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-4 md:mb-6">Featured Brands</h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto px-4">Discover the world's most iconic sneaker brands</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
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
                {/* Men Label */}
                <div className="absolute bottom-6 right-6">
                  <span className="bg-transparent text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg border-2 border-white/30 backdrop-blur-sm">
                    Men
                  </span>
                </div>
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
                {/* Women Label */}
                <div className="absolute bottom-6 right-6">
                  <span className="bg-transparent text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg border-2 border-white/30 backdrop-blur-sm">
                    Women
                  </span>
                </div>
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
              images={carouselData.images}
              title="Featured Products"
              autoPlay={true}
              interval={5000}
              productLinks={carouselData.links}
            />
          </div>
        </div>
      </section>

      {/* Kids & AllProducts Section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center bg-neutral-100 py-8 md:py-0">
        <div className="container mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
            {/* Kids Category Card */}
            <Link to="/kids" className="block h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
              <div 
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in cursor-pointer h-full"
                style={{ animationDelay: '200ms' }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: "url('/src/assets/img/banners/zapatilla-banner-kids.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                {/* Kids Label */}
                <div className="absolute bottom-6 right-6">
                  <span className="bg-transparent text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg border-2 border-white/30 backdrop-blur-sm">
                    Kids
                  </span>
                </div>
              </div>
            </Link>

            {/* AllProducts Category Card */}
            <Link to="/all-products" className="block h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
              <div 
                className="group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in cursor-pointer h-full"
                style={{ animationDelay: '400ms' }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: "url('/src/assets/img/banners/zapatillas-banner-allProducts.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                {/* AllProducts Label */}
                <div className="absolute bottom-6 right-6">
                  <span className="bg-transparent text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg border-2 border-white/30 backdrop-blur-sm">
                    All Products
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured players section - Full Screen */}
      <section className="min-h-screen flex items-center justify-center bg-white py-8 md:py-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-4 md:mb-6">Featured Athletes</h2>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto px-4">Get inspired by the legends of the game</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 max-w-7xl mx-auto">
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 md:mb-8">
                Ready to Step Up Your Game?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-neutral-300 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
                Join thousands of sneaker enthusiasts and discover your next favorite pair
              </p>
              <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center">
                <button 
                  onClick={handleBrowseCollection}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                >
                  Browse Collection
                </button>
                <button 
                  onClick={handleLearnMore}
                  className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
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