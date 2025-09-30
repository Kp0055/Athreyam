import { messaging } from './firebase-messaging-sw';
import { getToken, onMessage } from 'firebase/messaging';

export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.YOUR_PUBLIC_VAPID_KEY
      });
      if (currentToken) {
        console.log('✅ FCM Token:', currentToken);
        // Send to backend or use as needed
      } else {
        console.warn('⚠️ No registration token available.');
      }
    } else {
      console.warn('❌ Notification permission not granted.');
    }
  } catch (err) {
    console.error('FCM error:', err);
  }
};

// Optional: Handle foreground messages
export const setupOnMessageListener = () => {
  onMessage(messaging, (payload) => {
    console.log('📥 Foreground message received:', payload);
    // Show in-app notification if needed
  });
};
