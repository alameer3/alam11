"use client"

import { Download, ExternalLink, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DownloadSource {
  quality: string
  size: string
  url: string
}

interface DownloadSectionProps {
  sources: DownloadSource[]
}

export function DownloadSection({ sources }: DownloadSectionProps) {
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center gap-2 mb-4">
        <Download className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">تحميل الفيلم</h3>
      </div>

      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.quality} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <span className={`quality-badge ${
                source.quality === 'HD' ? 'quality-hd' : 
                source.quality === 'FHD' ? 'quality-fhd' : 
                source.quality === '4K' ? 'quality-4k' : 'bg-gray-600'
              }`}>
                {source.quality}
              </span>
              <div>
                <p className="font-medium text-sm">{source.quality}</p>
                <p className="text-xs text-muted-foreground">{source.size}</p>
              </div>
            </div>
            
            <Button size="sm" asChild>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 ml-1" />
                تحميل
              </a>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-orange-800 dark:text-orange-200">
            <p className="font-medium mb-1">تنبيه مهم:</p>
            <p>استخدم برنامج مكافح الفيروسات قبل فتح أي ملف محمل من الإنترنت.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Button variant="outline" size="sm" className="w-full">
          <ExternalLink className="h-4 w-4 ml-1" />
          روابط تحميل إضافية
        </Button>
      </div>
    </div>
  )
}