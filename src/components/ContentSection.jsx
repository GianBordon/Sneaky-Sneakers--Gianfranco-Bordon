import React from "react";

const ContentSection = ({ 
  title, 
  content,
  className = "" 
}) => (
  <section className={`py-8 ${className}`}>
    <div className="container mx-auto max-w-3xl text-center">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="text-gray-700 leading-relaxed">
        {content}
      </div>
    </div>
  </section>
);

export default ContentSection; 