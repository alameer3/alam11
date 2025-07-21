'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSiteSettings, SiteConfig } from '@/lib/site-settings'
import { 
  Settings,
  Palette,
  Type,
  Image,
  Globe,
  Share2,
  Shield,
  Zap,
  Download,
  Upload,
  RotateCcw,
  Save,
  Eye,
  Layout,
  Users,
  Database,
  Bell,
  Search,
  Link,
  Monitor
} from 'lucide-react'

export default function SiteSettingsPage() {
  const {
    config,
    updateSetting,
    saveConfig,
    resetToDefaults,
    exportSettings,
    importSettings,
    getThemeCSS
  } = useSiteSettings()

  const [formData, setFormData] = useState<SiteConfig>(config)
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    setFormData(config)
  }, [config])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await saveConfig(formData)
      alert('تم حفظ الإعدادات بنجاح!')
    } catch (error) {
      alert('خطأ في حفظ الإعدادات')
    }
    setIsSaving(false)
  }

  const handleReset = async () => {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع الإعدادات؟')) {
      await resetToDefaults()
      setFormData(config)
      alert('تم إعادة تعيين الإعدادات بنجاح!')
    }
  }

  const handleExport = () => {
    const configJson = exportSettings()
    const blob = new Blob([configJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'site-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string
          await importSettings(content)
          setFormData(config)
          alert('تم استيراد الإعدادات بنجاح!')
        } catch (error) {
          alert('خطأ في استيراد الإعدادات')
        }
      }
      reader.readAsText(file)
    }
  }

  const updateFormData = (path: string, value: string | number | boolean) => {
    const keys = path.split('.')
    const newData = { ...formData }
    let current: Record<string, unknown> = newData
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    
    current[keys[keys.length - 1]] = value
    setFormData(newData)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Settings className="h-10 w-10" />
              إعدادات الموقع الشاملة
            </h1>
            <p className="text-gray-400">تخصيص كامل لجميع عناصر الموقع</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              إعادة تعيين
            </Button>
            
            <Button
              onClick={handleExport}
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              تصدير
            </Button>
            
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <Button
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                asChild
              >
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  استيراد
                </span>
              </Button>
            </label>
            
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#26baee] hover:bg-[#1fa3d1] text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </Button>
          </div>
        </div>

        {/* معاينة مباشرة */}
        <Card className="bg-[#1a1a1a] border-[#333] mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="h-5 w-5" />
              معاينة مباشرة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Switch
                checked={previewMode}
                onCheckedChange={setPreviewMode}
              />
              <span className="text-gray-300">تطبيق التغييرات فوراً</span>
            </div>
            
            {previewMode && (
              <style dangerouslySetInnerHTML={{ __html: getThemeCSS() }} />
            )}
          </CardContent>
        </Card>

        {/* تبويبات الإعدادات */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 bg-[#1a1a1a] border-[#333] mb-8">
            <TabsTrigger value="general" className="text-white data-[state=active]:bg-[#26baee]">
              <Settings className="h-4 w-4 mr-1" />
              عام
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-white data-[state=active]:bg-[#26baee]">
              <Palette className="h-4 w-4 mr-1" />
              المظهر
            </TabsTrigger>
            <TabsTrigger value="layout" className="text-white data-[state=active]:bg-[#26baee]">
              <Layout className="h-4 w-4 mr-1" />
              التخطيط
            </TabsTrigger>
            <TabsTrigger value="content" className="text-white data-[state=active]:bg-[#26baee]">
              <Database className="h-4 w-4 mr-1" />
              المحتوى
            </TabsTrigger>
            <TabsTrigger value="social" className="text-white data-[state=active]:bg-[#26baee]">
              <Share2 className="h-4 w-4 mr-1" />
              اجتماعي
            </TabsTrigger>
            <TabsTrigger value="seo" className="text-white data-[state=active]:bg-[#26baee]">
              <Search className="h-4 w-4 mr-1" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-white data-[state=active]:bg-[#26baee]">
              <Zap className="h-4 w-4 mr-1" />
              الأداء
            </TabsTrigger>
            <TabsTrigger value="security" className="text-white data-[state=active]:bg-[#26baee]">
              <Shield className="h-4 w-4 mr-1" />
              الأمان
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-[#26baee]">
              <Users className="h-4 w-4 mr-1" />
              المستخدمين
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-white data-[state=active]:bg-[#26baee]">
              <Bell className="h-4 w-4 mr-1" />
              الإشعارات
            </TabsTrigger>
            <TabsTrigger value="ads" className="text-white data-[state=active]:bg-[#26baee]">
              <Monitor className="h-4 w-4 mr-1" />
              الإعلانات
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-white data-[state=active]:bg-[#26baee]">
              <Settings className="h-4 w-4 mr-1" />
              متقدم
            </TabsTrigger>
          </TabsList>

          {/* تبويب الإعدادات العامة */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">المعلومات الأساسية</CardTitle>
                <CardDescription className="text-gray-400">
                  الإعدادات الأساسية للموقع
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteName" className="text-gray-300">اسم الموقع</Label>
                    <Input
                      id="siteName"
                      value={formData.siteName}
                      onChange={(e) => updateFormData('siteName', e.target.value)}
                      className="bg-[#2a2a2a] border-[#444] text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="siteUrl" className="text-gray-300">رابط الموقع</Label>
                    <Input
                      id="siteUrl"
                      value={formData.siteUrl}
                      onChange={(e) => updateFormData('siteUrl', e.target.value)}
                      className="bg-[#2a2a2a] border-[#444] text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="siteDescription" className="text-gray-300">وصف الموقع</Label>
                  <Textarea
                    id="siteDescription"
                    value={formData.siteDescription}
                    onChange={(e) => updateFormData('siteDescription', e.target.value)}
                    className="bg-[#2a2a2a] border-[#444] text-white min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="siteKeywords" className="text-gray-300">الكلمات المفتاحية</Label>
                  <Input
                    id="siteKeywords"
                    value={formData.siteKeywords}
                    onChange={(e) => updateFormData('siteKeywords', e.target.value)}
                    className="bg-[#2a2a2a] border-[#444] text-white"
                    placeholder="كلمة1, كلمة2, كلمة3"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">الشعار والهوية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="logoUrl" className="text-gray-300">رابط الشعار</Label>
                    <Input
                      id="logoUrl"
                      value={formData.logoUrl}
                      onChange={(e) => updateFormData('logoUrl', e.target.value)}
                      className="bg-[#2a2a2a] border-[#444] text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="logoText" className="text-gray-300">نص الشعار</Label>
                    <Input
                      id="logoText"
                      value={formData.logoText}
                      onChange={(e) => updateFormData('logoText', e.target.value)}
                      className="bg-[#2a2a2a] border-[#444] text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="faviconUrl" className="text-gray-300">الأيقونة المفضلة</Label>
                    <Input
                      id="faviconUrl"
                      value={formData.faviconUrl}
                      onChange={(e) => updateFormData('faviconUrl', e.target.value)}
                      className="bg-[#2a2a2a] border-[#444] text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* تبويب المظهر */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">نظام الألوان</CardTitle>
                <CardDescription className="text-gray-400">
                  تخصيص ألوان الموقع
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="primaryColor" className="text-gray-300">اللون الرئيسي</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) => updateFormData('primaryColor', e.target.value)}
                        className="w-16 h-10 p-1 bg-[#2a2a2a] border-[#444]"
                      />
                      <Input
                        value={formData.primaryColor}
                        onChange={(e) => updateFormData('primaryColor', e.target.value)}
                        className="bg-[#2a2a2a] border-[#444] text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="secondaryColor" className="text-gray-300">اللون الثانوي</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={formData.secondaryColor}
                        onChange={(e) => updateFormData('secondaryColor', e.target.value)}
                        className="w-16 h-10 p-1 bg-[#2a2a2a] border-[#444]"
                      />
                      <Input
                        value={formData.secondaryColor}
                        onChange={(e) => updateFormData('secondaryColor', e.target.value)}
                        className="bg-[#2a2a2a] border-[#444] text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="accentColor" className="text-gray-300">لون التمييز</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={formData.accentColor}
                        onChange={(e) => updateFormData('accentColor', e.target.value)}
                        className="w-16 h-10 p-1 bg-[#2a2a2a] border-[#444]"
                      />
                      <Input
                        value={formData.accentColor}
                        onChange={(e) => updateFormData('accentColor', e.target.value)}
                        className="bg-[#2a2a2a] border-[#444] text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="backgroundColor" className="text-gray-300">لون الخلفية</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={formData.backgroundColor}
                        onChange={(e) => updateFormData('backgroundColor', e.target.value)}
                        className="w-16 h-10 p-1 bg-[#2a2a2a] border-[#444]"
                      />
                      <Input
                        value={formData.backgroundColor}
                        onChange={(e) => updateFormData('backgroundColor', e.target.value)}
                        className="bg-[#2a2a2a] border-[#444] text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="textColor" className="text-gray-300">لون النص</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={formData.textColor}
                        onChange={(e) => updateFormData('textColor', e.target.value)}
                        className="w-16 h-10 p-1 bg-[#2a2a2a] border-[#444]"
                      />
                      <Input
                        value={formData.textColor}
                        onChange={(e) => updateFormData('textColor', e.target.value)}
                        className="bg-[#2a2a2a] border-[#444] text-white"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">الخطوط</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryFont" className="text-gray-300">الخط الرئيسي</Label>
                    <Select
                      value={formData.primaryFont}
                      onValueChange={(value) => updateFormData('primaryFont', value)}
                    >
                      <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="akoam">akoam (الأصلي)</SelectItem>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Cairo">Cairo</SelectItem>
                        <SelectItem value="Noto Sans Arabic">Noto Sans Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="secondaryFont" className="text-gray-300">الخط الثانوي</Label>
                    <Select
                      value={formData.secondaryFont}
                      onValueChange={(value) => updateFormData('secondaryFont', value)}
                    >
                      <SelectTrigger className="bg-[#2a2a2a] border-[#444] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* المزيد من التبويبات... */}
          <TabsContent value="layout" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">إعدادات الصفحة الرئيسية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mainButtonText" className="text-gray-300">نص الزر الرئيسي</Label>
                  <Input
                    id="mainButtonText"
                    value={formData.homepage.mainButtonText}
                    onChange={(e) => updateFormData('homepage.mainButtonText', e.target.value)}
                    className="bg-[#2a2a2a] border-[#444] text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="searchPlaceholder" className="text-gray-300">نص البحث</Label>
                  <Input
                    id="searchPlaceholder"
                    value={formData.homepage.searchPlaceholder}
                    onChange={(e) => updateFormData('homepage.searchPlaceholder', e.target.value)}
                    className="bg-[#2a2a2a] border-[#444] text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="backgroundImage" className="text-gray-300">صورة الخلفية</Label>
                  <Input
                    id="backgroundImage"
                    value={formData.homepage.backgroundImage}
                    onChange={(e) => updateFormData('homepage.backgroundImage', e.target.value)}
                    className="bg-[#2a2a2a] border-[#444] text-white"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.homepage.showStats}
                    onCheckedChange={(checked) => updateFormData('homepage.showStats', checked)}
                  />
                  <Label className="text-gray-300">عرض الإحصائيات</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.homepage.showCategories}
                    onCheckedChange={(checked) => updateFormData('homepage.showCategories', checked)}
                  />
                  <Label className="text-gray-300">عرض الأقسام</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* باقي التبويبات ستتم إضافتها بنفس الطريقة */}
        </Tabs>
      </div>
    </div>
  )
}