'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CreditCard, 
  Shield, 
  Zap, 
  Crown, 
  Star, 
  Gift, 
  Users, 
  Download,
  Play,
  Eye,
  Heart,
  MessageSquare,
  Check
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: string;
  features: string[];
  popular?: boolean;
  discount?: number;
  originalPrice?: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  type: 'card' | 'paypal' | 'stripe' | 'apple' | 'google';
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'الخطة الأساسية',
    price: 9.99,
    currency: 'USD',
    duration: 'شهرياً',
    features: [
      'مشاهدة بدون إعلانات',
      'جودة عالية (1080p)',
      'تحميل محدود (5 محتوى)',
      'دعم العملاء الأساسي'
    ]
  },
  {
    id: 'premium',
    name: 'الخطة المميزة',
    price: 19.99,
    currency: 'USD',
    duration: 'شهرياً',
    features: [
      'جميع مميزات الخطة الأساسية',
      'جودة فائقة (4K)',
      'تحميل غير محدود',
      'مشاهدة على 4 أجهزة',
      'دعم العملاء المميز',
      'محتوى حصري'
    ],
    popular: true,
    discount: 20,
    originalPrice: 24.99
  },
  {
    id: 'family',
    name: 'خطة العائلة',
    price: 29.99,
    currency: 'USD',
    duration: 'شهرياً',
    features: [
      'جميع مميزات الخطة المميزة',
      'مشاهدة على 6 أجهزة',
      'ملفات تعريف منفصلة',
      'مراقبة المحتوى للأطفال',
      'دعم العملاء المميز 24/7',
      'محتوى حصري مبكر'
    ]
  }
];

const paymentMethods: PaymentMethod[] = [
  {
    id: 'stripe',
    name: 'بطاقة ائتمان',
    icon: '💳',
    type: 'stripe'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🔵',
    type: 'paypal'
  },
  {
    id: 'apple',
    name: 'Apple Pay',
    icon: '🍎',
    type: 'apple'
  },
  {
    id: 'google',
    name: 'Google Pay',
    icon: '🤖',
    type: 'google'
  }
];

export default function PaymentSystem() {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handlePayment = async () => {
    if (!agreedToTerms) {
      alert('يجب الموافقة على الشروط والأحكام');
      return;
    }

    setIsProcessing(true);
    
    try {
      // محاكاة عملية الدفع
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // هنا يتم إرسال بيانات الدفع إلى الخادم
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: selectedPlan,
          paymentMethod: selectedPaymentMethod,
          cardDetails,
          amount: plans.find(p => p.id === selectedPlan)?.price
        }),
      });

      if (response.ok) {
        alert('تم الدفع بنجاح!');
        // إعادة توجيه إلى صفحة النجاح
      } else {
        throw new Error('فشل في عملية الدفع');
      }
    } catch (error) {
      alert('حدث خطأ في عملية الدفع. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">خطط الاشتراك</h1>
          <p className="text-slate-300 text-lg">اختر الخطة المناسبة لك واستمتع بمحتوى حصري</p>
        </div>

        {/* خطط الاشتراك */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950' 
                  : 'bg-white dark:bg-slate-800'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  الأكثر شعبية
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  {plan.id === 'premium' && <Crown className="w-5 h-5 text-yellow-500" />}
                  {plan.name}
                </CardTitle>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-blue-600">
                    ${plan.price}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-lg text-slate-500 line-through">
                      ${plan.originalPrice}
                    </span>
                  )}
                  <span className="text-slate-500">/{plan.duration}</span>
                </div>
                {plan.discount && (
                  <Badge variant="secondary" className="w-fit mx-auto">
                    خصم {plan.discount}%
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* تفاصيل الدفع */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              تفاصيل الدفع
            </CardTitle>
            <CardDescription>
              الخطة المختارة: {selectedPlanData?.name} - ${selectedPlanData?.price}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* طرق الدفع */}
            <div>
              <Label className="text-base font-semibold mb-3 block">طريقة الدفع</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentMethods.map((method) => (
                  <Button
                    key={method.id}
                    variant={selectedPaymentMethod === method.id ? "default" : "outline"}
                    className="flex items-center gap-2 h-12"
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <span className="text-lg">{method.icon}</span>
                    {method.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* تفاصيل البطاقة */}
            {selectedPaymentMethod === 'stripe' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardNumber">رقم البطاقة</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">اسم حامل البطاقة</Label>
                    <Input
                      id="cardName"
                      placeholder="الاسم الكامل"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">تاريخ الانتهاء</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* الموافقة على الشروط */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                أوافق على <a href="/terms" className="text-blue-500 hover:underline">الشروط والأحكام</a> و 
                <a href="/privacy" className="text-blue-500 hover:underline"> سياسة الخصوصية</a>
              </Label>
            </div>

            {/* زر الدفع */}
            <Button
              onClick={handlePayment}
              disabled={isProcessing || !agreedToTerms}
              className="w-full h-12 text-lg font-semibold"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري المعالجة...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  دفع آمن - ${selectedPlanData?.price}
                </div>
              )}
            </Button>

            {/* معلومات الأمان */}
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Shield className="w-4 h-4" />
              جميع المدفوعات محمية ومشفرة
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}