import React, { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useWishlist, useCart } from "../hooks";
import { useAuth } from "../hooks";
import LoadingSpinner from "./LoadingSpinner";

// Lazy load modales para code splitting
const CartModal = lazy(() => import("./CartModal"));
const WishlistModal = lazy(() => import("./WishlistModal"));
const SearchBar = lazy(() => import("./SearchBar"));

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { wishlistCount } = useWishlist();
  const { cartCount, user, isAuthenticated } = useCart();
  const { user: authUser, isAuthenticated: authIsAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openWishlist = () => {
    setIsWishlistOpen(true);
  };

  const closeWishlist = () => {
    setIsWishlistOpen(false);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const cartItemCount = cartCount;

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo - Izquierda */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="text-xl font-bold text-neutral-800 hover:text-cyan-600 transition-colors duration-300"
                onClick={closeMenu}
              >
                Sneaky Sneakers
              </Link>
            </div>

            {/* Desktop Navigation - Centrado */}
            <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
              <Link 
                to="/men" 
                className="text-sm text-neutral-700 hover:text-cyan-600 font-medium transition-colors duration-300 whitespace-nowrap"
              >
                Hombre
              </Link>
              <Link 
                to="/women" 
                className="text-sm text-neutral-700 hover:text-cyan-600 font-medium transition-colors duration-300 whitespace-nowrap"
              >
                Mujer
              </Link>
              <Link 
                to="/kids" 
                className="text-sm text-neutral-700 hover:text-cyan-600 font-medium transition-colors duration-300 whitespace-nowrap"
              >
                Niños
              </Link>
              <Link 
                to="/new-arrivals" 
                className="text-sm text-neutral-700 hover:text-cyan-600 font-medium transition-colors duration-300 whitespace-nowrap"
              >
                Nuevos
              </Link>
              <Link 
                to="/sale" 
                className="text-sm text-neutral-700 hover:text-cyan-600 font-medium transition-colors duration-300 whitespace-nowrap"
              >
                SALE
              </Link>
              <Link 
                to="/all-products" 
                className="text-sm text-neutral-700 hover:text-cyan-600 font-medium transition-colors duration-300 whitespace-nowrap"
              >
                Productos
              </Link>
            </nav>

            {/* Desktop Icons & Auth - Derecha */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              {/* Search Button */}
              <button
                onClick={openSearch}
                className="p-2 text-neutral-700 hover:text-cyan-600 transition-colors duration-300"
                aria-label="Buscar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={openWishlist}
                className="relative p-2 text-neutral-700 hover:text-cyan-600 transition-colors duration-300"
                aria-label="Favoritos"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative p-2 text-neutral-700 hover:text-cyan-600 transition-colors duration-300"
                aria-label="Carrito"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Auth Button */}
              {authUser ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-neutral-600">
                    Hola, {authUser.user_metadata?.nombres || authUser.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 text-sm text-neutral-700 hover:text-cyan-600 font-medium transition-colors duration-300"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 hover:text-white transition-colors duration-300 font-medium text-sm"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>

            {/* Mobile/Tablet Menu Button */}
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
              isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="py-4 space-y-4 border-t border-neutral-200">
              {/* Navigation Links */}
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
                Nuevos 
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
                Productos
              </Link>

              {/* Action Buttons Section */}
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                {/* Search Button */}
                <button
                  onClick={() => { openSearch(); closeMenu(); }}
                  className="flex items-center space-x-3 text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300 py-3 w-full text-left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Buscar</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => { openWishlist(); closeMenu(); }}
                  className="flex items-center space-x-3 text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300 py-3 w-full text-left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Favoritos</span>
                  {wishlistCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-auto">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart Button */}
                <button
                  onClick={() => { openCart(); closeMenu(); }}
                  className="flex items-center space-x-3 text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300 py-3 w-full text-left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Carrito</span>
                  {cartItemCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-auto">
                      {cartItemCount}
                    </span>
                  )}
                </button>

                {/* Auth Section */}
                <div className="pt-2 border-t border-neutral-200">
                  {authUser ? (
                    <div className="space-y-3">
                      <div className="text-neutral-600 py-2 font-medium">
                        Hola, {authUser.user_metadata?.nombres || authUser.email}
                      </div>
                      <button
                        onClick={() => { handleLogout(); closeMenu(); }}
                        className="w-full text-left text-neutral-700 hover:text-cyan-600 font-semibold transition-colors duration-300 py-2"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="block bg-cyan-600 text-white text-center py-3 rounded-lg hover:bg-cyan-700 transition-colors duration-300 font-semibold"
                      onClick={closeMenu}
                    >
                      Iniciar Sesión
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Cart Modal */}
        <Suspense fallback={<LoadingSpinner />}>
          <CartModal isOpen={isCartOpen} onClose={closeCart} />
        </Suspense>
        
        {/* Wishlist Modal */}
        <Suspense fallback={<LoadingSpinner />}>
          <WishlistModal isOpen={isWishlistOpen} onClose={closeWishlist} />
        </Suspense>
        
        {/* Search Bar */}
        <Suspense fallback={<LoadingSpinner />}>
          <SearchBar isOpen={isSearchOpen} onClose={closeSearch} />
        </Suspense>
      </header>
    </>
  );
};

export default Navbar; 