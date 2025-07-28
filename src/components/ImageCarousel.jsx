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
    <section className={`py-4 md:py-8 ${className}`}>
      <div className="container mx-auto max-w-5xl md:max-w-7xl">
        {title && <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 md:mb-12 text-center text-neutral-800">{title}</h2>}
        <div className="relative flex items-center justify-center">
          {showArrows && (
            <button 
              onClick={prevSlide} 
              className="absolute left-2 md:left-6 z-10 bg-white rounded-full p-3 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-neutral-200"
            >
              <span className="text-xl md:text-3xl text-neutral-800">&#8592;</span>
            </button>
          )}
          
          <div className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-xl border border-neutral-200">
            <img
              src={images[current]}
              alt={`Slide ${current + 1}`}
              className="rounded-xl md:rounded-2xl w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] object-cover shadow-lg"
            />
          </div>
          
          {showArrows && (
            <button 
              onClick={nextSlide} 
              className="absolute right-2 md:right-6 z-10 bg-white rounded-full p-3 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-neutral-200"
            >
              <span className="text-xl md:text-3xl text-neutral-800">&#8594;</span>
            </button>
          )}
        </div>
        
        {showDots && (
          <div className="flex justify-center gap-3 md:gap-4 mt-6 md:mt-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 md:w-5 md:h-5 rounded-full transition-all duration-300 ${idx === current ? 'bg-cyan-500 scale-125' : 'bg-neutral-300 hover:bg-neutral-400'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageCarousel; 