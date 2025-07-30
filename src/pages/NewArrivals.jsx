import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const NewArrivals = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductsByCategory, isLoading: supabaseLoading, error } = useSupabase();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [displayedProducts, setDisplayedProducts] = useState(8);
  const [loading, setLoading] = useState(true);
  const [allNewProducts, setAllNewProducts] = useState([]);
  
  // Filtrar productos según el filtro seleccionado
  const getFilteredProducts = () => {
    let filtered = allNewProducts;
    
    // Aplicar filtros por período (simulado basado en el precio y rating)
    if (selectedFilter === 'week') {
      // Productos más nuevos (precio más alto o rating más alto)
      filtered = filtered.filter(product => 
        product.price > 150 || product.rating > 4.5
      );
    } else if (selectedFilter === 'month') {
      // Productos del mes (precio medio)
      filtered = filtered.filter(product => 
        product.price >= 100 && product.price <= 200
      );
    } else if (selectedFilter === 'limited') {
      // Productos limitados (precio más alto)
      filtered = filtered.filter(product => 
        product.price > 200 || product.rating >= 4.8
      );
    }
    
    // Aplicar ordenamiento
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
      default:
        // Mantener orden original (asumiendo que los últimos agregados están al final)
        break;
    }
    
    return filtered;
  };
  
  const filteredProducts = getFilteredProducts();
  const displayedFilteredProducts = filteredProducts.slice(0, displayedProducts);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await getProductsByCategory('new-arrivals');
        setAllNewProducts(products || []);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [getProductsByCategory]);

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

  const handleShopNew = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewAll = () => {
    navigate('/all-products');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <SectionNavigation />

      {/* Hero Section - Full Screen with Background Image */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/src/assets/img/banners/banner-new_arrivals-page.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-neutral-900/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-white font-bold text-lg">🆕 JUST DROPPED</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6">
              New
              <span className="block text-cyan-400 animate-float">Arrivals</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
              Be the first to discover the latest sneaker releases and exclusive drops
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleShopNew}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                Shop New
              </button>
              <button 
                onClick={handleViewAll}
                className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
              >
                View All
              </button>
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
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All New
              </button>
              <button 
                onClick={() => handleFilterChange('week')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === 'week' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                This Week
              </button>
              <button 
                onClick={() => handleFilterChange('month')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === 'month' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                This Month
              </button>
              <button 
                onClick={() => handleFilterChange('limited')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === 'limited' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Limited Edition
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-neutral-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="latest">Latest First</option>
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
              {filteredProducts.length} New Products
            </h2>
            {selectedFilter !== 'all' && (
              <p className="text-indigo-600 font-semibold mb-2">
                Showing {selectedFilter} products
              </p>
            )}
            <p className="text-neutral-600">Fresh releases and exclusive drops</p>
          </div>
          
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedFilteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-scale-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative">
                    {/* New Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        NEW
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
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Load More Products
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
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">First Access</h3>
              <p className="text-neutral-600">Get early access to new releases</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Authentic</h3>
              <p className="text-neutral-600">100% authentic products guaranteed</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Fast Shipping</h3>
              <p className="text-neutral-600">Quick delivery on all new arrivals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-display font-bold text-neutral-800 mb-4">Coming Soon</h2>
            <p className="text-neutral-600">Stay tuned for these upcoming releases</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl text-center animate-slide-up">
              <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Limited Editions</h3>
              <p className="text-neutral-600">Exclusive drops with limited quantities</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Collaborations</h3>
              <p className="text-neutral-600">Special releases from top brands</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">🔥</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Hot Drops</h3>
              <p className="text-neutral-600">The most anticipated releases</p>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection onSubmit={handleNewsletterSubmit} />
      <FooterLinks />
      <Footer />
    </div>
  );
};

export default NewArrivals; 