'use client';

import { useState } from 'react';
import { 
  Check, 
  X, 
  CreditCard, 
  Calendar, 
  Download, 
  Eye, 
  Star,
  Crown,
  Zap,
  Shield,
  Gift,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Receipt,
  CreditCard as CardIcon,
  Banknote,
  Wallet
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  features: string[];
  popular?: boolean;
  icon: any;
  color: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  name: string;
  last4?: string;
  expiry?: string;
  isDefault: boolean;
  icon: any;
}

interface BillingHistory {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  invoiceUrl?: string;
}

export default function SubscriptionSystem() {
  const [activeTab, setActiveTab] = useState('plans');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'الخطة الأساسية',
      price: 29,
      currency: 'SAR',
      period: 'شهرياً',
      features: [
        'جودة فيديو عالية (1080p)',
        'مشاهدة بدون إعلانات',
        'تحميل 5 فيديوهات شهرياً',
        'دعم العملاء الأساسي',
        'مشاهدة على جهازين'
      ],
      icon: Eye,
      color: 'bg-blue-500'
    },
    {
      id: 'premium',
      name: 'الخطة المميزة',
      price: 59,
      currency: 'SAR',
      period: 'شهرياً',
      features: [
        'جميع مميزات الخطة الأساسية',
        'جودة فيديو فائقة (4K)',
        'تحميل غير محدود',
        'مشاهدة على 4 أجهزة',
        'دعم العملاء المميز',
        'محتوى حصري',
        'إزالة علامة المياه'
      ],
      popular: true,
      icon: Star,
      color: 'bg-purple-500'
    },
    {
      id: 'pro',
      name: 'الخطة الاحترافية',
      price: 99,
      currency: 'SAR',
      period: 'شهرياً',
      features: [
        'جميع مميزات الخطة المميزة',
        'مشاهدة على أجهزة غير محدودة',
        'دعم العملاء المباشر',
        'محتوى حصري مبكر',
        'إعدادات متقدمة',
        'تحليلات مفصلة',
        'أولوية في الخدمة'
      ],
      icon: Crown,
      color: 'bg-yellow-500'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      name: 'Visa ending in 4242',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
      icon: CreditCard
    },
    {
      id: '2',
      type: 'card',
      name: 'Mastercard ending in 8888',
      last4: '8888',
      expiry: '08/26',
      isDefault: false,
      icon: CreditCard
    },
    {
      id: '3',
      type: 'paypal',
      name: 'PayPal',
      isDefault: false,
      icon: Wallet
    }
  ];

  const billingHistory: BillingHistory[] = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 59,
      currency: 'SAR',
      status: 'paid',
      description: 'الخطة المميزة - يناير 2024',
      invoiceUrl: '/invoice/1'
    },
    {
      id: '2',
      date: '2023-12-15',
      amount: 59,
      currency: 'SAR',
      status: 'paid',
      description: 'الخطة المميزة - ديسمبر 2023',
      invoiceUrl: '/invoice/2'
    },
    {
      id: '3',
      date: '2023-11-15',
      amount: 29,
      currency: 'SAR',
      status: 'paid',
      description: 'الخطة الأساسية - نوفمبر 2023',
      invoiceUrl: '/invoice/3'
    }
  ];

  const tabs = [
    { id: 'plans', label: 'الخطط', icon: Crown },
    { id: 'billing', label: 'الفوترة', icon: CreditCard },
    { id: 'payment', label: 'طرق الدفع', icon: CardIcon },
    { id: 'history', label: 'سجل الفواتير', icon: FileText }
  ];

  const getYearlyPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 12 * 0.8); // 20% discount
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = () => {
    if (selectedPlan) {
      // // console.log(`Subscribing to plan: ${selectedPlan}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'failed':
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">الاشتراكات والفوترة</h1>
        <p className="text-gray-600 dark:text-gray-400">
          اختر الخطة المناسبة لك وإدارة الفوترة
        </p>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">خطتك الحالية</h2>
            <p className="text-purple-100">الخطة المميزة - 59 ريال شهرياً</p>
            <p className="text-sm text-purple-200">ينتهي الاشتراك في 15 فبراير 2024</p>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Crown size={24} />
            <span className="font-semibold">مميز</span>
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
          {/* Plans Tab */}
          {activeTab === 'plans' && (
            <div className="space-y-6">
              {/* Billing Period Toggle */}
              <div className="flex justify-center">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      billingPeriod === 'monthly'
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                        : 'text-gray-500'
                    }`}
                  >
                    شهري
                  </button>
                  <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      billingPeriod === 'yearly'
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                        : 'text-gray-500'
                    }`}
                  >
                    سنوي
                    <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      توفير 20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  const price = billingPeriod === 'yearly' ? getYearlyPrice(plan.price) : plan.price;
                  const period = billingPeriod === 'yearly' ? 'سنوياً' : 'شهرياً';
                  
                  return (
                    <div
                      key={plan.id}
                      className={`relative rounded-lg border-2 p-6 ${
                        selectedPlan === plan.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      } ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            الأكثر شعبية
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center mb-6">
                        <div className={`inline-flex p-3 rounded-full mb-4 ${plan.color} text-white`}>
                          <Icon size={24} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold">{price}</span>
                          <span className="text-gray-500"> {plan.currency}</span>
                          <span className="text-gray-500 text-sm">/{period}</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 space-x-reverse">
                            <Check size={16} className="text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handlePlanSelect(plan.id)}
                        className={`w-full py-2 px-4 rounded-lg font-medium ${
                          selectedPlan === plan.id
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {selectedPlan === plan.id ? 'محدد' : 'اختيار الخطة'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {selectedPlan && (
                <div className="text-center">
                  <button
                    onClick={handleSubscribe}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center space-x-2 space-x-reverse mx-auto"
                  >
                    <span>الاشتراك الآن</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">معلومات الفوترة</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        اسم الفاتورة
                      </label>
                      <input
                        type="text"
                        defaultValue="أحمد محمد"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        defaultValue="ahmed@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        العنوان
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="الرياض، المملكة العربية السعودية"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">ملخص الفوترة</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>الخطة المميزة</span>
                      <span>59 ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الضريبة (15%)</span>
                      <span>8.85 ريال</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>الإجمالي</span>
                        <span>67.85 ريال</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">طرق الدفع</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  إضافة طريقة دفع
                </button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Icon size={20} className="text-gray-500" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          {method.last4 && (
                            <p className="text-sm text-gray-500">ينتهي في {method.expiry}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {method.isDefault && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            افتراضي
                          </span>
                        )}
                        <button className="text-gray-500 hover:text-blue-600">
                          تعديل
                        </button>
                        <button className="text-gray-500 hover:text-red-600">
                          حذف
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Billing History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">سجل الفواتير</h3>
              
              <div className="space-y-4">
                {billingHistory.map((invoice) => {
                  const StatusIcon = getStatusIcon(invoice.status);
                  return (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <StatusIcon size={20} className="text-gray-500" />
                        <div>
                          <p className="font-medium">{invoice.description}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(invoice.date).toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-right">
                          <p className="font-medium">{invoice.amount} {invoice.currency}</p>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                            {invoice.status === 'paid' ? 'مدفوع' :
                             invoice.status === 'pending' ? 'قيد الانتظار' : 'فشل'}
                          </span>
                        </div>
                        {invoice.invoiceUrl && (
                          <button className="text-blue-600 hover:text-blue-700">
                            <Receipt size={16} />
                          </button>
                        )}
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