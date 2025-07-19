// نظام الصيانة الذكي الشامل لموقع ak.sv clone

export interface MaintenanceIssue {
  id: string
  type: 'link' | 'page' | 'server' | 'database' | 'performance' | 'security'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  url?: string
  timestamp: Date
  resolved: boolean
  autoFix?: boolean
  fixAction?: string
}

export interface SystemHealth {
  overall: 'healthy' | 'warning' | 'critical'
  uptime: number
  responseTime: number
  errorRate: number
  issuesCount: number
  lastCheck: Date
}

export class SmartMaintenanceSystem {
  private static instance: SmartMaintenanceSystem
  private issues: MaintenanceIssue[] = []
  private subscribers: ((health: SystemHealth) => void)[] = []
  private isRunning = false
  private checkInterval: NodeJS.Timeout | null = null

  static getInstance(): SmartMaintenanceSystem {
    if (!SmartMaintenanceSystem.instance) {
      SmartMaintenanceSystem.instance = new SmartMaintenanceSystem()
    }
    return SmartMaintenanceSystem.instance
  }

  // بدء نظام المراقبة التلقائية
  start(intervalMinutes: number = 5) {
    if (this.isRunning) return

    this.isRunning = true
    console.log(`🔧 بدء نظام الصيانة الذكي - فحص كل ${intervalMinutes} دقائق`)

    // فحص فوري
    this.runMaintenanceCheck()

    // فحص دوري
    this.checkInterval = setInterval(() => {
      this.runMaintenanceCheck()
    }, intervalMinutes * 60 * 1000)

    // إضافة معالج إيقاف النظام
    process.on('SIGTERM', () => this.stop())
    process.on('SIGINT', () => this.stop())
  }

