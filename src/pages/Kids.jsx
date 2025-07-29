import React from "react";
import {
  SectionNavigation,
  PageBanner,
  ProductCard,
  NewsletterSection,
  FooterLinks,
  Navbar,
  Footer
} from "../components";
import { getProductsByCategory } from "../data/products";
import { useCart } from "../hooks";

const Kids = () => {
  const { addToCart } = useCart();
  const kidsShoes = getProductsByCategory('kids');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Navbar />
      <SectionNavigation />

      {/* Hero Section - Full Screen with Background Image */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/src/assets/img/banners/banner-kids-page.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-neutral-900/70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6">
              Kids
              <span className="block text-cyan-400 animate-float">Collection</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
              Fun, comfortable, and durable sneakers for the little ones. Let them explore the world in style!
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
              <button className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors">
                All
              </button>
              <button className="px-4 py-2 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
                Boys
              </button>
              <button className="px-4 py-2 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
                Girls
              </button>
              <button className="px-4 py-2 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
                Toddlers
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-neutral-600">Sort by:</span>
              <select className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                <option>Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
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
              {kidsShoes.length} Products Available
            </h2>
            <p className="text-neutral-600">Colorful and comfortable sneakers for every adventure</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {kidsShoes.map((shoe, index) => (
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

          {/* Load More Button */}
          <div className="text-center mt-12 animate-fade-in">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Load More Products
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-slide-up">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Durable & Safe</h3>
              <p className="text-neutral-600">Built to withstand active play and adventures</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Easy to Clean</h3>
              <p className="text-neutral-600">Materials that resist stains and are easy to maintain</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Comfortable Fit</h3>
              <p className="text-neutral-600">Designed for growing feet with proper support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Age Guide Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-display font-bold text-neutral-800 mb-4">Size Guide</h2>
            <p className="text-neutral-600">Find the perfect fit for your little one</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center animate-slide-up">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1-3</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Toddlers</h3>
              <p className="text-neutral-600">Sizes 1-3 years</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4-7</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Little Kids</h3>
              <p className="text-neutral-600">Sizes 4-7 years</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">8-12</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Big Kids</h3>
              <p className="text-neutral-600">Sizes 8-12 years</p>
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

export default Kids; 