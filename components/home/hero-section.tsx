"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, Plus, Star, Clock } from 'lucide-react'
import { formatDuration, formatRating } from '@/lib/utils'

interface HeroMovie {
  id: string
  title: string
  description: string
  backdrop: string
  rating: number
  year: number
  duration: number
  slug: string
}

// Mock data - replace with real data from database
const featuredMovies: HeroMovie[] = [
  {
    id: '1',
    title: 'فيلم الإثارة الجديد',
    description: 'قصة مشوقة مليئة بالأحداث المثيرة والمفاجآت التي ستجعلك على حافة مقعدك طوال الوقت. فيلم لا يُفوت لعشاق الإثارة والتشويق.',
    backdrop: 'https://via.placeholder.com/1920x1080/0f172a/ffffff?text=Hero+Movie+1',
    rating: 8.5,
    year: 2024,
    duration: 145,
    slug: 'thriller-movie-2024'
  },
  {
    id: '2',
    title: 'مسلسل الدراما الشهير',
    description: 'مسلسل درامي يحكي قصة عائلة عبر أجيال مختلفة، مليء بالعواطف والصراعات الإنسانية التي تجعل المشاهد يتفاعل مع كل شخصية.',
    backdrop: 'https://via.placeholder.com/1920x1080/1e293b/ffffff?text=Hero+Series+1',
    rating: 9.2,
    year: 2024,
    duration: 50,
    slug: 'drama-series-2024'
  }
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentMovie = featuredMovies[currentIndex]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentMovie.backdrop}
          alt={currentMovie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white space-y-6">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in">
              {currentMovie.title}
            </h1>

            {/* Movie Info */}
            <div className="flex items-center space-x-6 space-x-reverse text-sm animate-slide-in">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{formatRating(currentMovie.rating)}</span>
              </div>
              <span>{currentMovie.year}</span>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(currentMovie.duration)}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl leading-relaxed max-w-xl animate-fade-in">
              {currentMovie.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 space-x-reverse animate-slide-in">
              <Button asChild size="lg" className="px-8">
                <Link href={`/watch/${currentMovie.slug}`}>
                  <Play className="h-5 w-5 ml-2" />
                  مشاهدة الآن
                </Link>
              </Button>
              
              <Button variant="secondary" size="lg" className="px-8">
                <Plus className="h-5 w-5 ml-2" />
                إضافة للقائمة
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-2 space-x-reverse">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}