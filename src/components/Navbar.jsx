import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl md:text-4xl font-bold text-neutral-800 hover:text-cyan-600 transition-colors duration-300"
            onClick={closeMenu}
          >
            Sneaky Sneakers
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/men" 
              className="text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300"
            >
              Hombre
            </Link>
            <Link 
              to="/women" 
              className="text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300"
            >
              Mujer
            </Link>
            <Link 
              to="/kids" 
              className="text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300"
            >
              Niños
            </Link>
            <Link 
              to="/new-arrivals" 
              className="text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300"
            >
              New Arrivals
            </Link>
            <Link 
              to="/sale" 
              className="text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300"
            >
              SALE
            </Link>
            <Link 
              to="/all-products" 
              className="text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300"
            >
              Todos los Productos
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span 
              className={`block w-6 h-0.5 bg-neutral-800 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-neutral-800 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-neutral-800 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 space-y-4 border-t border-neutral-200">
            <Link 
              to="/men" 
              className="block text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300 py-2"
              onClick={closeMenu}
            >
              Hombre
            </Link>
            <Link 
              to="/women" 
              className="block text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300 py-2"
              onClick={closeMenu}
            >
              Mujer
            </Link>
            <Link 
              to="/kids" 
              className="block text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300 py-2"
              onClick={closeMenu}
            >
              Niños
            </Link>
            <Link 
              to="/new-arrivals" 
              className="block text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300 py-2"
              onClick={closeMenu}
            >
              New Arrivals
            </Link>
            <Link 
              to="/sale" 
              className="block text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300 py-2"
              onClick={closeMenu}
            >
              SALE
            </Link>
            <Link 
              to="/all-products" 
              className="block text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300 py-2"
              onClick={closeMenu}
            >
              Todos los Productos
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 