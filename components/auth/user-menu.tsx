"use client"

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Settings, 
  Heart, 
  Clock, 
  LogOut,
  ChevronDown 
} from 'lucide-react'

export function UserMenu() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  if (!session?.user) return null

  const menuItems = [
    {
      label: 'الملف الشخصي',
      href: '/profile',
      icon: User
    },
    {
      label: 'المفضلة',
      href: '/favorites',
      icon: Heart
    },
    {
      label: 'مشاهدة لاحقاً',
      href: '/watch-later',
      icon: Clock
    }
  ]

  if (session.user.role === 'ADMIN') {
    menuItems.push({
      label: 'لوحة التحكم',
      href: '/admin',
      icon: Settings
    })
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 space-x-reverse"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="hidden md:block">{session.user.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 space-x-reverse px-4 py-2 text-sm hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <hr className="my-2" />
              
              <button
                onClick={() => {
                  signOut()
                  setIsOpen(false)
                }}
                className="flex items-center space-x-3 space-x-reverse px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-start text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}