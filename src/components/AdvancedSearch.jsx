import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AdvancedSearch = ({ 
  onSearch, 
  placeholder = "Buscar productos, marcas, categorías...",
  suggestions = [],
  recentSearches = [],
  popularSearches = []
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef(null);

  // Filtrar sugerencias basadas en la consulta
  useEffect(() => {
    if (!query.trim()) {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = suggestions.filter(suggestion =>
      suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
      suggestion.brand?.toLowerCase().includes(query.toLowerCase()) ||
      suggestion.category?.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredSuggestions(filtered.slice(0, 8));
  }, [query, suggestions]);

  // Manejar clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Manejar navegación con teclado
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
        handleSuggestionClick(filteredSuggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [selectedIndex, filteredSuggestions]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    onSearch(suggestion.name);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleRecentSearchClick = (search) => {
    setQuery(search);
    onSearch(search);
    setIsOpen(false);
  };

  const handlePopularSearchClick = (search) => {
    setQuery(search);
    onSearch(search);
    setIsOpen(false);
  };

  const saveRecentSearch = (search) => {
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    const updated = [search, ...recent.filter(s => s !== search)].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-12 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
        />
        
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cyan-600 text-white p-2 rounded-lg hover:bg-cyan-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-neutral-200 z-50 max-h-96 overflow-y-auto">
          {/* Suggestions */}
          {query && filteredSuggestions.length > 0 && (
            <div className="p-4 border-b border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-700 mb-3">Sugerencias</h3>
              <div className="space-y-2">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedIndex === index ? 'bg-cyan-50 border border-cyan-200' : 'hover:bg-neutral-50'
                    }`}
                  >
                    <img
                      src={suggestion.image}
                      alt={suggestion.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-neutral-800">{suggestion.name}</h4>
                      <p className="text-sm text-neutral-600">
                        {suggestion.brand} • {suggestion.category}
                      </p>
                    </div>
                    <span className="text-sm text-neutral-500">${suggestion.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="p-4 border-b border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-700 mb-3">Búsquedas recientes</h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-neutral-50 transition-colors text-left"
                  >
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-neutral-700">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {!query && popularSearches.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-neutral-700 mb-3">Búsquedas populares</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearchClick(search)}
                    className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm hover:bg-neutral-200 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {query && filteredSuggestions.length === 0 && (
            <div className="p-6 text-center text-neutral-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p>No se encontraron resultados para "{query}"</p>
              <button
                onClick={handleSearch}
                className="mt-3 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Buscar de todos modos
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch; 