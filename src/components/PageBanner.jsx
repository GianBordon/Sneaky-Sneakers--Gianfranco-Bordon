import React from "react";

const PageBanner = ({ title, subtitle, backgroundImage, bgColor = "bg-gradient-to-r from-cyan-600 to-cyan-800", textColor = "text-white" }) => (
  <section 
    className={`relative min-h-[40vh] flex items-center justify-center ${bgColor} ${textColor} py-16 text-center overflow-hidden`}
    style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
  >
    {backgroundImage && <div className="absolute inset-0 bg-black/50"></div>}
    <div className="relative z-10 container mx-auto px-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 animate-fade-in">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto animate-slide-up">
          {subtitle}
        </p>
      )}
    </div>
  </section>
);

export default PageBanner; 