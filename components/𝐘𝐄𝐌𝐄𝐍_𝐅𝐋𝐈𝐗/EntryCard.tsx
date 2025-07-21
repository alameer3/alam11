"use client"

import Link from 'next/link'
import Image from 'next/image'
import { PlayCircle, Download, Heart } from 'lucide-react'

interface EntryCardProps {
  item: {
    slug: string
    title: string
    poster: string
    rating?: number
    quality?: string
  }
}

export function EntryCard({ item }: EntryCardProps) {
  return (
    <div className="entry-box entry-box-1 bg-gray-900 rounded-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-transform animate-fade-up">
      {/* Labels */}
      <div className="labels flex absolute top-2 right-2 z-10 text-xs">
        {item.rating && (
          <span className="label rating flex items-center bg-gray-800 text-yellow-400 px-1.5 py-0.5 rounded ml-1">
            <PlayCircle className="w-3 h-3 mr-1" />
            {item.rating}
          </span>
        )}
        {item.quality && (
          <span className="label quality bg-brand text-white px-1.5 py-0.5 rounded">
            {item.quality}
          </span>
        )}
      </div>

      {/* Image */}
      <Link href={`/${item.slug}`} className="block relative aspect-poster bg-gray-700">
        <Image
          src={item.poster}
          alt={item.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 50vw, 178px"
          className="object-cover"
        />
      </Link>

      {/* Body */}
      <div className="p-2 text-center">
        <h3 className="text-sm font-semibold text-white truncate" title={item.title}>
          {item.title}
        </h3>
        {/* Actions */}
        <div className="flex justify-center gap-3 mt-2 text-gray-400 text-xs">
          <button title="مشاهدة" className="hover:text-brand">
            <PlayCircle className="w-4 h-4" />
          </button>
          <button title="تحميل" className="hover:text-brand">
            <Download className="w-4 h-4" />
          </button>
          <button title="مفضلة" className="hover:text-brand">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}