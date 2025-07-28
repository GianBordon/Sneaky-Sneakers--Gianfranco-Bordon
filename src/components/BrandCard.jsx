import React from "react";
import { Link } from "react-router-dom";

const BrandCard = ({ 
  name, 
  path, 
  image, 
  className = "" 
}) => (
  <Link to={path} className="block">
    <div className={`bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-4 md:p-8 text-center border border-neutral-200 ${className}`}>
      {image && (
        <img 
          src={image} 
          alt={name} 
          className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full mx-auto mb-3 md:mb-4"
        />
      )}
      <h3 className="text-lg md:text-xl font-semibold text-neutral-800 hover:text-cyan-600 transition-colors">{name}</h3>
    </div>
  </Link>
);

export default BrandCard; 