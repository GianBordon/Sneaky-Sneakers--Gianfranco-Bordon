import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const ImageCarousel = ({ 
  images, 
  title,
  autoPlay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
  className = "",
  productLinks = [] // Array de links para cada imagen
}) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => setCurrent((prev) => (prev + 1) % images.length), [images.length]);
  const prevSlide = useCallback(() => setCurrent((prev) => (prev - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide]);

  const handleImageClick = () => {
    if (productLinks && productLinks[current]) {
      // Navegar al producto si hay un link disponible
      window.location.href = productLinks[current];
    }
  };

  return (
    <section className={`py-4 md:py-8 ${className}`}>
      <div className="container mx-auto max-w-5xl md:max-w-6xl">
        {title && <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-6 md:mb-8 text-center text-neutral-800">{title}</h2>}
        <div className="relative flex items-center justify-center">
          {showArrows && (
            <button 
              onClick={prevSlide} 
              className="absolute left-2 md:left-4 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-neutral-200"
            >
              <span className="text-lg md:text-xl text-neutral-800">&#8592;</span>
            </button>
          )}
          
          <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 shadow-xl border border-neutral-200">
            <div 
              className={`rounded-lg md:rounded-xl w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105 ${
                productLinks && productLinks[current] ? 'hover:shadow-2xl' : ''
              }`}
              onClick={handleImageClick}
            >
              <img
                src={images[current]}
                alt={`Slide ${current + 1}`}
                className="w-full h-full object-cover rounded-lg md:rounded-xl"
              />
            </div>
          </div>
          
          {showArrows && (
            <button 
              onClick={nextSlide} 
              className="absolute right-2 md:right-4 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-neutral-200"
            >
              <span className="text-lg md:text-xl text-neutral-800">&#8594;</span>
            </button>
          )}
        </div>
        
        {showDots && (
          <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-6">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  idx === current ? 'bg-cyan-500 scale-125' : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageCarousel; 