"use client"

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

interface CastMember {
  name: string
  photo: string
}

interface CastSliderProps {
  cast: CastMember[]
}

export function CastSlider({ cast }: CastSliderProps) {
  return (
    <section className="my-12">
      <h2 className="text-xl font-semibold text-white mb-4">طاقم العمل</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={4}
        spaceBetween={12}
        breakpoints={{
          640: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
      >
        {cast.map((m) => (
          <SwiperSlide key={m.name} className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-2">
              <Image src={m.photo} alt={m.name} width={96} height={96} className="object-cover" />
            </div>
            <span className="text-white text-xs line-clamp-2">{m.name}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}