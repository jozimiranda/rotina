const CACHE = 'rotina-v1';
const ARQS = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-180.png', "img/abdutora-0.jpg","img/abdutora-1.jpg","img/bulgaro-0.jpg","img/bulgaro-1.jpg","img/coice-0.jpg","img/coice-1.jpg","img/crossover-0.jpg","img/crossover-1.jpg","img/deadbug-0.jpg","img/deadbug-1.jpg","img/frances-0.jpg","img/frances-1.jpg","img/miniband-0.jpg","img/miniband-1.jpg","img/pant-sentado-0.jpg","img/pant-sentado-1.jpg","img/pant-unilateral-0.jpg","img/pant-unilateral-1.jpg","img/prancha-0.jpg","img/prancha-1.jpg","img/pullover-0.jpg","img/pullover-1.jpg","img/remada-0.jpg","img/remada-1.jpg","img/rosca-0.jpg","img/rosca-1.jpg","img/stepup-0.jpg","img/stepup-1.jpg","img/tibial-0.jpg","img/tibial-1.jpg"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put('./', c)); return r; }).catch(() => caches.match('./')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
