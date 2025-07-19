"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Film, 
  Tv, 
  Users, 
  Settings, 
  BarChart3,
  Server,
  Activity,
  Shield,
  Download
} from 'lucide-react'

const navigation = [
  { name: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
  { name: 'الأفلام', href: '/admin/movies', icon: Film },
  { name: 'المسلسلات', href: '/admin/series', icon: Tv },
  { name: 'الخوادم', href: '/admin/servers', icon: Server },
  { name: 'المراقبة والصيانة', href: '/admin/monitoring', icon: Activity },
  { name: 'المستخدمون', href: '/admin/users', icon: Users },
  { name: 'الإحصائيات', href: '/admin/stats', icon: BarChart3 },
  { name: 'الإعدادات', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">لوحة الإدارة</h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )}
            >
              <Icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-red-500" />
          <div className="mr-3">
            <p className="text-sm font-medium text-white">AK.SV Admin</p>
            <p className="text-xs text-gray-400">نظام إدارة متقدم</p>
          </div>
        </div>
      </div>
    </div>
  )
}