'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface MenuItem {
  name: string
  url: string
}

interface ContentItem {
  id: string
  title: string
  image: string
  rating?: string
  year?: string
  genres?: string[]
  episodes?: number
  quality?: string
  url: string
}

interface FeaturedItem {
  id: string
  title: string
  description: string
  image: string
  poster: string
  rating: string
  quality: string
  url: string
  trailer?: string
}

interface ContentWidgetProps {
  title: string
  type: 'movies' | 'series' | 'shows' | 'mix'
  headerMenuItems?: MenuItem[]
  moreUrl: string
  featuredItem?: FeaturedItem
  items: ContentItem[]
}

export function ContentWidget({
  title,
  type,
  headerMenuItems,
  moreUrl,
  featuredItem,
  items
}: ContentWidgetProps) {
  const [activeMenu, setActiveMenu] = useState(false)

  return (
    <div className="widget-4 widget widget-style-1 mb-5">
      <header className="widget-header mb-4 d-flex align-items-center">
        <h2 className="header-title font-size-18 font-weight-bold mb-0">
          <Link href={moreUrl} className="header-link text-white">
            {title}
          </Link>
        </h2>
        
        {headerMenuItems && headerMenuItems.length > 0 && (
          <div className="header-menu hal-container mr-4">
            <div 
              className="head d-flex align-items-center cursor-pointer"
              onClick={() => setActiveMenu(!activeMenu)}
            >
              <span>الأقسام</span>
              <i className="icon-chevron-thin-down mr-2"></i>
            </div>
            {activeMenu && (
              <div className="menu">
                {headerMenuItems.map((item) => (
                  <Link key={item.name} href={item.url}>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
        
        <img 
          src="/style/assets/images/icn-w-header.png" 
          className="header-img" 
          alt="icn-w-header"
        />
      </header>

      <div className="widget-body">
        {/* Featured Item */}
        {featuredItem && (
          <div 
            className="entry-box entry-box-2 d-flex flex-wrap no-gutters p-4 p-lg-5 mb-12"
            style={{ backgroundImage: `url('${featuredItem.image}')` }}
          >
            <div className="col-lg-5 col-md-8 col-12 order-2 order-md-1">
              <div className="entry-body text-center text-md-right">
                <span className="label rating">
                  <i className="icon-star mr-2"></i>
                  {featuredItem.rating}
                </span>
                <span className="label quality">{featuredItem.quality}</span>
                
                <h3 className="entry-title font-size-24 font-size-md-30 font-weight-bold mb-0 mt-3">
                  <Link href={featuredItem.url} className="text-white">
                    {featuredItem.title}
                  </Link>
                </h3>
                
                <p className="entry-desc font-size-16 text-white mb-0 mt-3">
                  {featuredItem.description}
                </p>
                
                <div className="buttons mt-4">
                  {featuredItem.trailer && (
                    <Link 
                      href={featuredItem.trailer} 
                      data-fancybox 
                      className="btn rounded-pill px-4"
                    >
                      الإعلان
                    </Link>
                  )}
                  <Link 
                    href={featuredItem.url} 
                    className="btn rounded-pill px-4 mr-3"
                  >
                    شاهد الآن
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-auto col-12 mr-md-auto order-1 order-md-2">
              <div className="entry-poster text-center mb-4 mb-md-0">
                <Link href={featuredItem.url}>
                  <picture>
                    <Image
                      src={featuredItem.poster}
                      alt={featuredItem.title}
                      width={150}
                      height={200}
                      className="img-fluid"
                    />
                  </picture>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="row">
          {items.map((item) => (
            <div key={item.id} className="col-lg col-md-4 col-6 mb-12">
              <div className="entry-box entry-box-1">
                <div className="labels d-flex">
                  {item.rating && (
                    <span className="label rating">
                      <i className="icon-star mr-2"></i>
                      {item.rating}
                    </span>
                  )}
                  <span className="ml-auto"></span>
                  {item.episodes && (
                    <span className="label series">
                      <i className="icon-play mr-1"></i>
                      {item.episodes}
                    </span>
                  )}
                  {item.quality && (
                    <span className="label quality">{item.quality}</span>
                  )}
                </div>
                
                <div className="entry-image">
                  <Link href={item.url} className="box">
                    <picture>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={178}
                        height={260}
                        className="img-fluid w-100"
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
                      data-type={type === 'movies' ? 'movie' : 'series'}
                      data-id={item.id}
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
                  
                  {(item.year || item.genres) && (
                    <div className="font-size-16 d-flex align-items-center mt-2" style={{ height: '14px', overflow: 'hidden' }}>
                      {item.year && (
                        <span className="badge badge-pill badge-secondary ml-1">
                          {item.year}
                        </span>
                      )}
                      {item.genres?.map((genre) => (
                        <span key={genre} className="badge badge-pill badge-light ml-1">
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Button */}
        <div className="text-center mb-5 mt-3">
          <Link href={moreUrl} className="btn btn-more-section rounded-pill px-5">
            المزيد
            <i className="icon-plus"></i>
          </Link>
        </div>
      </div>
    </div>
  )
}