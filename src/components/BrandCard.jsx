import React from "react";
import { Link } from "react-router-dom";

const BrandCard = ({ 
  id, 
  name, 
  image, 
  description, 
  path = `/brand/${id}`,
  className = "" 
}) => (
  <Link to={path} className={`block group ${className}`}>
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-4 md:p-6 text-center border border-neutral-200 h-48 md:h-56 flex flex-col">
      <div className="flex flex-col items-center justify-center h-full">
        {image && (
          <div className="mb-4 md:mb-6 flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-lg flex items-center justify-center">
              <img 
                src={image} 
                alt={name} 
                className="w-12 h-12 md:w-16 md:h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/src/assets/img/default-product.webp';
                }}
              />
            </div>
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-base md:text-lg font-semibold text-neutral-800 group-hover:text-cyan-600 transition-colors mb-2 md:mb-3 line-clamp-2">{name}</h3>
          {description && (
            <p className="text-sm md:text-base text-neutral-600 group-hover:text-neutral-700 transition-colors line-clamp-3">{description}</p>
          )}
        </div>
      </div>
    </div>
  </Link>
);

export default BrandCard; 