"use client"

import { MovieCard } from '@/components/movies/movie-card'
import { SeriesCard } from '@/components/series/series-card'

// Mock top rated content
const topRatedContent = [
  {
    id: '19',
    title: 'تحفة السينما العالمية',
    slug: 'cinema-masterpiece',
    poster: 'https://via.placeholder.com/300x450/fbbf24/ffffff?text=Top+1',
    rating: 9.8,
    year: 2024,
    duration: 165,
    type: 'movie',
    genres: ['دراما', 'تاريخي']
  },
  {
    id: '20',
    title: 'مسلسل الخيال العلمي الأسطوري',
    slug: 'legendary-sci-fi-series',
    poster: 'https://via.placeholder.com/300x450/8b5cf6/ffffff?text=Top+2',
    rating: 9.7,
    year: 2024,
    episodes: 10,
    seasons: 2,
    type: 'series',
    genres: ['خيال علمي', 'دراما']
  },
  {
    id: '21',
    title: 'ملحمة الأكشن التاريخية',
    slug: 'historical-action-epic',
    poster: 'https://via.placeholder.com/300x450/ef4444/ffffff?text=Top+3',
    rating: 9.6,
    year: 2024,
    duration: 178,
    type: 'movie',
    genres: ['أكشن', 'تاريخي']
  },
  {
    id: '22',
    title: 'إثارة الجريمة المعقدة',
    slug: 'complex-crime-thriller',
    poster: 'https://via.placeholder.com/300x450/10b981/ffffff?text=Top+4',
    rating: 9.5,
    year: 2024,
    episodes: 12,
    seasons: 1,
    type: 'series',
    genres: ['جريمة', 'إثارة']
  },
  {
    id: '23',
    title: 'رعب المنزل المسكون',
    slug: 'haunted-house-horror',
    poster: 'https://via.placeholder.com/300x450/6366f1/ffffff?text=Top+5',
    rating: 9.4,
    year: 2024,
    duration: 132,
    type: 'movie',
    genres: ['رعب', 'إثارة']
  },
  {
    id: '24',
    title: 'كوميديا الصداقة الأبدية',
    slug: 'eternal-friendship-comedy',
    poster: 'https://via.placeholder.com/300x450/f59e0b/ffffff?text=Top+6',
    rating: 9.3,
    year: 2024,
    duration: 108,
    type: 'movie',
    genres: ['كوميدي', 'صداقة']
  }
]

export function TopRated() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
      {topRatedContent.map((item) => (
        <div key={item.id} className="relative group">
          {item.type === 'series' ? (
            <SeriesCard series={item} />
          ) : (
            <MovieCard movie={item} />
          )}
          {/* Top Rated Badge */}
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              ⭐ {item.rating}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}