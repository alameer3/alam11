import nodemailer from 'nodemailer'
import { prisma } from '@/lib/prisma'
import { logger } from './logger'

interface NotificationOptions {
  type: 'email' | 'sms' | 'webhook'
  subject?: string
  message: string
  recipient?: string
}

class NotificationService {
  private static instance: NotificationService
  private emailTransporter: nodemailer.Transporter

  constructor() {
    this.setupEmailTransporter()
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  private setupEmailTransporter() {
    // إعداد SMTP للبريد الإلكتروني
    this.emailTransporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async sendNotification(incidentId: string, options: NotificationOptions): Promise<void> {
    const adminEmails = await this.getAdminEmails()
    
    for (const email of adminEmails) {
      try {
        await this.createNotificationRecord(incidentId, {
          ...options,
          recipient: email
        })

        switch (options.type) {
          case 'email':
            await this.sendEmail(email, options.subject || 'تنبيه نظام المراقبة', options.message)
            break
          case 'sms':
            await this.sendSMS(email, options.message) // يمكن تمرير رقم الهاتف بدلاً من الإيميل
            break
          case 'webhook':
            await this.sendWebhook(options.message)
            break
        }

        await this.updateNotificationStatus(incidentId, email, 'sent')
        
      } catch (error) {
        logger.error(`Failed to send notification to ${email}:`, error)
        await this.updateNotificationStatus(incidentId, email, 'failed')
      }
    }
  }

  private async sendEmail(to: string, subject: string, message: string): Promise<void> {
    const htmlMessage = this.createEmailTemplate(subject, message)
    
    await this.emailTransporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@ak-sv.com',
      to,
      subject,
      html: htmlMessage,
      text: message
    })
  }

  private async sendSMS(phoneNumber: string, message: string): Promise<void> {
    // يمكن دمج خدمة SMS مثل Twilio أو خدمة محلية
    logger.info(`SMS would be sent to ${phoneNumber}: ${message}`)
    // Implementation for SMS service
  }

  private async sendWebhook(message: string): Promise<void> {
    const webhookUrl = process.env.WEBHOOK_URL
    if (!webhookUrl) return

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: message,
          timestamp: new Date().toISOString(),
          source: 'AK-SV Monitoring System'
        })
      })

      if (!response.ok) {
        throw new Error(`Webhook failed with status ${response.status}`)
      }
    } catch (error) {
      logger.error('Webhook notification failed:', error)
      throw error
    }
  }

  private createEmailTemplate(subject: string, message: string): string {
    return `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                background-color: #f5f5f5; 
                margin: 0; 
                padding: 20px;
                direction: rtl;
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white; 
                border-radius: 10px; 
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            .header { 
                background: linear-gradient(135deg, #dc2626, #ef4444); 
                color: white; 
                padding: 30px 20px; 
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: bold;
            }
            .content { 
                padding: 30px 20px; 
                line-height: 1.6;
            }
            .message {
                background: #f8f9fa;
                border-right: 4px solid #dc2626;
                padding: 20px;
                margin: 20px 0;
                border-radius: 5px;
                white-space: pre-line;
            }
            .footer { 
                background: #f8f9fa; 
                padding: 20px; 
                text-align: center; 
                font-size: 14px; 
                color: #666;
                border-top: 1px solid #e9ecef;
            }
            .logo {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .timestamp {
                background: #e3f2fd;
                padding: 10px;
                border-radius: 5px;
                font-size: 14px;
                color: #1976d2;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">AK.SV</div>
                <h1>🚨 ${subject}</h1>
            </div>
            <div class="content">
                <p>تم اكتشاف مشكلة في نظام المراقبة:</p>
                <div class="message">${message}</div>
                <div class="timestamp">
                    ⏰ وقت الإشعار: ${new Date().toLocaleString('ar-SA')}
                </div>
                <p>يرجى مراجعة لوحة التحكم لمزيد من التفاصيل.</p>
            </div>
            <div class="footer">
                <p>هذا إشعار تلقائي من نظام مراقبة AK.SV</p>
                <p>© 2024 AK.SV - جميع الحقوق محفوظة</p>
            </div>
        </div>
    </body>
    </html>
    `
  }

  private async getAdminEmails(): Promise<string[]> {
    try {
      const admins = await prisma.user.findMany({
        where: {
          role: 'admin'
        },
        select: {
          email: true
        }
      })
      
      return admins.map(admin => admin.email)
    } catch (error) {
      logger.error('Error getting admin emails:', error)
      return [process.env.ADMIN_EMAIL || 'admin@ak-sv.com']
    }
  }

  private async createNotificationRecord(
    incidentId: string, 
    options: NotificationOptions & { recipient: string }
  ): Promise<void> {
    await prisma.notification.create({
      data: {
        incidentId,
        type: options.type,
        recipient: options.recipient,
        subject: options.subject || '',
        message: options.message,
        status: 'pending'
      }
    })
  }

  private async updateNotificationStatus(
    incidentId: string, 
    recipient: string, 
    status: 'sent' | 'failed'
  ): Promise<void> {
    await prisma.notification.updateMany({
      where: {
        incidentId,
        recipient,
        status: 'pending'
      },
      data: {
        status,
        sentAt: status === 'sent' ? new Date() : undefined
      }
    })
  }

  // إرسال إشعارات دورية عن حالة النظام
  async sendSystemHealthReport(): Promise<void> {
    try {
      const latestHealth = await prisma.systemHealth.findFirst({
        orderBy: { checkedAt: 'desc' }
      })

      if (!latestHealth) return

      const incidents = await prisma.incident.count({
        where: {
          status: 'open',
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // آخر 24 ساعة
          }
        }
      })

      const reportMessage = `
📊 تقرير صحة النظام اليومي

🖥️ حالة النظام: ${this.getStatusEmoji(latestHealth.status)} ${latestHealth.status}
💾 استخدام الذاكرة: ${latestHealth.memoryUsage?.toFixed(1)}%
👥 المستخدمون النشطون: ${latestHealth.activeUsers}
📈 إجمالي الطلبات: ${latestHealth.totalRequests}
❌ معدل الأخطاء: ${latestHealth.errorRate?.toFixed(2)}%
⏱️ وقت التشغيل: ${Math.floor((latestHealth.uptime || 0) / 3600)} ساعة

🚨 الحوادث المفتوحة: ${incidents}

آخر فحص: ${latestHealth.checkedAt.toLocaleString('ar-SA')}
      `

      await this.sendNotification('system-health-report', {
        type: 'email',
        subject: '📊 التقرير اليومي لصحة النظام - AK.SV',
        message: reportMessage
      })

    } catch (error) {
      logger.error('Error sending system health report:', error)
    }
  }

  private getStatusEmoji(status: string): string {
    switch (status) {
      case 'healthy': return '✅'
      case 'warning': return '⚠️'
      case 'critical': return '🚨'
      default: return '❓'
    }
  }
}

export const notificationService = NotificationService.getInstance()

export async function sendNotification(incidentId: string, options: NotificationOptions): Promise<void> {
  return notificationService.sendNotification(incidentId, options)
}