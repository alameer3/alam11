'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Navigation } from '@/components/Welcome/Navigation'
import { SocialLinks } from '@/components/Welcome/SocialLinks'

export function WelcomePageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen welcome-page">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, .55), #000 100%), url(/home-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Site Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Navigation Menu */}
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Search Box */}
      <div className="search-box px-4 lg:px-20 fixed top-0 left-0 right-0 z-30 bg-gray-900/90 backdrop-blur-sm py-4">
        <div className="container mx-auto">
          <form action="/search" method="get" className="flex items-center">
            <button type="submit" className="px-3 ml-2 text-2xl text-gray-400 hover:text-orange-500">
              🔍
            </button>
            <input 
              type="search" 
              name="q" 
              placeholder="ابحث هنا عن فيلم أو مسلسل..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 text-lg"
            />
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-20 pb-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex-1">
                <Link href="/main" className="inline-block">
                  <h1 className="text-2xl font-bold text-white">
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

              {/* Recently Added */}
              <div className="flex-1 flex justify-end">
                <Link 
                  href="/recent" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors"
                >
                  <span className="ml-2">+</span>
                  أضيف حديثاً
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Welcome Section */}
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            {/* Circular Button */}
            <div className="welcome-btn-container group relative">
              <Link href="/main" className="welcome-btn block">
                <div className="welcome-btn-inner">
                  {/* Logo */}
                  <div className="welcome-logo">
                    <svg width="87" height="80" viewBox="0 0 87 80" className="fill-white">
                      <path d="M68.479,46.753 L55.101,55.064 L59.686,64.395 L26.302,64.395 L43.500,33.248 L48.558,41.524 L61.642,34.285 L43.500,-0.001 L0.000,80.001 L87.000,80.001 L68.479,46.753 Z"/>
                    </svg>
                  </div>
                  
                  {/* Text */}
                  <div className="welcome-text">
                    <span className="text-xl font-medium text-white">الصفحة الرئيسية</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Search Widget */}
            <div className="mt-12 max-w-2xl mx-auto">
              <form 
                action="/search" 
                method="get" 
                className="flex bg-gray-800/50 backdrop-blur-sm rounded-full overflow-hidden border border-gray-700"
              >
                <input
                  type="text"
                  name="q"
                  placeholder="ابحث عن فيلم أو مسلسل أو برنامج..."
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
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link href="/movies" className="px-4 py-2 bg-gray-800/50 text-white rounded-full hover:bg-orange-500 transition-colors">
                  أفلام
                </Link>
                <Link href="/series" className="px-4 py-2 bg-gray-800/50 text-white rounded-full hover:bg-orange-500 transition-colors">
                  مسلسلات
                </Link>
                <Link href="/shows" className="px-4 py-2 bg-gray-800/50 text-white rounded-full hover:bg-orange-500 transition-colors">
                  برامج
                </Link>
                <Link href="/anime" className="px-4 py-2 bg-gray-800/50 text-white rounded-full hover:bg-orange-500 transition-colors">
                  أنمي
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Social Links */}
        <SocialLinks />
      </div>

      <style jsx>{`
        .welcome-btn-container {
          width: 258px;
          height: 258px;
          margin: 0 auto;
          position: relative;
        }

        .welcome-btn-container::before,
        .welcome-btn-container::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid white;
          border-radius: 50%;
          transition: all 0.5s ease;
        }

        .welcome-btn-container::before {
          width: 100%;
          height: 100%;
        }

        .welcome-btn-container::after {
          width: 0;
          height: 0;
          border-color: transparent;
        }

        .welcome-btn {
          width: 230px;
          height: 230px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 5px solid white;
          border-radius: 50%;
          background: linear-gradient(135deg, #161619 0%, #27272c 100%);
          overflow: hidden;
          transition: all 0.5s ease;
        }

        .welcome-btn-inner {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .welcome-logo,
        .welcome-text {
          transition: all 0.5s ease;
        }

        .welcome-logo {
          margin-bottom: 16px;
        }

        .welcome-btn-container:hover::before {
          width: 0;
          height: 0;
          border-color: transparent;
        }

        .welcome-btn-container:hover::after {
          width: 100%;
          height: 100%;
          border-color: #f3951e;
        }

        .welcome-btn-container:hover .welcome-btn {
          border-color: #f3951e;
          background: linear-gradient(135deg, #f3951e 0%, #df820c 100%);
        }

        .welcome-btn-container:hover .welcome-logo {
          transform: translateY(-100%);
          opacity: 0;
        }

        .welcome-btn-container:hover .welcome-text {
          transform: translateY(100%);
          opacity: 0;
        }
      `}</style>
    </div>
  )
}