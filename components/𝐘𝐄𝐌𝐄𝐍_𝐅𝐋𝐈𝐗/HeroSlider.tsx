"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface Slide {
  title: string
  slug: string
  backdrop: string
  overview?: string
}

interface HeroSliderProps {
  slides: Slide[]
}

export function HeroSlider({ slides }: HeroSliderProps) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      className="hero-swiper h-screen"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.slug}>
          <div className="relative w-full h-screen">
            <Image
              src={slide.backdrop}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-2xl mx-auto text-center text-white pt-40 px-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
              {slide.overview && <p className="text-sm md:text-lg mb-6 text-gray-300">{slide.overview}</p>}
              <Link href={`/movie/${slide.slug}`} className="inline-block bg-brand hover:bg-brand-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors">
                مشاهدة الآن
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}