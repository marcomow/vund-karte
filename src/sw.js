const cacheName = 'vund-karte';
const precacheResources = [
    'index.html',
    'assets/favicon.png',
    'assets/favicon144.png',
    'assets/vund_logo.svg',
    'libraries/leaflet.css',
    'libraries/tailwind.min.css'
];
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});
self.addEventListener('activate', (event) => {
});
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        }),
    );
}); 
