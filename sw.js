const CACHE = 'spelletjes-v2';
const ASSETS = [
  './',
  'index.html',
  'Woordje.html',
  'Woordkraker.html',
  'zenwoord.html',
  'Kennisquiz.html',
  'WaarOfNietWaar.html',
  'Spreekwoorden.html',
  'WatHoortErNietBij.html',
  'manifest.webmanifest'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).catch(() => caches.match('index.html')))
  );
});
