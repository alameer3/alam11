import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };

// Request permission and get token
export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (error) {
    console.error('خطأ في طلب إذن الإشعارات:', error);
    return null;
  }
}

// Handle foreground messages
export function onMessageListener() {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
}

// Send notification to specific user
export async function sendNotificationToUser(userId: string, notification: {
  title: string;
  body: string;
  icon?: string;
  clickAction?: string;
  data?: Record<string, string>;
}) {
  try {
    const response = await fetch('/api/notifications/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        notification,
      }),
    });
    
    if (!response.ok) {
      throw new Error('فشل في إرسال الإشعار');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في إرسال الإشعار:', error);
    throw error;
  }
}

// Send notification to topic
export async function sendNotificationToTopic(topic: string, notification: {
  title: string;
  body: string;
  icon?: string;
  clickAction?: string;
  data?: Record<string, string>;
}) {
  try {
    const response = await fetch('/api/notifications/send-topic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic,
        notification,
      }),
    });
    
    if (!response.ok) {
      throw new Error('فشل في إرسال الإشعار للموضوع');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في إرسال الإشعار للموضوع:', error);
    throw error;
  }
}

// Subscribe to topic
export async function subscribeToTopic(topic: string) {
  try {
    const response = await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });
    
    if (!response.ok) {
      throw new Error('فشل في الاشتراك في الموضوع');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في الاشتراك في الموضوع:', error);
    throw error;
  }
}

// Unsubscribe from topic
export async function unsubscribeFromTopic(topic: string) {
  try {
    const response = await fetch('/api/notifications/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });
    
    if (!response.ok) {
      throw new Error('فشل في إلغاء الاشتراك من الموضوع');
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في إلغاء الاشتراك من الموضوع:', error);
    throw error;
  }
}