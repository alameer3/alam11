'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Eye, 
  Calendar,
  Play,
  Heart,
  Bookmark,
  Download,
  MoreHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

// Mock search results
const searchResults = [
  {
    id: 1,
    title: "Breaking Bad",
    type: "series",
    poster: "/api/placeholder/200/300",
    rating: 9.5,
    year: 2008,
    duration: "49 min",
    views: 2500000,
    description: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's financial future.",
    genres: ["Crime", "Drama", "Thriller"],
    quality: "1080p"
  },
  {
    id: 2,
    title: "The Dark Knight",
    type: "movie",
    poster: "/api/placeholder/200/300",
    rating: 9.0,
    year: 2008,
    duration: "152 min",
    views: 1800000,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genres: ["Action", "Crime", "Drama"],
    quality: "1080p"
  },
  {
    id: 3,
    title: "The Tonight Show",
    type: "show",
    poster: "/api/placeholder/200/300",
    rating: 8.2,
    year: 2014,
    duration: "60 min",
    views: 1200000,
    description: "Jimmy Fallon hosts the iconic Tonight Show, featuring celebrity interviews, comedy sketches, and musical performances.",
    genres: ["Talk Show", "Comedy", "Entertainment"],
    quality: "1080p"
  },
  {
    id: 4,
    title: "Game of Thrones",
    type: "series",
    poster: "/api/placeholder/200/300",
    rating: 9.3,
    year: 2011,
    duration: "57 min",
    views: 3200000,
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    genres: ["Action", "Adventure", "Drama"],
    quality: "1080p"
  },
  {
    id: 5,
    title: "Inception",
    type: "movie",
    poster: "/api/placeholder/200/300",
    rating: 8.8,
    year: 2010,
    duration: "148 min",
    views: 2100000,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    quality: "1080p"
  },
  {
    id: 6,
    title: "Stranger Things",
    type: "series",
    poster: "/api/placeholder/200/300",
    rating: 8.7,
    year: 2016,
    duration: "51 min",
    views: 2800000,
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    genres: ["Drama", "Fantasy", "Horror"],
    quality: "1080p"
  }
]

const filterOptions = {
  type: ['All', 'Movies', 'Series', 'Shows'],
  year: ['All', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008'],
  quality: ['All', '4K', '1080p', '720p', '480p'],
  rating: ['All', '9+', '8+', '7+', '6+', '5+'],
  genre: ['All', 'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller']
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [results, setResults] = useState(searchResults)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: 'All',
    year: 'All',
    quality: 'All',
    rating: 'All',
    genre: 'All'
  })
  const [sortBy, setSortBy] = useState('relevance')
  const [likedItems, setLikedItems] = useState<number[]>([])
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([])

  useEffect(() => {
    // Filter and sort results based on current filters and sort
    let filteredResults = searchResults.filter(item => {
      // Type filter
      if (filters.type !== 'All' && item.type !== filters.type.toLowerCase()) {
        return false
      }
      
      // Year filter
      if (filters.year !== 'All' && item.year !== parseInt(filters.year)) {
        return false
      }
      
      // Quality filter
      if (filters.quality !== 'All' && item.quality !== filters.quality) {
        return false
      }
      
      // Rating filter
      if (filters.rating !== 'All') {
        const minRating = parseInt(filters.rating.replace('+', ''))
        if (item.rating < minRating) {
          return false
        }
      }
      
      // Genre filter
      if (filters.genre !== 'All' && !item.genres.includes(filters.genre)) {
        return false
      }
      
      return true
    })

    // Sort results
    switch (sortBy) {
      case 'rating':
        filteredResults.sort((a, b) => b.rating - a.rating)
        break
      case 'year':
        filteredResults.sort((a, b) => b.year - a.year)
        break
      case 'views':
        filteredResults.sort((a, b) => b.views - a.views)
        break
      case 'title':
        filteredResults.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        // Relevance (default) - keep original order for demo
        break
    }

    setResults(filteredResults)
  }, [filters, sortBy])

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const toggleLike = (itemId: number) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const toggleBookmark = (itemId: number) => {
    setBookmarkedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Search Results</h1>
              <p className="text-gray-400">
                {results.length} results for "{query}"
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              <div className="flex bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-600' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-600' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(filterOptions).map(([filterType, options]) => (
                <div key={filterType}>
                  <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                    {filterType}
                  </label>
                  <select
                    value={filters[filterType as keyof typeof filters]}
                    onChange={(e) => handleFilterChange(filterType, e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                  >
                    {options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Rating</option>
              <option value="year">Year</option>
              <option value="views">Views</option>
              <option value="title">Title</option>
            </select>
          </div>
          
          <div className="text-gray-400">
            Showing {results.length} of {searchResults.length} results
          </div>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-gray-400">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {results.map(item => (
                  <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
                    <div className="relative">
                      <img 
                        src={item.poster} 
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button 
                          onClick={() => toggleLike(item.id)}
                          className={`p-1 rounded ${likedItems.includes(item.id) ? 'bg-red-600' : 'bg-black bg-opacity-50'}`}
                        >
                          <Heart className={`w-3 h-3 ${likedItems.includes(item.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button 
                          onClick={() => toggleBookmark(item.id)}
                          className={`p-1 rounded ${bookmarkedItems.includes(item.id) ? 'bg-blue-600' : 'bg-black bg-opacity-50'}`}
                        >
                          <Bookmark className={`w-3 h-3 ${bookmarkedItems.includes(item.id) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white font-medium">{item.quality}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span className="text-white">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-sm mb-1 truncate">{item.title}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <span>{item.year}</span>
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-2 rounded">
                          <Play className="w-3 h-3 mr-1" />
                          Watch
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white text-xs py-1 px-2 rounded">
                          <Download className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {results.map(item => (
                  <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <img 
                        src={item.poster} 
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold mb-1">{item.title}</h4>
                            <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                              <span>{item.year}</span>
                              <span>•</span>
                              <span>{item.duration}</span>
                              <span>•</span>
                              <span>{item.quality}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400" />
                                <span>{item.rating}</span>
                              </div>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                <span>{item.views.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {item.genres.map(genre => (
                                <span key={genre} className="px-2 py-1 bg-gray-700 rounded text-xs">
                                  {genre}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => toggleLike(item.id)}
                              className={`p-2 rounded ${likedItems.includes(item.id) ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                            >
                              <Heart className={`w-4 h-4 ${likedItems.includes(item.id) ? 'fill-current' : ''}`} />
                            </button>
                            <button 
                              onClick={() => toggleBookmark(item.id)}
                              className={`p-2 rounded ${bookmarkedItems.includes(item.id) ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                            >
                              <Bookmark className={`w-4 h-4 ${bookmarkedItems.includes(item.id) ? 'fill-current' : ''}`} />
                            </button>
                            <button className="p-2 bg-red-600 hover:bg-red-700 rounded">
                              <Play className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}