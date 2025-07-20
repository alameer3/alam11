'use client'

import { useState } from 'react'
import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
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

const ratings = [
  { id: 0, name: 'التقييم' },
  { id: 1, name: '+1' },
  { id: 2, name: '+2' },
  { id: 3, name: '+3' },
  { id: 4, name: '+4' },
  { id: 5, name: '+5' },
  { id: 6, name: '+6' },
  { id: 7, name: '+7' },
  { id: 8, name: '+8' },
  { id: 9, name: '+9' }
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
  { id: 15, name: 'الإيطالية' },
  { id: 16, name: 'التركية' }
]

const qualities = [
  'BluRay', 'WebRip', 'BRRIP', 'DVDrip', 'DVDSCR', 'HD', 
  'HDTS', 'HDTV', 'CAM', 'WEB-DL', 'HDTC', 'BDRIP', 'HDRIP', 'HC HDRIP'
]

const years = Array.from({ length: 2025 - 1960 + 1 }, (_, i) => 2025 - i)

// Sample data - في التطبيق الحقيقي ستأتي من API
const seriesData = [
  {
    id: '4970',
    title: 'فات الميعاد',
    image: 'https://img.downet.net/thumb/178x260/uploads/u3No5.jpg',
    rating: '6.0',
    year: '2025',
    genres: ['دراما'],
    episodes: 27,
    quality: 'WEB-DL',
    url: '/series/4970/فات-الميعاد'
  },
  {
    id: '4966',
    title: 'خطيئة اخيرة',
    image: 'https://img.downet.net/thumb/178x260/uploads/w4CQd.jpg',
    rating: '6.1',
    year: '2025',
    genres: ['دراما'],
    episodes: 41,
    quality: 'WEB-DL',
    url: '/series/4966/خطيئة-اخيرة'
  },
  {
    id: '5002',
    title: 'الزوجة الاخري',
    image: 'https://img.downet.net/thumb/178x260/uploads/Jk27N.webp',
    rating: '704.0',
    year: '2025',
    genres: ['دراما'],
    episodes: 20,
    quality: 'WEB-DL',
    url: '/series/5002/الزوجة-الاخري'
  },
  {
    id: '5009',
    title: 'Delirium',
    image: 'https://img.downet.net/thumb/178x260/uploads/QpIiM.webp',
    rating: '7.9',
    year: '2025',
    genres: ['NETFLIX', 'دراما'],
    episodes: 8,
    quality: 'WEB-DL',
    url: '/series/5009/delirium'
  },
  {
    id: '5008',
    title: 'Superstar',
    image: 'https://img.downet.net/thumb/178x260/uploads/N6CvB.webp',
    rating: '8.0',
    year: '2045',
    genres: ['NETFLIX', 'كوميدي', 'دراما'],
    episodes: 6,
    quality: 'WEB-DL',
    url: '/series/5008/superstar'
  },
  {
    id: '4983',
    title: 'Smoke',
    image: 'https://img.downet.net/thumb/178x260/uploads/Rvg5J.jpg',
    rating: '5.0',
    year: '2025',
    genres: ['اثارة'],
    episodes: 5,
    quality: 'WEB-DL',
    url: '/series/4983/smoke'
  }
]

