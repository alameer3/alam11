"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function MoviesPagination() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 25 // عدد الصفحات الإجمالي (للتجربة)
  const itemsPerPage = 12
  const totalItems = 300

  // حساب الصفحات المرئية
  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      // هنا يمكن إضافة منطق تحديث البيانات
      // scrollToTop()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const getPageInfo = () => {
    const start = (currentPage - 1) * itemsPerPage + 1
    const end = Math.min(currentPage * itemsPerPage, totalItems)
    return { start, end, total: totalItems }
  }

  const pageInfo = getPageInfo()

  return (
    <div className="mt-12">
      {/* معلومات الصفحة */}
      <div className="text-center mb-6 text-gray-400 text-sm">
        عرض {pageInfo.start} - {pageInfo.end} من أصل {pageInfo.total} فيلم
      </div>

      {/* أزرار الترقيم */}
      <div className="pagination">
        {/* زر الصفحة السابقة */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pagination-btn ${
            currentPage === 1 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-[#26baee] hover:border-[#26baee]'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* أرقام الصفحات */}
        {getVisiblePages().map((page, index) => (
          <span key={index}>
            {page === '...' ? (
              <span className="pagination-dots">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={`pagination-btn ${
                  currentPage === page
                    ? 'current bg-[#26baee] border-[#26baee]'
                    : 'hover:bg-[#26baee] hover:border-[#26baee]'
                }`}
              >
                {page}
              </button>
            )}
          </span>
        ))}

        {/* زر الصفحة التالية */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`pagination-btn ${
            currentPage === totalPages 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-[#26baee] hover:border-[#26baee]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* خيارات سريعة */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center gap-4 text-sm text-gray-400">
          <span>الذهاب إلى الصفحة:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value)
              if (page >= 1 && page <= totalPages) {
                handlePageChange(page)
              }
            }}
            className="w-16 px-2 py-1 bg-[#1a1a1a] border border-[#333] rounded text-white text-center focus:border-[#26baee] focus:outline-none"
          />
          <span>من {totalPages}</span>
        </div>
      </div>

      {/* زر تحميل المزيد (بديل) */}
      <div className="text-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-8 py-3 bg-gradient-to-r from-[#26baee] to-[#0d82ab] text-white font-bold rounded-full transition-all duration-300 ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-lg hover:scale-105'
          }`}
        >
          {currentPage === totalPages ? 'تم عرض جميع الأفلام' : 'تحميل المزيد'}
        </button>
      </div>
    </div>
  )
}