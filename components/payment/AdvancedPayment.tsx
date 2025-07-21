'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  DollarSign, 
  Calendar,
  Download,
  Copy,
  Trash2,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Gift,
  Receipt,
  Users,
  TrendingUp
} from 'lucide-react';

interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly' | 'weekly';
  features: string[];
  isActive: boolean;
  subscribers: number;
  revenue: number;
}

interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minAmount: number;
  maxUses: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

interface Invoice {
  id: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'cancelled';
  date: string;
  dueDate: string;
  items: InvoiceItem[];
}

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export default function AdvancedPayment() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedTab, setSelectedTab] = useState('subscriptions');

  useEffect(() => {
    // Load payment data
    setSubscriptions([
      {
        id: '1',
        name: 'الخطة الأساسية',
        price: 9.99,
        currency: 'USD',
        interval: 'monthly',
        features: ['مشاهدة غير محدودة', 'جودة عالية', 'دعم العملاء'],
        isActive: true,
        subscribers: 1250,
        revenue: 12487.50
      },
      {
        id: '2',
        name: 'الخطة المميزة',
        price: 19.99,
        currency: 'USD',
        interval: 'monthly',
        features: ['مشاهدة غير محدودة', 'جودة 4K', 'تحميل للعرض بدون اتصال', 'دعم متميز'],
        isActive: true,
        subscribers: 890,
        revenue: 17791.10
      },
      {
        id: '3',
        name: 'الخطة السنوية',
        price: 99.99,
        currency: 'USD',
        interval: 'yearly',
        features: ['جميع مميزات الخطة المميزة', 'خصم 50%', 'محتوى حصري'],
        isActive: true,
        subscribers: 450,
        revenue: 44995.50
      }
    ]);

    setCoupons([
      {
        id: '1',
        code: 'WELCOME20',
        discountType: 'percentage',
        discountValue: 20,
        minAmount: 10,
        maxUses: 1000,
        usedCount: 234,
        validFrom: '2024-01-01',
        validUntil: '2024-12-31',
        isActive: true
      },
      {
        id: '2',
        code: 'SAVE50',
        discountType: 'fixed',
        discountValue: 50,
        minAmount: 100,
        maxUses: 500,
        usedCount: 89,
        validFrom: '2024-01-01',
        validUntil: '2024-06-30',
        isActive: true
      }
    ]);

    setInvoices([
      {
        id: 'INV-001',
        customerName: 'أحمد محمد',
        customerEmail: 'ahmed@example.com',
        amount: 19.99,
        currency: 'USD',
        status: 'paid',
        date: '2024-01-20',
        dueDate: '2024-01-20',
        items: [
          { name: 'الخطة المميزة - يناير 2024', quantity: 1, price: 19.99, total: 19.99 }
        ]
      },
      {
        id: 'INV-002',
        customerName: 'سارة أحمد',
        customerEmail: 'sara@example.com',
        amount: 99.99,
        currency: 'USD',
        status: 'pending',
        date: '2024-01-19',
        dueDate: '2024-01-26',
        items: [
          { name: 'الخطة السنوية - 2024', quantity: 1, price: 99.99, total: 99.99 }
        ]
      }
    ]);
  }, []);

  const handleSubscriptionAction = (subscriptionId: string, action: 'edit' | 'delete' | 'toggle') => {
    // console.log(`Subscription ${subscriptionId} action: ${action}`);
  };

  const handleCouponAction = (couponId: string, action: 'edit' | 'delete' | 'toggle') => {
    // console.log(`Coupon ${couponId} action: ${action}`);
  };

  const generateInvoicePDF = (invoiceId: string) => {
    // console.log(`Generating PDF for invoice: ${invoiceId}`);
    // PDF generation logic
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // Show success message
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">نظام الدفع المتقدم</h1>
          <p className="text-gray-600">إدارة الاشتراكات والكوبونات والفواتير</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            إضافة خطة جديدة
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            تصدير التقارير
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$75,274.10</div>
            <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المشتركين النشطين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,590</div>
            <p className="text-xs text-muted-foreground">+8% من الشهر الماضي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الكوبونات النشطة</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 كوبونات جديدة هذا الشهر</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الفواتير المعلقة</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">$1,247.50 قيمة معلقة</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subscriptions">الاشتراكات</TabsTrigger>
          <TabsTrigger value="coupons">الكوبونات</TabsTrigger>
          <TabsTrigger value="invoices">الفواتير</TabsTrigger>
        </TabsList>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>خطط الاشتراك</CardTitle>
                  <CardDescription>إدارة خطط الاشتراك والأسعار</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة خطة جديدة
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{subscription.name}</h3>
                          <Badge variant={subscription.isActive ? 'default' : 'secondary'}>
                            {subscription.isActive ? 'نشط' : 'غير نشط'}
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          ${subscription.price}
                          <span className="text-sm text-gray-500 ml-1">
                            /{subscription.interval === 'monthly' ? 'شهر' : subscription.interval === 'yearly' ? 'سنة' : 'أسبوع'}
                          </span>
                        </p>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600 mb-2">المميزات:</p>
                          <ul className="space-y-1">
                            {subscription.features.map((feature, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-sm text-gray-600 mb-2">
                          <p>المشتركين: {subscription.subscribers.toLocaleString()}</p>
                          <p>الإيرادات: ${subscription.revenue.toLocaleString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleSubscriptionAction(subscription.id, 'toggle')}>
                            {subscription.isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coupons Tab */}
        <TabsContent value="coupons" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>كوبونات الخصم</CardTitle>
                  <CardDescription>إدارة كوبونات الخصم والعروض</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة كوبون جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coupons.map((coupon) => (
                  <div key={coupon.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{coupon.code}</h3>
                          <Badge variant={coupon.isActive ? 'default' : 'secondary'}>
                            {coupon.isActive ? 'نشط' : 'غير نشط'}
                          </Badge>
                          <Badge variant="outline">
                            {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p>الحد الأدنى: ${coupon.minAmount}</p>
                            <p>الاستخدامات: {coupon.usedCount}/{coupon.maxUses}</p>
                          </div>
                          <div>
                            <p>من: {coupon.validFrom}</p>
                            <p>إلى: {coupon.validUntil}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => copyCouponCode(coupon.code)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleCouponAction(coupon.id, 'toggle')}>
                          {coupon.isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الفواتير</CardTitle>
              <CardDescription>إدارة فواتير العملاء</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{invoice.id}</h3>
                          <Badge variant={
                            invoice.status === 'paid' ? 'default' : 
                            invoice.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {invoice.status === 'paid' ? 'مدفوع' : 
                             invoice.status === 'pending' ? 'معلق' : 'ملغي'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p>العميل: {invoice.customerName}</p>
                            <p>البريد: {invoice.customerEmail}</p>
                          </div>
                          <div>
                            <p>التاريخ: {invoice.date}</p>
                            <p>المبلغ: ${invoice.amount}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium">العناصر:</p>
                          {invoice.items.map((item, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              {item.name} - ${item.total}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => generateInvoicePDF(invoice.id)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}