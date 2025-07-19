"use client"

import { MovieCard } from '@/components/movies/movie-card'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Mock data - replace with real data from database
const featuredMovies = [
  {
    id: '1',
    title: 'فيلم الأكشن الملحمي',
    slug: 'epic-action-movie',
    poster: 'https://via.placeholder.com/300x450/1e293b/ffffff?text=Movie+1',
    rating: 8.7,
    year: 2024,
    duration: 135
  },
  {
    id: '2',
    title: 'كوميديا رومانسية',
    slug: 'romantic-comedy',
    poster: 'https://via.placeholder.com/300x450/0f172a/ffffff?text=Movie+2',
    rating: 7.9,
    year: 2024,
    duration: 110
  },
  {
    id: '3',
    title: 'فيلم الخيال العلمي',
    slug: 'sci-fi-movie',
    poster: 'https://via.placeholder.com/300x450/374151/ffffff?text=Movie+3',
    rating: 9.1,
    year: 2024,
    duration: 165
  },
  {
    id: '4',
    title: 'دراما تاريخية',
    slug: 'historical-drama',
    poster: 'https://via.placeholder.com/300x450/1f2937/ffffff?text=Movie+4',
    rating: 8.3,
    year: 2024,
    duration: 155
  },
  {
    id: '5',
    title: 'إثارة ومغامرة',
    slug: 'thriller-adventure',
    poster: 'https://via.placeholder.com/300x450/111827/ffffff?text=Movie+5',
    rating: 8.0,
    year: 2024,
    duration: 125
  },
  {
    id: '6',
    title: 'رعب ونفسي',
    slug: 'psychological-horror',
    poster: 'https://via.placeholder.com/300x450/0c1017/ffffff?text=Movie+6',
    rating: 7.5,
    year: 2024,
    duration: 95
  }
]

export function FeaturedMovies() {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">الأفلام المميزة</h2>
        <Button asChild variant="ghost" className="text-primary hover:text-primary/80">
          <Link href="/movies" className="flex items-center space-x-2 space-x-reverse">
            <span>عرض المزيد</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {featuredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}