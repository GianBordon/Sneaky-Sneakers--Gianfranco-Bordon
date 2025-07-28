import React from "react";
import {
  SectionNavigation,
  PageBanner,
  ProductCard,
  NewsletterSection,
  Navbar,
  Footer
} from "../components";
import { getProductsByCategory } from "../data/products";
import { useCartSimple } from "../hooks";

const MenWithCart = () => {
  const { addToCart, loading, error } = useCartSimple();
  const menShoes = getProductsByCategory('men');

  const handleAddToCart = async (product) => {
    const result = await addToCart(product.id, 1);
    if (result.success) {
      console.log("Producto agregado al carrito:", product.name);
      alert(`¡${product.name} agregado al carrito!`);
    } else {
      console.error("Error al agregar al carrito:", result.error);
      alert("Error al agregar al carrito");
    }
  };

  const handleNewsletterSubmit = (email) => {
    console.log("Newsletter subscription:", email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Navbar />
      <SectionNavigation />
      <PageBanner title="Sneaky Sneakers" />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
              Men's Collection
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              🛒 Con Carrito Simplificado - Discover the latest trends in men's sneakers
            </p>
          </div>
        </div>
      </section>

      {/* Error Alert */}
      {error && (
        <section className="py-4 bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-slide-down">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Error: {error}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-display font-bold text-neutral-800 mb-4">
              {menShoes.length} Products Available
            </h2>
            <p className="text-neutral-600">Handpicked selection of premium men's sneakers with simplified cart</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menShoes.map((shoe, index) => (
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
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
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
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Simple Cart</h3>
              <p className="text-neutral-600">Easy-to-use shopping cart functionality</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Authentic Products</h3>
              <p className="text-neutral-600">100% authentic sneakers guaranteed</p>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Free Shipping</h3>
              <p className="text-neutral-600">Free shipping on orders over $50</p>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection onSubmit={handleNewsletterSubmit} />
      <Footer />
    </div>
  );
};

export default MenWithCart; 