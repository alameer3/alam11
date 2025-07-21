import { HeroSlider } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/HeroSlider'
import { WidgetSection } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/WidgetSection'

// Data with local placeholder images
const heroSlides = [
  {
    title: 'The Dark Knight',
    slug: 'the-dark-knight',
    backdrop: '/placeholder-hero.svg',
    overview: 'فيلم أكشن وإثارة من بطولة كريستيان بيل'
  },
  {
    title: 'Inception',
    slug: 'inception',
    backdrop: '/placeholder-hero.svg',
    overview: 'رحلة داخل الأحلام من إخراج كريستوفر نولان'
  },
  {
    title: 'Interstellar',
    slug: 'interstellar',
    backdrop: '/placeholder-hero.svg',
    overview: 'مغامرة فضائية ملحمية'
  }
]

const latestMovies = heroSlides.map((s, index) => ({
  slug: s.slug,
  title: s.title,
  poster: '/placeholder-movie.svg',
  rating: 8.5 - index * 0.2,
  quality: 'HD'
}))

export default function HomePage() {
  return (
    <div className="bg-home min-h-screen">
      <HeroSlider slides={heroSlides} />

      <WidgetSection title="أحدث الأفلام" items={latestMovies} />
    </div>
  )
}