import React, { useState, useEffect } from "react";
import {
  SectionNavigation,
  PageBanner,
  ProductCard,
  NewsletterSection,
  FooterLinks,
  Footer,
  LoadingSkeleton
} from "../components";
import { useCart } from "../hooks";
import { useSupabase } from "../hooks/useSupabase";

const Sale = () => {
  const { addToCart } = useCart();
  const { getProductsByCategory, isLoading: _supabaseLoading, error: _error } = useSupabase();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('biggest-discount');
  const [displayedProducts, setDisplayedProducts] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 12,
    seconds: 45
  });
  const [allSaleProducts, setAllSaleProducts] = useState([]);
  
  // Filtrar productos según el filtro seleccionado
  const getFilteredProducts = () => {
    let filtered = allSaleProducts;
    
    // Aplicar filtros por descuento
    if (selectedFilter === '50-off') {
      // Productos con 50% o más de descuento
      filtered = filtered.filter(product => {
        const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
        return discount >= 50;
      });
    } else if (selectedFilter === '30-off') {
      // Productos con 30% o más de descuento
      filtered = filtered.filter(product => {
        const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
        return discount >= 30;
      });
    } else if (selectedFilter === 'under-50') {
      // Productos bajo $50
      filtered = filtered.filter(product => product.price < 50);
    }
    
    // Aplicar ordenamiento
    switch (sortBy) {
      case 'biggest-discount':
        filtered = [...filtered].sort((a, b) => {
          const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
          const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
          return discountB - discountA;
        });
        break;
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    return filtered;
  };
  
  const filteredProducts = getFilteredProducts();
  const displayedFilteredProducts = filteredProducts.slice(0, displayedProducts);

  // Cargar productos desde Supabase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const products = await getProductsByCategory('sale');
        setAllSaleProducts(products || []);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [getProductsByCategory]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = async (product) => {
    const result = await addToCart(product.id, 1);
    if (result.success) {
      console.log("Producto agregado al carrito:", product.name);
    } else {
      console.error("Error al agregar al carrito:", result.error);
    }
  };

  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
  };

  const handleShopNow = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewAllDeals = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setDisplayedProducts(8); // Reset displayed products when filter changes
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setDisplayedProducts(8); // Reset displayed products when sort changes
  };

  const handleLoadMore = () => {
    setDisplayedProducts(prev => Math.min(prev + 8, filteredProducts.length));
  };

  const handleShopSaleNow = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <SectionNavigation />

      {/* Hero Section - Full Screen with Background Image */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/src/assets/img/banners/banner-sale-page.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-neutral-900/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-white font-bold text-lg">🔥 LIMITED TIME OFFER</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6">
              MEGA
              <span className="block text-cyan-400 animate-float">SALE</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
              Up to 70% off on selected sneakers. Don't miss out on these incredible deals!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleShopNow}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                Shop Now
              </button>
              <button 
                onClick={handleViewAllDeals}
                className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
              >
                View All Deals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="text-center animate-slide-down">
            <h2 className="text-2xl font-display font-bold text-neutral-800 mb-4">Sale Ends In</h2>
            <div className="flex justify-center space-x-4">
              <div className="bg-red-100 rounded-lg p-4 min-w-[80px]">
                <div className="text-2xl font-bold text-red-600">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-sm text-red-500">Hours</div>
              </div>
              <div className="bg-red-100 rounded-lg p-4 min-w-[80px]">
                <div className="text-2xl font-bold text-red-600">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-sm text-red-500">Minutes</div>
              </div>
              <div className="bg-red-100 rounded-lg p-4 min-w-[80px]">
                <div className="text-2xl font-bold text-red-600">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-sm text-red-500">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 animate-slide-down">
            <div className="flex items-center space-x-4">
              <span className="text-neutral-600 font-medium">Filter by:</span>
              <button 
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === 'all' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All Deals
              </button>
              <button 
                onClick={() => handleFilterChange('50-off')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === '50-off' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                50%+ Off
              </button>
              <button 
                onClick={() => handleFilterChange('30-off')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === '30-off' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                30%+ Off
              </button>
              <button 
                onClick={() => handleFilterChange('under-50')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === 'under-50' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Under $50
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-neutral-600 whitespace-nowrap">Sort by:</span>
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="biggest-discount">Biggest Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-display font-bold text-neutral-800 mb-4">
              {filteredProducts.length} Products on Sale
            </h2>
            {selectedFilter !== 'all' && (
              <p className="text-red-600 font-semibold mb-2">
                Showing {selectedFilter} products
              </p>
            )}
            <p className="text-neutral-600">Hurry! These deals won't last long</p>
          </div>
          
          {isLoading ? (
            <LoadingSkeleton type="product" count={8} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {displayedFilteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-scale-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative">
                    {/* Sale Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        SALE
                      </div>
                    </div>
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={`$${product.price}`}
                      image={product.image}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          <div className="text-center mt-12 animate-fade-in">
            {displayedProducts < filteredProducts.length && (
              <button 
                onClick={handleLoadMore}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Load More Deals
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Best Prices</h3>
              <p className="text-neutral-600">Guaranteed lowest prices on all sale items</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Free Shipping</h3>
              <p className="text-neutral-600">Free shipping on all sale orders</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Authentic Products</h3>
              <p className="text-neutral-600">All sale items are 100% authentic</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Don't Miss These Deals!
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Limited time offers on premium sneakers. Shop now before they're gone!
            </p>
            <button 
              onClick={handleShopSaleNow}
              className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Shop Sale Now
            </button>
          </div>
        </div>
      </section>

      <NewsletterSection onSubmit={handleNewsletterSubmit} />
      <FooterLinks />
      <Footer />
    </div>
  );
};

export default Sale; 