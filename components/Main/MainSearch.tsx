'use client'

import { useState } from 'react'

export function MainSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      {/* Mobile Search Toggle */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-20 bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="w-full flex items-center justify-between text-white bg-gray-700 px-4 py-2 rounded-lg"
          >
            <span className="text-gray-400">ابحث هنا...</span>
            <span className="text-xl">🔍</span>
          </button>
        </div>
      </div>

      {/* Search Overlay - Mobile */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-900">
          <div className="p-4">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-white text-xl"
              >
                ←
              </button>
              <h2 className="text-white text-lg font-semibold">البحث</h2>
            </div>

            <form action="/search" method="get" className="space-y-4">
              <input
                type="text"
                name="q"
                placeholder="ابحث عن فيلم أو مسلسل أو برنامج..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                بحث
              </button>
            </form>

            {/* Quick Categories */}
            <div className="mt-8">
              <h3 className="text-white font-semibold mb-4">التصنيفات السريعة</h3>
              <div className="grid grid-cols-2 gap-3">
                <a href="/movies" className="bg-gray-800 text-white p-3 rounded-lg text-center hover:bg-gray-700">
                  أفلام
                </a>
                <a href="/series" className="bg-gray-800 text-white p-3 rounded-lg text-center hover:bg-gray-700">
                  مسلسلات
                </a>
                <a href="/shows" className="bg-gray-800 text-white p-3 rounded-lg text-center hover:bg-gray-700">
                  برامج
                </a>
                <a href="/anime" className="bg-gray-800 text-white p-3 rounded-lg text-center hover:bg-gray-700">
                  أنمي
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Search Widget */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-2xl mx-auto">
          <form 
            action="/search" 
            method="get" 
            className="flex bg-gray-800/90 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700"
          >
            <input
              type="text"
              name="q"
              placeholder="ابحث عن فيلم أو مسلسل أو برنامج أو لعبة..."
              className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-400 outline-none"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
            >
              بحث
            </button>
          </form>
          
          {/* Quick Categories */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="/movies" className="px-4 py-2 bg-gray-800/50 text-white rounded-full hover:bg-orange-500 transition-colors text-sm">
              أفلام
            </a>
            <a href="/series" className="px-4 py-2 bg-gray-800/50 text-white rounded-full hover:bg-orange-500 transition-colors text-sm">
              مسلسلات
            </a>
            <a href="/shows" className="px-4 py-2 bg-gray-800/50 text-white rounded-full hover:bg-orange-500 transition-colors text-sm">
              برامج تلفزيونية
            </a>
            <a href="/anime" className="px-4 py-2 bg-gray-800/50 text-white rounded-full hover:bg-orange-500 transition-colors text-sm">
              أنمي
            </a>
            <a href="/games" className="px-4 py-2 bg-gray-800/50 text-white rounded-full hover:bg-orange-500 transition-colors text-sm">
              ألعاب
            </a>
            <a href="/apps" className="px-4 py-2 bg-gray-800/50 text-white rounded-full hover:bg-orange-500 transition-colors text-sm">
              تطبيقات
            </a>
          </div>
        </div>
      </div>
    </>
  )
}