'use client'

import { 
  UsersIcon, 
  FilmIcon, 
  TvIcon, 
  CurrencyDollarIcon,
  EyeIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'إجمالي المستخدمين',
      value: '12,847',
      change: '+12%',
      icon: UsersIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'الأفلام المضافة',
      value: '2,341',
      change: '+8%',
      icon: FilmIcon,
      color: 'bg-green-500',
    },
    {
      title: 'المسلسلات',
      value: '1,234',
      change: '+15%',
      icon: TvIcon,
      color: 'bg-purple-500',
    },
    {
      title: 'الإيرادات الشهرية',
      value: '$45,230',
      change: '+23%',
      icon: CurrencyDollarIcon,
      color: 'bg-yellow-500',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'upload',
      message: 'تم رفع فيلم جديد: "عنوان الفيلم"',
      time: '5 دقائق',
      user: 'أحمد محمد',
    },
    {
      id: 2,
      type: 'report',
      message: 'تقرير إساءة جديد تم إرساله',
      time: '10 دقائق',
      user: 'سارة أحمد',
    },
    {
      id: 3,
      type: 'payment',
      message: 'دفعة جديدة: $29.99',
      time: '1 ساعة',
      user: 'محمد علي',
    },
    {
      id: 4,
      type: 'moderation',
      message: 'تمت مراجعة محتوى جديد',
      time: '2 ساعة',
      user: 'فاطمة حسن',
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      title: 'مراجعة 15 فيديو جديد',
      priority: 'high',
      due: 'اليوم',
    },
    {
      id: 2,
      title: 'الرد على 8 تقارير إساءة',
      priority: 'medium',
      due: 'غداً',
    },
    {
      id: 3,
      title: 'تحديث قائمة المسلسلات',
      priority: 'low',
      due: 'بعد غد',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            إضافة محتوى جديد
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            تصدير التقرير
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change} من الشهر الماضي</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">النشاطات الأخيرة</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {activity.type === 'upload' && <FilmIcon className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'report' && <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />}
                    {activity.type === 'payment' && <CurrencyDollarIcon className="h-4 w-4 text-green-600" />}
                    {activity.type === 'moderation' && <CheckCircleIcon className="h-4 w-4 text-purple-600" />}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">المهام المعلقة</h2>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <p className="text-xs text-gray-500">مستحق: {task.due}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority === 'high' ? 'عالي' : task.priority === 'medium' ? 'متوسط' : 'منخفض'}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    معالجة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <FilmIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium">إضافة فيلم</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <TvIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium">إضافة مسلسل</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <UsersIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium">إدارة المستخدمين</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-sm font-medium">مراجعة التقارير</p>
          </button>
        </div>
      </div>
    </div>
  );
}