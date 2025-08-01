import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../hooks/useSupabase';

const SearchBar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { getProducts, getPlayers } = useSupabase();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [players, setPlayers] = useState([]);
  const searchRef = useRef(null);

  // Cargar datos desde Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, playersData] = await Promise.all([
          getProducts(),
          getPlayers()
        ]);
        setProducts(productsData);
        setPlayers(playersData);
      } catch (error) {
        console.error("Error loading search data:", error);
      }
    };

    if (isOpen) {
      loadData();
    }
  }, [isOpen, getProducts, getPlayers]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const calculateRelevance = useCallback((item, searchTerm) => {
    let relevance = 0;
    const searchWords = searchTerm.split(' ');
    
    searchWords.forEach(word => {
      if (item.name.toLowerCase().includes(word)) relevance += 10;
      if (item.brand && item.brand.toLowerCase().includes(word)) relevance += 8;
      if (item.description && item.description.toLowerCase().includes(word)) relevance += 5;
      if (item.type === 'player' && item.name.toLowerCase().startsWith(word)) relevance += 15;
    });
    
    return relevance;
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simular delay de búsqueda
    const timeoutId = setTimeout(() => {
      const searchTerm = query.toLowerCase();
      
      const filteredResults = [];

      // Aplicar filtros
      if (activeFilter === 'all' || activeFilter === 'products') {
        const productResults = products
          .filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            (product.description && product.description.toLowerCase().includes(searchTerm))
          )
          .slice(0, activeFilter === 'all' ? 5 : 8)
          .map(product => ({
            ...product,
            type: 'product',
            displayName: product.name,
            relevance: calculateRelevance(product, searchTerm)
          }));

        filteredResults.push(...productResults);
      }

      if (activeFilter === 'all' || activeFilter === 'players') {
        const playerResults = players
          .filter(player => 
            player.name.toLowerCase().includes(searchTerm)
          )
          .slice(0, activeFilter === 'all' ? 3 : 6)
          .map(player => ({
            ...player,
            type: 'player',
            displayName: player.name,
            relevance: calculateRelevance(player, searchTerm)
          }));

        filteredResults.push(...playerResults);
      }

      // Ordenar por relevancia
      filteredResults.sort((a, b) => b.relevance - a.relevance);

      setResults(filteredResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, products, players, activeFilter]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleResultClick(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleResultClick = (result) => {
    if (result.type === 'product') {
      navigate(`/product/${result.id}`);
    } else if (result.type === 'player') {
      navigate(result.path);
    }
    onClose();
    setQuery('');
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20">
      <div 
        ref={searchRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-96 overflow-hidden"
      >
        {/* Search Input */}
        <div className="p-4 border-b border-neutral-200">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Buscar productos, marcas, jugadores..."
              className="w-full px-4 py-3 pl-12 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
              autoFocus
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              {isLoading ? (
                <svg className="w-5 h-5 text-neutral-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Search Filters */}
          {query && (
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Todo
              </button>
              <button
                onClick={() => setActiveFilter('products')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === 'products'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Productos
              </button>
              <button
                onClick={() => setActiveFilter('players')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === 'players'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Jugadores
              </button>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="max-h-80 overflow-y-auto">
          {query && !isLoading && results.length === 0 && (
            <div className="p-6 text-center text-neutral-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p>No se encontraron resultados para "{query}"</p>
            </div>
          )}

          {results.map((result, index) => (
            <div
              key={`${result.type}-${result.id}`}
              onClick={() => handleResultClick(result)}
              className={`p-4 hover:bg-neutral-50 cursor-pointer transition-colors ${
                selectedIndex === index ? 'bg-cyan-50 border-l-4 border-cyan-500' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {result.type === 'product' ? (
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-800 truncate">
                    {result.displayName}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {result.type === 'product' ? (
                      <>
                        {result.brand} • ${result.price}
                      </>
                    ) : (
                      'Jugador NBA'
                    )}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    result.type === 'product' 
                      ? 'bg-cyan-100 text-cyan-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {result.type === 'product' ? 'Producto' : 'Jugador'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        {query && (
          <div className="p-4 border-t border-neutral-200 bg-neutral-50">
            <p className="text-sm text-neutral-600 mb-2">Búsquedas rápidas:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigate(`/all-products?search=${query}`)}
                className="px-3 py-1 bg-cyan-600 text-white rounded-full text-sm hover:bg-cyan-700 transition-colors"
              >
                Ver todos los productos
              </button>
              <button
                onClick={() => navigate(`/sale?search=${query}`)}
                className="px-3 py-1 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors"
              >
                Buscar en ofertas
              </button>
              <button
                onClick={() => navigate(`/new-arrivals?search=${query}`)}
                className="px-3 py-1 bg-green-600 text-white rounded-full text-sm hover:bg-green-700 transition-colors"
              >
                Nuevos lanzamientos
              </button>
              {activeFilter === 'players' && (
                <button
                  onClick={() => navigate(`/all-products?category=players&search=${query}`)}
                  className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-colors"
                >
                  Zapatillas de jugadores
                </button>
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-neutral-200">
              <p className="text-xs text-neutral-500">
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 