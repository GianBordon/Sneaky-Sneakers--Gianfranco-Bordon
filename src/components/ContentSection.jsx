import React from "react";

const ContentSection = ({ 
  title, 
  content,
  image,
  imageAlt,
  reverse = false,
  className = "" 
}) => (
  <section className={`py-16 md:py-20 ${className}`}>
    <div className="container mx-auto px-4">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>
        {/* Text Content */}
        <div className={`space-y-6 ${reverse ? 'lg:col-start-2' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-800 mb-6">
            {title}
          </h2>
          <div className="text-lg text-neutral-600 leading-relaxed space-y-4">
            {content}
          </div>
        </div>
        
        {/* Image */}
        {image && (
          <div className={`${reverse ? 'lg:col-start-1' : ''}`}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={image} 
                alt={imageAlt || title}
                className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default ContentSection; 