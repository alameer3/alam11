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
  Settings
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
    { name: 'المختلط', href: '/mix', icon: Film },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Film className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">StreamHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">تبديل المظهر</span>
            </Button>

            {/* User Menu */}
            {session ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button asChild variant="ghost">
                  <Link href="/auth/login">تسجيل الدخول</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">إنشاء حساب</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 space-x-reverse text-sm font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {session && (
                <>
                  <hr className="my-2" />
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 space-x-reverse text-sm font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>الملف الشخصي</span>
                  </Link>
                  
                  {session.user.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="flex items-center space-x-3 space-x-reverse text-sm font-medium hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span>لوحة التحكم</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center space-x-3 space-x-reverse text-sm font-medium hover:text-primary text-start"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}