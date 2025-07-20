'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings,
  Key,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  XCircle,
  RefreshCw,
  TestTube
} from 'lucide-react';

interface OAuthProvider {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  isEnabled: boolean;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  isConfigured: boolean;
  testStatus: 'success' | 'error' | 'pending' | 'not-tested';
}

export default function OAuthProviders() {
  const [providers, setProviders] = useState<OAuthProvider[]>([
    {
      id: 'google',
      name: 'Google',
      displayName: 'Google',
      icon: '/icons/google.svg',
      isEnabled: true,
      clientId: 'your-google-client-id',
      clientSecret: 'your-google-client-secret',
      redirectUri: 'https://yourdomain.com/api/auth/callback/google',
      scopes: ['openid', 'profile', 'email'],
      isConfigured: true,
      testStatus: 'success'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      displayName: 'Facebook',
      icon: '/icons/facebook.svg',
      isEnabled: true,
      clientId: 'your-facebook-client-id',
      clientSecret: 'your-facebook-client-secret',
      redirectUri: 'https://yourdomain.com/api/auth/callback/facebook',
      scopes: ['email', 'public_profile'],
      isConfigured: true,
      testStatus: 'success'
    },
    {
      id: 'apple',
      name: 'Apple',
      displayName: 'Apple',
      icon: '/icons/apple.svg',
      isEnabled: false,
      clientId: '',
      clientSecret: '',
      redirectUri: 'https://yourdomain.com/api/auth/callback/apple',
      scopes: ['name', 'email'],
      isConfigured: false,
      testStatus: 'not-tested'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      displayName: 'Twitter',
      icon: '/icons/twitter.svg',
      isEnabled: false,
      clientId: '',
      clientSecret: '',
      redirectUri: 'https://yourdomain.com/api/auth/callback/twitter',
      scopes: ['tweet.read', 'users.read'],
      isConfigured: false,
      testStatus: 'not-tested'
    },
    {
      id: 'github',
      name: 'GitHub',
      displayName: 'GitHub',
      icon: '/icons/github.svg',
      isEnabled: false,
      clientId: '',
      clientSecret: '',
      redirectUri: 'https://yourdomain.com/api/auth/callback/github',
      scopes: ['read:user', 'user:email'],
      isConfigured: false,
      testStatus: 'not-tested'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      displayName: 'LinkedIn',
      icon: '/icons/linkedin.svg',
      isEnabled: false,
      clientId: '',
      clientSecret: '',
      redirectUri: 'https://yourdomain.com/api/auth/callback/linkedin',
      scopes: ['r_liteprofile', 'r_emailaddress'],
      isConfigured: false,
      testStatus: 'not-tested'
    }
  ]);

  const [showSecrets, setShowSecrets] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<OAuthProvider | null>(null);

  const handleProviderToggle = (providerId: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, isEnabled: !provider.isEnabled }
        : provider
    ));
  };

  const handleProviderUpdate = (providerId: string, updates: Partial<OAuthProvider>) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, ...updates, isConfigured: true }
        : provider
    ));
  };

  const testProvider = async (providerId: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, testStatus: 'pending' }
        : provider
    ));

    // Simulate API test
    setTimeout(() => {
      setProviders(prev => prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, testStatus: 'success' }
          : provider
      ));
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show success message
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'ناجح';
      case 'error': return 'خطأ';
      case 'pending': return 'قيد الاختبار';
      default: return 'لم يتم الاختبار';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">مزودي OAuth</h1>
          <p className="text-gray-600">إعداد مزودي تسجيل الدخول الاجتماعي</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowSecrets(!showSecrets)}>
            {showSecrets ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showSecrets ? 'إخفاء الأسرار' : 'إظهار الأسرار'}
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            اختبار الكل
          </Button>
        </div>
      </div>

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="providers">المزودين</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات العامة</TabsTrigger>
          <TabsTrigger value="logs">سجلات الاتصال</TabsTrigger>
        </TabsList>

        {/* Providers Tab */}
        <TabsContent value="providers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <Card key={provider.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-semibold">{provider.displayName.charAt(0)}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{provider.displayName}</CardTitle>
                        <CardDescription>تسجيل الدخول بـ {provider.displayName}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={provider.isEnabled}
                        onCheckedChange={() => handleProviderToggle(provider.id)}
                      />
                      <Badge variant={provider.isConfigured ? 'default' : 'secondary'}>
                        {provider.isConfigured ? 'مُعد' : 'غير مُعد'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Client ID</Label>
                      <div className="flex space-x-2 mt-1">
                        <Input
                          value={showSecrets ? provider.clientId : '••••••••••••••••'}
                          onChange={(e) => handleProviderUpdate(provider.id, { clientId: e.target.value })}
                          placeholder="أدخل Client ID"
                        />
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(provider.clientId)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Client Secret</Label>
                      <div className="flex space-x-2 mt-1">
                        <Input
                          type={showSecrets ? 'text' : 'password'}
                          value={showSecrets ? provider.clientSecret : '••••••••••••••••'}
                          onChange={(e) => handleProviderUpdate(provider.id, { clientSecret: e.target.value })}
                          placeholder="أدخل Client Secret"
                        />
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(provider.clientSecret)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Redirect URI</Label>
                      <div className="flex space-x-2 mt-1">
                        <Input
                          value={provider.redirectUri}
                          onChange={(e) => handleProviderUpdate(provider.id, { redirectUri: e.target.value })}
                          placeholder="أدخل Redirect URI"
                        />
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(provider.redirectUri)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Scopes</Label>
                      <Input
                        value={provider.scopes.join(', ')}
                        onChange={(e) => handleProviderUpdate(provider.id, { scopes: e.target.value.split(', ') })}
                        placeholder="أدخل Scopes مفصولة بفواصل"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(provider.testStatus)}>
                        {getStatusText(provider.testStatus)}
                      </Badge>
                      {provider.testStatus === 'pending' && (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => testProvider(provider.id)}>
                        <TestTube className="h-4 w-4 mr-1" />
                        اختبار
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
              <CardDescription>إعدادات OAuth العامة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>السماح بالتسجيل الجديد عبر OAuth</Label>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label>طلب معلومات إضافية عند التسجيل</Label>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label>إرسال بريد ترحيب للمستخدمين الجدد</Label>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label>تفعيل التحقق بخطوتين للمستخدمين الجدد</Label>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأمان</CardTitle>
              <CardDescription>إعدادات أمان OAuth</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>الحد الأقصى لمحاولات تسجيل الدخول</Label>
                <Input type="number" defaultValue={5} />
              </div>
              
              <div className="space-y-2">
                <Label>وقت حظر الحساب (بالدقائق)</Label>
                <Input type="number" defaultValue={30} />
              </div>
              
              <div className="space-y-2">
                <Label>تفعيل تسجيل محاولات تسجيل الدخول</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجلات OAuth</CardTitle>
              <CardDescription>سجلات محاولات تسجيل الدخول والاتصالات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">تسجيل دخول ناجح - Google</p>
                      <p className="text-sm text-gray-600">user@example.com • منذ {i} دقائق</p>
                    </div>
                    <Badge variant="default">ناجح</Badge>
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