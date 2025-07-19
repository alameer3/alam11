// نظام الإشعارات الذكي للمسؤولين

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  priority: 'low' | 'medium' | 'high' | 'critical'
  timestamp: string
  read: boolean
  actionUrl?: string
  metadata?: Record<string, any>
}

export class NotificationService {
  private static instance: NotificationService
  private notifications: Notification[] = []
  private subscribers: ((notifications: Notification[]) => void)[] = []

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  // إضافة إشعار جديد
  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false
    }

    this.notifications.unshift(newNotification)
    
    // الاحتفاظ بآخر 100 إشعار فقط
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100)
    }

    this.notifySubscribers()
    
    // حفظ في قاعدة البيانات
    this.saveNotification(newNotification)
    
    // إرسال إشعار فوري للمشاكل الحرجة
    if (notification.priority === 'critical') {
      this.sendImmediateAlert(newNotification)
    }

    return newNotification
  }

  // إشعار المراقبة
  addMonitoringAlert(issue: {
    title: string
    description: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    url?: string
  }) {
    const priorityMap = {
      low: 'low' as const,
      medium: 'medium' as const,
      high: 'high' as const,
      critical: 'critical' as const
    }

    const typeMap = {
      low: 'info' as const,
      medium: 'warning' as const,
      high: 'error' as const,
      critical: 'error' as const
    }

    return this.addNotification({
      title: `🚨 ${issue.title}`,
      message: issue.description,
      type: typeMap[issue.severity],
      priority: priorityMap[issue.severity],
      actionUrl: issue.url || '/admin/monitoring',
      metadata: { source: 'monitoring', severity: issue.severity }
    })
  }

  // إشعار أداء
  addPerformanceAlert(metric: string, value: number, threshold: number) {
    const priority = value > threshold * 2 ? 'critical' : value > threshold * 1.5 ? 'high' : 'medium'
    
    return this.addNotification({
      title: `⚡ تحذير أداء: ${metric}`,
      message: `${metric} وصل إلى ${value} (الحد المسموح: ${threshold})`,
      type: priority === 'critical' ? 'error' : 'warning',
      priority,
      actionUrl: '/admin/monitoring',
      metadata: { source: 'performance', metric, value, threshold }
    })
  }

  // إشعار أمان
  addSecurityAlert(event: string, details: string, severity: 'medium' | 'high' | 'critical') {
    return this.addNotification({
      title: `🔒 تحذير أمني: ${event}`,
      message: details,
      type: 'error',
      priority: severity,
      actionUrl: '/admin/security',
      metadata: { source: 'security', event }
    })
  }

  // إشعار نجاح
  addSuccessNotification(title: string, message: string) {
    return this.addNotification({
      title: `✅ ${title}`,
      message,
      type: 'success',
      priority: 'low',
      metadata: { source: 'system' }
    })
  }

  // وضع علامة مقروء
  markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      this.notifySubscribers()
      this.updateNotificationInDB(notificationId, { read: true })
    }
  }

  // وضع علامة مقروء على الكل
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true)
    this.notifySubscribers()
    this.updateAllNotificationsInDB({ read: true })
  }

  // حذف إشعار
  deleteNotification(notificationId: string) {
    this.notifications = this.notifications.filter(n => n.id !== notificationId)
    this.notifySubscribers()
    this.deleteNotificationFromDB(notificationId)
  }

  // الحصول على الإشعارات
  getNotifications(filter?: {
    read?: boolean
    type?: Notification['type']
    priority?: Notification['priority']
    limit?: number
  }) {
    let filtered = this.notifications

    if (filter) {
      if (filter.read !== undefined) {
        filtered = filtered.filter(n => n.read === filter.read)
      }
      if (filter.type) {
        filtered = filtered.filter(n => n.type === filter.type)
      }
      if (filter.priority) {
        filtered = filtered.filter(n => n.priority === filter.priority)
      }
      if (filter.limit) {
        filtered = filtered.slice(0, filter.limit)
      }
    }

    return filtered
  }

  // عدد الإشعارات غير المقروءة
  getUnreadCount() {
    return this.notifications.filter(n => !n.read).length
  }

  // اشتراك في التحديثات
  subscribe(callback: (notifications: Notification[]) => void) {
    this.subscribers.push(callback)
    
    // إرجاع دالة إلغاء الاشتراك
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback)
    }
  }

  // إشعار المشتركين
  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.notifications))
  }

  // إرسال تنبيه فوري
  private async sendImmediateAlert(notification: Notification) {
    console.error(`🚨 تنبيه عاجل: ${notification.title}`)
    console.error(`📋 الرسالة: ${notification.message}`)
    
    // يمكن إضافة إرسال إيميل أو رسالة SMS هنا
    // await this.sendEmail(notification)
    // await this.sendSMS(notification)
    
    // إشعار في المتصفح (إذا كان متاحاً)
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
          tag: notification.id
        })
      }
    }
  }

  // حفظ الإشعار في قاعدة البيانات
  private async saveNotification(notification: Notification) {
    try {
      const { PrismaClient } = await import('@prisma/client')
      const prisma = new PrismaClient()
      
      // TODO: إضافة notification إلى Prisma schema
      console.log('Notification Saved:', {
        title: notification.title,
        type: notification.type,
        priority: notification.priority
      })
      
      await prisma.$disconnect()
    } catch (error) {
      console.error('فشل في حفظ الإشعار:', error)
    }
  }

  // تحديث الإشعار في قاعدة البيانات
  private async updateNotificationInDB(id: string, data: Partial<Notification>) {
    try {
      const { PrismaClient } = await import('@prisma/client')
      const prisma = new PrismaClient()
      
      // TODO: تحديث notification في Prisma schema
      console.log('Notification Updated:', id, data)
      
      await prisma.$disconnect()
    } catch (error) {
      console.error('فشل في تحديث الإشعار:', error)
    }
  }

  // تحديث جميع الإشعارات
  private async updateAllNotificationsInDB(data: Partial<Notification>) {
    try {
      const { PrismaClient } = await import('@prisma/client')
      const prisma = new PrismaClient()
      
      // TODO: تحديث جميع الnotifications في Prisma schema
      console.log('All Notifications Updated:', data)
      
      await prisma.$disconnect()
    } catch (error) {
      console.error('فشل في تحديث الإشعارات:', error)
    }
  }

  // حذف الإشعار من قاعدة البيانات
  private async deleteNotificationFromDB(id: string) {
    try {
      const { PrismaClient } = await import('@prisma/client')
      const prisma = new PrismaClient()
      
      // TODO: حذف notification من Prisma schema
      console.log('Notification Deleted:', id)
      
      await prisma.$disconnect()
    } catch (error) {
      console.error('فشل في حذف الإشعار:', error)
    }
  }

  // تحميل الإشعارات من قاعدة البيانات
  async loadNotificationsFromDB() {
    try {
      const { PrismaClient } = await import('@prisma/client')
      const prisma = new PrismaClient()
      
      // TODO: تحميل notifications من Prisma schema
      console.log('Loading notifications from database...')
      // في الوقت الحالي، الإشعارات محفوظة في الذاكرة فقط
      
      this.notifySubscribers()
      await prisma.$disconnect()
    } catch (error) {
      console.error('فشل في تحميل الإشعارات:', error)
    }
  }
}

