"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, Plus, Star, Tv } from 'lucide-react'
import { formatRating } from '@/lib/utils'

interface SeriesCardProps {
  series: {
    id: string
    title: string
    slug: string
    poster: string
    rating: number
    year: number
    seasons?: number
    genres?: string[]
  }
  showOverlay?: boolean
}

export function SeriesCard({ series, showOverlay = true }: SeriesCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="group relative movie-card">
      <Link href={`/series/${series.slug}`}>
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
          <Image
            src={imageError ? '/placeholder-movie.jpg' : series.poster}
            alt={series.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          
          {/* Series Badge */}
          <div className="absolute top-2 right-2 z-20">
            <span className="quality-badge bg-purple-600">مسلسل</span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 left-2 z-20 flex items-center space-x-1 space-x-reverse bg-black/70 rounded px-2 py-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-white font-medium">
              {formatRating(series.rating)}
            </span>
          </div>

          {/* Hover Overlay */}
          {showOverlay && (
            <div className="movie-overlay">
              <div className="flex flex-col items-center space-y-3">
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  asChild
                >
                  <Link href={`/watch/${series.slug}`}>
                    <Play className="h-5 w-5 text-white" />
                  </Link>
                </Button>
                
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                >
                  <Plus className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Series Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {series.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{series.year}</span>
          {series.seasons && (
            <div className="flex items-center space-x-1 space-x-reverse">
              <Tv className="h-3 w-3" />
              <span>{series.seasons} مواسم</span>
            </div>
          )}
        </div>

        {/* Genres */}
        {series.genres && series.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {series.genres.slice(0, 2).map((genre) => (
              <span key={genre} className="genre-badge text-xs">
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}