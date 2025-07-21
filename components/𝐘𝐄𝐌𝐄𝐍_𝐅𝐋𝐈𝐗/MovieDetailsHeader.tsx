"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Play, Download } from 'lucide-react'

interface MovieDetailsHeaderProps {
  poster: string
  backdrop: string
  title: string
  originalTitle?: string
  year?: number
  rating?: number
  quality?: string
}

export function MovieDetailsHeader({ poster, backdrop, title, originalTitle, year, rating, quality }: MovieDetailsHeaderProps) {
  return (
    <div className="relative w-full h-[70vh] flex items-end">
      <Image src={backdrop} alt={title} fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 pb-8 flex flex-col md:flex-row items-end gap-6">
        {/* Poster */}
        <div className="w-40 md:w-52 flex-shrink-0 rounded overflow-hidden shadow-lg">
          <Image src={poster} alt={title} width={350} height={525} className="object-cover" />
        </div>

        {/* Info */}
        <div className="text-white max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          {originalTitle && <h2 className="text-lg text-gray-300 mb-4">{originalTitle}</h2>}
          <div className="flex items-center gap-4 text-sm mb-6">
            {year && <span>{year}</span>}
            {rating && <span className="bg-yellow-500 text-black px-2 py-0.5 rounded">⭐ {rating}</span>}
            {quality && <span className="bg-brand px-2 py-0.5 rounded">{quality}</span>}
          </div>

          <div className="flex gap-4">
            <Link href="#watch" className="bg-brand hover:bg-brand/90 text-white px-6 py-3 rounded flex items-center gap-2">
              <Play className="w-5 h-5" />
              مشاهدة الآن
            </Link>
            <Link href="#download" className="bg-dark hover:bg-gray-700 text-white px-6 py-3 rounded flex items-center gap-2">
              <Download className="w-5 h-5" />
              التحميل
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}