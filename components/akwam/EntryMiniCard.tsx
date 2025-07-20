"use client"

import Link from 'next/link'
import Image from 'next/image'
import { PlayCircle } from 'lucide-react'

interface MiniProps {
  item: {
    slug: string
    title: string
    poster: string
    rating?: number
    quality?: string
    type?: string
  }
}

export function EntryMiniCard({ item }: MiniProps) {
  return (
    <Link href={`/${item.slug}`} className="entry-mini flex bg-gray-800 rounded hover:bg-gray-700 transition p-2">
      <div className="relative w-20 h-28 flex-shrink-0 rounded overflow-hidden">
        <Image src={item.poster} alt={item.title} fill sizes="80px" className="object-cover" />
      </div>
      <div className="flex-1 pl-3 text-white">
        <h4 className="font-semibold text-sm line-clamp-2">{item.title}</h4>
        {item.rating && (
          <div className="text-xs text-yellow-400 flex items-center mt-1">
            ⭐ {item.rating}
          </div>
        )}
        {item.quality && (
          <span className="bg-brand text-xs px-1.5 py-0.5 rounded mt-1 inline-block">{item.quality}</span>
        )}
      </div>
      <PlayCircle className="w-5 h-5 text-brand self-center" />
    </Link>
  )
}