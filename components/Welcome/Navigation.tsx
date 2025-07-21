'use client'

import Link from 'next/link'

interface NavigationProps {
  isOpen: boolean
  onClose: () => void
}

export function Navigation({ isOpen, onClose }: NavigationProps) {
  const menuItems = [
    { href: '/movies', icon: '🎬', label: 'أفلام' },
    { href: '/series', icon: '📺', label: 'مسلسلات' },
    { href: '/shows', icon: '📻', label: 'تلفزيون' },
    { href: '/anime', icon: '🎭', label: 'أنمي' },
    { href: '/games', icon: '🎮', label: 'ألعاب' },
    { href: '/apps', icon: '📱', label: 'تطبيقات' },
  ]

  return (
    <div className={`main-menu fixed left-0 top-0 h-full w-80 bg-gray-900 z-50 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Menu Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-orange-500 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-6">
          <nav className="space-y-2 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-4 px-4 py-3 text-white hover:bg-orange-500 rounded-lg transition-colors group"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Social Links */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex justify-center gap-4">
            <a 
              href="https://facebook.com/yemenflix" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
            >
              📘
            </a>
            <a 
              href="https://youtube.com/yemenflix" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
            >
              📺
            </a>
            <a 
              href="https://twitter.com/yemenflix" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-colors"
            >
              🐦
            </a>
            <a 
              href="mailto:contact@yemenflix.com"
              className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
            >
              ✉️
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}