// Auto Notification Manager - يراقب ويرسل إشعارات تلقائية
export class AutoNotificationManager {
  private notificationService: NotificationService
  private intervalId: NodeJS.Timeout | null = null

  constructor() {
    this.notificationService = NotificationService.getInstance()
  }

  // بدء المراقبة التلقائية للإشعارات
  start() {
    // تحميل الإشعارات من قاعدة البيانات
    this.notificationService.loadNotificationsFromDB()

    // فحص دوري كل 30 ثانية
    this.intervalId = setInterval(() => {
      this.checkSystemHealth()
    }, 30000)

    // إشعار بدء النظام
    this.notificationService.addSuccessNotification(
      'تم تشغيل نظام المراقبة',
      'نظام المراقبة الذكي يعمل الآن ويراقب حالة الموقع'
    )
  }

  // إيقاف المراقبة
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  // فحص صحة النظام وإرسال إشعارات
  private async checkSystemHealth() {
    try {
      // فحص استجابة الخادم
      const start = Date.now()
      const response = await fetch('/api/health')
      const responseTime = Date.now() - start

      // تحذير إذا كان وقت الاستجابة بطيء
      if (responseTime > 3000) {
        this.notificationService.addPerformanceAlert(
          'وقت استجابة الخادم',
          responseTime,
          2000
        )
      }

      // فحص استخدام الذاكرة
      if (typeof process !== 'undefined') {
        const memUsage = process.memoryUsage()
        const memUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100

        if (memUsagePercent > 80) {
          this.notificationService.addPerformanceAlert(
            'استخدام الذاكرة',
            Math.round(memUsagePercent),
            70
          )
        }
      }

    } catch (error) {
      this.notificationService.addMonitoringAlert({
        title: 'فشل في فحص صحة النظام',
        description: `خطأ في الفحص التلقائي: ${error}`,
        severity: 'high'
      })
    }
  }
}

// تصدير singleton
export const notificationService = NotificationService.getInstance()
export const autoNotificationManager = new AutoNotificationManager()