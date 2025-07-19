"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, Plus, Info, Star } from 'lucide-react'

// Mock featured content
const featuredContent = [
  {
    id: '1',
    title: 'فيلم الأكشن الملحمي 2024',
    description: 'أحدث أفلام الأكشن المثيرة مع مؤثرات بصرية خيالية ومعارك ملحمية لا تُنسى. فيلم يأخذك في رحلة مشوقة مليئة بالإثارة والتشويق.',
    backdrop: 'https://via.placeholder.com/1920x1080/0f172a/ffffff?text=Featured+Movie+1',
    poster: 'https://via.placeholder.com/400x600/1e293b/ffffff?text=Movie+1',
    rating: 8.7,
    year: 2024,
    genre: ['أكشن', 'إثارة', 'مغامرة'],
    slug: 'epic-action-movie-2024'
  },
  {
    id: '2',
    title: 'مسلسل الغموض المثير',
    description: 'مسلسل درامي مليء بالغموض والأحداث المتشابكة. قصة مشوقة ستجعلك تنتظر كل حلقة بفارغ الصبر مع شخصيات مؤثرة وأحداث غير متوقعة.',
    backdrop: 'https://via.placeholder.com/1920x1080/374151/ffffff?text=Featured+Series+1',
    poster: 'https://via.placeholder.com/400x600/1f2937/ffffff?text=Series+1',
    rating: 9.2,
    year: 2024,
    genre: ['دراما', 'غموض', 'جريمة'],
    slug: 'mystery-thriller-series'
  },
  {
    id: '3',
    title: 'كوميديا رومانسية خفيفة',
    description: 'فيلم كوميدي رومانسي خفيف يجمع بين الضحك والمشاعر الرقيقة. قصة حب جميلة مليئة بالمواقف المضحكة والذكريات الجميلة.',
    backdrop: 'https://via.placeholder.com/1920x1080/111827/ffffff?text=Featured+Movie+2',
    poster: 'https://via.placeholder.com/400x600/0f172a/ffffff?text=Movie+2',
    rating: 8.1,
    year: 2024,
    genre: ['كوميدي', 'رومانسي', 'عائلي'],
    slug: 'romantic-comedy-2024'
  }
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const currentItem = featuredContent[currentIndex]

  if (isLoading) {
    return (
      <div className="relative h-[80vh] bg-gray-900 flex items-center justify-center">
        <div className="loading-spinner border-white" />
      </div>
    )
  }

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentItem.backdrop}
          alt={currentItem.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="space-y-6 text-white">
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <span className="bg-red-600 px-3 py-1 rounded-full font-medium">
                    مميز
                  </span>
                  <span className="text-gray-300">{currentItem.year}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{currentItem.rating}</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {currentItem.title}
                </h1>

                <div className="flex flex-wrap gap-2">
                  {currentItem.genre.map((genre) => (
                    <span key={genre} className="text-sm px-3 py-1 bg-white/20 rounded-full">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                {currentItem.description}
              </p>

              <div className="flex items-center gap-4">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8" asChild>
                  <Link href={`/watch/${currentItem.slug}`}>
                    <Play className="h-5 w-5 ml-2 fill-current" />
                    مشاهدة الآن
                  </Link>
                </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 px-8"
                  asChild
                >
                  <Link href={`/movies/${currentItem.slug}`}>
                    <Info className="h-5 w-5 ml-2" />
                    المزيد
                  </Link>
                </Button>

                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="text-white hover:bg-white/10 px-4"
                >
                  <Plus className="h-5 w-5 ml-2" />
                  قائمتي
                </Button>
              </div>
            </div>

            {/* Poster */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-96 relative">
                  <Image
                    src={currentItem.poster}
                    alt={currentItem.title}
                    fill
                    className="object-cover rounded-xl shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
                </div>
                
                {/* Quality Badge */}
                <div className="absolute top-4 right-4">
                  <span className="quality-badge quality-4k">4K UHD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-3">
          {featuredContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-red-600 w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Next/Prev Arrows */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={() => setCurrentIndex((prev) => prev === 0 ? featuredContent.length - 1 : prev - 1)}
          className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-300 flex items-center justify-center"
        >
          ←
        </button>
      </div>
      
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredContent.length)}
          className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-300 flex items-center justify-center"
        >
          →
        </button>
      </div>
    </section>
  )
}