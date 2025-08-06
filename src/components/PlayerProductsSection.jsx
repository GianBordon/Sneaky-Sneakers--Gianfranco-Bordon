import React, { useState } from "react";
import { ProductCard } from "./index";
import { useCart } from "../hooks";

const PlayerProductsSection = ({ 
  title, 
  description, 
  products = [], 
  isLoading = false,
  playerName = "Player"
}) => {
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (product) => {
    setIsAddingToCart(true);
    try {
      const result = await addToCart(product.id, 1);
      if (result.success) {
        // El carrito se actualiza automáticamente en el hook
        alert('Producto agregado al carrito');
      } else {
        alert('Error al agregar al carrito');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error al agregar al carrito');
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Determinar el número de columnas basado en la cantidad de productos
  const getGridCols = (productCount) => {
    if (productCount <= 2) return "grid-cols-1 md:grid-cols-2";
    if (productCount <= 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (productCount <= 6) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  };

  const gridColsClass = getGridCols(products.length);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-slide-up">
          <h2 className="text-2xl font-display font-bold text-neutral-800 mb-3">
            {title}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm">
            {description}
          </p>
        </div>
        
        {isLoading ? (
          <div className={`grid ${gridColsClass} gap-4`}>
            {[...Array(Math.min(products.length || 4, 8))].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-neutral-200 h-48 rounded-xl mb-3"></div>
                <div className="bg-neutral-200 h-3 rounded mb-2"></div>
                <div className="bg-neutral-200 h-3 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid ${gridColsClass} gap-4`}>
            {products.map((product, index) => (
              <div 
                key={product.id || index}
                className="animate-scale-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={`$${product.price}`}
                    image={product.image}
                    onAddToCart={() => handleAddToCart(product)}
                    priority={index < 10}
                    size="compact"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PlayerProductsSection; 