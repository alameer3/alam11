"use client"

import { MovieCard } from '@/components/movies/movie-card'

interface RelatedMoviesProps {
  currentMovieId: string
}

// Mock data - في التطبيق الحقيقي، سيتم جلب البيانات من قاعدة البيانات
const relatedMovies = [
  {
    id: '2',
    title: 'فيلم مشابه 1',
    slug: 'similar-movie-1',
    poster: 'https://via.placeholder.com/300x450/1e293b/ffffff?text=Related+1',
    rating: 8.2,
    year: 2024,
    duration: 120
  },
  {
    id: '3',
    title: 'فيلم مشابه 2',
    slug: 'similar-movie-2',
    poster: 'https://via.placeholder.com/300x450/0f172a/ffffff?text=Related+2',
    rating: 7.9,
    year: 2024,
    duration: 135
  },
  {
    id: '4',
    title: 'فيلم مشابه 3',
    slug: 'similar-movie-3',
    poster: 'https://via.placeholder.com/300x450/374151/ffffff?text=Related+3',
    rating: 8.5,
    year: 2023,
    duration: 110
  }
]

export function RelatedMovies({ currentMovieId }: RelatedMoviesProps) {
  // Filter out the current movie
  const filteredMovies = relatedMovies.filter(movie => movie.id !== currentMovieId)

  return (
    <div className="bg-card rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-4">أفلام مشابهة</h3>
      
      <div className="space-y-4">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
            <MovieCard movie={movie} showOverlay={false} />
          </div>
        ))}
      </div>
    </div>
  )
}