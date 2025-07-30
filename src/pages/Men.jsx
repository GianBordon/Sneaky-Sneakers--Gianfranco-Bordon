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

const Men = () => {
  const { addToCart } = useCart();
  const { getProductsByCategory, isLoading: supabaseLoading, error } = useSupabase();
  const [isLoading, setIsLoading] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState(8);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [allMenShoes, setAllMenShoes] = useState([]);
  
  // Filtrar productos según el filtro seleccionado
  const getFilteredProducts = () => {
    let filtered = allMenShoes;
    
    // Aplicar filtros por tipo (simulado basado en el nombre del producto)
    if (selectedFilter === 'running') {
      filtered = filtered.filter(shoe => 
        shoe.name.toLowerCase().includes('run') || 
        shoe.name.toLowerCase().includes('zoom') ||
        shoe.name.toLowerCase().includes('air max')
      );
    } else if (selectedFilter === 'basketball') {
      filtered = filtered.filter(shoe => 
        shoe.name.toLowerCase().includes('jordan') || 
        shoe.name.toLowerCase().includes('basketball') ||
        shoe.name.toLowerCase().includes('air force')
      );
    } else if (selectedFilter === 'lifestyle') {
      filtered = filtered.filter(shoe => 
        shoe.name.toLowerCase().includes('lifestyle') || 
        shoe.name.toLowerCase().includes('casual') ||
        shoe.name.toLowerCase().includes('air force 1')
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

  // Cargar productos desde Supabase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const products = await getProductsByCategory('men');
        setAllMenShoes(products);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
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

  // Mostrar error si hay problema con Supabase
  if (error) {
    console.error("Supabase error:", error);
  }

  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
    // Aquí iría la lógica para suscribir al newsletter
  };

  const handleLoadMore = () => {
    setDisplayedProducts(prev => Math.min(prev + 8, filteredProducts.length));
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setDisplayedProducts(8); // Reset displayed products when filter changes
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setDisplayedProducts(8); // Reset displayed products when sort changes
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <SectionNavigation />

      {/* Hero Section - Full Screen with Background Image */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/src/assets/img/banners/banner-man-page.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-neutral-900/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6">
              Men's
              <span className="block text-cyan-400 animate-float">Collection</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
              Discover the latest trends in men's sneakers. From classic to contemporary, find your perfect style.
            </p>
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
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => handleFilterChange('running')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === 'running' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Running
              </button>
              <button 
                onClick={() => handleFilterChange('basketball')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === 'basketball' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Basketball
              </button>
              <button 
                onClick={() => handleFilterChange('lifestyle')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === 'lifestyle' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Lifestyle
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-neutral-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-display font-bold text-neutral-800 mb-4">
              {filteredProducts.length} Products Available
            </h2>
            {selectedFilter !== 'all' && (
              <p className="text-primary-600 font-semibold mb-2">
                Showing {selectedFilter} products
              </p>
            )}
            <p className="text-neutral-600">Handpicked selection of premium men's sneakers</p>
          </div>
          
          {isLoading ? (
            <LoadingSkeleton type="product" count={8} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedFilteredProducts.map((shoe, index) => (
                <div 
                  key={shoe.id}
                  className="animate-scale-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                    <ProductCard
                      id={shoe.id}
                      name={shoe.name}
                      price={`$${shoe.price}`}
                      image={shoe.image}
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
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
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
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Free Shipping</h3>
              <p className="text-neutral-600">Free shipping on orders over $50</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Authentic Products</h3>
              <p className="text-neutral-600">100% authentic sneakers guaranteed</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Easy Returns</h3>
              <p className="text-neutral-600">30-day return policy for your peace of mind</p>
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

export default Men; 