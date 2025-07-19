import { Suspense } from 'react'
import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { MoviesFilter } from '@/components/movies/movies-filter'
import { MoviesGrid } from '@/components/movies/movies-grid'
import { MoviesPagination } from '@/components/movies/movies-pagination'

export default function MoviesPage() {
  return (
    <div dir="rtl" className="header-fixed header-pages">
      <span className="site-overlay"></span>
      
      {/* القائمة الجانبية */}
      <MainMenu />
      
      {/* شريط البحث المتنقل */}
      <SearchBox />
      
      {/* حاوي الموقع */}
      <div className="site-container">
        {/* مساحة فارغة للهيدر */}
        <div className="main-header-top"></div>
        
        {/* رأس الموقع */}
        <MainHeader />
        
        {/* مساحة فارغة للهيدر */}
        <div className="main-header-height"></div>
        
        {/* المحتوى الرئيسي */}
        <div className="page-content">
          <div className="container mx-auto px-4">
            {/* عنوان الصفحة */}
            <div className="page-header mb-8">
              <h1 className="page-title text-3xl font-bold text-white">
                أفلام
              </h1>
              <p className="text-gray-400 mt-2">
                تصفح أحدث الأفلام العربية والأجنبية بجودة عالية
              </p>
            </div>
            
            {/* فلاتر الأفلام */}
            <Suspense fallback={<div className="loading-spinner"></div>}>
              <MoviesFilter />
            </Suspense>
            
            {/* شبكة الأفلام */}
            <Suspense fallback={<div className="loading-spinner"></div>}>
              <MoviesGrid />
            </Suspense>
            
            {/* ترقيم الصفحات */}
            <Suspense fallback={<div className="loading-spinner"></div>}>
              <MoviesPagination />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}