import React from "react";

const ImageGrid = ({ 
  images, 
  title,
  basePath = "/src/assets/img/",
  className = "" 
}) => (
  <>
    {/* Section title */}
    <section className="py-8">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
      </div>
    </section>

    {/* Images grid */}
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={`${basePath}${img}`}
            alt={img.split("/")[1]}
            className="rounded-lg shadow object-cover w-full h-32 sm:h-40 md:h-48 lg:h-56 hover:shadow-lg transition-shadow cursor-pointer"
          />
        ))}
      </div>
    </section>
  </>
);

export default ImageGrid; 