export default function SeriesPage() {
  const [filters, setFilters] = useState({
    section: 0,
    category: 0,
    rating: 0,
    year: 0,
    language: 0,
    formats: '',
    sort: 'latest'
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('grid') // grid or list

  return (
    <div dir="rtl" className="header-fixed header-pages">
      <span className="site-overlay"></span>
      
      {/* القائمة الجانبية */}
      <MainMenu />
      
      {/* شريط البحث المتنقل */}
      <SearchBox />
      
      {/* حاوي الموقع */}
      <div className="site-container">
        <div className="main-header-top"></div>
        
        {/* رأس الصفحة */}
        <MainHeader />
        
        <div className="main-header-height"></div>
        
        {/* معرفات الصفحة */}
        <input type="hidden" id="page_app" value="series" />
        <input type="hidden" id="page_id" value="0" />
        
        {/* إعلانات */}
        <div className="ads mb-3">
          <AdSystem 
            type="banner"
            position="content"
            width="728px"
            height="90px"
          />
        </div>
        
        <div className="page page-archive">
          {/* غلاف القسم */}
          <div 
            className="archive-cover mb-4" 
            style={{ backgroundImage: "url('https://img.downet.net/uploads/USfXq.webp')" }}
          >
            <div className="container">
              <div className="row pb-3">
                <div className="col-12 mt-auto">
                  <div className="row">
                    {/* عنوان القسم */}
                    <div className="col-md-auto col-12 mb-12 mb-md-0">
                      <div className="main-category d-flex align-items-center justify-content-center radius p-4 h-100">
                        <i className="icn icon-monitor ml-4"></i>
                        <h1 className="name font-size-34 font-weight-bold mb-0">مسلسلات</h1>
                      </div>
                    </div>
                    
                    {/* فلاتر البحث */}
                    <div className="col-md">
                      <form id="filter" method="get">
                        <div className="row">
                          {/* فلتر القسم */}
                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group mb-12">
                              <select 
                                className="form-control select2" 
                                name="section"
                                value={filters.section}
                                onChange={(e) => setFilters({...filters, section: parseInt(e.target.value)})}
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
                            <div className="form-group mb-12 mb-lg-0">
                              <select 
                                className="form-control select2" 
                                name="category"
                                value={filters.category}
                                onChange={(e) => setFilters({...filters, category: parseInt(e.target.value)})}
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
                          <div className="col-lg-3 col-md-6 col-12 offset-lg-3">
                            <div className="form-group mb-0">
                              <select 
                                className="form-control select2" 
                                name="rating"
                                value={filters.rating}
                                onChange={(e) => setFilters({...filters, rating: parseInt(e.target.value)})}
                              >
                                {ratings.map(rating => (
                                  <option key={rating.id} value={rating.id}>
                                    {rating.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          
                          {/* فلتر سنة الإنتاج */}
                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group mb-12 mb-lg-0">
                              <select 
                                className="form-control select2" 
                                name="year"
                                value={filters.year}
                                onChange={(e) => setFilters({...filters, year: parseInt(e.target.value)})}
                              >
                                <option value={0}>سنة الإنتاج</option>
                                {years.map(year => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          
                          {/* فلتر اللغة */}
                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group mb-12 mb-lg-0">
                              <select 
                                className="form-control select2" 
                                name="language"
                                value={filters.language}
                                onChange={(e) => setFilters({...filters, language: parseInt(e.target.value)})}
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
                            <div className="form-group mb-0">
                              <select 
                                className="form-control select2" 
                                name="formats"
                                value={filters.formats}
                                onChange={(e) => setFilters({...filters, formats: e.target.value})}
                              >
                                <option value="">الجودة</option>
                                {qualities.map(quality => (
                                  <option key={quality} value={quality}>
                                    {quality}
                                  </option>
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
          
          {/* محتوى الصفحة */}
          <div className="container">
            {/* أدوات التحكم */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="view-modes">
                <button 
                  className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-secondary'} mr-2`}
                  onClick={() => setViewMode('grid')}
                >
                  <i className="icon-grid"></i>
                </button>
                <button 
                  className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setViewMode('list')}
                >
                  <i className="icon-list"></i>
                </button>
              </div>
              
              <div className="sort-control">
                <select 
                  className="form-control"
                  value={filters.sort}
                  onChange={(e) => setFilters({...filters, sort: e.target.value})}
                >
                  <option value="latest">الأحدث</option>
                  <option value="rating">الأعلى تقييماً</option>
                  <option value="popular">الأكثر مشاهدة</option>
                  <option value="alphabetical">أبجدياً</option>
                </select>
              </div>
            </div>
            
            {/* شبكة المسلسلات */}
            <div className="widget" data-grid="6">
              <div className="widget-body row flex-wrap">
                {seriesData.map((series) => (
                  <div key={series.id} className="col-lg-auto col-md-4 col-6 mb-12">
                    <div className="entry-box entry-box-1">
                      <div className="labels d-flex">
                        <span className="label rating">
                          <i className="icon-star mr-2"></i>
                          {series.rating}
                        </span>
                        <span className="ml-auto"></span>
                        <span className="label series">
                          <i className="icon-play mr-1"></i>
                          {series.episodes}
                        </span>
                        <span className="label quality">{series.quality}</span>
                      </div>
                      
                      <div className="entry-image">
                        <Link href={series.url} className="box">
                          <picture>
                            <Image
                              src={series.image}
                              alt={series.title}
                              width={178}
                              height={260}
                              className="img-fluid w-100 lazy"
                            />
                          </picture>
                        </Link>
                      </div>
                      
                      <div className="entry-body px-3 pb-3 text-center">
                        <div className="actions d-flex justify-content-center">
                          <Link href={series.url} className="icn play">
                            <i className="icon-play"></i>
                            <div>مشاهدة</div>
                          </Link>
                          <a 
                            href="javascript:;" 
                            className="icn add-to-fav mr-4 private hide" 
                            data-type="series"
                            data-id={series.id}
                          >
                            <i className="icon-plus"></i>
                            <i className="icon-check font-size-20"></i>
                            <div>قائمتي</div>
                          </a>
                        </div>
                        
                        <div className="line my-3"></div>
                        
                        <h3 className="entry-title font-size-14 m-0">
                          <Link href={series.url} className="text-white">
                            {series.title}
                          </Link>
                        </h3>
                        
                        <div className="font-size-16 d-flex align-items-center mt-2" style={{ height: '14px', overflow: 'hidden' }}>
                          <span className="badge badge-pill badge-secondary ml-1">
                            {series.year}
                          </span>
                          {series.genres.map((genre) => (
                            <span key={genre} className="badge badge-pill badge-light ml-1">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* التنقل بين الصفحات */}
            <div className="pagination-container d-flex justify-content-center mt-5">
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">3</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}