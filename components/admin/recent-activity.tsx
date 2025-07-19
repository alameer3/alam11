"use client"

import { formatDate } from '@/lib/utils'

// Mock data - replace with real data from database
const activities = [
  {
    id: '1',
    type: 'movie_added',
    description: 'تم إضافة فيلم جديد: "فيلم الأكشن الجديد"',
    user: 'أحمد محمد',
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    type: 'series_updated',
    description: 'تم تحديث مسلسل: "مسلسل الدراما"',
    user: 'سارة أحمد',
    timestamp: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    type: 'user_registered',
    description: 'مستخدم جديد: محمد علي',
    user: 'النظام',
    timestamp: '2024-01-15T08:45:00Z'
  },
  {
    id: '4',
    type: 'genre_added',
    description: 'تم إضافة تصنيف جديد: "مغامرة"',
    user: 'فاطمة خالد',
    timestamp: '2024-01-14T16:20:00Z'
  },
  {
    id: '5',
    type: 'movie_deleted',
    description: 'تم حذف فيلم: "فيلم قديم"',
    user: 'أحمد محمد',
    timestamp: '2024-01-14T14:10:00Z'
  }
]

const getActivityColor = (type: string) => {
  switch (type) {
    case 'movie_added':
    case 'series_added':
    case 'genre_added':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'movie_updated':
    case 'series_updated':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'movie_deleted':
    case 'series_deleted':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'user_registered':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export function RecentActivity() {
  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">النشاط الأخير</h3>
        <p className="text-sm text-muted-foreground">
          آخر العمليات التي تمت على الموقع
        </p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 space-x-reverse">
              <div className={`w-3 h-3 rounded-full mt-2 ${getActivityColor(activity.type).split(' ')[0]}`} />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.description}</p>
                <div className="flex items-center space-x-2 space-x-reverse mt-1">
                  <span className="text-xs text-muted-foreground">
                    بواسطة {activity.user}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(activity.timestamp)}
                  </span>
                </div>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                {activity.type === 'movie_added' && 'إضافة'}
                {activity.type === 'movie_updated' && 'تحديث'}
                {activity.type === 'movie_deleted' && 'حذف'}
                {activity.type === 'series_added' && 'إضافة'}
                {activity.type === 'series_updated' && 'تحديث'}
                {activity.type === 'genre_added' && 'إضافة'}
                {activity.type === 'user_registered' && 'تسجيل'}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            عرض المزيد من النشاط
          </button>
        </div>
      </div>
    </div>
  )
}