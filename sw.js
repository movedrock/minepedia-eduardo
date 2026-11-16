self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.use?.then || Promise.resolve()
    );
    self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
