'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  FilmIcon, 
  TvIcon, 
  UsersIcon, 
  ChartBarIcon,
  CogIcon,
  BellIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  MegaphoneIcon,
  GlobeAltIcon,
  CloudArrowUpIcon,
  ExclamationTriangleIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  {
    title: 'لوحة التحكم',
    href: '/admin',
    icon: HomeIcon,
  },
  {
    title: 'إدارة الأفلام',
    href: '/admin/movies',
    icon: FilmIcon,
  },
  {
    title: 'إدارة المسلسلات',
    href: '/admin/series',
    icon: TvIcon,
  },
  {
    title: 'إدارة المستخدمين',
    href: '/admin/users',
    icon: UsersIcon,
  },
  {
    title: 'التقارير والإحصائيات',
    href: '/admin/analytics',
    icon: ChartBarIcon,
  },
  {
    title: 'إدارة الإعلانات',
    href: '/admin/ads',
    icon: MegaphoneIcon,
  },
  {
    title: 'نظام الدفع',
    href: '/admin/payments',
    icon: CurrencyDollarIcon,
  },
  {
    title: 'مراجعة المحتوى',
    href: '/admin/moderation',
    icon: ShieldCheckIcon,
  },
  {
    title: 'الدردشة والدعم',
    href: '/admin/chat',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: 'البث المباشر',
    href: '/admin/live',
    icon: VideoCameraIcon,
  },
  {
    title: 'رفع المحتوى',
    href: '/admin/upload',
    icon: CloudArrowUpIcon,
  },
  {
    title: 'تقارير الإساءة',
    href: '/admin/reports',
    icon: ExclamationTriangleIcon,
  },
  {
    title: 'إحصائيات متقدمة',
    href: '/admin/advanced-analytics',
    icon: ChartPieIcon,
  },
  {
    title: 'إعدادات النظام',
    href: '/admin/settings',
    icon: Cog6ToothIcon,
  },
  {
    title: 'أدوات المطور',
    href: '/admin/developer',
    icon: WrenchScrewdriverIcon,
  },
  {
    title: 'إشعارات البريد',
    href: '/admin/email',
    icon: EnvelopeIcon,
  },
  {
    title: 'إدارة اللغات',
    href: '/admin/languages',
    icon: GlobeAltIcon,
  },
  {
    title: 'مراقبة الأداء',
    href: '/admin/monitoring',
    icon: CogIcon,
  },
  {
    title: 'نظام الإشعارات',
    href: '/admin/notifications',
    icon: BellIcon,
  },
  {
    title: 'إدارة الوثائق',
    href: '/admin/documents',
    icon: DocumentTextIcon,
  },
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? '☰' : '← طي القائمة'}
        </button>
      </div>
      
      <nav className="mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}