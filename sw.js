const CACHE = 'miyaar-static-v49';
const FILES = ['./', './index.html', './style.css?v=43', './app.js?v=47', './firebase-config.js', './manifest.webmanifest', './icon.svg'];
const FIREBASE_SDK = [
  'https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore-compat.js'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(async cache => {
    await cache.addAll(FILES);
    await Promise.all(FIREBASE_SDK.map(async url => { try { const response = await fetch(url, { mode: 'cors' }); if (response.ok) await cache.put(url, response); } catch {} }));
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('miyaar-static-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    if (requestUrl.hostname === 'www.gstatic.com' && requestUrl.pathname.startsWith('/firebasejs/12.19.0/')) {
      event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone())); return response; })));
    }
    return;
  }
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put('./index.html', copy)); return response; }).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone())); return response; })));
});

