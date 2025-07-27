import React, { useState } from "react";

const ImageCarousel = ({ 
  images, 
  title,
  autoPlay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
  className = ""
}) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  React.useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto max-w-xl">
        {title && <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>}
        <div className="relative flex items-center justify-center">
          {showArrows && (
            <button 
              onClick={prevSlide} 
              className="absolute left-0 z-10 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition"
            >
              <span className="text-2xl">&#8592;</span>
            </button>
          )}
          
          <img
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="rounded-lg w-full h-64 object-cover shadow-lg"
          />
          
          {showArrows && (
            <button 
              onClick={nextSlide} 
              className="absolute right-0 z-10 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 transition"
            >
              <span className="text-2xl">&#8594;</span>
            </button>
          )}
        </div>
        
        {showDots && (
          <div className="flex justify-center gap-2 mt-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${idx === current ? 'bg-black' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageCarousel; 