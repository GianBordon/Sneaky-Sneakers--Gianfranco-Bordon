import React, { useState } from "react";

const NewsletterSection = ({ 
  title = "SUSCRIBITE AL NEWSLETTER",
  placeholder = "Ingrese su E-mail",
  buttonText = "Suscribirse",
  onSubmit 
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email);
    } else {
      console.log("Newsletter subscription:", email);
    }
    setEmail("");
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection; 