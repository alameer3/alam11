"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

// Mock data - replace with real data from database
const genres = [
  {
    id: '1',
    name: 'أكشن',
    slug: 'action',
    image: 'https://via.placeholder.com/200x300/1e293b/ffffff?text=Action',
    count: 150
  },
  {
    id: '2',
    name: 'كوميديا',
    slug: 'comedy',
    image: 'https://via.placeholder.com/200x300/0f172a/ffffff?text=Comedy',
    count: 120
  },
  {
    id: '3',
    name: 'دراما',
    slug: 'drama',
    image: 'https://via.placeholder.com/200x300/374151/ffffff?text=Drama',
    count: 200
  },
  {
    id: '4',
    name: 'رعب',
    slug: 'horror',
    image: 'https://via.placeholder.com/200x300/1f2937/ffffff?text=Horror',
    count: 80
  },
  {
    id: '5',
    name: 'رومانسي',
    slug: 'romance',
    image: 'https://via.placeholder.com/200x300/111827/ffffff?text=Romance',
    count: 90
  },
  {
    id: '6',
    name: 'خيال علمي',
    slug: 'sci-fi',
    image: 'https://via.placeholder.com/200x300/0c1017/ffffff?text=Sci-Fi',
    count: 110
  }
]

export function GenreSection() {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">تصفح حسب النوع</h2>
        <Button asChild variant="ghost" className="text-primary hover:text-primary/80">
          <Link href="/genres" className="flex items-center space-x-2 space-x-reverse">
            <span>عرض الكل</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Genres Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/movies?genre=${genre.slug}`}
            className="group relative overflow-hidden rounded-lg bg-muted hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-[3/4] relative">
              <Image
                src={genre.image}
                alt={genre.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              
              {/* Genre Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg mb-1">{genre.name}</h3>
                <p className="text-sm text-gray-300">{genre.count} عنوان</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}