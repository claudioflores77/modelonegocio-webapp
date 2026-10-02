self.addEventListener('install', (event: any) => {
  // Force the waiting service worker to become active
  self.skipWaiting();
});

self.addEventListener('activate', (event: any) => {
  event.waitUntil(self.clients.claim());
});
