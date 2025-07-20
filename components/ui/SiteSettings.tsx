'use client';

import { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Shield, 
  Database, 
  Mail, 
  Bell, 
  Palette, 
  Monitor,
  Smartphone,
  Tablet,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';

interface SiteSettings {
  general: {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    adminEmail: string;
    timezone: string;
    language: string;
    maintenanceMode: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    primaryColor: string;
    logo: string;
    favicon: string;
    customCSS: string;
  };
  security: {
    enableSSL: boolean;
    enableCaptcha: boolean;
    maxLoginAttempts: number;
    sessionTimeout: number;
    enableTwoFactor: boolean;
    allowedFileTypes: string[];
    maxFileSize: number;
  };
  performance: {
    enableCaching: boolean;
    enableCompression: boolean;
    enableCDN: boolean;
    imageOptimization: boolean;
    lazyLoading: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    notificationTypes: string[];
  };
  integrations: {
    googleAnalytics: string;
    facebookPixel: string;
    twitterCard: string;
    socialLogin: {
      google: boolean;
      facebook: boolean;
      twitter: boolean;
    };
  };
}

export default function SiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    general: {
      siteName: 'أكوام',
      siteDescription: 'منصة مشاهدة الأفلام والمسلسلات العربية والأجنبية',
      siteUrl: 'https://akwam.com',
      adminEmail: 'admin@akwam.com',
      timezone: 'Asia/Riyadh',
      language: 'ar',
      maintenanceMode: false
    },
    appearance: {
      theme: 'auto',
      primaryColor: '#3b82f6',
      logo: '/logo.png',
      favicon: '/favicon.ico',
      customCSS: ''
    },
    security: {
      enableSSL: true,
      enableCaptcha: true,
      maxLoginAttempts: 5,
      sessionTimeout: 30,
      enableTwoFactor: true,
      allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'avi', 'mkv'],
      maxFileSize: 100
    },
    performance: {
      enableCaching: true,
      enableCompression: true,
      enableCDN: true,
      imageOptimization: true,
      lazyLoading: true
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      notificationTypes: ['new_content', 'system_updates', 'user_activity']
    },
    integrations: {
      googleAnalytics: '',
      facebookPixel: '',
      twitterCard: '',
      socialLogin: {
        google: true,
        facebook: true,
        twitter: false
      }
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('saving');
    
    // محاكاة حفظ الإعدادات
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 2000);
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع الإعدادات؟')) {
      // إعادة تعيين الإعدادات
      setSaveStatus('idle');
    }
  };

  const updateSetting = (section: keyof SiteSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const tabs = [
    { id: 'general', label: 'عام', icon: Settings },
    { id: 'appearance', label: 'المظهر', icon: Palette },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'performance', label: 'الأداء', icon: Monitor },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'integrations', label: 'التكامل', icon: Globe }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          إعدادات الموقع
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          إدارة إعدادات منصة أكوام
        </p>
      </div>

      {/* شريط الحفظ */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            {saveStatus === 'saving' && (
              <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
            )}
            {saveStatus === 'success' && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            {saveStatus === 'error' && (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            )}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {saveStatus === 'saving' && 'جاري الحفظ...'}
              {saveStatus === 'success' && 'تم الحفظ بنجاح'}
              {saveStatus === 'error' && 'حدث خطأ في الحفظ'}
              {saveStatus === 'idle' && 'آخر تحديث: منذ 5 دقائق'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={handleReset}
              className="btn-secondary text-sm"
            >
              إعادة تعيين
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary text-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4 ml-1" />
              حفظ الإعدادات
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {/* تبويبات الإعدادات */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 space-x-reverse py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* محتوى التبويبات */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    اسم الموقع
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    وصف الموقع
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteDescription}
                    onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    رابط الموقع
                  </label>
                  <input
                    type="url"
                    value={settings.general.siteUrl}
                    onChange={(e) => updateSetting('general', 'siteUrl', e.target.value)}
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    بريد الإدارة
                  </label>
                  <input
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) => updateSetting('general', 'adminEmail', e.target.value)}
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    المنطقة الزمنية
                  </label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                    className="input"
                  >
                    <option value="Asia/Riyadh">الرياض (GMT+3)</option>
                    <option value="Asia/Dubai">دبي (GMT+4)</option>
                    <option value="Asia/Kuwait">الكويت (GMT+3)</option>
                    <option value="Asia/Qatar">قطر (GMT+3)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    اللغة
                  </label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => updateSetting('general', 'language', e.target.value)}
                    className="input"
                  >
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={settings.general.maintenanceMode}
                  onChange={(e) => updateSetting('general', 'maintenanceMode', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="maintenanceMode" className="text-sm text-gray-700 dark:text-gray-300">
                  وضع الصيانة
                </label>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    المظهر
                  </label>
                  <select
                    value={settings.appearance.theme}
                    onChange={(e) => updateSetting('appearance', 'theme', e.target.value)}
                    className="input"
                  >
                    <option value="light">فاتح</option>
                    <option value="dark">داكن</option>
                    <option value="auto">تلقائي</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    اللون الأساسي
                  </label>
                  <input
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => updateSetting('appearance', 'primaryColor', e.target.value)}
                    className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CSS مخصص
                </label>
                <textarea
                  value={settings.appearance.customCSS}
                  onChange={(e) => updateSetting('appearance', 'customCSS', e.target.value)}
                  rows={6}
                  className="input font-mono text-sm"
                  placeholder="/* أضف CSS مخصص هنا */"
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">SSL</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">تفعيل الاتصال الآمن</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.security.enableSSL}
                    onChange={(e) => updateSetting('security', 'enableSSL', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">كابتشا</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">حماية من الروبوتات</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.security.enableCaptcha}
                    onChange={(e) => updateSetting('security', 'enableCaptcha', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">المصادقة الثنائية</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">طبقة أمان إضافية</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.security.enableTwoFactor}
                    onChange={(e) => updateSetting('security', 'enableTwoFactor', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    الحد الأقصى لمحاولات تسجيل الدخول
                  </label>
                  <input
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                    className="input"
                    min="1"
                    max="10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    مهلة الجلسة (دقائق)
                  </label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="input"
                    min="5"
                    max="1440"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">التخزين المؤقت</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">تحسين سرعة التحميل</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.performance.enableCaching}
                    onChange={(e) => updateSetting('performance', 'enableCaching', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">ضغط البيانات</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">تقليل حجم البيانات</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.performance.enableCompression}
                    onChange={(e) => updateSetting('performance', 'enableCompression', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">شبكة التوزيع</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">تسريع التحميل عالمياً</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.performance.enableCDN}
                    onChange={(e) => updateSetting('performance', 'enableCDN', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">تحسين الصور</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">تقليل حجم الصور</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.performance.imageOptimization}
                    onChange={(e) => updateSetting('performance', 'imageOptimization', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">إشعارات البريد</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">إرسال إشعارات عبر البريد</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">إشعارات الدفع</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">إشعارات فورية في المتصفح</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.pushNotifications}
                    onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">إشعارات SMS</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">إشعارات عبر الرسائل النصية</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.smsNotifications}
                    onChange={(e) => updateSetting('notifications', 'smsNotifications', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={settings.integrations.googleAnalytics}
                    onChange={(e) => updateSetting('integrations', 'googleAnalytics', e.target.value)}
                    className="input"
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Facebook Pixel ID
                  </label>
                  <input
                    type="text"
                    value={settings.integrations.facebookPixel}
                    onChange={(e) => updateSetting('integrations', 'facebookPixel', e.target.value)}
                    className="input"
                    placeholder="XXXXXXXXXX"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">تسجيل الدخول الاجتماعي</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">Google</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">تسجيل الدخول بـ Google</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.integrations.socialLogin.google}
                      onChange={(e) => updateSetting('integrations', 'socialLogin', {
                        ...settings.integrations.socialLogin,
                        google: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">Facebook</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">تسجيل الدخول بـ Facebook</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.integrations.socialLogin.facebook}
                      onChange={(e) => updateSetting('integrations', 'socialLogin', {
                        ...settings.integrations.socialLogin,
                        facebook: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white">Twitter</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">تسجيل الدخول بـ Twitter</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.integrations.socialLogin.twitter}
                      onChange={(e) => updateSetting('integrations', 'socialLogin', {
                        ...settings.integrations.socialLogin,
                        twitter: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}