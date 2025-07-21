"use client"

import Link from 'next/link'
import { Facebook, Youtube, Bell } from 'lucide-react'

export function MainFooter() {
  const quickLinks = [
    { href: '/movies', label: 'أفلام' },
    { href: '/series', label: 'مسلسلات' },
    { href: '/shows', label: 'تلفزيون' },
    { href: '/mix', label: 'منوعات' },
    { href: '/contactus', label: 'اتصل بنا' },
  ]

  return (
    <footer className="bg-dark text-gray-400 pt-12 pb-6 mt-12 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">عن 𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗</h3>
            <p className="text-sm leading-relaxed">
              𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗 هو موقع عربي يوفّر أحدث الأفلام والمسلسلات والبرامج بدقة عالية مع إمكانية
              المشاهدة المباشرة أو التحميل السريع.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">تواصل معنا</h3>
            <div className="flex space-x-4 rtl:space-x-reverse text-xl">
              <a href="https://www.facebook.com/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗net" target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/c/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗network" target="_blank" rel="noopener noreferrer" title="YouTube" className="hover:text-white">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗-Notifications" title="الإشعارات" className="hover:text-white">
                <Bell className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-gray-500">
          جميع الحقوق محفوظة © {new Date().getFullYear()} 𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗
        </div>
      </div>
    </footer>
  )
}