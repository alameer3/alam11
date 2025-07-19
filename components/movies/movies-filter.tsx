"use client"

import { useState } from 'react'

export function MoviesFilter() {
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    quality: '',
    sort: 'latest'
  })

  const genres = [
    { value: '', label: 'جميع الأنواع' },
    { value: 'action', label: 'أكشن' },
    { value: 'comedy', label: 'كوميديا' },
    { value: 'drama', label: 'دراما' },
    { value: 'horror', label: 'رعب' },
    { value: 'romance', label: 'رومانسي' },
    { value: 'sci-fi', label: 'خيال علمي' },
    { value: 'thriller', label: 'إثارة' },
    { value: 'adventure', label: 'مغامرة' },
    { value: 'animation', label: 'رسوم متحركة' },
    { value: 'documentary', label: 'وثائقي' },
    { value: 'family', label: 'عائلي' }
  ]

  const years = [
    { value: '', label: 'جميع السنوات' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' }
  ]

  const qualities = [
    { value: '', label: 'جميع الجودات' },
    { value: '4K', label: '4K Ultra HD' },
    { value: 'FHD', label: 'Full HD 1080p' },
    { value: 'HD', label: 'HD 720p' },
    { value: 'SD', label: 'SD 480p' }
  ]

  const sortOptions = [
    { value: 'latest', label: 'الأحدث' },
    { value: 'rating', label: 'الأعلى تقييماً' },
    { value: 'popular', label: 'الأكثر شعبية' },
    { value: 'title', label: 'الاسم (أ-ي)' },
    { value: 'year', label: 'السنة' }
  ]

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="content-filters mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* فلتر النوع */}
        <div className="filter-group">
          <label className="filter-label">النوع</label>
          <select
            className="filter-select"
            value={filters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.label}
              </option>
            ))}
          </select>
        </div>

        {/* فلتر السنة */}
        <div className="filter-group">
          <label className="filter-label">السنة</label>
          <select
            className="filter-select"
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
          >
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </div>

        {/* فلتر الجودة */}
        <div className="filter-group">
          <label className="filter-label">الجودة</label>
          <select
            className="filter-select"
            value={filters.quality}
            onChange={(e) => handleFilterChange('quality', e.target.value)}
          >
            {qualities.map((quality) => (
              <option key={quality.value} value={quality.value}>
                {quality.label}
              </option>
            ))}
          </select>
        </div>

        {/* فلتر الترتيب */}
        <div className="filter-group">
          <label className="filter-label">الترتيب</label>
          <select
            className="filter-select"
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* زر إعادة تعيين الفلاتر */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setFilters({ genre: '', year: '', quality: '', sort: 'latest' })}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          إعادة تعيين الفلاتر
        </button>
      </div>
    </div>
  )
}