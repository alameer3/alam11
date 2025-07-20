'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { 
  BellIcon, 
  CogIcon, 
  UserCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function AdminHeader() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'تم رفع فيديو جديد', time: '5 دقائق', read: false },
    { id: 2, message: 'تقرير إساءة جديد', time: '10 دقائق', read: false },
    { id: 3, message: 'دفعة جديدة تمت', time: '1 ساعة', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم الإدارة</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="بحث في النظام..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-3">الإشعارات</h3>
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg ${
                          notification.read ? 'bg-gray-50' : 'bg-blue-50'
                        }`}
                      >
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <CogIcon className="h-6 w-6" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <UserCircleIcon className="h-6 w-6" />
                <span className="text-sm font-medium">المدير</span>
              </button>
              
              {/* User Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                  <button className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    الملف الشخصي
                  </button>
                  <button className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    الإعدادات
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={() => signOut()}
                    className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}