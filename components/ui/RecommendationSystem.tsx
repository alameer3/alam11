'use client';

import { useState, useEffect } from 'react';
import { 
  Heart, 
  Play, 
  Clock, 
  Star, 
  Eye, 
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  Bookmark,
  Filter,
  Search,
  RefreshCw,
  Settings,
  Sparkles,
  Target,
  Users,
  Calendar,
  BarChart3
} from 'lucide-react';

interface RecommendationItem {
  id: string;
  title: string;
  type: 'movie' | 'series' | 'documentary' | 'show';
  genre: string;
  rating: number;
  year: number;
  duration: string;
  views: number;
  thumbnail: string;
  description: string;
  isWatched: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
  recommendationReason: string;
  confidence: number;
}

interface RecommendationCategory {
  id: string;
  name: string;
  description: string;
  items: RecommendationItem[];
  icon: any;
  color: string;
}

export default function RecommendationSystem() {
  const [activeTab, setActiveTab] = useState('personalized');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const mockRecommendations: RecommendationItem[] = [
    {
      id: '1',
      title: 'فيلم الأكشن الجديد',
      type: 'movie',
      genre: 'أكشن',
      rating: 8.5,
      year: 2024,
      duration: '2:15:30',
      views: 15420,
      thumbnail: '/api/placeholder/300/200',
      description: 'فيلم أكشن مثير مليء بالمشاهد المذهلة والحركة السريعة',
      isWatched: false,
      isLiked: false,
      isBookmarked: false,
      recommendationReason: 'بناءً على مشاهدتك للأفلام الأكشن',
      confidence: 95
    },
    {
      id: '2',
      title: 'مسلسل درامي عائلي',
      type: 'series',
      genre: 'دراما',
      rating: 9.2,
      year: 2023,
      duration: '45:30',
      views: 8920,
      thumbnail: '/api/placeholder/300/200',
      description: 'مسلسل درامي عائلي مليء بالأحداث المثيرة والمشاعر العميقة',
      isWatched: true,
      isLiked: true,
      isBookmarked: false,
      recommendationReason: 'مشابه للمسلسلات التي أعجبتك',
      confidence: 88
    },
    {
      id: '3',
      title: 'وثائقي الحياة البرية',
      type: 'documentary',
      genre: 'وثائقي',
      rating: 7.8,
      year: 2024,
      duration: '1:30:00',
      views: 4560,
      thumbnail: '/api/placeholder/300/200',
      description: 'وثائقي مذهل عن الحياة البرية والطبيعة الخلابة',
      isWatched: false,
      isLiked: false,
      isBookmarked: true,
      recommendationReason: 'بناءً على اهتمامك بالطبيعة',
      confidence: 92
    },
    {
      id: '4',
      title: 'فيلم كوميدي خفيف',
      type: 'movie',
      genre: 'كوميدي',
      rating: 7.5,
      year: 2023,
      duration: '1:45:20',
      views: 12340,
      thumbnail: '/api/placeholder/300/200',
      description: 'فيلم كوميدي خفيف مليء بالضحك والمرح',
      isWatched: false,
      isLiked: false,
      isBookmarked: false,
      recommendationReason: 'جديد في المكتبة',
      confidence: 75
    },
    {
      id: '5',
      title: 'مسلسل خيال علمي',
      type: 'series',
      genre: 'خيال علمي',
      rating: 8.9,
      year: 2024,
      duration: '50:00',
      views: 6780,
      thumbnail: '/api/placeholder/300/200',
      description: 'مسلسل خيال علمي مثير مليء بالمفاجآت والتقنيات المتقدمة',
      isWatched: false,
      isLiked: false,
      isBookmarked: false,
      recommendationReason: 'مشابه للمسلسلات التي شاهدتها',
      confidence: 85
    },
    {
      id: '6',
      title: 'برنامج ترفيهي',
      type: 'show',
      genre: 'ترفيه',
      rating: 6.8,
      year: 2024,
      duration: '30:00',
      views: 2340,
      thumbnail: '/api/placeholder/300/200',
      description: 'برنامج ترفيهي ممتع مليء بالضحك والمرح',
      isWatched: false,
      isLiked: false,
      isBookmarked: false,
      recommendationReason: 'بناءً على تفضيلاتك',
      confidence: 70
    }
  ];

  const categories = [
    { id: 'all', name: 'الكل', color: 'bg-gray-500' },
    { id: 'action', name: 'أكشن', color: 'bg-red-500' },
    { id: 'drama', name: 'دراما', color: 'bg-blue-500' },
    { id: 'comedy', name: 'كوميدي', color: 'bg-yellow-500' },
    { id: 'sci-fi', name: 'خيال علمي', color: 'bg-purple-500' },
    { id: 'documentary', name: 'وثائقي', color: 'bg-green-500' },
    { id: 'entertainment', name: 'ترفيه', color: 'bg-pink-500' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'الأكثر صلة' },
    { value: 'rating', label: 'الأعلى تقييماً' },
    { value: 'newest', label: 'الأحدث' },
    { value: 'popular', label: 'الأكثر شعبية' },
    { value: 'confidence', label: 'أعلى ثقة' }
  ];

  const tabs = [
    { id: 'personalized', label: 'مخصص لك', icon: Target },
    { id: 'trending', label: 'رائج', icon: TrendingUp },
    { id: 'similar', label: 'مشابه', icon: Users },
    { id: 'new', label: 'جديد', icon: Sparkles },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  const handleLike = (itemId: string) => {
    // Handle like action
    console.log(`Liked item: ${itemId}`);
  };

  const handleDislike = (itemId: string) => {
    // Handle dislike action
    console.log(`Disliked item: ${itemId}`);
  };

  const handleWatch = (itemId: string) => {
    // Handle watch action
    console.log(`Watching item: ${itemId}`);
  };

  const handleBookmark = (itemId: string) => {
    // Handle bookmark action
    console.log(`Bookmarked item: ${itemId}`);
  };

  const getFilteredRecommendations = () => {
    let filtered = mockRecommendations;
    
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(item => 
        item.genre.toLowerCase().includes(selectedGenre)
      );
    }

    switch (sortBy) {
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return filtered.sort((a, b) => b.year - a.year);
      case 'popular':
        return filtered.sort((a, b) => b.views - a.views);
      case 'confidence':
        return filtered.sort((a, b) => b.confidence - a.confidence);
      default:
        return filtered;
    }
  };

  const getRecommendationCategory = () => {
    switch (activeTab) {
      case 'trending':
        return {
          name: 'المحتوى الرائج',
          description: 'الأكثر مشاهدة وتداولاً هذا الأسبوع',
          icon: TrendingUp,
          color: 'text-orange-500'
        };
      case 'similar':
        return {
          name: 'مشابه لما شاهدت',
          description: 'بناءً على تاريخ مشاهدتك',
          icon: Users,
          color: 'text-blue-500'
        };
      case 'new':
        return {
          name: 'محتوى جديد',
          description: 'أحدث الإضافات إلى المكتبة',
          icon: Sparkles,
          color: 'text-purple-500'
        };
      default:
        return {
          name: 'مخصص لك',
          description: 'بناءً على تفضيلاتك وسلوكك',
          icon: Target,
          color: 'text-green-500'
        };
    }
  };

  const category = getRecommendationCategory();
  const Icon = category.icon;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 space-x-reverse mb-2">
          <Icon size={24} className={category.color} />
          <h1 className="text-3xl font-bold">{category.name}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 space-x-reverse px-6">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 space-x-reverse ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <TabIcon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab !== 'settings' ? (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Filter size={16} className="text-gray-500" />
                  <span className="text-sm font-medium">تصفية:</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedGenre(cat.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedGenre === cat.id
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm font-medium">ترتيب:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Recommendations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredRecommendations().map((item) => (
                  <div key={item.id} className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 flex items-center space-x-1 space-x-reverse">
                        <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {item.duration}
                        </div>
                        {item.isBookmarked && (
                          <div className="bg-blue-600 text-white p-1 rounded">
                            <Bookmark size={12} />
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <div className="flex items-center space-x-1 space-x-reverse bg-black/70 text-white px-2 py-1 rounded text-xs">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <button
                            onClick={() => handleLike(item.id)}
                            className={`p-1 rounded ${item.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                          >
                            <ThumbsUp size={16} />
                          </button>
                          <button
                            onClick={() => handleDislike(item.id)}
                            className="p-1 rounded text-gray-400 hover:text-gray-600"
                          >
                            <ThumbsDown size={16} />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{item.year}</span>
                        <span>{item.genre}</span>
                        <span>{item.views.toLocaleString()} مشاهدة</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">سبب التوصية:</span>
                          <span className="text-blue-600">{item.recommendationReason}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">مستوى الثقة:</span>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <div className="w-16 bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-green-500 h-1 rounded-full" 
                                style={{ width: `${item.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-green-600">{item.confidence}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 space-x-reverse mt-4">
                        <button
                          onClick={() => handleWatch(item.id)}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 space-x-reverse"
                        >
                          <Play size={16} />
                          <span>مشاهدة</span>
                        </button>
                        <button
                          onClick={() => handleBookmark(item.id)}
                          className={`p-2 rounded-lg border ${
                            item.isBookmarked 
                              ? 'border-blue-500 text-blue-500' 
                              : 'border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500'
                          }`}
                        >
                          <Bookmark size={16} />
                        </button>
                        <button className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {getFilteredRecommendations().length === 0 && (
                <div className="text-center py-12">
                  <Target size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    لا توجد توصيات
                  </h3>
                  <p className="text-gray-500">
                    جرب تغيير الفلاتر أو تحديث التوصيات
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">إعدادات التوصيات</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">تفضيلات المحتوى</h4>
                    <div className="space-y-3">
                      {categories.slice(1).map((category) => (
                        <div key={category.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                            <span className="text-sm">{category.name}</span>
                          </div>
                          <input type="checkbox" className="rounded" defaultChecked />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">إعدادات الخصوصية</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">جمع بيانات المشاهدة</span>
                        <input type="checkbox" className="rounded" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">تحليل التفضيلات</span>
                        <input type="checkbox" className="rounded" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">توصيات مخصصة</span>
                        <input type="checkbox" className="rounded" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">تحديث التوصيات</h4>
                <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <RefreshCw size={16} />
                  <span>تحديث التوصيات</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}