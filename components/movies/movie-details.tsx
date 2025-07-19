"use client"

import { Star, Calendar, Globe, User, Users, Award } from 'lucide-react'

interface MovieDetailsProps {
  movie: {
    director: string
    cast: string[]
    country: string
    language: string
    imdbRating: number
    releaseDate: string
    genre: string[]
  }
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">تفاصيل الفيلم</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">المخرج</p>
              <p className="text-sm">{movie.director}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">طاقم التمثيل</p>
              <p className="text-sm">{movie.cast.join(', ')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">البلد</p>
              <p className="text-sm">{movie.country}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">تاريخ الإصدار</p>
              <p className="text-sm">{new Date(movie.releaseDate).toLocaleDateString('ar-SA')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">تقييم IMDB</p>
              <p className="text-sm">{movie.imdbRating}/10</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-sm text-muted-foreground">اللغة</p>
              <p className="text-sm">{movie.language}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="font-medium text-sm text-muted-foreground mb-2">التصنيفات</p>
        <div className="flex flex-wrap gap-2">
          {movie.genre.map((genre) => (
            <span key={genre} className="genre-badge">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}