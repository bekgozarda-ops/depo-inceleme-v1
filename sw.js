/* Uygulama kabuğunu önbelleğe alır; internet yokken de açılır.
   Sayfa (index.html) internet varsa HER ZAMAN sunucudan taze alınır; yoksa önbellekten açılır. */
const CACHE = 'depo-inceleme-v13';
const SHELL = ['./', './index.html', './manifest.webmanifest', './exceljs.min.js','./heic2any.min.js',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || /\/(index\.html)?$/.test(new URL(req.url).pathname) || /\.(webmanifest)$/.test(req.url);
  if (isPage) {
    /* ağ öncelikli (en fazla 4 sn), olmazsa önbellek */
    e.respondWith(new Promise(resolve => {
      let done = false;
      const fallback = () => caches.match(req, { ignoreSearch: true }).then(h => h || caches.match('./index.html'));
      const t = setTimeout(() => { if (!done) { done = true; fallback().then(resolve); } }, 4000);
      fetch(req, { cache: 'no-cache' }).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        if (!done) { done = true; clearTimeout(t); resolve(res); }
      }).catch(() => { if (!done) { done = true; clearTimeout(t); fallback().then(resolve); } });
    }));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
