import React from "react";

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  onAddToCart, 
  showAddToCart = true,
  className = "" 
}) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ id, name, price, image });
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${className}`}>
      <img src={image} alt={name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{price}</p>
        {showAddToCart && (
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard; 