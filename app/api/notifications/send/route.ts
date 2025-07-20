import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getMessaging } from 'firebase-admin/messaging';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const { userId, notification } = await request.json();

    if (!userId || !notification) {
      return NextResponse.json({ error: 'بيانات مطلوبة' }, { status: 400 });
    }

    // Get user's FCM token
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { fcmToken: true, name: true, email: true },
    });

    if (!user?.fcmToken) {
      return NextResponse.json({ error: 'المستخدم ليس لديه رمز FCM' }, { status: 400 });
    }

    // Send notification
    const message = {
      token: user.fcmToken,
      notification: {
        title: notification.title,
        body: notification.body,
        icon: notification.icon || '/icon-192x192.png',
      },
      data: notification.data || {},
      webpush: {
        notification: {
          icon: notification.icon || '/icon-192x192.png',
          badge: '/badge-72x72.png',
          actions: [
            {
              action: 'view',
              title: 'عرض',
            },
            {
              action: 'dismiss',
              title: 'إغلاق',
            },
          ],
        },
        fcm_options: {
          link: notification.clickAction || '/',
        },
      },
    };

    const response = await getMessaging().send(message);

    // Save notification to database
    await prisma.notification.create({
      data: {
        userId,
        title: notification.title,
        body: notification.body,
        type: 'push',
        status: 'sent',
        metadata: {
          fcmMessageId: response,
          ...notification.data,
        },
      },
    });

    return NextResponse.json({ 
      success: true, 
      messageId: response,
      message: 'تم إرسال الإشعار بنجاح' 
    });

  } catch (error) {
    console.error('خطأ في إرسال الإشعار:', error);
    return NextResponse.json({ error: 'خطأ في إرسال الإشعار' }, { status: 500 });
  }
}