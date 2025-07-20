'use client'

import { MovieDetailsHeader } from '@/components/akwam/MovieDetailsHeader'

// temporary dataset
const movies = [
  {
    slug: 'the-dark-knight',
    title: 'The Dark Knight',
    originalTitle: 'The Dark Knight',
    year: 2008,
    rating: 9.0,
    quality: '4K',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=350&h=525&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1502139214982-d0ad755818cc?w=1280&h=720&fit=crop',
    description: 'فيلم أكشن وإثارة من بطولة كريستيان بيل…',
  },
]

export default function MoviePage({ params }: { params: { slug: string } }) {
  const movie = movies.find((m) => m.slug === params.slug) || movies[0]

  return (
    <div className="bg-home min-h-screen">
      <MovieDetailsHeader
        poster={movie.poster}
        backdrop={movie.backdrop}
        title={movie.title}
        originalTitle={movie.originalTitle}
        year={movie.year}
        rating={movie.rating}
        quality={movie.quality}
      />

      {/* Placeholder for watch servers, download links, description */}
      <div className="container mx-auto px-4 py-8 text-white">
        <h2 className="text-lg font-semibold mb-4">الوصف</h2>
        <p className="text-gray-300 leading-relaxed max-w-3xl">{movie.description}</p>
      </div>
    </div>
  )
}