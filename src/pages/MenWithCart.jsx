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
    <>
      <Navbar />
      <SectionNavigation />
      <PageBanner title="Sneaky Sneakers" />

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-600">
            🛒 Men's Collection (Con Carrito Simplificado)
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Error: {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menShoes.map((shoe) => (
              <ProductCard
                key={shoe.id}
                id={shoe.id}
                name={shoe.name}
                price={`$${shoe.price}`}
                image={shoe.image}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection onSubmit={handleNewsletterSubmit} />
      <Footer />
    </>
  );
};

export default MenWithCart; 