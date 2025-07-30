import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../hooks";

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  onAddToCart, 
  showAddToCart = true,
  className = "" 
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({ id, name, price, image });
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  return (
    <Link to={`/product/${id}`} className={`group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      <div className="relative">
        <img src={image} alt={name} className="w-full h-64 object-cover" />
        {/* Quick Action Buttons */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full transition-colors shadow-lg ${
              isInWishlist(id) 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <svg className="w-5 h-5" fill={isInWishlist(id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Add to Cart Button */}
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              className="bg-cyan-600 text-white p-2 rounded-full hover:bg-cyan-700 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-neutral-800 hover:text-cyan-600 transition-colors">{name}</h3>
        <p className="text-cyan-600 font-bold text-lg">{price}</p>
      </div>
    </Link>
  );
};

export default ProductCard; 