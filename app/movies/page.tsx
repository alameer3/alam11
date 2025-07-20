import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'
import { MoviesFilter } from '@/components/movies/movies-filter'
import { MoviesGrid } from '@/components/movies/movies-grid'
import { MoviesPagination } from '@/components/movies/movies-pagination'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'أفلام | اكوام',
  description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة',
  openGraph: {
    title: 'أفلام | اكوام',
    description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة',
    url: 'https://ak.sv/movies',
    type: 'article'
  },
  twitter: {
    title: 'أفلام | اكوام',
    description: 'شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام, المسلسلات, الالعاب, البرامج و التطبيقات, التلفزيون, المسرحيات, المصارعة, الرياضة, تحميل و مشاهدة مباشرة'
  }
}

export default function MoviesPage() {
  return (
    <div dir="rtl" className="header-fixed header-pages">
      <span className="site-overlay"></span>
      <MainMenu />
      <SearchBox />
      
      <div className="site-container">
        <div className="page-content">
          <div className="main-header-top"></div>
          <MainHeader />
          <div className="main-header-height"></div>
          
          <div className="container py-5">
            <div className="page-header mb-4">
              <h1 className="text-3xl font-bold text-white mb-2">أفلام</h1>
              <p className="text-gray-400">اكتشف أحدث الأفلام العالمية والعربية</p>
            </div>
            
            <MoviesFilter />
            <MoviesGrid />
            <MoviesPagination />
          </div>
        </div>
      </div>
    </div>
  )
}