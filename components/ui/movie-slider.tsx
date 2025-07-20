'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface SliderItem {
  id: string
  type: 'movie' | 'series'
  title: string
  image: string
  url: string
  rating?: string
  quality?: string
  episodes?: number
}

interface MovieSliderProps {
  title: string
  items: SliderItem[]
}

export function MovieSlider({ title, items }: MovieSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, items.length - 5))
  }
  
  const prevSlide = () => {
    setCurrentIndex((prev) => prev === 0 ? Math.max(0, items.length - 6) : prev - 1)
  }

  return (
    <div className="widget-3 widget mb-4">
      <div className="widget-body">
        <div className="swiper-container">
          <div 
            className="swiper-wrapper d-flex transition-transform duration-300"
            style={{ 
              transform: `translateX(${currentIndex * -270}px)`,
              gap: '6px'
            }}
          >
            {items.map((item) => (
              <div key={item.id} className="swiper-slide" style={{ width: 'auto' }}>
                <div className="entry-box entry-box-1">
                  <div className="entry-image">
                    <Link href={item.url} className="box">
                      <picture>
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={270}
                          height={400}
                          className="img-fluid"
                        />
                      </picture>
                    </Link>
                  </div>
                  <div className="entry-body px-3 pb-3 text-center">
                    <div className="actions d-flex justify-content-center">
                      <Link href={item.url} className="icn play">
                        <i className="icon-play"></i>
                        <div>مشاهدة</div>
                      </Link>
                      <a 
                        href="javascript:;" 
                        className="icn add-to-fav mr-4 private hide" 
                        data-id={item.id}
                        data-type={item.type}
                      >
                        <i className="icon-plus"></i>
                        <i className="icon-check font-size-20"></i>
                        <div>قائمتي</div>
                      </a>
                    </div>
                    <div className="line my-3"></div>
                    <h3 className="entry-title font-size-14 m-0">
                      <Link href={item.url} className="text-white">
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-button swiper-button-prev" onClick={prevSlide}>
            <i className="icon-chevron-thin-right"></i>
          </div>
          <div className="swiper-button swiper-button-next" onClick={nextSlide}>
            <i className="icon-chevron-thin-left"></i>
          </div>
        </div>
      </div>
    </div>
  )
}