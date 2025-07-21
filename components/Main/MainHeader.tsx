'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Navigation } from '@/components/Welcome/Navigation'

export function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Site Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Navigation Menu */}
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Main Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/main" className="flex items-center">
                <h1 className="text-xl font-bold text-white">
                  𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗
                </h1>
              </Link>
            </div>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center text-white hover:text-orange-500 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center ml-3">
                <span className="block w-5 h-0.5 bg-current mb-1"></span>
                <span className="block w-5 h-0.5 bg-current mb-1"></span>
                <span className="block w-5 h-0.5 bg-current"></span>
              </div>
              <span className="text-lg">الأقسام</span>
            </button>

            {/* Search Form - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form action="/search" method="get" className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    name="q"
                    placeholder="ابحث عن فيلم أو مسلسل..."
                    className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
                  >
                    🔍
                  </button>
                </div>
              </form>
            </div>

            {/* Recently Added */}
            <div className="flex items-center gap-4">
              <Link 
                href="/recent" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
              >
                <span className="ml-2">+</span>
                أضيف حديثاً
              </Link>

              {/* User Profile */}
              <div className="relative">
                <button className="text-white hover:text-orange-500 text-xl">
                  👤
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}