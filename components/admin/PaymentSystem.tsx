'use client';

import { useState } from 'react';
import { 
  CreditCardIcon, 
  CurrencyDollarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface Subscription {
  id: string;
  userId: string;
  plan: string;
  status: 'active' | 'cancelled' | 'expired';
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  maxUses: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  active: boolean;
}

interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  date: string;
  invoiceUrl?: string;
}

export default function PaymentSystem() {
  const [activeTab, setActiveTab] = useState('subscriptions');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const subscriptions: Subscription[] = [
    {
      id: '1',
      userId: 'user1',
      plan: 'Premium Monthly',
      status: 'active',
      amount: 29.99,
      currency: 'USD',
      startDate: '2024-01-01',
      endDate: '2024-02-01',
      autoRenew: true,
    },
    {
      id: '2',
      userId: 'user2',
      plan: 'Basic Yearly',
      status: 'active',
      amount: 99.99,
      currency: 'USD',
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      autoRenew: true,
    },
  ];

  const coupons: Coupon[] = [
    {
      id: '1',
      code: 'WELCOME20',
      discount: 20,
      type: 'percentage',
      maxUses: 100,
      usedCount: 45,
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      active: true,
    },
    {
      id: '2',
      code: 'SAVE10',
      discount: 10,
      type: 'fixed',
      maxUses: 50,
      usedCount: 12,
      validFrom: '2024-01-01',
      validUntil: '2024-06-30',
      active: true,
    },
  ];

  const payments: Payment[] = [
    {
      id: '1',
      userId: 'user1',
      amount: 29.99,
      currency: 'USD',
      status: 'completed',
      method: 'Credit Card',
      date: '2024-01-15',
      invoiceUrl: '/invoices/1.pdf',
    },
    {
      id: '2',
      userId: 'user2',
      amount: 99.99,
      currency: 'USD',
      status: 'completed',
      method: 'PayPal',
      date: '2024-01-10',
      invoiceUrl: '/invoices/2.pdf',
    },
  ];

  const stats = [
    {
      title: 'إجمالي الإيرادات',
      value: '$45,230',
      change: '+23%',
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
    },
    {
      title: 'الاشتراكات النشطة',
      value: '1,247',
      change: '+12%',
      icon: UserGroupIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'معدل التحويل',
      value: '8.4%',
      change: '+2.1%',
      icon: ChartBarIcon,
      color: 'bg-purple-500',
    },
    {
      title: 'متوسط قيمة الطلب',
      value: '$29.99',
      change: '+5%',
      icon: CreditCardIcon,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">نظام الدفع</h1>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">آخر 7 أيام</option>
            <option value="30d">آخر 30 يوم</option>
            <option value="90d">آخر 90 يوم</option>
            <option value="1y">آخر سنة</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            إنشاء كوبون جديد
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change} من الفترة السابقة</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'subscriptions', label: 'الاشتراكات', icon: UserGroupIcon },
              { id: 'payments', label: 'المدفوعات', icon: CreditCardIcon },
              { id: 'coupons', label: 'الكوبونات', icon: DocumentTextIcon },
              { id: 'invoices', label: 'الفواتير', icon: DocumentTextIcon },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'subscriptions' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">إدارة الاشتراكات</h2>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  إضافة اشتراك جديد
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-right py-3 px-4">المستخدم</th>
                      <th className="text-right py-3 px-4">الخطة</th>
                      <th className="text-right py-3 px-4">الحالة</th>
                      <th className="text-right py-3 px-4">المبلغ</th>
                      <th className="text-right py-3 px-4">تاريخ البداية</th>
                      <th className="text-right py-3 px-4">تاريخ الانتهاء</th>
                      <th className="text-right py-3 px-4">التجديد التلقائي</th>
                      <th className="text-right py-3 px-4">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">user{subscription.userId}</td>
                        <td className="py-3 px-4">{subscription.plan}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                            subscription.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {subscription.status === 'active' ? 'نشط' : 
                             subscription.status === 'cancelled' ? 'ملغي' : 'منتهي'}
                          </span>
                        </td>
                        <td className="py-3 px-4">${subscription.amount}</td>
                        <td className="py-3 px-4">{subscription.startDate}</td>
                        <td className="py-3 px-4">{subscription.endDate}</td>
                        <td className="py-3 px-4">
                          {subscription.autoRenew ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-red-600" />
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              تعديل
                            </button>
                            <button className="text-red-600 hover:text-red-800 text-sm">
                              إلغاء
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">سجل المدفوعات</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  تصدير التقرير
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-right py-3 px-4">المستخدم</th>
                      <th className="text-right py-3 px-4">المبلغ</th>
                      <th className="text-right py-3 px-4">الحالة</th>
                      <th className="text-right py-3 px-4">طريقة الدفع</th>
                      <th className="text-right py-3 px-4">التاريخ</th>
                      <th className="text-right py-3 px-4">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">user{payment.userId}</td>
                        <td className="py-3 px-4">${payment.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {payment.status === 'completed' ? 'مكتمل' : 
                             payment.status === 'pending' ? 'قيد المعالجة' : 'فشل'}
                          </span>
                        </td>
                        <td className="py-3 px-4">{payment.method}</td>
                        <td className="py-3 px-4">{payment.date}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            {payment.invoiceUrl && (
                              <button className="text-blue-600 hover:text-blue-800 text-sm">
                                تحميل الفاتورة
                              </button>
                            )}
                            <button className="text-gray-600 hover:text-gray-800 text-sm">
                              التفاصيل
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'coupons' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">إدارة الكوبونات</h2>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  إنشاء كوبون جديد
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.map((coupon) => (
                  <div key={coupon.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{coupon.code}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        coupon.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {coupon.active ? 'نشط' : 'غير نشط'}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">الخصم:</span>
                        <span className="font-medium">
                          {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">الاستخدامات:</span>
                        <span className="font-medium">{coupon.usedCount}/{coupon.maxUses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">صالح حتى:</span>
                        <span className="font-medium">{coupon.validUntil}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        تعديل
                      </button>
                      <button className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">إدارة الفواتير</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  إنشاء فاتورة جديدة
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold mb-2">إعدادات الفواتير</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>شعار الشركة:</span>
                        <button className="text-blue-600">تغيير</button>
                      </div>
                      <div className="flex justify-between">
                        <span>معلومات الشركة:</span>
                        <button className="text-blue-600">تعديل</button>
                      </div>
                      <div className="flex justify-between">
                        <span>قوالب الفواتير:</span>
                        <button className="text-blue-600">إدارة</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold mb-2">إحصائيات الفواتير</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>إجمالي الفواتير:</span>
                        <span className="font-medium">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span>المدفوعة:</span>
                        <span className="font-medium text-green-600">1,180</span>
                      </div>
                      <div className="flex justify-between">
                        <span>قيد الانتظار:</span>
                        <span className="font-medium text-yellow-600">67</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold mb-2">إجراءات سريعة</h3>
                    <div className="space-y-2">
                      <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        إنشاء فاتورة PDF
                      </button>
                      <button className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                        إرسال فواتير متأخرة
                      </button>
                      <button className="w-full px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                        تصدير جميع الفواتير
                      </button>
                    </div>
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