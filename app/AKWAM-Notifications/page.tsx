import { MainHeader } from '@/components/layout/main-header'
import { MainMenu } from '@/components/layout/main-menu'
import { SearchBox } from '@/components/layout/search-box'

export default function NotificationsPage() {
  return (
    <div dir="rtl" className="body-home header-fixed">
      <span className="site-overlay"></span>
      <MainMenu />
      <SearchBox />
      
      <div className="site-container">
        <div className="page-content">
          <div className="main-header-top"></div>
          <MainHeader />
          <div className="main-header-height"></div>
          
          <div className="container py-5 my-5">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
              <h1 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl ml-3">🔔</span>
                إشعارات اكوام
              </h1>
              
              <div className="space-y-4">
                <div className="bg-[#222] rounded p-4 border border-[#333]">
                  <h3 className="text-lg font-semibold text-[#26baee] mb-2">أحدث الإشعارات</h3>
                  <p className="text-gray-300 mb-3">
                    تابع آخر الأخبار والتحديثات على موقع اكوام
                  </p>
                  <div className="text-sm text-gray-400">
                    قريباً... سيتم إضافة نظام الإشعارات المباشرة
                  </div>
                </div>
                
                <div className="bg-[#222] rounded p-4 border border-[#333]">
                  <h3 className="text-lg font-semibold text-[#26baee] mb-2">تنبيهات هامة</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• تم إضافة أفلام جديدة اليوم</li>
                    <li>• تحديث قاعدة البيانات</li>
                    <li>• إصلاح مشاكل التشغيل</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}