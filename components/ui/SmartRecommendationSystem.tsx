'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Star, 
  Heart, 
  Eye, 
  Clock, 
  Users,
  Zap,
  Target,
  Lightbulb,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Play,
  Download,
  Bookmark,
  Filter,
  Settings,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface RecommendationItem {
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
  matchScore: number;
  reason: string;
  tags: string[];
  categories: string[];
  isPersonalized: boolean;
  isTrending: boolean;
  isNew: boolean;
}

interface UserBehavior {
  watchHistory: string[];
  favorites: string[];
  ratings: { [key: string]: number };
  searchHistory: string[];
  categories: string[];
  preferredGenres: string[];
  watchTime: { [key: string]: number };
}

interface SmartRecommendationSystemProps {
  userId?: string;
  showPersonalized?: boolean;
  showTrending?: boolean;
  showNew?: boolean;
  maxItems?: number;
  onItemClick?: (item: RecommendationItem) => void;
  onFeedback?: (itemId: string, feedback: 'like' | 'dislike') => void;
}

export default function SmartRecommendationSystem({
  userId,
  showPersonalized = true,
  showTrending = true,
  showNew = true,
  maxItems = 12,
  onItemClick,
  onFeedback
}: SmartRecommendationSystemProps) {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    watchHistory: [],
    favorites: [],
    ratings: {},
    searchHistory: [],
    categories: [],
    preferredGenres: [],
    watchTime: {}
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personalized');
  const [showDetails, setShowDetails] = useState(false);

  // بيانات تجريبية للتوصيات
  const mockRecommendations: RecommendationItem[] = [
    {
      id: '1',
      title: 'The Matrix Reloaded',
      type: 'movie',
      description: 'تكملة فيلم المصفوفة مع مشاهد أكشن مذهلة',
      image: '/api/placeholder/300/200',
      rating: 7.2,
      year: 2003,
      duration: '2h 18m',
      quality: '4K',
      views: 8500000,
      likes: 450000,
      matchScore: 95,
      reason: 'بناءً على إعجابك بـ The Matrix',
      tags: ['خيال علمي', 'أكشن', 'مغامرة'],
      categories: ['أفلام', 'أكشن'],
      isPersonalized: true,
      isTrending: false,
      isNew: false
    },
    {
      id: '2',
      title: 'Better Call Saul',
      type: 'series',
      description: 'مسلسل درامي عن محامي يصبح تاجر مخدرات',
      image: '/api/placeholder/300/200',
      rating: 8.8,
      year: 2015,
      duration: '6 مواسم',
      quality: 'FHD',
      views: 18000000,
      likes: 950000,
      matchScore: 88,
      reason: 'مشابه لـ Breaking Bad الذي شاهدته',
      tags: ['دراما', 'إثارة', 'جريمة'],
      categories: ['مسلسلات', 'دراما'],
      isPersonalized: true,
      isTrending: true,
      isNew: false
    },
    {
      id: '3',
      title: 'Interstellar',
      type: 'movie',
      description: 'فيلم خيال علمي عن السفر عبر الفضاء',
      image: '/api/placeholder/300/200',
      rating: 8.6,
      year: 2014,
      duration: '2h 49m',
      quality: '4K',
      views: 11000000,
      likes: 680000,
      matchScore: 82,
      reason: 'بناءً على اهتمامك بأفلام الخيال العلمي',
      tags: ['خيال علمي', 'دراما', 'مغامرة'],
      categories: ['أفلام', 'خيال علمي'],
      isPersonalized: true,
      isTrending: false,
      isNew: false
    },
    {
      id: '4',
      title: 'The Mandalorian',
      type: 'series',
      description: 'مسلسل خيال علمي في عالم Star Wars',
      image: '/api/placeholder/300/200',
      rating: 8.7,
      year: 2019,
      duration: '3 مواسم',
      quality: '4K',
      views: 22000000,
      likes: 1200000,
      matchScore: 78,
      reason: 'ترند حالياً في فئة الخيال العلمي',
      tags: ['خيال علمي', 'أكشن', 'مغامرة'],
      categories: ['مسلسلات', 'خيال علمي'],
      isPersonalized: false,
      isTrending: true,
      isNew: false
    },
    {
      id: '5',
      title: 'Dune',
      type: 'movie',
      description: 'فيلم خيال علمي مذهل عن عالم الصحراء',
      image: '/api/placeholder/300/200',
      rating: 8.0,
      year: 2021,
      duration: '2h 35m',
      quality: '4K',
      views: 9500000,
      likes: 520000,
      matchScore: 85,
      reason: 'جديد ومشهور في فئة الخيال العلمي',
      tags: ['خيال علمي', 'دراما', 'مغامرة'],
      categories: ['أفلام', 'خيال علمي'],
      isPersonalized: false,
      isTrending: true,
      isNew: true
    }
  ];

  // خوارزمية التوصيات الذكية
  const generateRecommendations = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // محاكاة تحليل سلوك المستخدم
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // تطبيق خوارزمية التوصيات
      const personalizedItems = mockRecommendations.filter(item => item.isPersonalized);
      const trendingItems = mockRecommendations.filter(item => item.isTrending);
      const newItems = mockRecommendations.filter(item => item.isNew);
      
      // دمج التوصيات حسب الأولوية
      const allRecommendations = [
        ...personalizedItems,
        ...trendingItems,
        ...newItems
      ];
      
      // ترتيب حسب درجة المطابقة
      const sortedRecommendations = allRecommendations.sort((a, b) => b.matchScore - a.matchScore);
      
      setRecommendations(sortedRecommendations.slice(0, maxItems));
      
    } catch (error) {
      // // console.error('Error generating recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  }, [maxItems]);

  // تحليل سلوك المستخدم
  const analyzeUserBehavior = useCallback(() => {
    // محاكاة تحليل سلوك المستخدم
    const mockBehavior: UserBehavior = {
      watchHistory: ['The Matrix', 'Breaking Bad', 'Inception'],
      favorites: ['The Matrix', 'Breaking Bad'],
      ratings: { 'The Matrix': 5, 'Breaking Bad': 5, 'Inception': 4 },
      searchHistory: ['أفلام خيال علمي', 'مسلسلات دراما'],
      categories: ['أفلام', 'مسلسلات'],
      preferredGenres: ['خيال علمي', 'دراما', 'أكشن'],
      watchTime: { 'The Matrix': 136, 'Breaking Bad': 300, 'Inception': 148 }
    };
    
    setUserBehavior(mockBehavior);
  }, []);

  // معالجة النقر على العنصر
  const handleItemClick = useCallback((item: RecommendationItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
    
    // تحديث سلوك المستخدم
    setUserBehavior(prev => ({
      ...prev,
      watchHistory: [...prev.watchHistory, item.title]
    }));
  }, [onItemClick]);

  // معالجة التقييم
  const handleFeedback = useCallback((itemId: string, feedback: 'like' | 'dislike') => {
    if (onFeedback) {
      onFeedback(itemId, feedback);
    }
    
    // تحديث سلوك المستخدم
    setUserBehavior(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [itemId]: feedback === 'like' ? 5 : 1
      }
    }));
  }, [onFeedback]);

  // تصفية التوصيات حسب التبويب
  const filteredRecommendations = useMemo(() => {
    switch (activeTab) {
      case 'personalized':
        return recommendations.filter(item => item.isPersonalized);
      case 'trending':
        return recommendations.filter(item => item.isTrending);
      case 'new':
        return recommendations.filter(item => item.isNew);
      default:
        return recommendations;
    }
  }, [recommendations, activeTab]);

  // تحليل التفضيلات
  const userPreferences = useMemo(() => {
    const genres = userBehavior.preferredGenres;
    const categories = userBehavior.categories;
    
    return {
      topGenres: genres.slice(0, 3),
      topCategories: categories.slice(0, 2),
      averageRating: Object.values(userBehavior.ratings).reduce((a, b) => a + b, 0) / Object.values(userBehavior.ratings).length || 0
    };
  }, [userBehavior]);

  // تحميل البيانات
  useEffect(() => {
    analyzeUserBehavior();
    generateRecommendations();
  }, [analyzeUserBehavior, generateRecommendations]);

  return (
    <div className="w-full">
      {/* رأس النظام */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Brain className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold text-white">توصيات ذكية</h2>
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {showDetails ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={generateRecommendations}
            disabled={isLoading}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* تفاصيل التفضيلات */}
      {showDetails && (
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-3">تحليل تفضيلاتك</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-gray-300 text-sm mb-2">الأجناس المفضلة</h4>
              <div className="flex flex-wrap gap-2">
                {userPreferences.topGenres.map(genre => (
                  <span key={genre} className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-gray-300 text-sm mb-2">الأقسام المفضلة</h4>
              <div className="flex flex-wrap gap-2">
                {userPreferences.topCategories.map(category => (
                  <span key={category} className="px-2 py-1 bg-green-600 text-white text-xs rounded">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-gray-300 text-sm mb-2">متوسط التقييم</h4>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                <span className="text-white">{userPreferences.averageRating.toFixed(1)}/5</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* تبويبات التوصيات */}
      <div className="flex space-x-1 space-x-reverse mb-6 bg-gray-800 rounded-lg p-1">
        {showPersonalized && (
          <button
            onClick={() => setActiveTab('personalized')}
            className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'personalized'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>شخصية</span>
          </button>
        )}
        
        {showTrending && (
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'trending'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>ترند</span>
          </button>
        )}
        
        {showNew && (
          <button
            onClick={() => setActiveTab('new')}
            className={`flex-1 flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'new'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>جديد</span>
          </button>
        )}
      </div>

      {/* قائمة التوصيات */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Brain className="w-6 h-6 text-blue-500 animate-pulse" />
            <span className="text-gray-300">جاري تحليل تفضيلاتك...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRecommendations.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-200 hover:scale-105 cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* مؤشرات خاصة */}
                <div className="absolute top-2 right-2 flex space-x-1 space-x-reverse">
                  {item.isPersonalized && (
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                      شخصي
                    </span>
                  )}
                  {item.isTrending && (
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                      ترند
                    </span>
                  )}
                  {item.isNew && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                      جديد
                    </span>
                  )}
                </div>
                
                {/* درجة المطابقة */}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  {item.matchScore}% تطابق
                </div>
                
                {/* الجودة */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  {item.quality}
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="text-white font-semibold mb-2 line-clamp-1">{item.title}</h4>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{item.description}</p>
                
                {/* سبب التوصية */}
                <div className="mb-3 p-2 bg-gray-700 rounded text-xs text-gray-300">
                  <Lightbulb className="w-3 h-3 inline ml-1" />
                  {item.reason}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <span>{item.year}</span>
                  <span>{item.duration}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                    <span>{item.rating}</span>
                  </div>
                </div>
                
                {/* أزرار التفاعل */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeedback(item.id, 'like');
                      }}
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFeedback(item.id, 'dislike');
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Eye className="w-3 h-3 ml-1" />
                    <span>{item.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* رسالة إذا لم توجد توصيات */}
      {!isLoading && filteredRecommendations.length === 0 && (
        <div className="text-center py-12">
          <Brain className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">
            لا توجد توصيات حالياً
          </h3>
          <p className="text-gray-400">
            شاهد المزيد من المحتوى لتحصل على توصيات شخصية
          </p>
        </div>
      )}
    </div>
  );
}