const CACHE_NAME = "hospital-pwa-v1";

const urlsToCache = [
    "/",
    "/index.html",
    "/register.html",
    "/login.html",
    "/dashboard.html",
    "/appointment-success.html",
    "/css/style.css",
    "/js/app.js",
    "/manifest.json"
];

// Install Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Cache opened");
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch Cached Files
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});