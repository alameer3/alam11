"use client"

import { MovieCard } from '@/components/movies/movie-card'

// Mock latest movies
const latestMovies = [
  {
    id: '7',
    title: 'مغامرة الصحراء الكبرى',
    slug: 'desert-adventure',
    poster: 'https://via.placeholder.com/300x450/2d1b69/ffffff?text=Latest+1',
    rating: 8.7,
    year: 2024,
    duration: 134,
    genres: ['مغامرة', 'أكشن']
  },
  {
    id: '8',
    title: 'قصة حب في باريس',
    slug: 'paris-love-story',
    poster: 'https://via.placeholder.com/300x450/be185d/ffffff?text=Latest+2',
    rating: 8.2,
    year: 2024,
    duration: 112,
    genres: ['رومانسي', 'دراما']
  },
  {
    id: '9',
    title: 'لعبة العقول الذكية',
    slug: 'mind-games',
    poster: 'https://via.placeholder.com/300x450/059669/ffffff?text=Latest+3',
    rating: 8.9,
    year: 2024,
    duration: 126,
    genres: ['إثارة', 'غموض']
  },
  {
    id: '10',
    title: 'كوميديا المدرسة الثانوية',
    slug: 'high-school-comedy',
    poster: 'https://via.placeholder.com/300x450/dc2626/ffffff?text=Latest+4',
    rating: 7.9,
    year: 2024,
    duration: 95,
    genres: ['كوميدي', 'شباب']
  },
  {
    id: '11',
    title: 'حرب الفضاء الأخيرة',
    slug: 'final-space-war',
    poster: 'https://via.placeholder.com/300x450/7c3aed/ffffff?text=Latest+5',
    rating: 8.5,
    year: 2024,
    duration: 148,
    genres: ['خيال علمي', 'أكشن']
  },
  {
    id: '12',
    title: 'سر القلعة المفقودة',
    slug: 'lost-castle-secret',
    poster: 'https://via.placeholder.com/300x450/ea580c/ffffff?text=Latest+6',
    rating: 8.1,
    year: 2024,
    duration: 118,
    genres: ['مغامرة', 'غموض']
  }
]

export function LatestMovies() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
      {latestMovies.map((movie) => (
        <div key={movie.id} className="relative group">
          <MovieCard movie={movie} />
          {/* New Badge */}
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              جديد
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}