"use client"

import Link from 'next/link'
import { Star, Play, Calendar, Clock } from 'lucide-react'

// بيانات وهمية للأفلام - مطابقة لتصميم ak.sv
const moviesData = [
  {
    id: '1',
    title: 'فيلم الأكشن الجديد 2024',
    slug: 'new-action-movie-2024',
    poster: 'https://via.placeholder.com/300x450/1e293b/ffffff?text=فيلم+اكشن',
    rating: 8.5,
    year: 2024,
    duration: 135,
    quality: 'FHD',
    genres: ['أكشن', 'إثارة'],
    views: '125K'
  },
  {
    id: '2',
    title: 'كوميديا رومانسية مميزة',
    slug: 'romantic-comedy-special',
    poster: 'https://via.placeholder.com/300x450/be185d/ffffff?text=كوميديا+رومانسية',
    rating: 7.8,
    year: 2024,
    duration: 110,
    quality: 'HD',
    genres: ['كوميديا', 'رومانسي'],
    views: '89K'
  },
  {
    id: '3',
    title: 'ملحمة الخيال العلمي',
    slug: 'sci-fi-epic',
    poster: 'https://via.placeholder.com/300x450/374151/ffffff?text=خيال+علمي',
    rating: 9.2,
    year: 2024,
    duration: 155,
    quality: '4K',
    genres: ['خيال علمي', 'دراما'],
    views: '298K'
  },
  {
    id: '4',
    title: 'دراما تاريخية عظيمة',
    slug: 'historical-drama-great',
    poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=دراما+تاريخية',
    rating: 8.8,
    year: 2024,
    duration: 140,
    quality: 'FHD',
    genres: ['دراما', 'تاريخي'],
    views: '167K'
  },
  {
    id: '5',
    title: 'رعب نفسي مخيف',
    slug: 'psychological-horror',
    poster: 'https://via.placeholder.com/300x450/111827/ffffff?text=رعب+نفسي',
    rating: 7.5,
    year: 2024,
    duration: 95,
    quality: 'HD',
    genres: ['رعب', 'إثارة'],
    views: '76K'
  },
  {
    id: '6',
    title: 'مغامرة عائلية شيقة',
    slug: 'family-adventure-fun',
    poster: 'https://via.placeholder.com/300x450/059669/ffffff?text=مغامرة+عائلية',
    rating: 8.1,
    year: 2024,
    duration: 120,
    quality: 'FHD',
    genres: ['مغامرة', 'عائلي'],
    views: '143K'
  },
  {
    id: '7',
    title: 'إثارة وتشويق',
    slug: 'thriller-suspense',
    poster: 'https://via.placeholder.com/300x450/7c2d12/ffffff?text=إثارة+تشويق',
    rating: 8.3,
    year: 2024,
    duration: 128,
    quality: 'FHD',
    genres: ['إثارة', 'غموض'],
    views: '201K'
  },
  {
    id: '8',
    title: 'رسوم متحركة للكبار',
    slug: 'adult-animation',
    poster: 'https://via.placeholder.com/300x450/dc2626/ffffff?text=رسوم+متحركة',
    rating: 9.0,
    year: 2024,
    duration: 102,
    quality: '4K',
    genres: ['رسوم متحركة', 'مغامرة'],
    views: '312K'
  },
  {
    id: '9',
    title: 'وثائقي طبيعة مذهل',
    slug: 'nature-documentary',
    poster: 'https://via.placeholder.com/300x450/16a34a/ffffff?text=وثائقي+طبيعة',
    rating: 8.7,
    year: 2024,
    duration: 85,
    quality: '4K',
    genres: ['وثائقي', 'طبيعة'],
    views: '94K'
  },
  {
    id: '10',
    title: 'أكشن كوميدي ممتع',
    slug: 'action-comedy-fun',
    poster: 'https://via.placeholder.com/300x450/ea580c/ffffff?text=أكشن+كوميدي',
    rating: 7.9,
    year: 2024,
    duration: 115,
    quality: 'HD',
    genres: ['أكشن', 'كوميديا'],
    views: '178K'
  },
  {
    id: '11',
    title: 'جريمة وغموض',
    slug: 'crime-mystery',
    poster: 'https://via.placeholder.com/300x450/7c3aed/ffffff?text=جريمة+غموض',
    rating: 8.6,
    year: 2024,
    duration: 142,
    quality: 'FHD',
    genres: ['جريمة', 'غموض'],
    views: '234K'
  },
  {
    id: '12',
    title: 'موسيقي ملهم',
    slug: 'musical-inspiring',
    poster: 'https://via.placeholder.com/300x450/0891b2/ffffff?text=موسيقي+ملهم',
    rating: 8.4,
    year: 2024,
    duration: 118,
    quality: 'FHD',
    genres: ['موسيقي', 'دراما'],
    views: '156K'
  }
]

export function MoviesGrid() {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case '4K':
        return 'bg-purple-600'
      case 'FHD':
        return 'bg-green-600'
      case 'HD':
        return 'bg-blue-600'
      default:
        return 'bg-gray-600'
    }
  }

  return (
    <div className="content-grid animate-fadeIn">
      {moviesData.map((movie) => (
        <div key={movie.id} className="content-card group">
          <Link href={`/movies/${movie.slug}`}>
            {/* البوستر */}
            <div className="poster">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* شارة الجودة */}
              <div className={`quality-badge ${getQualityColor(movie.quality)}`}>
                {movie.quality}
              </div>
              
              {/* طبقة التراكب عند التمرير */}
              <div className="play-overlay">
                <div className="play-button">
                  <Play className="w-6 h-6 mr-1" />
                </div>
              </div>
            </div>
            
            {/* معلومات الفيلم */}
            <div className="info">
              <h3 className="title">{movie.title}</h3>
              
              <div className="meta">
                <div className="flex items-center gap-2 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>{movie.year}</span>
                  <Clock className="w-3 h-3 mr-2" />
                  <span>{movie.duration} د</span>
                </div>
                
                <div className="rating">
                  <Star className="star w-3 h-3" />
                  <span>{movie.rating}</span>
                </div>
              </div>
              
              {/* الأنواع */}
              <div className="flex flex-wrap gap-1 mt-2">
                {movie.genres.slice(0, 2).map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 bg-[#26baee]/20 text-[#26baee] text-xs rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              {/* عدد المشاهدات */}
              <div className="mt-2 text-xs text-gray-400">
                👁️ {movie.views} مشاهدة
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}