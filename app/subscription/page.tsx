'use client';

import { useState } from 'react';
import { CreditCard, Check, X, Calendar, Download, Users, Star, Crown, Zap, Shield, Clock, AlertCircle } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  savings?: number;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  brand?: string;
  email?: string;
  isDefault: boolean;
  expiryDate?: string;
}

interface BillingHistory {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl?: string;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    period: 'monthly',
    features: [
      'HD streaming',
      'Watch on 1 device',
      'Unlimited movies & TV shows',
      'Cancel anytime'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 14.99,
    period: 'monthly',
    features: [
      'Full HD streaming',
      'Watch on 2 devices',
      'Unlimited movies & TV shows',
      'Download on 2 devices',
      'Cancel anytime'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    period: 'monthly',
    features: [
      '4K Ultra HD streaming',
      'Watch on 4 devices',
      'Unlimited movies & TV shows',
      'Download on 4 devices',
      'Premium content access',
      'Cancel anytime'
    ]
  },
  {
    id: 'family',
    name: 'Family',
    price: 24.99,
    period: 'monthly',
    features: [
      '4K Ultra HD streaming',
      'Watch on 6 devices',
      'Unlimited movies & TV shows',
      'Download on 6 devices',
      'Up to 6 profiles',
      'Parental controls',
      'Cancel anytime'
    ]
  }
];

const yearlyPlans: Plan[] = plans.map(plan => ({
  ...plan,
  price: Math.round(plan.price * 12 * 0.8), // 20% discount
  period: 'yearly' as const,
  savings: 20
}));

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    brand: 'Visa',
    last4: '4242',
    isDefault: true,
    expiryDate: '12/25'
  },
  {
    id: '2',
    type: 'card',
    brand: 'Mastercard',
    last4: '5555',
    isDefault: false,
    expiryDate: '08/26'
  },
  {
    id: '3',
    type: 'paypal',
    email: 'user@example.com',
    isDefault: false
  }
];

const mockBillingHistory: BillingHistory[] = [
  {
    id: '1',
    date: '2024-01-15',
    amount: 14.99,
    description: 'Standard Plan - Monthly',
    status: 'paid',
    invoiceUrl: '#'
  },
  {
    id: '2',
    date: '2023-12-15',
    amount: 14.99,
    description: 'Standard Plan - Monthly',
    status: 'paid',
    invoiceUrl: '#'
  },
  {
    id: '3',
    date: '2023-11-15',
    amount: 14.99,
    description: 'Standard Plan - Monthly',
    status: 'paid',
    invoiceUrl: '#'
  },
  {
    id: '4',
    date: '2023-10-15',
    amount: 9.99,
    description: 'Basic Plan - Monthly',
    status: 'paid',
    invoiceUrl: '#'
  }
];

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState('standard');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [activeTab, setActiveTab] = useState<'plans' | 'payment' | 'billing'>('plans');
  const [showAddPayment, setShowAddPayment] = useState(false);

  const currentPlans = billingPeriod === 'monthly' ? plans : yearlyPlans;

  const getStatusColor = (status: BillingHistory['status']) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
    }
  };

  const getStatusIcon = (status: BillingHistory['status']) => {
    switch (status) {
      case 'paid':
        return <Check className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <X className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Crown className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Subscription & Billing
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your subscription and payment methods
              </p>
            </div>
          </div>

          {/* Current Plan Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Current Plan: Standard
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  $14.99/month • Next billing: February 15, 2024
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>Active since: December 15, 2023</span>
                  <span>•</span>
                  <span>Auto-renewal: Enabled</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                  Change Plan
                </button>
                <button className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'plans', label: 'Plans', icon: Star },
                { id: 'payment', label: 'Payment Methods', icon: CreditCard },
                { id: 'billing', label: 'Billing History', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            {/* Billing Period Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingPeriod === 'yearly' ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                  Yearly
                </span>
                {billingPeriod === 'yearly' && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded">
                    Save 20%
                  </span>
                )}
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-white dark:bg-gray-800 rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-lg ${
                    plan.popular
                      ? 'border-purple-500 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        /{plan.period === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {plan.savings && (
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Save ${plan.savings}% with yearly billing
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      currentPlan === plan.id
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {currentPlan === plan.id ? 'Current Plan' : 'Choose Plan'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Payment Methods
              </h2>
              <button
                onClick={() => setShowAddPayment(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add Payment Method
              </button>
            </div>

            <div className="space-y-4">
              {mockPaymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {method.type === 'card' 
                            ? `${method.brand} •••• ${method.last4}`
                            : `PayPal • ${method.email}`
                          }
                        </h3>
                        {method.type === 'card' && method.expiryDate && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Expires {method.expiryDate}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded">
                          Default
                        </span>
                      )}
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-600 dark:hover:text-red-300">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Billing History
              </h2>
              <button className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium">
                Download All Invoices
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockBillingHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          ${item.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            <span className="ml-1">{item.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <button className="text-purple-600 dark:text-purple-400 hover:underline">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}