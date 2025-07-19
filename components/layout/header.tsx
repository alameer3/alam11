"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/search/search-bar'
import { UserMenu } from '@/components/auth/user-menu'
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Film, 
  Tv, 
  Home,
  User,
  LogOut,
  Settings,
  Search
} from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: 'الرئيسية', href: '/', icon: Home },
    { name: 'الأفلام', href: '/movies', icon: Film },
    { name: 'المسلسلات', href: '/series', icon: Tv },
    { name: 'البرامج', href: '/shows', icon: Tv },
    { name: 'المختلط', href: '/mix', icon: Film }
  ]

  return (
    <header className="bg-[#0a0a0a] border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-700 text-white">
              <span className="text-xl font-bold">AK</span>
            </div>
            <div className="hidden md:block">
              <span className="text-2xl font-bold text-white">AK</span>
              <span className="text-xl text-gray-300">.SV</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* User Menu */}
            {session ? (
              <UserMenu />
            ) : (
              <div className="hidden md:flex items-center space-x-2 space-x-reverse">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  تسجيل الدخول
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  إنشاء حساب
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {/* Mobile Search */}
            <div className="px-4 py-2">
              <SearchBar />
            </div>
            
            {/* Mobile Navigation */}
            <nav className="space-y-2 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 space-x-reverse px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {session ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 space-x-reverse px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>الملف الشخصي</span>
                  </Link>
                  
                  {session.user?.email === 'admin@example.com' && (
                    <Link
                      href="/admin"
                      className="flex items-center space-x-3 space-x-reverse px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      <Settings className="h-5 w-5" />
                      <span>لوحة التحكم</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-3 space-x-reverse px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors w-full text-right"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>تسجيل الخروج</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2 px-3 py-2">
                  <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                    تسجيل الدخول
                  </Button>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    إنشاء حساب
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}