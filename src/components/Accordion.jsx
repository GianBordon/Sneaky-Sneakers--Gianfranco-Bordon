import React, { useState } from "react";

const Accordion = ({ 
  items, 
  title,
  className = "" 
}) => {
  const [openAccordion, setOpenAccordion] = useState(0);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>}
        
        <div className="max-w-4xl mx-auto">
          {items.map((item, index) => (
            <div key={index} className="mb-4 border border-gray-200 rounded-lg">
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">{item.title}</span>
                  <span className={`transform transition-transform duration-200 ${openAccordion === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>
              
              {openAccordion === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="text-gray-700 leading-relaxed">
                    {item.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accordion; 