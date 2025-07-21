"use client"

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

interface GallerySliderProps {
  images: string[]
}

export function GallerySlider({ images }: GallerySliderProps) {
  return (
    <section className="my-12">
      <h2 className="text-xl font-semibold text-white mb-4">الصور</h2>
      <Swiper modules={[Navigation]} navigation slidesPerView={3} spaceBetween={12}>
        {images.map((src) => (
          <SwiperSlide key={src} className="rounded overflow-hidden">
            <Image src={src} alt="gallery" width={400} height={225} className="object-cover w-full h-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}