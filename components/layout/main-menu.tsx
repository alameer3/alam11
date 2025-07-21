"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Film, Monitor, Tv, Grid3X3 } from 'lucide-react'

export function MainMenu() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    {
      href: '/movies',
      icon: Film,
      text: 'أفلام'
    },
    {
      href: '/series',
      icon: Monitor,
      text: 'مسلسلات'
    },
    {
      href: '/shows',
      icon: Tv,
      text: 'تلفزيون'
    },
    {
      href: '/mix',
      icon: Grid3X3,
      text: 'منوعات'
    }
  ]

  const socialLinks = [
    {
      href: 'https://akw.to',
      icon: '🏠',
      title: 'الموقع الرئيسي'
    },
    {
      href: 'https://www.facebook.com/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗net',
      icon: '📘',
      title: 'فيسبوك'
    },
    {
      href: 'https://www.facebook.com/groups/AKOAMweb',
      icon: '👥',
      title: 'مجموعة فيسبوك'
    },
    {
      href: 'https://akw.net.in/',
      icon: '📱',
      title: 'التطبيق'
    },
    {
      href: 'https://www.youtube.com/c/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗network',
      icon: '📺',
      title: 'يوتيوب'
    },
    {
      href: '/notifications',
      icon: '🔔',
      title: 'الإشعارات'
    },
    {
      href: '/contactus',
      icon: '✉️',
      title: 'اتصل بنا'
    }
  ]

  const closeMenu = () => {
    if (!mounted) return
    
    const overlay = document.querySelector('.site-overlay')
    const menu = document.querySelector('.main-menu')
    
    if (overlay) overlay.classList.remove('show')
    if (menu) menu.classList.remove('show')

    if (typeof document !== 'undefined') {
      document.body.classList.remove('main-menu-active')
    }
  }

  if (!mounted) {
    return (
      <div className="main-menu">
        <div className="container mx-auto px-4">
          <div className="py-8 text-center text-white">
            <div className="text-lg">القائمة</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="main-menu">
      <div className="container mx-auto px-4">
        {/* Menu Items */}
        <div className="menu py-8">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link key={item.href} href={item.href} className="item" onClick={closeMenu}>
                <IconComponent className="icn" />
                <span>{item.text}</span>
              </Link>
            )
          })}
        </div>

        {/* Social Links */}
        <div className="social flex flex-wrap justify-center gap-2 py-4 border-t border-gray-600">
          {socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              title={link.title}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 hover:text-white hover:bg-brand hover:border-brand transition-all"
              target={link.href.startsWith('http') ? '_blank' : '_self'}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}