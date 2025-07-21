import { z } from 'zod'

// نماذج الإعدادات
export const SiteConfigSchema = z.object({
  // المعلومات الأساسية
  siteName: z.string().default('𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗'),
  siteDescription: z.string().default('شمس المواقع، الموقع العربي الاول لتحميل و مشاهدة الافلام'),
  siteKeywords: z.string().default('أفلام,مسلسلات,حلقات,مصارعة,برامج,العاب'),
  siteUrl: z.string().default('https://ak.sv'),
  
  // الشعار والهوية
  logoUrl: z.string().default('/images/logo-white.svg'),
  faviconUrl: z.string().default('/favicon.ico'),
  logoText: z.string().default('𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗'),
  
  // الألوان
  primaryColor: z.string().default('#26baee'),
  secondaryColor: z.string().default('#222222'),
  accentColor: z.string().default('#1fa3d1'),
  backgroundColor: z.string().default('#0a0a0a'),
  textColor: z.string().default('#ffffff'),
  
  // الخطوط
  primaryFont: z.string().default('akoam'),
  secondaryFont: z.string().default('Inter'),
  fontSize: z.object({
    small: z.string().default('12px'),
    normal: z.string().default('14px'),
    large: z.string().default('16px'),
    xlarge: z.string().default('20px')
  }).default({}),
  
  // إعدادات الصفحة الرئيسية
  homepage: z.object({
    mainButtonText: z.string().default('الصفحة الرئيسية'),
    searchPlaceholder: z.string().default('ابحث عن فيلم او مسلسل او لعبة او برنامج ...'),
    backgroundImage: z.string().default('/images/home-bg.webp'),
    showStats: z.boolean().default(true),
    showCategories: z.boolean().default(true)
  }).default({}),
  
  // أقسام الموقع
  categories: z.array(z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
    url: z.string(),
    enabled: z.boolean().default(true),
    order: z.number().default(0)
  })).default([
    { id: 'movies', name: 'أفلام', icon: '🎬', url: '/movies', enabled: true, order: 1 },
    { id: 'series', name: 'مسلسلات', icon: '📺', url: '/series', enabled: true, order: 2 },
    { id: 'shows', name: 'تلفزيون', icon: '📡', url: '/shows', enabled: true, order: 3 },
    { id: 'mix', name: 'منوعات', icon: '🎭', url: '/mix', enabled: true, order: 4 }
  ]),
  
  // الروابط الاجتماعية
  socialLinks: z.array(z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
    url: z.string(),
    enabled: z.boolean().default(true),
    order: z.number().default(0)
  })).default([
    { id: 'home', name: 'الموقع الرئيسي', icon: '🏠', url: 'https://akw.to', enabled: true, order: 1 },
    { id: 'facebook', name: 'فيسبوك', icon: '📘', url: 'https://www.facebook.com/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗net', enabled: true, order: 2 },
    { id: 'youtube', name: 'يوتيوب', icon: '📺', url: 'https://www.youtube.com/c/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗network', enabled: true, order: 3 },
    { id: 'telegram', name: 'تيليجرام', icon: '📱', url: 'https://t.me/𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗', enabled: true, order: 4 }
  ]),
  
  // روابط Footer
  footerLinks: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    enabled: z.boolean().default(true),
    order: z.number().default(0)
  })).default([
    { id: 'home', name: '𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗', url: '/', enabled: true, order: 1 },
    { id: 'old', name: 'الموقع القديم', url: '/old', enabled: true, order: 2 },
    { id: 'dmca', name: 'DMCA', url: '/dmca', enabled: true, order: 3 },
    { id: 'contact', name: 'اتصل بنا', url: '/contactus', enabled: true, order: 4 }
  ]),
  
  // إعدادات SEO
  seo: z.object({
    enableSitemap: z.boolean().default(true),
    enableRobots: z.boolean().default(true),
    googleAnalyticsId: z.string().optional(),
    facebookPixelId: z.string().optional(),
    twitterSite: z.string().default('@AKOAMsocial'),
    openGraphImage: z.string().default('https://akw.to/files/social_logo.png')
  }).default({}),
  
  // إعدادات الأداء
  performance: z.object({
    enableCaching: z.boolean().default(true),
    cacheTime: z.number().default(300), // 5 minutes
    enableImageOptimization: z.boolean().default(true),
    enableCompression: z.boolean().default(true),
    maxImageSize: z.number().default(2048) // KB
  }).default({}),
  
  // إعدادات المحتوى
  content: z.object({
    itemsPerPage: z.number().default(24),
    enableComments: z.boolean().default(false),
    enableRatings: z.boolean().default(true),
    enableSharing: z.boolean().default(true),
    defaultQuality: z.string().default('HD'),
    supportedQualities: z.array(z.string()).default(['4K', 'FHD', 'HD', 'SD'])
  }).default({}),
  
  // إعدادات الإعلانات
  ads: z.object({
    enableAds: z.boolean().default(false),
    adSenseId: z.string().optional(),
    headerAd: z.string().optional(),
    sidebarAd: z.string().optional(),
    footerAd: z.string().optional()
  }).default({}),
  
  // إعدادات المصادقة
  auth: z.object({
    enableRegistration: z.boolean().default(true),
    enableGoogleLogin: z.boolean().default(false),
    enableFacebookLogin: z.boolean().default(false),
    requireEmailVerification: z.boolean().default(false)
  }).default({}),
  
  // إعدادات الصيانة
  maintenance: z.object({
    enableAutoMaintenance: z.boolean().default(true),
    checkInterval: z.number().default(300), // 5 minutes
    enableAlerts: z.boolean().default(true),
    alertEmail: z.string().optional(),
    enableBackups: z.boolean().default(true),
    backupInterval: z.number().default(1440) // 24 hours
  }).default({}),
  
  // نصوص مخصصة
  customTexts: z.object({
    copyrightText: z.string().default('جميع الحقوق محفوظة لـ شبكة 𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗 © 2025'),
    maintenanceMessage: z.string().default('الموقع تحت الصيانة، يرجى المحاولة لاحقاً'),
    noResultsMessage: z.string().default('لا توجد نتائج لهذا البحث'),
    loadingMessage: z.string().default('جاري التحميل...')
  }).default({})
})