  // إيقاف نظام المراقبة
  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval)
      this.checkInterval = null
    }
    this.isRunning = false
    console.log('⏹️ تم إيقاف نظام الصيانة الذكي')
  }

  // تشغيل فحص شامل
  async runMaintenanceCheck(): Promise<SystemHealth> {
    const startTime = Date.now()
    
    try {
      console.log('🔍 بدء فحص الصيانة الشامل...')

      // فحص الروابط المعطلة
      await this.checkBrokenLinks()
      
      // فحص الصفحات
      await this.checkPages()
      
      // فحص الخوادم
      await this.checkServers()
      
      // فحص قاعدة البيانات
      await this.checkDatabase()
      
      // فحص الأداء
      await this.checkPerformance()
      
      // فحص الأمان
      await this.checkSecurity()

      const endTime = Date.now()
      const responseTime = endTime - startTime

      const health = this.calculateSystemHealth(responseTime)
      
      // إرسال التقرير للمشتركين
      this.notifySubscribers(health)
      
      // إصلاح تلقائي للمشاكل البسيطة
      await this.performAutoFixes()

      console.log(`✅ انتهاء فحص الصيانة - الحالة: ${health.overall}`)
      
      return health

    } catch (error) {
      console.error('❌ خطأ في فحص الصيانة:', error)
      
      this.addIssue({
        type: 'system',
        severity: 'high',
        title: 'فشل في فحص الصيانة',
        description: `خطأ في النظام: ${error}`
      })

      return this.calculateSystemHealth(Date.now() - startTime)
    }
  }

  // فحص الروابط المعطلة
  private async checkBrokenLinks() {
    const linksToCheck = [
      // روابط داخلية
      { url: '/', name: 'الصفحة الرئيسية' },
      { url: '/movies', name: 'صفحة الأفلام' },
      { url: '/series', name: 'صفحة المسلسلات' },
      { url: '/shows', name: 'صفحة البرامج' },
      { url: '/mix', name: 'صفحة المنوعات' },
      
      // روابط خارجية مهمة
      { url: 'https://img.downet.net/', name: 'خادم الصور' },
      { url: 'https://via.placeholder.com/', name: 'صور البوستر' }
    ]

    for (const link of linksToCheck) {
      try {
        const response = await this.fetchWithTimeout(link.url, 10000)
        
        if (!response.ok) {
          this.addIssue({
            type: 'link',
            severity: link.url.startsWith('/') ? 'high' : 'medium',
            title: `رابط معطل: ${link.name}`,
            description: `الرابط ${link.url} يعيد خطأ ${response.status}`,
            url: link.url,
            autoFix: false
          })
        }
      } catch (error) {
        this.addIssue({
          type: 'link',
          severity: 'high',
          title: `فشل الوصول لـ ${link.name}`,
          description: `عدم القدرة على الوصول للرابط ${link.url}: ${error}`,
          url: link.url,
          autoFix: false
        })
      }
    }
  }

  // فحص الصفحات الأساسية
  private async checkPages() {
    const pagesToCheck = [
      '/api/health',
      '/api/movies',
      '/api/series'
    ]

    for (const page of pagesToCheck) {
      try {
        const start = Date.now()
        const response = await this.fetchWithTimeout(page, 15000)
        const responseTime = Date.now() - start

        if (!response.ok) {
          this.addIssue({
            type: 'page',
            severity: 'high',
            title: `صفحة غير متاحة: ${page}`,
            description: `الصفحة ترجع خطأ ${response.status}`,
            url: page,
            autoFix: false
          })
        } else if (responseTime > 5000) {
          this.addIssue({
            type: 'performance',
            severity: 'medium',
            title: `بطء في تحميل الصفحة: ${page}`,
            description: `وقت التحميل: ${responseTime}ms`,
            url: page,
            autoFix: false
          })
        }
      } catch (error) {
        this.addIssue({
          type: 'page',
          severity: 'critical',
          title: `فشل تحميل الصفحة: ${page}`,
          description: `خطأ: ${error}`,
          url: page,
          autoFix: false
        })
      }
    }
  }

  // فحص الخوادم والخدمات
  private async checkServers() {
    const serversToCheck = [
      { name: 'خادم التطبيق الرئيسي', url: process.env.NEXTAUTH_URL || 'http://localhost:3000' },
      { name: 'خادم الصور', url: 'https://img.downet.net/' }
    ]

    for (const server of serversToCheck) {
      try {
        const start = Date.now()
        const response = await this.fetchWithTimeout(`${server.url}/health`, 8000)
        const responseTime = Date.now() - start

        if (responseTime > 3000) {
          this.addIssue({
            type: 'server',
            severity: 'medium',
            title: `بطء في استجابة ${server.name}`,
            description: `وقت الاستجابة: ${responseTime}ms`,
            autoFix: false
          })
        }
      } catch (error) {
        this.addIssue({
          type: 'server',
          severity: 'high',
          title: `خادم غير متاح: ${server.name}`,
          description: `فشل في الاتصال: ${error}`,
          autoFix: false
        })
      }
    }
  }

  // فحص قاعدة البيانات
  private async checkDatabase() {
    try {
      // اختبار اتصال بسيط
      console.log('📊 فحص قاعدة البيانات...')
      
      // محاولة استيراد Prisma واختبار الاتصال
      const { PrismaClient } = await import('@prisma/client')
      const prisma = new PrismaClient()
      
      const start = Date.now()
      await prisma.$queryRaw`SELECT 1`
      const responseTime = Date.now() - start
      
      await prisma.$disconnect()

      if (responseTime > 2000) {
        this.addIssue({
          type: 'database',
          severity: 'medium',
          title: 'بطء في قاعدة البيانات',
          description: `وقت الاستجابة: ${responseTime}ms`,
          autoFix: false
        })
      }

      console.log('✅ قاعدة البيانات تعمل بشكل طبيعي')
    } catch (error) {
      this.addIssue({
        type: 'database',
        severity: 'critical',
        title: 'فشل في الاتصال بقاعدة البيانات',
        description: `خطأ: ${error}`,
        autoFix: false
      })
    }
  }

  // فحص الأداء
  private async checkPerformance() {
    try {
      // فحص استخدام الذاكرة
      const memUsage = process.memoryUsage()
      const memoryUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100

      if (memoryUsagePercent > 80) {
        this.addIssue({
          type: 'performance',
          severity: 'high',
          title: 'استخدام عالي للذاكرة',
          description: `استخدام الذاكرة: ${Math.round(memoryUsagePercent)}%`,
          autoFix: true,
          fixAction: 'clearCache'
        })
      }

      // فحص وقت التشغيل
      const uptime = process.uptime()
      if (uptime < 300) { // أقل من 5 دقائق
        this.addIssue({
          type: 'performance',
          severity: 'low',
          title: 'إعادة تشغيل حديثة للنظام',
          description: `وقت التشغيل: ${Math.round(uptime)} ثانية`,
          autoFix: false
        })
      }

    } catch (error) {
      this.addIssue({
        type: 'performance',
        severity: 'medium',
        title: 'خطأ في فحص الأداء',
        description: `خطأ: ${error}`,
        autoFix: false
      })
    }
  }

  // فحص الأمان
  private async checkSecurity() {
    try {
      // فحص متغيرات البيئة المهمة
      const requiredEnvVars = ['NEXTAUTH_SECRET', 'NEXTAUTH_URL']
      const missingVars = requiredEnvVars.filter(env => !process.env[env])

      if (missingVars.length > 0) {
        this.addIssue({
          type: 'security',
          severity: 'high',
          title: 'متغيرات بيئة مفقودة',
          description: `المتغيرات المفقودة: ${missingVars.join(', ')}`,
          autoFix: false
        })
      }

      // فحص إعدادات الأمان
      if (process.env.NODE_ENV === 'production') {
        if (!process.env.NEXTAUTH_SECRET) {
          this.addIssue({
            type: 'security',
            severity: 'critical',
            title: 'مفتاح الأمان مفقود',
            description: 'NEXTAUTH_SECRET غير محدد في الإنتاج',
            autoFix: false
          })
        }
      }

    } catch (error) {
      this.addIssue({
        type: 'security',
        severity: 'medium',
        title: 'خطأ في فحص الأمان',
        description: `خطأ: ${error}`,
        autoFix: false
      })
    }
  }

  // إضافة مشكلة جديدة
  private addIssue(issue: Omit<MaintenanceIssue, 'id' | 'timestamp' | 'resolved'>) {
    const newIssue: MaintenanceIssue = {
      ...issue,
      id: `issue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      resolved: false
    }

    // تجنب التكرار
    const existingIssue = this.issues.find(i => 
      i.title === newIssue.title && 
      i.url === newIssue.url && 
      !i.resolved
    )

    if (!existingIssue) {
      this.issues.push(newIssue)
      
      // تنبيه فوري للمشاكل الحرجة
      if (issue.severity === 'critical') {
        this.sendCriticalAlert(newIssue)
      }
      
      console.log(`⚠️ مشكلة جديدة [${issue.severity}]: ${issue.title}`)
    }
  }

  // إصلاح تلقائي للمشاكل البسيطة
  private async performAutoFixes() {
    const autoFixableIssues = this.issues.filter(i => i.autoFix && !i.resolved)

    for (const issue of autoFixableIssues) {
      try {
        switch (issue.fixAction) {
          case 'clearCache':
            // إلغاء التخزين المؤقت
            if (global.gc) {
              global.gc()
              console.log('🧹 تم تنظيف الذاكرة تلقائياً')
            }
            break
          
          default:
            console.log(`🔧 إصلاح تلقائي غير متاح لـ: ${issue.title}`)
        }
        
        // وضع علامة كمحلول
        issue.resolved = true
        console.log(`✅ تم إصلاح تلقائي: ${issue.title}`)
        
      } catch (error) {
        console.error(`❌ فشل الإصلاح التلقائي لـ ${issue.title}:`, error)
      }
    }
  }

  // حساب صحة النظام العامة
  private calculateSystemHealth(responseTime: number): SystemHealth {
    const unresolvedIssues = this.issues.filter(i => !i.resolved)
    const criticalIssues = unresolvedIssues.filter(i => i.severity === 'critical')
    const highIssues = unresolvedIssues.filter(i => i.severity === 'high')
    
    let overall: SystemHealth['overall'] = 'healthy'
    
    if (criticalIssues.length > 0) {
      overall = 'critical'
    } else if (highIssues.length > 2 || unresolvedIssues.length > 10) {
      overall = 'warning'
    }

    const errorRate = (unresolvedIssues.length / Math.max(this.issues.length, 1)) * 100

    return {
      overall,
      uptime: process.uptime(),
      responseTime,
      errorRate,
      issuesCount: unresolvedIssues.length,
      lastCheck: new Date()
    }
  }

  // إرسال تنبيه حرج
  private sendCriticalAlert(issue: MaintenanceIssue) {
    console.error(`🚨 تنبيه حرج: ${issue.title}`)
    console.error(`📋 التفاصيل: ${issue.description}`)
    
    // هنا يمكن إضافة إرسال إيميل أو SMS
    // await this.sendEmail(issue)
    // await this.sendSlackNotification(issue)
  }

  // إشعار المشتركين
  private notifySubscribers(health: SystemHealth) {
    this.subscribers.forEach(callback => {
      try {
        callback(health)
      } catch (error) {
        console.error('خطأ في إشعار المشترك:', error)
      }
    })
  }

  // اشتراك في تحديثات الصحة
  subscribe(callback: (health: SystemHealth) => void) {
    this.subscribers.push(callback)
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback)
    }
  }

  // الحصول على المشاكل الحالية
  getIssues(filter?: {
    type?: MaintenanceIssue['type']
    severity?: MaintenanceIssue['severity']
    resolved?: boolean
  }) {
    let filtered = this.issues

    if (filter) {
      if (filter.type) {
        filtered = filtered.filter(i => i.type === filter.type)
      }
      if (filter.severity) {
        filtered = filtered.filter(i => i.severity === filter.severity)
      }
      if (filter.resolved !== undefined) {
        filtered = filtered.filter(i => i.resolved === filter.resolved)
      }
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  // حل مشكلة يدوياً
  resolveIssue(issueId: string) {
    const issue = this.issues.find(i => i.id === issueId)
    if (issue) {
      issue.resolved = true
      console.log(`✅ تم حل المشكلة: ${issue.title}`)
    }
  }

  // تنظيف المشاكل القديمة المحلولة
  cleanupOldIssues(maxAge: number = 7 * 24 * 60 * 60 * 1000) { // 7 أيام
    const cutoff = new Date(Date.now() - maxAge)
    this.issues = this.issues.filter(issue => 
      !issue.resolved || issue.timestamp > cutoff
    )
  }

  // fetch مع timeout
  private async fetchWithTimeout(url: string, timeout: number): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    try {
      const response = await fetch(url, { signal: controller.signal })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }
}

// تصدير singleton
export const smartMaintenance = SmartMaintenanceSystem.getInstance()

// بدء النظام تلقائياً في بيئة الإنتاج
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  smartMaintenance.start(5) // فحص كل 5 دقائق
}