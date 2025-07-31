import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const AllProducts = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { getProducts, isLoading: supabaseLoading, error } = useSupabase();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [displayedProducts, setDisplayedProducts] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  
  // Obtener parámetros de la URL
  const brandFromUrl = searchParams.get('brand');
  
  // Filtrar productos por marca si se especifica en la URL
  const getFilteredProducts = () => {
    let filtered = allProducts;
    
    // Aplicar filtros por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Aplicar filtros por marca
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => 
        product.brand.toLowerCase() === selectedBrand.toLowerCase()
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
      case 'newest':
        // Mantener orden original (asumiendo que los últimos agregados están al final)
        break;
      case 'featured':
      default:
        // Mostrar productos destacados primero
        filtered = [...filtered].sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
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
        const products = await getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [getProducts]);

  // Actualizar filtros cuando cambia la URL
  useEffect(() => {
    if (brandFromUrl) {
      setSelectedBrand(brandFromUrl);
    }
  }, [brandFromUrl]);

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
  };

  const handleBrowseAll = () => {
    // Scroll to products section
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewCategories = () => {
    // Scroll to categories section
    document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setDisplayedProducts(8); // Reset displayed products when filter changes
    if (category !== 'all') {
      navigate(`/${category}`);
    }
  };

  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
    setDisplayedProducts(8); // Reset displayed products when filter changes
    if (brand === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ brand });
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setDisplayedProducts(8); // Reset displayed products when sort changes
  };

  const handleLoadMore = () => {
    setDisplayedProducts(prev => Math.min(prev + 8, filteredProducts.length));
  };

  const handleCategoryClick = (category) => {
    navigate(`/${category}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <SectionNavigation />

      {/* Hero Section - Full Screen with Background Image */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/src/assets/img/banners/banner-all_products-page.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-neutral-900/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6">
              All
              <span className="block text-cyan-400 animate-float">Products</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
              Explore our complete collection of premium sneakers from the world's top brands
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleBrowseAll}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                Browse All
              </button>
              <button 
                onClick={handleViewCategories}
                className="border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
              >
                View Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 animate-slide-down">
            <div className="flex flex-wrap items-center space-x-4">
              <span className="text-neutral-600 font-medium">Filter by:</span>
              <button 
                onClick={() => handleCategoryFilter('all')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => handleCategoryFilter('men')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === 'men' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Men
              </button>
              <button 
                onClick={() => handleCategoryFilter('women')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === 'women' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Women
              </button>
              <button 
                onClick={() => handleCategoryFilter('kids')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === 'kids' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Kids
              </button>
            </div>
            
            {/* Brand Filters */}
            <div className="flex flex-wrap items-center space-x-4">
              <span className="text-neutral-600 font-medium">Brand:</span>
              <button 
                onClick={() => handleBrandFilter('all')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedBrand === 'all' 
                    ? 'bg-cyan-100 text-cyan-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All Brands
              </button>
              <button 
                onClick={() => handleBrandFilter('nike')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedBrand === 'nike' 
                    ? 'bg-cyan-100 text-cyan-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Nike
              </button>
              <button 
                onClick={() => handleBrandFilter('jordan')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedBrand === 'jordan' 
                    ? 'bg-cyan-100 text-cyan-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Jordan
              </button>
              <button 
                onClick={() => handleBrandFilter('adidas')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedBrand === 'adidas' 
                    ? 'bg-cyan-100 text-cyan-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Adidas
              </button>
              <button 
                onClick={() => handleBrandFilter('nike-sb')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedBrand === 'nike-sb' 
                    ? 'bg-cyan-100 text-cyan-700' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Nike SB
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-neutral-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
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
              {filteredProducts.length} Products Available
            </h2>
            {brandFromUrl && brandFromUrl !== 'all' && (
              <p className="text-cyan-600 font-semibold mb-2">
                Showing products from {brandFromUrl.charAt(0).toUpperCase() + brandFromUrl.slice(1)}
              </p>
            )}
            {selectedCategory !== 'all' && (
              <p className="text-emerald-600 font-semibold mb-2">
                Showing {selectedCategory} products
              </p>
            )}
            <p className="text-neutral-600">Complete collection of premium sneakers</p>
          </div>
          
          {isLoading || supabaseLoading ? (
            <LoadingSkeleton type="product" count={8} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {displayedFilteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-scale-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
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
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
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
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Free Shipping</h3>
              <p className="text-neutral-600">Free shipping on orders over $50</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Authentic Products</h3>
              <p className="text-neutral-600">100% authentic sneakers guaranteed</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Easy Returns</h3>
              <p className="text-neutral-600">30-day return policy for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-display font-bold text-neutral-800 mb-4">Shop by Category</h2>
            <p className="text-neutral-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div 
              onClick={() => handleCategoryClick('men')}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center animate-slide-up group cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">👨</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Men</h3>
              <p className="text-neutral-600">Athletic & Lifestyle</p>
            </div>
            
            <div 
              onClick={() => handleCategoryClick('women')}
              className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl text-center animate-slide-up group cursor-pointer hover:shadow-lg transition-all duration-300" 
              style={{ animationDelay: '100ms' }}
            >
              <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">👩</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Women</h3>
              <p className="text-neutral-600">Style & Performance</p>
            </div>
            
            <div 
              onClick={() => handleCategoryClick('kids')}
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl text-center animate-slide-up group cursor-pointer hover:shadow-lg transition-all duration-300" 
              style={{ animationDelay: '200ms' }}
            >
              <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">👶</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Kids</h3>
              <p className="text-neutral-600">Fun & Comfortable</p>
            </div>
            
            <div 
              onClick={() => handleCategoryClick('sale')}
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl text-center animate-slide-up group cursor-pointer hover:shadow-lg transition-all duration-300" 
              style={{ animationDelay: '300ms' }}
            >
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Sale</h3>
              <p className="text-neutral-600">Great Deals</p>
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

export default AllProducts; 