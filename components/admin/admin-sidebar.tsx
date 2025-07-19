"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard,
  Film,
  Tv,
  Users,
  Tags,
  Settings,
  BarChart3,
  Plus,
  List,
  Server
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'لوحة التحكم',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'الأفلام',
    icon: Film,
    children: [
      { title: 'عرض الأفلام', href: '/admin/movies', icon: List },
      { title: 'إضافة فيلم', href: '/admin/movies/add', icon: Plus }
    ]
  },
  {
    title: 'المسلسلات',
    icon: Tv,
    children: [
      { title: 'عرض المسلسلات', href: '/admin/series', icon: List },
      { title: 'إضافة مسلسل', href: '/admin/series/add', icon: Plus }
    ]
  },
  {
    title: 'التصنيفات',
    icon: Tags,
    children: [
      { title: 'عرض التصنيفات', href: '/admin/genres', icon: List },
      { title: 'إضافة تصنيف', href: '/admin/genres/add', icon: Plus }
    ]
  },
  {
    title: 'المستخدمين',
    href: '/admin/users',
    icon: Users
  },
  {
    title: 'السيرفرات',
    href: '/admin/servers',
    icon: Server
  },
  {
    title: 'الإحصائيات',
    href: '/admin/analytics',
    icon: BarChart3
  },
  {
    title: 'الإعدادات',
    href: '/admin/settings',
    icon: Settings
  }
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card border-l h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <div key={item.title}>
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ) : (
              <>
                <div className="flex items-center space-x-3 space-x-reverse px-3 py-2 text-sm font-medium text-muted-foreground">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
                {item.children && (
                  <div className="mr-6 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-md text-sm transition-colors",
                          pathname === child.href
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        <child.icon className="h-3 w-3" />
                        <span>{child.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}