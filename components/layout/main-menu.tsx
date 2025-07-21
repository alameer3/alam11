"use client"

import Link from 'next/link'
import { Film, Monitor, Tv, Grid3X3 } from 'lucide-react'

export function MainMenu() {
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
      href: '/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗-Notifications',
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
    const overlay = document.querySelector('.site-overlay')
    const menu = document.querySelector('.main-menu')
    
    if (overlay) overlay.classList.remove('show')
    if (menu) menu.classList.remove('show')

    if (typeof document !== 'undefined') {
      document.body.classList.remove('main-menu-active')
    }
  }

  return (
    <div className="main-menu">
      <div className="flex flex-col h-full">
        {/* القائمة الرئيسية */}
        <div className="flex-1">
          <div className="menu flex flex-col justify-center">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="item"
                  onClick={closeMenu}
                >
                  <div className="icn ml-3">
                    <IconComponent className="w-12 h-12" />
                  </div>
                  <div className="text">{item.text}</div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* الشبكات الاجتماعية */}
        <nav className="social flex justify-center flex-wrap">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : '_self'}
              className="mx-2 mb-2"
              title={link.title}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className="text-xl">{link.icon}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}