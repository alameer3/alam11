'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Menu, X, Play, Star, Clock, Fire } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

interface Movie {
  id: number
  title: string
  poster?: string
  year?: number
  rating?: number
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // تأثير التمرير المتقدم
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // بحث متطور مع debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery)
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const performSearch = async (query: string) => {
    setIsSearching(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      setSearchResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const navigationItems = [
    {
      title: 'الرئيسية',
      href: '/ones',
      icon: <Fire className="w-4 h-4" />,
      description: 'أحدث وأهم المحتويات'
    },
    {
      title: 'الأفلام',
      href: '/movies',
      icon: <Play className="w-4 h-4" />,
      description: 'مجموعة ضخمة من الأفلام',
      submenu: [
        { title: 'أفلام عربية', href: '/movies?region=arabic' },
        { title: 'أفلام أجنبية', href: '/movies?region=foreign' },
        { title: 'أفلام وثائقية', href: '/movies?genre=documentary' },
        { title: 'الأحدث إضافة', href: '/movies?sort=latest' }
      ]
    },
    {
      title: 'المسلسلات',
      href: '/series',
      icon: <Star className="w-4 h-4" />,
      description: 'مسلسلات متنوعة ومثيرة',
      submenu: [
        { title: 'مسلسلات عربية', href: '/series?region=arabic' },
        { title: 'مسلسلات أجنبية', href: '/series?region=foreign' },
        { title: 'مسلسلات كورية', href: '/series?region=korean' },
        { title: 'مسلسلات تركية', href: '/series?region=turkish' }
      ]
    },
    {
      title: 'التلفزيون',
      href: '/shows',
      icon: <Clock className="w-4 h-4" />,
      description: 'برامج تلفزيونية متنوعة',
      submenu: [
        { title: 'برامج حوارية', href: '/shows?type=talk' },
        { title: 'برامج رياضية', href: '/shows?type=sports' },
        { title: 'برامج ثقافية', href: '/shows?type=cultural' },
        { title: 'برامج ترفيهية', href: '/shows?type=entertainment' }
      ]
    },
    {
      title: 'المنوعات',
      href: '/mix',
      icon: <Star className="w-4 h-4" />,
      description: 'محتوى متنوع ومميز'
    }
  ]

  return (
    <>
      {/* Header الرئيسي */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-800' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* الشعار */}
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">AKWAM</span>
            </Link>

            {/* التنقل الرئيسي - سطح المكتب */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="flex space-x-8 rtl:space-x-reverse">
                {navigationItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className="text-gray-300 hover:text-white transition-colors bg-transparent border-0 p-0 h-auto font-medium">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            {item.icon}
                            <span>{item.title}</span>
                          </div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-80 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
                            <div className="mb-4">
                              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                              <p className="text-sm text-gray-400">{item.description}</p>
                            </div>
                            <div className="grid gap-2">
                              {item.submenu.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  className="block p-3 rounded-md hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link 
                        href={item.href}
                        className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300 hover:text-white transition-colors font-medium"
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* البحث المتقدم */}
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="البحث في الأفلام والمسلسلات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 rtl:pr-10 rtl:pl-3 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                </div>
                
                {/* نتائج البحث المتقدمة */}
                {(searchResults.length > 0 || isSearching) && (
                  <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                    {isSearching ? (
                      <div className="p-4 text-center text-gray-400">جاري البحث...</div>
                    ) : (
                      <div className="py-2">
                        {searchResults.map((result) => (
                          <Link
                            key={result.id}
                            href={`/movie/${result.id}`}
                            className="flex items-center p-3 hover:bg-gray-700 transition-colors"
                            onClick={() => setSearchQuery('')}
                          >
                            {result.poster && (
                              <img 
                                src={result.poster} 
                                alt={result.title}
                                className="w-12 h-16 object-cover rounded mr-3 rtl:ml-3 rtl:mr-0"
                              />
                            )}
                            <div>
                              <div className="text-white font-medium">{result.title}</div>
                              <div className="text-sm text-gray-400">
                                {result.year} • ⭐ {result.rating || 'N/A'}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* زر القائمة المحمولة */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* القائمة المحمولة المتقدمة */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed right-0 rtl:left-0 rtl:right-auto top-0 h-full w-80 bg-gray-900 border-l rtl:border-r rtl:border-l-0 border-gray-800 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-2xl font-bold text-white">AKWAM</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* البحث المحمول */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="البحث..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 rtl:pr-10 rtl:pl-3 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* عناصر التنقل المحمولة */}
              <nav className="space-y-2">
                {navigationItems.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="font-medium">{item.title}</span>
                    </Link>
                    {item.submenu && (
                      <div className="mr-6 rtl:ml-6 rtl:mr-0 mt-2 space-y-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block p-2 text-sm text-gray-400 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header