export type SiteConfig = z.infer<typeof SiteConfigSchema>

// إعدادات افتراضية
const defaultConfig: SiteConfig = SiteConfigSchema.parse({})

// مدير الإعدادات
export class SiteSettingsManager {
  private config: SiteConfig = defaultConfig
  private configFile = 'site-config.json'
  
  constructor() {
    this.loadConfig()
  }
  
  // تحميل الإعدادات
  private async loadConfig(): Promise<void> {
    try {
      // في البيئة الحقيقية، سيتم تحميل الإعدادات من قاعدة البيانات أو ملف
      if (typeof window !== 'undefined') {
        const savedConfig = localStorage.getItem('siteConfig')
        if (savedConfig) {
          this.config = SiteConfigSchema.parse(JSON.parse(savedConfig))
        }
      }
    } catch (error) {
      // console.error('خطأ في تحميل الإعدادات:', error)
      this.config = defaultConfig
    }
  }
  
  // حفظ الإعدادات
  async saveConfig(newConfig: Partial<SiteConfig>): Promise<boolean> {
    try {
      this.config = SiteConfigSchema.parse({
        ...this.config,
        ...newConfig
      })
      
      // حفظ في localStorage (في البيئة الحقيقية سيكون في قاعدة البيانات)
      if (typeof window !== 'undefined') {
        localStorage.setItem('siteConfig', JSON.stringify(this.config))
      }
      
      // تطبيق التغييرات على الموقع
      this.applySettings()
      
      return true
    } catch (error) {
      // console.error('خطأ في حفظ الإعدادات:', error)
      return false
    }
  }
  
  // الحصول على الإعدادات الحالية
  getConfig(): SiteConfig {
    return this.config
  }
  
  // الحصول على إعداد محدد
  getSetting<K extends keyof SiteConfig>(key: K): SiteConfig[K] {
    return this.config[key]
  }
  
