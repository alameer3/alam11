'use client'

import { useState, useEffect } from 'react'
import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { Footer } from '@/components/layout/footer'
import { AdSystem } from '@/components/ads/ad-system'
import Link from 'next/link'
import Image from 'next/image'

const sections = [
  { id: 0, name: 'القسم' },
  { id: 29, name: 'عربي' },
  { id: 30, name: 'اجنبي' },
  { id: 31, name: 'هندي' },
  { id: 32, name: 'تركي' },
  { id: 33, name: 'اسيوي' }
]

const categories = [
  { id: 0, name: 'التصنيف' },
  { id: 87, name: 'رمضان' },
  { id: 30, name: 'انمي' },
  { id: 18, name: 'اكشن' },
  { id: 71, name: 'مدبلج' },
  { id: 72, name: 'NETFLIX' },
  { id: 20, name: 'كوميدي' },
  { id: 35, name: 'اثارة' },
  { id: 34, name: 'غموض' },
  { id: 33, name: 'عائلي' },
  { id: 88, name: 'اطفال' },
  { id: 25, name: 'حربي' },
  { id: 32, name: 'رياضي' },
  { id: 89, name: 'قصير' },
  { id: 43, name: 'فانتازيا' },
  { id: 24, name: 'خيال علمي' },
  { id: 31, name: 'موسيقى' },
  { id: 29, name: 'سيرة ذاتية' },
  { id: 28, name: 'وثائقي' },
  { id: 27, name: 'رومانسي' },
  { id: 26, name: 'تاريخي' },
  { id: 23, name: 'دراما' },
  { id: 22, name: 'رعب' },
  { id: 21, name: 'جريمة' },
  { id: 19, name: 'مغامرة' },
  { id: 91, name: 'غربي' }
]

const languages = [
  { id: 0, name: 'اللغة' },
  { id: 1, name: 'العربية' },
  { id: 2, name: 'الإنجليزية' },
  { id: 3, name: 'الهندية' },
  { id: 4, name: 'الاسبانية' },
  { id: 5, name: 'الصينية' },
  { id: 6, name: 'البرتغالية' },
  { id: 8, name: 'الفرنسية' },
  { id: 9, name: 'الروسية' },
  { id: 10, name: 'اليابانية' },
  { id: 11, name: 'الألمانية' },
  { id: 12, name: 'الكورية' },
  { id: 13, name: 'الفارسية' },
  { id: 14, name: 'الفيتنامية' },
  { id: 15, name: 'الإيطالية' },
  { id: 16, name: 'التركية' }
]

const qualities = [
  'الجودة', 'BluRay', 'WebRip', 'BRRIP', 'DVDrip', 'DVDSCR', 'HD', 'HDTS', 'HDTV', 'CAM', 'WEB-DL', 'HDTC', 'BDRIP', 'HDRIP', 'HC HDRIP'
]

const resolutions = [
  'الدقة', '240p', '360p', '480p', '720p', '1080p', '3D', '4K'
]

const years = Array.from({ length: 50 }, (_, i) => 2024 - i)

// بيانات تجريبية للأفلام
const moviesData = [
  {
    id: 1,
    title: 'Avengers: Endgame',
    arabicTitle: 'المنتقمون: النهاية',
    year: 2023,
    rating: 8.4,
    quality: 'BluRay',
    image: '/images/movies/movie1.jpg',
    categories: ['اكشن', 'مغامرة', 'خيال علمي'],
    language: 'مدبلج'
  },
  {
    id: 2,
    title: 'The Lion King',
    arabicTitle: 'ملك الأسود',
    year: 2023,
    rating: 7.2,
    quality: 'WEB-DL',
    image: '/images/movies/movie2.jpg',
    categories: ['عائلي', 'اطفال', 'مغامرة'],
    language: 'مدبلج'
  },
  {
    id: 3,
    title: 'Inception',
    arabicTitle: 'بداية',
    year: 2022,
    rating: 8.8,
    quality: 'BluRay',
    image: '/images/movies/movie3.jpg',
    categories: ['اثارة', 'خيال علمي', 'غموض'],
    language: 'مترجم'
  },
  // المزيد من الأفلام...
]

