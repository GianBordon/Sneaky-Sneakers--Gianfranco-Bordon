import React from "react";
import { 
  SectionNavigation, 
  PageBanner, 
  ProductCard, 
  NewsletterSection,
  Navbar,
  Footer 
} from "../components";
import { ProductService } from "../services";
import { useCart } from "../hooks";

const AllProducts = () => {
  const { addToCart } = useCart();
  const allProducts = ProductService.getAllProducts();

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
    // Aquí iría la lógica para suscribir al newsletter
  };

  return (
    <>
      <Navbar />
      <SectionNavigation />
      <PageBanner title="Sneaky Sneakers" />
      
      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">All Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={`$${product.price}`}
                image={product.image}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
      
      <NewsletterSection 
        title="SUBSCRIBE TO THE NEWSLETTER"
        placeholder="Enter your E-mail"
        buttonText="Subscribe"
        onSubmit={handleNewsletterSubmit}
      />
      
      <Footer />
    </>
  );
};

export default AllProducts; 