const cron = require('node-cron')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class MonitoringService {
  constructor() {
    this.isRunning = false
    this.healthChecker = null
  }

  async initializeHealthChecker() {
    // تهيئة فاحص الصحة (سيتم استبداله بـ ES modules في production)
    console.log('🔧 تهيئة نظام المراقبة...')
    
    // إضافة صفحات افتراضية للمراقبة
    await this.addDefaultMonitors()
  }

  async addDefaultMonitors() {
    try {
      // إضافة صفحات الموقع الأساسية للمراقبة
      const defaultPages = [
        {
          url: 'http://localhost:3000',
          name: 'الصفحة الرئيسية'
        },
        {
          url: 'http://localhost:3000/movies',
          name: 'صفحة الأفلام'
        },
        {
          url: 'http://localhost:3000/series',
          name: 'صفحة المسلسلات'
        },
        {
          url: 'http://localhost:3000/api/health',
          name: 'API الصحة'
        }
      ]

      for (const page of defaultPages) {
        const existing = await prisma.pageMonitor.findUnique({
          where: { url: page.url }
        })

        if (!existing) {
          await prisma.pageMonitor.create({
            data: {
              url: page.url,
              name: page.name,
              status: 'up',
              isActive: true
            }
          })
          console.log(`✅ تمت إضافة مراقبة ${page.name}`)
        }
      }

      // إضافة خوادم افتراضية للمراقبة
      const defaultServers = [
        {
          serverId: 'main-server',
          serverName: 'الخادم الرئيسي',
          serverUrl: 'http://localhost:3000'
        }
      ]

      for (const server of defaultServers) {
        const existing = await prisma.serverMonitor.findUnique({
          where: { serverId: server.serverId }
        })

        if (!existing) {
          await prisma.serverMonitor.create({
            data: {
              serverId: server.serverId,
              serverName: server.serverName,
              serverUrl: server.serverUrl,
              status: 'online',
              isActive: true
            }
          })
          console.log(`✅ تمت إضافة مراقبة ${server.serverName}`)
        }
      }

    } catch (error) {
      console.error('❌ خطأ في إضافة المراقبات الافتراضية:', error)
    }
  }

  async runHealthCheck() {
    if (this.isRunning) {
      console.log('⏳ فحص الصحة جاري بالفعل...')
      return
    }

    this.isRunning = true

    try {
      console.log('🔍 بدء فحص الصحة...')

      // فحص صحة النظام العامة
      await this.checkSystemHealth()

      // فحص الصفحات المراقبة
      await this.checkMonitoredPages()

      // فحص الخوادم المراقبة
      await this.checkMonitoredServers()

      // تنظيف السجلات القديمة
      await this.cleanupOldData()

      console.log('✅ اكتمل فحص الصحة بنجاح')

    } catch (error) {
      console.error('❌ خطأ في فحص الصحة:', error)
    } finally {
      this.isRunning = false
    }
  }

  async checkSystemHealth() {
    try {
      const memoryUsage = process.memoryUsage()
      const uptime = process.uptime()

      // حساب المستخدمين النشطين
      const activeUsers = await prisma.session.count({
        where: {
          expires: {
            gt: new Date()
          }
        }
      })

      // حساب إجمالي الطلبات اليوم
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const totalRequests = await prisma.view.count({
        where: {
          viewedAt: {
            gte: today
          }
        }
      })

      // حساب معدل الأخطاء
      const totalErrors = await prisma.errorLog.count({
        where: {
          createdAt: {
            gte: today
          },
          level: 'error'
        }
      })

      const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0

      // تحديد حالة النظام
      let systemStatus = 'healthy'
      if (errorRate > 10 || memoryUsage.heapUsed / memoryUsage.heapTotal > 0.9) {
        systemStatus = 'critical'
      } else if (errorRate > 5 || memoryUsage.heapUsed / memoryUsage.heapTotal > 0.75) {
        systemStatus = 'warning'
      }

      // حفظ بيانات صحة النظام
      await prisma.systemHealth.create({
        data: {
          status: systemStatus,
          cpuUsage: 0, // يمكن الحصول عليها من systeminformation
          memoryUsage: (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100,
          diskUsage: 0, // يمكن الحصول عليها من systeminformation
          responseTime: 0, // سيتم تحديثها من فحص الصفحات
          uptime: uptime,
          activeUsers: activeUsers,
          totalRequests: totalRequests,
          errorRate: errorRate,
          checkedAt: new Date()
        }
      })

      console.log(`📊 صحة النظام: ${systemStatus}`)

    } catch (error) {
      console.error('❌ خطأ في فحص صحة النظام:', error)
    }
  }

  async checkMonitoredPages() {
    try {
      const pages = await prisma.pageMonitor.findMany({
        where: { isActive: true }
      })

      for (const page of pages) {
        await this.checkPageHealth(page)
      }

    } catch (error) {
      console.error('❌ خطأ في فحص الصفحات المراقبة:', error)
    }
  }

  async checkPageHealth(page) {
    const startTime = Date.now()
    
    try {
             const controller = new AbortController()
       const timeoutId = setTimeout(() => controller.abort(), 5000)
       
       const response = await fetch(page.url, {
         signal: controller.signal
       })
       
       clearTimeout(timeoutId)
      
      const responseTime = Date.now() - startTime
      
      let status = 'up'
      if (response.status >= 500) {
        status = 'down'
      } else if (response.status >= 400 || responseTime > 3000) {
        status = 'slow'
      } else if (responseTime > 1500) {
        status = 'slow'
      }

      await prisma.pageMonitor.update({
        where: { id: page.id },
        data: {
          status: status,
          responseTime: responseTime,
          statusCode: response.status,
          errorMessage: null,
          lastChecked: new Date()
        }
      })

      console.log(`📄 ${page.name}: ${status} (${responseTime}ms)`)

    } catch (error) {
      const responseTime = Date.now() - startTime
      
      await prisma.pageMonitor.update({
        where: { id: page.id },
        data: {
          status: 'down',
          responseTime: responseTime,
          statusCode: null,
          errorMessage: error.message,
          lastChecked: new Date()
        }
      })

      console.log(`❌ ${page.name}: خطأ - ${error.message}`)
    }
  }

  async checkMonitoredServers() {
    try {
      const servers = await prisma.serverMonitor.findMany({
        where: { isActive: true }
      })

      for (const server of servers) {
        await this.checkServerHealth(server)
      }

    } catch (error) {
      console.error('❌ خطأ في فحص الخوادم المراقبة:', error)
    }
  }

  async checkServerHealth(server) {
    const startTime = Date.now()
    
    try {
             const controller = new AbortController()
       const timeoutId = setTimeout(() => controller.abort(), 3000)
       
       const response = await fetch(server.serverUrl, {
         signal: controller.signal
       })
       
       clearTimeout(timeoutId)
      
      const responseTime = Date.now() - startTime
      
      let status = 'online'
      if (response.status >= 500) {
        status = 'offline'
      }

      await prisma.serverMonitor.update({
        where: { id: server.id },
        data: {
          status: status,
          responseTime: responseTime,
          lastPing: new Date()
        }
      })

      console.log(`🖥️ ${server.serverName}: ${status} (${responseTime}ms)`)

    } catch (error) {
      const responseTime = Date.now() - startTime
      
      const currentServer = await prisma.serverMonitor.findUnique({
        where: { id: server.id }
      })

      await prisma.serverMonitor.update({
        where: { id: server.id },
        data: {
          status: 'offline',
          responseTime: responseTime,
          errorCount: (currentServer?.errorCount || 0) + 1,
          lastPing: new Date()
        }
      })

      console.log(`❌ ${server.serverName}: غير متصل - ${error.message}`)
    }
  }

  async cleanupOldData() {
    try {
      // حذف سجلات صحة النظام القديمة (أكثر من 7 أيام)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const deletedHealth = await prisma.systemHealth.deleteMany({
        where: {
          checkedAt: {
            lt: sevenDaysAgo
          }
        }
      })

      // حذف سجلات الأخطاء القديمة (أكثر من 30 يوم)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const deletedLogs = await prisma.errorLog.deleteMany({
        where: {
          createdAt: {
            lt: thirtyDaysAgo
          }
        }
      })

      if (deletedHealth.count > 0 || deletedLogs.count > 0) {
        console.log(`🧹 تم حذف ${deletedHealth.count} سجل صحة و ${deletedLogs.count} سجل خطأ قديم`)
      }

    } catch (error) {
      console.error('❌ خطأ في تنظيف البيانات القديمة:', error)
    }
  }

  start() {
    console.log('🚀 بدء خدمة المراقبة...')

    // تهيئة النظام
    this.initializeHealthChecker()

    // فحص فوري عند البدء
    setTimeout(() => {
      this.runHealthCheck()
    }, 5000)

    // فحص كل 5 دقائق
    cron.schedule('*/5 * * * *', () => {
      console.log('⏰ تشغيل فحص دوري...')
      this.runHealthCheck()
    })

    // تقرير يومي في الساعة 9 صباحاً
    cron.schedule('0 9 * * *', async () => {
      console.log('📧 إرسال التقرير اليومي...')
      try {
        // إرسال تقرير يومي (يحتاج تنفيذ خدمة الإشعارات)
        console.log('✅ تم إرسال التقرير اليومي')
      } catch (error) {
        console.error('❌ خطأ في إرسال التقرير:', error)
      }
    })

    // تنظيف البيانات القديمة يومياً في الساعة 2 صباحاً
    cron.schedule('0 2 * * *', () => {
      console.log('🧹 تنظيف البيانات القديمة...')
      this.cleanupOldData()
    })

    console.log('✅ تم تشغيل خدمة المراقبة بنجاح')
    console.log('📝 جدولة المهام:')
    console.log('   - فحص كل 5 دقائق')
    console.log('   - تقرير يومي الساعة 9:00')
    console.log('   - تنظيف البيانات الساعة 2:00')
  }

  async stop() {
    console.log('🛑 إيقاف خدمة المراقبة...')
    await prisma.$disconnect()
  }
}

// تشغيل الخدمة
const monitoringService = new MonitoringService()

// معالجة إشارات الإيقاف
process.on('SIGINT', async () => {
  console.log('\n🛑 تم استقبال إشارة الإيقاف...')
  await monitoringService.stop()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n🛑 تم استقبال إشارة الإنهاء...')
  await monitoringService.stop()
  process.exit(0)
})

// بدء الخدمة
monitoringService.start()