'use client';

import { useState } from 'react';
import { 
  User, 
  Settings, 
  Heart, 
  Clock, 
  Download, 
  Share2, 
  Eye, 
  Star,
  Edit3,
  Camera,
  Bell,
  Shield,
  CreditCard,
  HelpCircle
} from 'lucide-react';

interface UserProfileProps {
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    joinDate: string;
    subscription: string;
    watchTime: string;
    favorites: number;
    downloads: number;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const mockUser = {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    avatar: '/api/placeholder/100/100',
    joinDate: '2024-01-15',
    subscription: 'Premium',
    watchTime: '1,250 ساعة',
    favorites: 45,
    downloads: 23
  };

  const userData = user || mockUser;

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'activity', label: 'النشاط', icon: Clock },
    { id: 'favorites', label: 'المفضلة', icon: Heart },
    { id: 'downloads', label: 'التحميلات', icon: Download },
    { id: 'settings', label: 'الإعدادات', icon: Settings }
  ];

  const activityData = [
    { type: 'watch', title: 'فيلم الأكشن الجديد', time: 'منذ ساعتين', icon: Eye },
    { type: 'favorite', title: 'مسلسل درامي', time: 'منذ يوم', icon: Heart },
    { type: 'download', title: 'وثائقي طبيعي', time: 'منذ يومين', icon: Download },
    { type: 'share', title: 'فيلم كوميدي', time: 'منذ 3 أيام', icon: Share2 },
    { type: 'rate', title: 'مسلسل خيال علمي', time: 'منذ أسبوع', icon: Star }
  ];

  const favoritesData = [
    { id: 1, title: 'فيلم الأكشن الجديد', genre: 'أكشن', rating: 4.5, year: 2024 },
    { id: 2, title: 'مسلسل درامي', genre: 'دراما', rating: 4.8, year: 2023 },
    { id: 3, title: 'وثائقي طبيعي', genre: 'وثائقي', rating: 4.2, year: 2024 },
    { id: 4, title: 'فيلم كوميدي', genre: 'كوميدي', rating: 4.0, year: 2023 },
    { id: 5, title: 'مسلسل خيال علمي', genre: 'خيال علمي', rating: 4.7, year: 2024 }
  ];

  const downloadsData = [
    { id: 1, title: 'فيلم الأكشن الجديد', size: '2.5 GB', progress: 100, status: 'completed' },
    { id: 2, title: 'مسلسل درامي', size: '1.8 GB', progress: 75, status: 'downloading' },
    { id: 3, title: 'وثائقي طبيعي', size: '3.2 GB', progress: 0, status: 'paused' },
    { id: 4, title: 'فيلم كوميدي', size: '1.5 GB', progress: 100, status: 'completed' }
  ];

  const settingsCategories = [
    { id: 'account', label: 'حسابي', icon: User },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'privacy', label: 'الخصوصية', icon: Shield },
    { id: 'billing', label: 'الفوترة', icon: CreditCard },
    { id: 'help', label: 'المساعدة', icon: HelpCircle }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-6">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <img 
              src={userData.avatar} 
              alt={userData.name}
              className="w-20 h-20 rounded-full border-4 border-white/20"
            />
            <button className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 text-gray-600 hover:text-gray-800">
              <Camera size={16} />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-blue-100">{userData.email}</p>
            <div className="flex items-center space-x-4 space-x-reverse mt-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {userData.subscription}
              </span>
              <span className="text-blue-100 text-sm">
                انضم منذ {new Date(userData.joinDate).toLocaleDateString('ar-SA')}
              </span>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse"
          >
            <Edit3 size={16} />
            <span>تعديل</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">وقت المشاهدة</p>
              <p className="text-2xl font-bold">{userData.watchTime}</p>
            </div>
            <Clock className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">المفضلة</p>
              <p className="text-2xl font-bold">{userData.favorites}</p>
            </div>
            <Heart className="text-red-500" size={24} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">التحميلات</p>
              <p className="text-2xl font-bold">{userData.downloads}</p>
            </div>
            <Download className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">التقييمات</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Star className="text-yellow-500" size={24} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 space-x-reverse px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 space-x-reverse ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">المعلومات الشخصية</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        defaultValue={userData.name}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        defaultValue={userData.email}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        defaultValue="+966 50 123 4567"
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">التفضيلات</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        اللغة المفضلة
                      </label>
                      <select 
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                      >
                        <option>العربية</option>
                        <option>English</option>
                        <option>Français</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        جودة الفيديو
                      </label>
                      <select 
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                      >
                        <option>تلقائي</option>
                        <option>1080p</option>
                        <option>720p</option>
                        <option>480p</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        الاشتراك
                      </label>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {userData.subscription}
                        </span>
                        <button className="text-blue-600 text-sm hover:underline">
                          تغيير الخطة
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">النشاط الأخير</h3>
              {activityData.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Icon size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">المفضلة ({favoritesData.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoritesData.map((item) => (
                  <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">{item.genre}</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                    </div>
                    <h4 className="font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Downloads Tab */}
          {activeTab === 'downloads' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">التحميلات ({downloadsData.length})</h3>
              {downloadsData.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 space-x-reverse p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                      <span>{item.size}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'downloading' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status === 'completed' ? 'مكتمل' :
                         item.status === 'downloading' ? 'جاري التحميل' : 'متوقف'}
                      </span>
                    </div>
                  </div>
                  {item.status === 'downloading' && (
                    <div className="w-24">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {settingsCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Icon size={20} className="text-gray-500" />
                        <span className="font-medium">{category.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}