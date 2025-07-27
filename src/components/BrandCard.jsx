import React from "react";
import { Link } from "react-router-dom";

const BrandCard = ({ 
  name, 
  image, 
  link = "/all-products",
  className = "" 
}) => (
  <div className={`bg-gray-100 rounded-lg shadow p-6 w-40 text-center ${className}`}>
    {image && (
      <img 
        src={image} 
        alt={name} 
        className="w-16 h-16 object-contain mx-auto mb-3"
      />
    )}
    <Link to={link}>
      <h3 className="text-lg font-semibold">{name}</h3>
    </Link>
  </div>
);

export default BrandCard; 