export default function MoviesPage() {
  const [filters, setFilters] = useState({
    section: 0,
    category: 0,
    rating: 0,
    year: 0,
    language: 0,
    quality: '',
    resolution: ''
  })

  const [filteredMovies, setFilteredMovies] = useState(moviesData)
  const [viewMode, setViewMode] = useState('grid') // grid or list

  useEffect(() => {
    // فلترة الأفلام بناءً على الفلاتر المحددة
    let filtered = moviesData

    if (filters.category > 0) {
      const categoryName = categories.find(c => c.id === filters.category)?.name
      if (categoryName) {
        filtered = filtered.filter(movie => 
          movie.categories.some(cat => cat.includes(categoryName))
        )
      }
    }

    if (filters.year > 0) {
      filtered = filtered.filter(movie => movie.year === filters.year)
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(movie => movie.rating >= filters.rating)
    }

    setFilteredMovies(filtered)
  }, [filters])

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  return (
    <div dir="rtl" className="header-fixed header-pages min-h-screen bg-gray-900">
      <span className="site-overlay"></span>
      
      {/* القائمة الجانبية */}
      <MainMenu />
      
      {/* شريط البحث المتنقل */}
      <SearchBox />
      
      {/* رأس الموقع */}
      <MainHeader />

      {/* مؤشرات الصفحة المخفية */}
      <input type="hidden" id="page_app" value="movies" />
      <input type="hidden" id="page_id" value="0" />

      {/* إعلان في أعلى الصفحة */}
      <div className="ads mb-3">
        <center>
          <div className="d-none d-md-block">
            <AdSystem
              adType="banner"
              placement="movies-top-desktop"
              dimensions={{ width: 728, height: 90 }}
              showCloseButton={false}
            />
          </div>
          <div className="d-md-none">
            <AdSystem
              adType="banner"
              placement="movies-top-mobile"
              dimensions={{ width: 300, height: 250 }}
              showCloseButton={false}
            />
          </div>
        </center>
      </div>

      {/* صفحة الأرشيف */}
      <div className="page page-archive">
        {/* غلاف الأرشيف */}
        <div 
          className="archive-cover mb-4" 
          style={{ backgroundImage: "url('/images/movies-bg.webp')" }}
        >
          <div className="container">
            <div className="row pb-3">
              <div className="col-12 mt-auto">
                <div className="row">
                  <div className="col-md-auto col-12 mb-3 mb-md-0">
                    <div className="main-category d-flex align-items-center justify-content-center rounded p-4 h-100 bg-orange-600">
                      <i className="icn text-4xl text-white ml-4">🎬</i>
                      <h1 className="name text-3xl font-bold mb-0 text-white">أفلام</h1>
                    </div>
                  </div>
                  <div className="col-md">
                    <form id="filter" method="get">
                      <div className="row">
                        {/* فلتر القسم */}
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-3">
                            <select 
                              className="form-control bg-gray-800 border-gray-600 text-white"
                              name="section"
                              value={filters.section}
                              onChange={(e) => handleFilterChange('section', parseInt(e.target.value))}
                            >
                              {sections.map(section => (
                                <option key={section.id} value={section.id}>
                                  {section.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* فلتر التصنيف */}
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-3">
                            <select 
                              className="form-control bg-gray-800 border-gray-600 text-white"
                              name="category"
                              value={filters.category}
                              onChange={(e) => handleFilterChange('category', parseInt(e.target.value))}
                            >
                              {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* فلتر التقييم */}
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-3">
                            <select 
                              className="form-control bg-gray-800 border-gray-600 text-white"
                              name="rating"
                              value={filters.rating}
                              onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                            >
                              <option value={0}>التقييم</option>
                              {[1,2,3,4,5,6,7,8,9].map(rating => (
                                <option key={rating} value={rating}>+{rating}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* فلتر السنة */}
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-3">
                            <select 
                              className="form-control bg-gray-800 border-gray-600 text-white"
                              name="year"
                              value={filters.year}
                              onChange={(e) => handleFilterChange('year', parseInt(e.target.value))}
                            >
                              <option value={0}>السنة</option>
                              {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* فلتر اللغة */}
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-3">
                            <select 
                              className="form-control bg-gray-800 border-gray-600 text-white"
                              name="language"
                              value={filters.language}
                              onChange={(e) => handleFilterChange('language', parseInt(e.target.value))}
                            >
                              {languages.map(language => (
                                <option key={language.id} value={language.id}>
                                  {language.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* فلتر الجودة */}
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-3">
                            <select 
                              className="form-control bg-gray-800 border-gray-600 text-white"
                              name="quality"
                              value={filters.quality}
                              onChange={(e) => handleFilterChange('quality', e.target.value)}
                            >
                              {qualities.map(quality => (
                                <option key={quality} value={quality}>{quality}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* فلتر الدقة */}
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-0">
                            <select 
                              className="form-control bg-gray-800 border-gray-600 text-white"
                              name="resolution"
                              value={filters.resolution}
                              onChange={(e) => handleFilterChange('resolution', e.target.value)}
                            >
                              {resolutions.map(resolution => (
                                <option key={resolution} value={resolution}>{resolution}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* إعلان وسط الصفحة */}
          <div className="ads mb-3">
            <center>
              <div className="d-none d-md-block">
                <AdSystem
                  adType="banner"
                  placement="movies-middle-desktop"
                  dimensions={{ width: 728, height: 90 }}
                  showCloseButton={false}
                />
              </div>
              <div className="d-md-none">
                <AdSystem
                  adType="banner"
                  placement="movies-middle-mobile"
                  dimensions={{ width: 300, height: 250 }}
                  showCloseButton={false}
                />
              </div>
            </center>
          </div>

          {/* أدوات العرض */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="view-controls">
              <button
                className={`btn btn-sm ml-2 ${viewMode === 'grid' ? 'btn-orange' : 'btn-outline-orange'}`}
                onClick={() => setViewMode('grid')}
              >
                <i className="fas fa-th"></i> شبكة
              </button>
              <button
                className={`btn btn-sm ${viewMode === 'list' ? 'btn-orange' : 'btn-outline-orange'}`}
                onClick={() => setViewMode('list')}
              >
                <i className="fas fa-list"></i> قائمة
              </button>
            </div>
            <div className="results-count text-gray-400">
              {filteredMovies.length} فيلم
            </div>
          </div>

          {/* قائمة الأفلام */}
          <div className="widget" data-grid="6">
            <div className={`widget-body row flex-wrap ${viewMode === 'list' ? 'list-view' : ''}`}>
              {filteredMovies.map((movie, index) => (
                <div key={movie.id} className="col-lg-auto col-md-4 col-6 mb-4">
                  {/* إعلان بين الأفلام كل 6 أفلام */}
                  {index > 0 && index % 6 === 0 && (
                    <div className="col-12 mb-4">
                      <AdSystem
                        adType="native"
                        placement={`movies-between-${index}`}
                        showCloseButton={true}
                      />
                    </div>
                  )}
                  
                  <div className="entry-box entry-box-1 bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform">
                    {/* تسميات الفيلم */}
                    <div className="labels d-flex absolute top-2 left-2 right-2 z-10">
                      <span className="label rating bg-yellow-600 text-white px-2 py-1 rounded text-sm">
                        <i className="fas fa-star mr-1"></i>{movie.rating}
                      </span>
                      <span className="ml-auto"></span>
                      <span className="label quality bg-blue-600 text-white px-2 py-1 rounded text-sm">
                        {movie.quality}
                      </span>
                    </div>

                    {/* صورة الفيلم */}
                    <div className="entry-image relative">
                      <Link href={`/watch/${movie.id}`} className="box block">
                        <div className="relative w-full h-64 bg-gray-700">
                          <Image
                            src={movie.image}
                            alt={movie.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/images/placeholder-movie.jpg'
                            }}
                          />
                        </div>
                      </Link>
                    </div>

                    {/* معلومات الفيلم */}
                    <div className="entry-body px-3 pb-3 text-center">
                      {/* أزرار الإجراءات */}
                      <div className="actions d-flex justify-content-center py-3">
                        <Link href={`/watch/${movie.id}`} className="icn play bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded ml-2">
                          <i className="fas fa-play mr-2"></i>
                          <div className="inline">مشاهدة</div>
                        </Link>
                        <button className="icn add-to-fav bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                          <i className="fas fa-plus mr-2"></i>
                          <div className="inline">قائمتي</div>
                        </button>
                      </div>

                      <div className="border-t border-gray-600 my-3"></div>

                      {/* عنوان الفيلم */}
                      <h3 className="entry-title text-sm font-bold mb-2">
                        <Link href={`/watch/${movie.id}`} className="text-white hover:text-orange-500">
                          {movie.arabicTitle || movie.title}
                        </Link>
                      </h3>

                      {/* معلومات إضافية */}
                      <div className="text-xs d-flex align-items-center justify-center flex-wrap gap-1">
                        <span className="badge bg-gray-600 text-white px-2 py-1 rounded">
                          {movie.year}
                        </span>
                        {movie.categories.slice(0, 3).map(category => (
                          <span key={category} className="badge bg-gray-700 text-gray-300 px-2 py-1 rounded">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* تحميل المزيد */}
          <div className="text-center py-4">
            <button className="btn btn-orange px-6 py-3">
              تحميل المزيد من الأفلام
            </button>
          </div>
        </div>
      </div>

      {/* التذييل */}
      <Footer />
    </div>
  )
}