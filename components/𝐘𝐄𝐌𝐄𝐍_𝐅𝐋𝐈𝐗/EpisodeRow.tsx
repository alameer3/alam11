"use client"

import { Play, Download } from 'lucide-react'

interface EpisodeRowProps {
  ep: {
    number: number
    title: string
    duration: string
  }
  onWatch: () => void
  onDownload: () => void
}

export function EpisodeRow({ ep, onWatch, onDownload }: EpisodeRowProps) {
  return (
    <tr className="border-t border-gray-700 text-white text-sm">
      <td className="p-2 w-16 text-center">{ep.number}</td>
      <td className="p-2">{ep.title}</td>
      <td className="p-2 w-32">{ep.duration}</td>
      <td className="p-2 w-28">
        <button onClick={onWatch} className="bg-brand hover:bg-brand/90 text-white px-2 py-1 rounded text-xs flex items-center gap-1 w-full justify-center">
          <Play className="w-4 h-4" />
          مشاهدة
        </button>
      </td>
      <td className="p-2 w-28">
        <button onClick={onDownload} className="bg-dark hover:bg-gray-700 text-white px-2 py-1 rounded text-xs flex items-center gap-1 w-full justify-center">
          <Download className="w-4 h-4" />
          تحميل
        </button>
      </td>
    </tr>
  )
}