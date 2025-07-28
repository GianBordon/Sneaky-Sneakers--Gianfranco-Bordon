import React from "react";
import { Link } from "react-router-dom";

const PlayerCard = ({ 
  name, 
  path, 
  image, 
  showInfoButton = true,
  className = "" 
}) => (
  <div className={`bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-4 md:p-8 text-center border border-neutral-200 flex flex-col h-full ${className}`}>
    <div className="flex-1 flex flex-col items-center justify-center">
      {image && (
        <img 
          src={image} 
          alt={name} 
          className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full mx-auto mb-3 md:mb-4"
        />
      )}
      <Link to={path} className="flex-1 flex flex-col justify-center">
        <h3 className="text-base md:text-xl font-semibold text-neutral-800 hover:text-cyan-600 transition-colors mb-2 md:mb-3">{name}</h3>
      </Link>
    </div>
    {showInfoButton && (
      <div className="mt-auto pt-2 md:pt-4">
        <Link to={path} className="inline-block">
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-colors duration-300 text-sm md:text-lg">
            + Info
          </button>
        </Link>
      </div>
    )}
  </div>
);

export default PlayerCard; 