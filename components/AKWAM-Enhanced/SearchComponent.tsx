'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface SearchResult {
  title: string;
  slug: string;
  type: 'movie' | 'series' | 'episode';
  year?: number;
  poster?: string;
}

interface SearchComponentProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  suggestions?: SearchResult[];
}

export function SearchComponent({ 
  placeholder = "ابحث عن فيلم أو مسلسل...",
  onSearch,
  suggestions = []
}: SearchComponentProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length > 1) {
      const filtered = suggestions.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 8)); // Limit to 8 results
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(false);
    }
  }, [query, suggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchResult) => {
    setQuery(suggestion.title);
    setIsOpen(false);
  };

  return (
    <div className="akwam-search relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="akwam-search-input"
          onFocus={() => setIsOpen(filteredSuggestions.length > 0)}
        />
        
        <button 
          type="submit"
          className="akwam-search-icon absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
        >
          <i className="icon-search text-xl"></i>
        </button>
      </form>

      {/* Search Suggestions Dropdown */}
      {isOpen && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-400 mb-2 px-3">
              نتائج البحث ({filteredSuggestions.length})
            </div>
            
            {filteredSuggestions.map((suggestion, index) => (
              <Link
                key={`${suggestion.slug}-${index}`}
                href={`/${suggestion.type}/${suggestion.slug}`}
                className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.poster && (
                  <div className="w-10 h-14 bg-gray-600 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={suggestion.poster} 
                      alt={suggestion.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-grow min-w-0">
                  <div className="font-medium text-white truncate">
                    {suggestion.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    <span className="capitalize">{suggestion.type === 'movie' ? 'فيلم' : 'مسلسل'}</span>
                    {suggestion.year && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{suggestion.year}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <i className="icon-arrow-left text-gray-400"></i>
                </div>
              </Link>
            ))}
          </div>
          
          {/* View All Results */}
          <div className="border-t border-gray-700 p-2">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="flex items-center justify-center gap-2 p-2 text-orange-500 hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <i className="icon-search"></i>
              <span>عرض جميع نتائج البحث عن "{query}"</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Header Search (for main header)
export function HeaderSearch() {
  // Sample suggestions - in real app, this would come from API
  const sampleSuggestions: SearchResult[] = [
    { title: 'The Dark Knight', slug: 'the-dark-knight', type: 'movie', year: 2008 },
    { title: 'Inception', slug: 'inception', type: 'movie', year: 2010 },
    { title: 'Breaking Bad', slug: 'breaking-bad', type: 'series', year: 2008 },
    { title: 'Game of Thrones', slug: 'game-of-thrones', type: 'series', year: 2011 },
  ];

  const handleSearch = (query: string) => {
    // Implement search logic here
    console.log('Searching for:', query);
    // In real app: redirect to search results page
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <SearchComponent
      placeholder="ابحث عن فيلم أو مسلسل..."
      onSearch={handleSearch}
      suggestions={sampleSuggestions}
    />
  );
}