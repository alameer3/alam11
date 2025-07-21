import { HeroSlider } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/HeroSlider'
import { WidgetSection } from '@/components/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗/WidgetSection'

// Dummy data with working placeholder images
const heroSlides = [
  {
    title: 'The Dark Knight',
    slug: 'the-dark-knight',
    backdrop: 'https://via.placeholder.com/1920x1080/1a202c/ffffff?text=The+Dark+Knight',
    overview: 'فيلم أكشن وإثارة من بطولة كريستيان بيل'
  },
  {
    title: 'Inception',
    slug: 'inception',
    backdrop: 'https://via.placeholder.com/1920x1080/2d3748/ffffff?text=Inception',
    overview: 'رحلة داخل الأحلام من إخراج كريستوفر نولان'
  },
  {
    title: 'Interstellar',
    slug: 'interstellar',
    backdrop: 'https://via.placeholder.com/1920x1080/4a5568/ffffff?text=Interstellar',
    overview: 'مغامرة فضائية ملحمية'
  }
]

const latestMovies = heroSlides.map((s, index) => ({
  slug: s.slug,
  title: s.title,
  poster: `https://via.placeholder.com/300x450/2d3748/ffffff?text=${encodeURIComponent(s.title)}`,
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