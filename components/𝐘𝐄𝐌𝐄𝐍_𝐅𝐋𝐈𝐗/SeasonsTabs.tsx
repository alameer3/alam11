"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EpisodeRow } from './EpisodeRow'
import { WatchServers } from './WatchServers'
import { DownloadLinks } from './DownloadLinks'

interface Episode {
  number: number
  title: string
  duration: string
}
interface Season {
  season: number
  episodes: Episode[]
}
interface SeasonsTabsProps {
  seasons: Season[]
}

export function SeasonsTabs({ seasons }: SeasonsTabsProps) {
  return (
    <section id="seasons" className="my-12">
      <h2 className="text-xl font-semibold text-white mb-4">المواسم</h2>
      <Tabs defaultValue={`S${seasons[0].season}`} className="w-full">
        <TabsList className="bg-dark p-2 rounded mb-6 flex overflow-auto whitespace-nowrap">
          {seasons.map((s) => (
            <TabsTrigger key={s.season} value={`S${s.season}`} className="text-white data-[state=active]:bg-brand data-[state=active]:text-white ml-2 first:ml-0 px-3 py-1 rounded">
              الموسم {s.season}
            </TabsTrigger>
          ))}
        </TabsList>

        {seasons.map((s) => (
          <TabsContent key={s.season} value={`S${s.season}`} className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-700">
              <thead className="bg-dark text-white">
                <tr>
                  <th className="p-2 w-16">#</th>
                  <th className="p-2 text-right">العنوان</th>
                  <th className="p-2 w-32">المدة</th>
                  <th className="p-2 w-28"></th>
                  <th className="p-2 w-28"></th>
                </tr>
              </thead>
              <tbody>
                {s.episodes.map((ep) => (
                  <EpisodeRow key={ep.number} ep={ep} onWatch={() => {}} onDownload={() => {}} />
                ))}
              </tbody>
            </table>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}