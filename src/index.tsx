import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { requestPermissionAndGetToken, setupOnMessageListener } from './fcm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the Firebase service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('✅ Service Worker registered with scope:', registration.scope);
      requestPermissionAndGetToken(); // Get FCM token after SW registration
      setupOnMessageListener(); // Handle foreground messages
    })
    .catch((error) => {
      console.error('❌ Service Worker registration failed:', error);
    });
}

reportWebVitals();
