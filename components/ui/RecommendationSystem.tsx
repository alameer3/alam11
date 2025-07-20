'use client';

import { useState, useEffect } from 'react';
import { Star, Play, Clock, Heart, TrendingUp, Eye } from 'lucide-react';
import Link from 'next/link';

interface ContentItem {
  id: string;
  title: string;
  type: 'movie' | 'series' | 'show';
  image: string;
  rating: number;
  year: number;
  duration: string;
  genre: string[];
  views: number;
  isFavorite: boolean;
  isWatched: boolean;
  similarity: number;
}

interface RecommendationSystemProps {
  currentContentId: string;
  contentType: 'movie' | 'series' | 'show';
}

export default function RecommendationSystem({ currentContentId, contentType }: RecommendationSystemProps) {
  const [recommendations, setRecommendations] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'المصفوفة: إعادة التحميل',
      type: 'movie',
      image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=300&h=450&fit=crop',
      rating: 4.5,
      year: 2003,
      duration: '2h 18m',
      genre: ['أكشن', 'خيال علمي'],
      views: 1500000,
      isFavorite: false,
      isWatched: false,
      similarity: 95
    },
    {
      id: '2',
      title: 'المصفوفة: الثورات',
      type: 'movie',
      image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=300&h=450&fit=crop',
      rating: 4.2,
      year: 2003,
      duration: '2h 9m',
      genre: ['أكشن', 'خيال علمي'],
      views: 1200000,
      isFavorite: true,
      isWatched: true,
      similarity: 92
    },
    {
      id: '3',
      title: 'بلاك ميرور',
      type: 'series',
      image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=300&h=450&fit=crop',
      rating: 4.8,
      year: 2011,
      duration: '5 مواسم',
      genre: ['خيال علمي', 'دراما'],
      views: 800000,
      isFavorite: false,
      isWatched: false,
      similarity: 88
    },
    {
      id: '4',
      title: 'ويست وورلد',
      type: 'series',
      image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=300&h=450&fit=crop',
      rating: 4.6,
      year: 2016,
      duration: '4 مواسم',
      genre: ['خيال علمي', 'دراما'],
      views: 950000,
      isFavorite: false,
      isWatched: false,
      similarity: 85
    },
    {
      id: '5',
      title: 'إكس ماكينا',
      type: 'movie',
      image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=300&h=450&fit=crop',
      rating: 4.3,
      year: 2019,
      duration: '2h 13m',
      genre: ['أكشن', 'خيال علمي'],
      views: 1100000,
      isFavorite: false,
      isWatched: false,
      similarity: 82
    },
    {
      id: '6',
      title: 'تيرميناتور: دارك فيت',
      type: 'movie',
      image: 'https://images.unsplash.com/photo-1624138784728-4e49e5a3c0c5?w=300&h=450&fit=crop',
      rating: 4.1,
      year: 2019,
      duration: '2h 8m',
      genre: ['أكشن', 'خيال علمي'],
      views: 1300000,
      isFavorite: false,
      isWatched: false,
      similarity: 78
    }
  ]);

  const [filterType, setFilterType] = useState<'all' | 'similar' | 'trending' | 'favorites'>('all');
  const [sortBy, setSortBy] = useState<'similarity' | 'rating' | 'year' | 'views'>('similarity');

  const filteredRecommendations = recommendations.filter(item => {
    if (filterType === 'similar') return item.similarity > 80;
    if (filterType === 'trending') return item.views > 1000000;
    if (filterType === 'favorites') return item.isFavorite;
    return true;
  });

  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    switch (sortBy) {
      case 'similarity':
        return b.similarity - a.similarity;
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

  const toggleFavorite = (id: string) => {
    setRecommendations(recommendations.map(item =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
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

  const getContentUrl = (item: ContentItem) => {
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
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          قد يعجبك أيضاً
        </h3>
        
        {/* فلترة وترتيب */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              تصفية:
            </span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="input text-sm"
            >
              <option value="all">الكل</option>
              <option value="similar">مشابه</option>
              <option value="trending">رائج</option>
              <option value="favorites">المفضلة</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              ترتيب حسب:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input text-sm"
            >
              <option value="similarity">التشابه</option>
              <option value="rating">التقييم</option>
              <option value="year">السنة</option>
              <option value="views">المشاهدات</option>
            </select>
          </div>
        </div>

        {/* شبكة التوصيات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {sortedRecommendations.map((item) => (
            <div key={item.id} className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover-lift">
                {/* صورة المحتوى */}
                <Link href={getContentUrl(item)}>
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
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
                    {item.isWatched && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        <Eye className="w-3 h-3" />
                      </div>
                    )}
                    
                    {/* مؤشر المفضلة */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(item.id);
                      }}
                      className="absolute top-2 left-2 p-1 rounded-full bg-black/50 hover:bg-red-500 transition-colors duration-200"
                    >
                      <Heart 
                        className={`w-4 h-4 ${item.isFavorite ? 'text-red-500 fill-current' : 'text-white'}`} 
                      />
                    </button>
                  </div>
                </Link>
                
                {/* معلومات المحتوى */}
                <div className="p-3">
                  <Link href={getContentUrl(item)}>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                  </Link>
                  
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <span>{item.year}</span>
                    <span>{item.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {item.rating}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <TrendingUp className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {formatViews(item.views)}
                      </span>
                    </div>
                  </div>
                  
                  {/* التصنيفات */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.genre.slice(0, 2).map((genre, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  
                  {/* مؤشر التشابه */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">التشابه</span>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {item.similarity}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${item.similarity}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {sortedRecommendations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              لا توجد توصيات متاحة حالياً
            </div>
            <button
              onClick={() => setFilterType('all')}
              className="btn-primary"
            >
              عرض جميع المحتويات
            </button>
          </div>
        )}
      </div>
    </div>
  );
}