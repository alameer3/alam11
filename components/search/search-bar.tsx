"use client"

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { debounce } from '@/lib/utils'

interface SearchResult {
  id: string
  title: string
  type: 'movie' | 'series'
  poster: string
  year: number
  slug: string
}

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Mock search function - replace with real API call
  const searchContent = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Mock results
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: 'فيلم البحث التجريبي',
        type: 'movie' as const,
        poster: 'https://via.placeholder.com/100x150/1e293b/ffffff?text=Movie',
        year: 2024,
        slug: 'search-test-movie'
      },
      {
        id: '2',
        title: 'مسلسل البحث التجريبي',
        type: 'series' as const,
        poster: 'https://via.placeholder.com/100x150/374151/ffffff?text=Series',
        year: 2024,
        slug: 'search-test-series'
      }
    ].filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setResults(mockResults)
    setIsLoading(false)
  }

  const debouncedSearch = debounce(searchContent, 300)

  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="ابحث عن الأفلام والمسلسلات..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pr-10 pl-10 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && (query.trim() || results.length > 0) && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              جاري البحث...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <a
                  key={result.id}
                  href={`/${result.type === 'movie' ? 'movies' : 'series'}/${result.slug}`}
                  className="flex items-center space-x-3 space-x-reverse px-4 py-3 hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-12 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                    <img
                      src={result.poster}
                      alt={result.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{result.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {result.type === 'movie' ? 'فيلم' : 'مسلسل'} • {result.year}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-4 text-center text-muted-foreground">
              لا توجد نتائج للبحث &quot;{query}&quot;
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}