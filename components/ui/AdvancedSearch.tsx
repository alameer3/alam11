'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, Star, Clock, TrendingUp, Eye, Heart, Play, Sparkles } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'movie' | 'series' | 'show';
  image: string;
  rating: number;
  year: number;
  genre: string[];
  description: string;
  views: number;
  isFavorite: boolean;
  isWatched: boolean;
  relevance: number;
}

interface FilterOptions {
  type: string[];
  genre: string[];
  year: string[];
  rating: number;
  quality: string[];
  language: string[];
  duration: string[];
}

export default function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    type: [],
    genre: [],
    year: [],
    rating: 0,
    quality: [],
    language: [],
    duration: []
  });
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'year' | 'views'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  // بيانات تجريبية للبحث
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'المصفوفة',
      type: 'movie',
      image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=200&h=300&fit=crop',
      rating: 4.8,
      year: 1999,
      genre: ['أكشن', 'خيال علمي'],
      description: 'فيلم خيال علمي يحكي قصة نيو في عالم افتراضي',
      views: 2500000,
      isFavorite: true,
      isWatched: false,
      relevance: 95
    },
    {
      id: '2',
      title: 'بريكينغ باد',
      type: 'series',
      image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=200&h=300&fit=crop',
      rating: 4.9,
      year: 2008,
      genre: ['دراما', 'إثارة'],
      description: 'مسلسل درامي عن معلم كيمياء يدخل عالم المخدرات',
      views: 1800000,
      isFavorite: false,
      isWatched: true,
      relevance: 88
    },
    {
      id: '3',
      title: 'البداية',
      type: 'movie',
      image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=200&h=300&fit=crop',
      rating: 4.7,
      year: 2010,
      genre: ['أكشن', 'خيال علمي'],
      description: 'فيلم عن استخراج الأفكار من العقل الباطن',
      views: 2200000,
      isFavorite: false,
      isWatched: false,
      relevance: 82
    }
  ];

  const mockSuggestions = [
    'أفلام أكشن 2024',
    'مسلسلات دراما',
    'أفلام خيال علمي',
    'مسلسلات كورية',
    'أفلام كوميدي',
    'مسلسلات تركية',
    'أفلام رعب',
    'مسلسلات إثارة'
  ];

  const mockTrending = [
    'المصفوفة',
    'بريكينغ باد',
    'لعبة العرش',
    'البداية',
    'أفتر',
    'ستار وورز'
  ];

  useEffect(() => {
    setSuggestions(mockSuggestions);
    setTrendingSearches(mockTrending);
    setRecentSearches(['المصفوفة', 'بريكينغ باد', 'البداية']);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, filters, sortBy]);

  const performSearch = async () => {
    setIsSearching(true);
    
    // محاكاة البحث
    setTimeout(() => {
      const filteredResults = mockResults.filter(result => {
        const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           result.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesFilters = filters.type.length === 0 || filters.type.includes(result.type) &&
                              filters.genre.length === 0 || filters.genre.some(g => result.genre.includes(g)) &&
                              filters.year.length === 0 || filters.year.includes(result.year.toString()) &&
                              result.rating >= filters.rating;
        
        return matchesQuery && matchesFilters;
      });

      // ترتيب النتائج
      const sortedResults = [...filteredResults].sort((a, b) => {
        switch (sortBy) {
          case 'relevance':
            return b.relevance - a.relevance;
          case 'rating':
            return b.rating - a.rating;
          case 'year':
            return b.year - a.year;
          case 'views':
            return b.views - a.views;
          default:
            return 0;
        }
      });

      setSearchResults(sortedResults);
      setIsSearching(false);
    }, 500);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      genre: [],
      year: [],
      rating: 0,
      quality: [],
      language: [],
      duration: []
    });
  };

  const toggleFavorite = (id: string) => {
    setSearchResults(results => 
      results.map(item => 
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const getContentUrl = (item: SearchResult) => {
    switch (item.type) {
      case 'movie':
        return `/movie/${item.id}`;
      case 'series':
        return `/series/${item.id}`;
      case 'show':
        return `/shows/${item.id}`;
      default:
        return '#';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* شريط البحث المتقدم */}
      <div className="mb-8">
        <div className="relative">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex-1 relative">
              <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في الأفلام والمسلسلات والبرامج..."
                className="w-full pl-10 rtl:pr-10 rtl:pl-3 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-lg border transition-colors ${
                showFilters 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* اقتراحات البحث */}
          {!searchQuery && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <TrendingUp className="w-4 h-4 inline ml-1" />
                  البحث الرائج
                </h4>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((trend, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(trend)}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      {trend}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Clock className="w-4 h-4 inline ml-1" />
                  البحث الأخير
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* الفلاتر المتقدمة */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* نوع المحتوى */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نوع المحتوى
                </label>
                <div className="space-y-2">
                  {['movie', 'series', 'show'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.type.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({...filters, type: [...filters.type, type]});
                          } else {
                            setFilters({...filters, type: filters.type.filter(t => t !== type)});
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                        {type === 'movie' ? 'أفلام' : type === 'series' ? 'مسلسلات' : 'برامج'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* التصنيف */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  التصنيف
                </label>
                <div className="space-y-2">
                  {['أكشن', 'دراما', 'كوميدي', 'إثارة', 'خيال علمي', 'رعب'].map((genre) => (
                    <label key={genre} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.genre.includes(genre)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({...filters, genre: [...filters.genre, genre]});
                          } else {
                            setFilters({...filters, genre: filters.genre.filter(g => g !== genre)});
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* السنة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  السنة
                </label>
                <select
                  value={filters.year[0] || ''}
                  onChange={(e) => setFilters({...filters, year: e.target.value ? [e.target.value] : []})}
                  className="w-full input text-sm"
                >
                  <option value="">جميع السنوات</option>
                  {Array.from({length: 25}, (_, i) => 2024 - i).map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
              </div>

              {/* التقييم */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  الحد الأدنى للتقييم
                </label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.rating}
                    onChange={(e) => setFilters({...filters, rating: parseFloat(e.target.value)})}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {filters.rating}+
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                مسح جميع الفلاتر
              </button>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="text-sm text-gray-600 dark:text-gray-400">ترتيب حسب:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="input text-sm"
                >
                  <option value="relevance">الأكثر صلة</option>
                  <option value="rating">التقييم</option>
                  <option value="year">السنة</option>
                  <option value="views">المشاهدات</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* نتائج البحث */}
      {searchQuery && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                نتائج البحث
              </h3>
              {isSearching && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  جاري البحث...
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {searchResults.length === 0 && !isSearching ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                لا توجد نتائج
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                جرب البحث بكلمات مختلفة أو استخدم فلاتر مختلفة
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
                : 'grid-cols-1'
            }`}>
              {searchResults.map((result) => (
                <div key={result.id} className={`group ${viewMode === 'list' ? 'flex items-center space-x-4 space-x-reverse' : ''}`}>
                  <div className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover-lift ${
                    viewMode === 'list' ? 'w-32 h-48 flex-shrink-0' : 'aspect-[2/3]'
                  }`}>
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* طبقة التدرج */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* زر التشغيل */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <Play className="w-6 h-6 text-white fill-current" />
                      </div>
                    </div>
                    
                    {/* مؤشر المشاهدة */}
                    {result.isWatched && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        <Eye className="w-3 h-3" />
                      </div>
                    )}
                    
                    {/* مؤشر المفضلة */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(result.id);
                      }}
                      className="absolute top-2 left-2 p-1 rounded-full bg-black/50 hover:bg-red-500 transition-colors duration-200"
                    >
                      <Heart 
                        className={`w-4 h-4 ${result.isFavorite ? 'text-red-500 fill-current' : 'text-white'}`} 
                      />
                    </button>
                  </div>
                  
                  {/* معلومات المحتوى */}
                  <div className={`${viewMode === 'list' ? 'flex-1' : 'p-3'}`}>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {result.title}
                    </h4>
                    
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                      <span>{result.year}</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{result.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Eye className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {formatViews(result.views)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Sparkles className="w-3 h-3 text-blue-400" />
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          {result.relevance}%
                        </span>
                      </div>
                    </div>
                    
                    {/* التصنيفات */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.genre.slice(0, 2).map((genre, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    
                    {viewMode === 'list' && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                        {result.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}