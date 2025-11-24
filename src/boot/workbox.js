import { boot } from 'quasar/wrappers';

export default boot(async ({ app }) => {
  // Enable service worker for PWA functionality
  if ('serviceWorker' in navigator) {
    try {
      // Register the service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (error) {
      console.error('SW registration failed: ', error);
    }
  }
});