  // تحديث إعداد محدد
  async updateSetting<K extends keyof SiteConfig>(
    key: K, 
    value: SiteConfig[K]
  ): Promise<boolean> {
    return this.saveConfig({ [key]: value })
  }
  
  // تطبيق الإعدادات على الموقع
  private applySettings(): void {
    // تطبيق الألوان
    const root = document.documentElement
    if (root) {
      root.style.setProperty('--primary-color', this.config.primaryColor)
      root.style.setProperty('--secondary-color', this.config.secondaryColor)
      root.style.setProperty('--accent-color', this.config.accentColor)
      root.style.setProperty('--background-color', this.config.backgroundColor)
      root.style.setProperty('--text-color', this.config.textColor)
    }
    
    // تحديث العنوان
    if (typeof document !== 'undefined') {
      document.title = this.config.siteName
    }
    
    // تحديث الخطوط
    if (root) {
      root.style.setProperty('--primary-font', this.config.primaryFont)
      root.style.setProperty('--secondary-font', this.config.secondaryFont)
    }
  }
  
  // إعادة تعيين الإعدادات للقيم الافتراضية
  async resetToDefaults(): Promise<boolean> {
    this.config = defaultConfig
    return this.saveConfig({})
  }
  
  // تصدير الإعدادات
  exportSettings(): string {
    return JSON.stringify(this.config, null, 2)
  }
  
  // استيراد الإعدادات
  async importSettings(configJson: string): Promise<boolean> {
    try {
      const importedConfig = JSON.parse(configJson)
      const validConfig = SiteConfigSchema.parse(importedConfig)
      return this.saveConfig(validConfig)
    } catch (error) {
      // console.error('خطأ في استيراد الإعدادات:', error)
      return false
    }
  }
  
  // إعدادات الثيم
  getThemeCSS(): string {
    return `
      :root {
        --primary-color: ${this.config.primaryColor};
        --secondary-color: ${this.config.secondaryColor};
        --accent-color: ${this.config.accentColor};
        --background-color: ${this.config.backgroundColor};
        --text-color: ${this.config.textColor};
        --primary-font: ${this.config.primaryFont};
        --secondary-font: ${this.config.secondaryFont};
        --font-size-small: ${this.config.fontSize.small};
        --font-size-normal: ${this.config.fontSize.normal};
        --font-size-large: ${this.config.fontSize.large};
        --font-size-xlarge: ${this.config.fontSize.xlarge};
      }
      
      body {
        font-family: var(--primary-font), var(--secondary-font), sans-serif;
        background-color: var(--background-color);
        color: var(--text-color);
        background-image: url('${this.config.homepage.backgroundImage}');
      }
      
      .btn-primary {
        background-color: var(--primary-color);
      }
      
      .btn-primary:hover {
        background-color: var(--accent-color);
      }
      
      a {
        color: var(--primary-color);
      }
      
      a:hover {
        color: var(--accent-color);
      }
    `
  }
  
  // التحقق من صحة الإعدادات
  validateConfig(config: any): { valid: boolean; errors: string[] } {
    try {
      SiteConfigSchema.parse(config)
      return { valid: true, errors: [] }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          valid: false,
          errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
        }
      }
      return { valid: false, errors: ['خطأ غير معروف في التحقق من الإعدادات'] }
    }
  }
}

// إنشاء مدير الإعدادات العام
export const siteSettings = new SiteSettingsManager()

// Hook للاستخدام في React
export const useSiteSettings = () => {
  return {
    config: siteSettings.getConfig(),
    updateSetting: siteSettings.updateSetting.bind(siteSettings),
    saveConfig: siteSettings.saveConfig.bind(siteSettings),
    resetToDefaults: siteSettings.resetToDefaults.bind(siteSettings),
    exportSettings: siteSettings.exportSettings.bind(siteSettings),
    importSettings: siteSettings.importSettings.bind(siteSettings),
    getThemeCSS: siteSettings.getThemeCSS.bind(siteSettings)
  }
}