"use client"

import { EntryCard } from './EntryCard'

interface Item {
  slug: string
  title: string
  poster: string
  rating?: number
  quality?: string
}

interface WidgetSectionProps {
  title: string
  items: Item[]
}

export function WidgetSection({ title, items }: WidgetSectionProps) {
  return (
    <section className="widget-section my-12 container mx-auto px-4">
      <h2 className="text-white text-2xl font-bold mb-6 border-r-4 border-brand pr-3 inline-block">
        {title}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <EntryCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  )
}