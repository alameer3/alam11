"use client"

import { MovieCard } from '@/components/movies/movie-card'

// Mock trending content
const trendingContent = [
  {
    id: '1',
    title: 'فيلم الأكشن الرهيب',
    slug: 'action-blockbuster',
    poster: 'https://via.placeholder.com/300x450/1e293b/ffffff?text=Trending+1',
    rating: 8.9,
    year: 2024,
    duration: 142,
    genres: ['أكشن', 'إثارة']
  },
  {
    id: '2',
    title: 'مسلسل الجريمة المثير',
    slug: 'crime-thriller-series',
    poster: 'https://via.placeholder.com/300x450/374151/ffffff?text=Trending+2',
    rating: 9.1,
    year: 2024,
    duration: 55,
    genres: ['جريمة', 'دراما']
  },
  {
    id: '3',
    title: 'كوميديا العائلة المرحة',
    slug: 'family-comedy',
    poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=Trending+3',
    rating: 8.3,
    year: 2024,
    duration: 98,
    genres: ['كوميدي', 'عائلي']
  },
  {
    id: '4',
    title: 'رعب الليلة المظلمة',
    slug: 'dark-night-horror',
    poster: 'https://via.placeholder.com/300x450/111827/ffffff?text=Trending+4',
    rating: 7.8,
    year: 2024,
    duration: 105,
    genres: ['رعب', 'إثارة']
  },
  {
    id: '5',
    title: 'خيال علمي المستقبل',
    slug: 'future-sci-fi',
    poster: 'https://via.placeholder.com/300x450/0c1017/ffffff?text=Trending+5',
    rating: 8.6,
    year: 2024,
    duration: 136,
    genres: ['خيال علمي', 'مغامرة']
  },
  {
    id: '6',
    title: 'دراما القلوب المكسورة',
    slug: 'broken-hearts-drama',
    poster: 'https://via.placeholder.com/300x450/18181b/ffffff?text=Trending+6',
    rating: 8.4,
    year: 2024,
    duration: 128,
    genres: ['دراما', 'رومانسي']
  }
]

export function TrendingSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
      {trendingContent.map((item) => (
        <div key={item.id} className="relative group">
          <MovieCard movie={item} />
          {/* Trending Indicator */}
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              🔥 ترند
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}