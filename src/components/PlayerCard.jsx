import React from "react";
import { Link } from "react-router-dom";

const PlayerCard = ({ 
  name, 
  path, 
  image, 
  showInfoButton = true,
  className = "" 
}) => (
  <div className={`bg-gray-100 rounded-lg shadow p-6 w-56 text-center ${className}`}>
    {image && (
      <img 
        src={image} 
        alt={name} 
        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
      />
    )}
    <Link to={path}>
      <h3 className="text-lg font-semibold">{name}</h3>
    </Link>
    {showInfoButton && (
      <Link to={path} className="mt-2 inline-block">
        <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition">
          + Info
        </button>
      </Link>
    )}
  </div>
);

export default PlayerCard; 