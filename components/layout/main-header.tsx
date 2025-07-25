"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ClientOnlySession } from '@/components/ClientOnlySession'
import { Search, User, Plus } from 'lucide-react'

export function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuToggle = () => {
    // تبديل الـ overlay
    const overlay = document.querySelector('.site-overlay')
    if (overlay) {
      overlay.classList.toggle('show')
    }
    // تبديل القائمة
    const menu = document.querySelector('.main-menu')
    if (menu) {
      menu.classList.toggle('show')
    }

    // Toggle body class to control global styles
    document.body.classList.toggle('main-menu-active')
  }

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* الشعار */}
          <div className="flex items-center">
            <h2 className="main-logo m-0">
              <Link href="/" className="inline-flex">
                <img
                  src="/logo.svg"
                  className="img-fluid"
                  alt="𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗"
                  style={{ height: '40px' }}
                />
              </Link>
            </h2>
          </div>

          {/* زر القائمة */}
          <div className="flex items-center ml-4">
            <button
              onClick={handleMenuToggle}
              className="menu-toggle flex items-center text-white"
            >
              <span className="icn ml-3"></span>
              <div className="text text-lg">الأقسام</div>
            </button>
          </div>

          {/* شريط البحث - مخفي على الهاتف */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="search-container w-full">
              <div className="search-form">
                <form action="/search" method="get" className="flex items-center">
                  <input
                    type="text"
                    name="q"
                    placeholder="ابحث عن فيلم او مسلسل ..."
                    className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  />
                  <button type="submit" className="p-2">
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* الأزرار الجانبية */}
          <div className="flex items-center gap-4">
            {/* زر أضيف حديثاً */}
            <Link href="/recent" className="btn-recently hidden md:flex">
              <Plus className="w-4 h-4 ml-2" />
              <span>أضيف حديثاً</span>
            </Link>

            {/* لوحة المستخدم */}
            <div className="user-panel">
              <ClientOnlySession>
                {(session, loading) => (
                  session ? (
                    <div className="user-logged flex items-center">
                      <div className="user-toggle">
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link href="/auth/signin" className="user-toggle text-white">
                      <User className="w-5 h-5" />
                    </Link>
                  )
                )}
              </ClientOnlySession>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}