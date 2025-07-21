"use client"

import { Play } from 'lucide-react'

interface Server {
  name: string
  quality: string
  url: string
}

interface WatchServersProps {
  servers: Server[]
}

export function WatchServers({ servers }: WatchServersProps) {
  return (
    <section id="watch" className="my-8">
      <h2 className="text-xl font-semibold text-white mb-4">اختر سيرفر المشاهدة</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {servers.map((srv) => (
          <a
            key={srv.url}
            href={srv.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 transition p-3 rounded"
          >
            <Play className="w-5 h-5 text-brand" />
            <span className="flex-1 text-white text-sm font-medium">{srv.name}</span>
            <span className="bg-brand text-xs px-2 py-0.5 rounded">{srv.quality}</span>
          </a>
        ))}
      </div>
    </section>
  )
}