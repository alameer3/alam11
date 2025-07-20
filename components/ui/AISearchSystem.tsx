'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Star, 
  Eye, 
  Heart,
  Filter,
  X,
  ArrowRight,
  Mic,
  MicOff,
  History,
  Bookmark,
  Share2,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Zap,
  Brain,
  Lightbulb,
  Target,
  Users,
  Calendar,
  MapPin,
  Tag,
  Hash,
  HashIcon
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'movie' | 'series' | 'show' | 'mix';
  description: string;
  image: string;
  rating: number;
  year: number;
  duration: string;
  quality: string;
  views: number;
  likes: number;
  isTrending: boolean;
  isNew: boolean;
  tags: string[];
  categories: string[];
  relevance: number;
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'trending' | 'popular' | 'ai';
  icon: any;
  count?: number;
}

interface AISearchSystemProps {
  onSearch?: (query: string, results: SearchResult[]) => void;
  onSuggestionClick?: (suggestion: SearchSuggestion) => void;
  placeholder?: string;
  showAdvancedFilters?: boolean;
  enableVoiceSearch?: boolean;
  enableAISuggestions?: boolean;
}

export default function AISearchSystem({
  onSearch,
  onSuggestionClick,
  placeholder = "ابحث عن فيلم، مسلسل، برنامج...",
  showAdvancedFilters = true,
  enableVoiceSearch = true,
  enableAISuggestions = true
}: AISearchSystemProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    quality: 'all',
    year: 'all',
    rating: 0,
    duration: 'all',
    sortBy: 'relevance'
  });

  // بيانات تجريبية للبحث
  const mockSearchResults: SearchResult[] = [
    {
      id: '1',
      title: 'The Matrix',
      type: 'movie',
      description: 'فيلم خيال علمي عن عالم افتراضي',
      image: '/api/placeholder/300/200',
      rating: 8.7,
      year: 1999,
      duration: '2h 16m',
      quality: '4K',
      views: 15000000,
      likes: 850000,
      isTrending: true,
      isNew: false,
      tags: ['خيال علمي', 'أكشن', 'مغامرة'],
      categories: ['أفلام', 'أكشن'],
      relevance: 95
    },
    {
      id: '2',
      title: 'Breaking Bad',
      type: 'series',
      description: 'مسلسل درامي عن معلم كيمياء يصبح تاجر مخدرات',
      image: '/api/placeholder/300/200',
      rating: 9.5,
      year: 2008,
      duration: '5 مواسم',
      quality: 'FHD',
      views: 25000000,
      likes: 1200000,
      isTrending: true,
      isNew: false,
      tags: ['دراما', 'إثارة', 'جريمة'],
      categories: ['مسلسلات', 'دراما'],
      relevance: 92
    },
    {
      id: '3',
      title: 'Inception',
      type: 'movie',
      description: 'فيلم خيال علمي عن الأحلام والواقع',
      image: '/api/placeholder/300/200',
      rating: 8.8,
      year: 2010,
      duration: '2h 28m',
      quality: '4K',
      views: 12000000,
      likes: 750000,
      isTrending: false,
      isNew: false,
      tags: ['خيال علمي', 'إثارة', 'غموض'],
      categories: ['أفلام', 'خيال علمي'],
      relevance: 88
    }
  ];

  // اقتراحات ذكية
  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', text: 'أفلام أكشن 2024', type: 'trending', icon: TrendingUp, count: 1250 },
    { id: '2', text: 'مسلسلات دراما جديدة', type: 'popular', icon: Star, count: 890 },
    { id: '3', text: 'برامج ترفيهية', type: 'recent', icon: Clock },
    { id: '4', text: 'أفلام خيال علمي', type: 'ai', icon: Brain },
    { id: '5', text: 'مسلسلات كوميدية', type: 'trending', icon: TrendingUp, count: 650 },
    { id: '6', text: 'أفلام رعب', type: 'popular', icon: Eye, count: 420 },
    { id: '7', text: 'مسلسلات تاريخية', type: 'ai', icon: Calendar },
    { id: '8', text: 'برامج وثائقية', type: 'recent', icon: Bookmark }
  ];

  // البحث الذكي
  const performSearch = useCallback(async (searchQuery: string) => {
    setIsSearching(true);
    
    try {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // البحث في البيانات التجريبية
      const filteredResults = mockSearchResults.filter(item => {
        const searchTerms = searchQuery.toLowerCase().split(' ');
        const itemText = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.categories.join(' ')}`.toLowerCase();
        
        return searchTerms.some(term => itemText.includes(term));
      });
      
      // ترتيب النتائج حسب الأهمية
      const sortedResults = filteredResults.sort((a, b) => {
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return b.relevance - a.relevance;
      });
      
      setResults(sortedResults);
      
      if (onSearch) {
        onSearch(searchQuery, sortedResults);
      }
      
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, [onSearch]);

  // البحث بالصوت
  const startVoiceSearch = useCallback(() => {
    if (!enableVoiceSearch) return;
    
    setIsListening(true);
    
    // محاكاة البحث بالصوت
    setTimeout(() => {
      const voiceQuery = 'أفلام أكشن جديدة';
      setQuery(voiceQuery);
      performSearch(voiceQuery);
      setIsListening(false);
    }, 2000);
  }, [enableVoiceSearch, performSearch]);

  // توليد اقتراحات ذكية
  const generateAISuggestions = useCallback(() => {
    if (!enableAISuggestions) return;
    
    // محاكاة اقتراحات الذكاء الاصطناعي
    const aiSuggestions = mockSuggestions.filter(s => s.type === 'ai');
    setSuggestions(aiSuggestions);
  }, [enableAISuggestions]);

  // معالجة البحث
  const handleSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      setShowSuggestions(false);
    }
  }, [performSearch]);

  // معالجة تغيير الاستعلام
  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    
    if (value.trim()) {
      setShowSuggestions(true);
      // توليد اقتراحات بناءً على الاستعلام
      const filteredSuggestions = mockSuggestions.filter(s => 
        s.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setShowSuggestions(false);
      setResults([]);
    }
  }, []);

  // تطبيق الفلاتر
  const applyFilters = useCallback(() => {
    let filteredResults = [...results];
    
    if (filters.type !== 'all') {
      filteredResults = filteredResults.filter(r => r.type === filters.type);
    }
    
    if (filters.quality !== 'all') {
      filteredResults = filteredResults.filter(r => r.quality === filters.quality);
    }
    
    if (filters.year !== 'all') {
      const year = parseInt(filters.year);
      filteredResults = filteredResults.filter(r => r.year >= year);
    }
    
    if (filters.rating > 0) {
      filteredResults = filteredResults.filter(r => r.rating >= filters.rating);
    }
    
    // ترتيب النتائج
    switch (filters.sortBy) {
      case 'rating':
        filteredResults.sort((a, b) => b.rating - a.rating);
        break;
      case 'year':
        filteredResults.sort((a, b) => b.year - a.year);
        break;
      case 'views':
        filteredResults.sort((a, b) => b.views - a.views);
        break;
      default:
        filteredResults.sort((a, b) => b.relevance - a.relevance);
    }
    
    setResults(filteredResults);
  }, [results, filters]);

  // مراقبة تغييرات الفلاتر
  useEffect(() => {
    if (results.length > 0) {
      applyFilters();
    }
  }, [filters, applyFilters]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* شريط البحث الرئيسي */}
      <div className="relative">
        <div className="flex items-center bg-gray-800 rounded-lg border border-gray-700 focus-within:border-blue-500 transition-colors">
          <div className="flex items-center flex-1 px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
            />
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse px-4">
            {enableVoiceSearch && (
              <button
                onClick={startVoiceSearch}
                disabled={isListening}
                className={`p-2 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}
            
            <button
              onClick={() => handleSearch(query)}
              disabled={isSearching || !query.trim()}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {isSearching ? 'جاري البحث...' : 'بحث'}
              </span>
            </button>
          </div>
        </div>
        
        {/* مؤشر البحث الذكي */}
        {enableAISuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
            <div className="flex items-center justify-between p-3 border-b border-gray-700">
              <div className="flex items-center">
                <Brain className="w-4 h-4 text-blue-400 ml-2" />
                <span className="text-sm text-gray-300">البحث الذكي</span>
              </div>
              <button
                onClick={generateAISuggestions}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                تحديث الاقتراحات
              </button>
            </div>
            
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                {suggestions.slice(0, 6).map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => {
                      setQuery(suggestion.text);
                      handleSearch(suggestion.text);
                      if (onSuggestionClick) {
                        onSuggestionClick(suggestion);
                      }
                    }}
                    className="flex items-center justify-between p-2 text-right hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <suggestion.icon className="w-4 h-4 text-gray-400 ml-2" />
                      <span className="text-sm text-gray-300">{suggestion.text}</span>
                    </div>
                    {suggestion.count && (
                      <span className="text-xs text-gray-500">{suggestion.count}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* الفلاتر المتقدمة */}
      {showAdvancedFilters && (
        <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center">
              <Filter className="w-4 h-4 ml-2" />
              فلاتر متقدمة
            </h3>
            <button
              onClick={() => setFilters({
                type: 'all',
                quality: 'all',
                year: 'all',
                rating: 0,
                duration: 'all',
                sortBy: 'relevance'
              })}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              إعادة تعيين
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* نوع المحتوى */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">النوع</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="all">الكل</option>
                <option value="movie">أفلام</option>
                <option value="series">مسلسلات</option>
                <option value="show">برامج</option>
                <option value="mix">منوعات</option>
              </select>
            </div>
            
            {/* الجودة */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">الجودة</label>
              <select
                value={filters.quality}
                onChange={(e) => setFilters(prev => ({ ...prev, quality: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="all">الكل</option>
                <option value="4K">4K</option>
                <option value="FHD">FHD</option>
                <option value="HD">HD</option>
                <option value="SD">SD</option>
              </select>
            </div>
            
            {/* السنة */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">السنة</label>
              <select
                value={filters.year}
                onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="all">الكل</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>
            
            {/* التقييم */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">التقييم</label>
              <select
                value={filters.rating}
                onChange={(e) => setFilters(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="0">الكل</option>
                <option value="9">9+</option>
                <option value="8">8+</option>
                <option value="7">7+</option>
                <option value="6">6+</option>
              </select>
            </div>
            
            {/* الترتيب */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">الترتيب</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="relevance">الأهمية</option>
                <option value="rating">التقييم</option>
                <option value="year">السنة</option>
                <option value="views">المشاهدات</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* نتائج البحث */}
      {results.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">
              نتائج البحث ({results.length})
            </h3>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">بحث ذكي</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <div className="relative">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-48 object-cover"
                  />
                  {result.isTrending && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                      ترند
                    </div>
                  )}
                  {result.isNew && (
                    <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                      جديد
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                    {result.quality}
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="text-white font-semibold mb-2">{result.title}</h4>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{result.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <span>{result.year}</span>
                    <span>{result.duration}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                      <span>{result.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="text-green-400 hover:text-green-300">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Eye className="w-3 h-3 ml-1" />
                      <span>{result.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}