var staticCacheName = 'caltrain-static-v1';

self.addEventListener('install', function(event) {
    caches.open(staticCacheName).then(function(cache) {
        return cache.addAll([
            '/',
            '/index.html',
            '/dist/css/style.min.css',
            '/dist/js/app.min.js',
            '/dist/data/stop_times.json',
            '/dist/data/stops.json',
        ]);
    });
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('caltrain-') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
