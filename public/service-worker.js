const CACHE_NAME = "hospital-pwa-v4";

const urlsToCache = [
    "/",
    "/index.html",
    "/register.html",
    "/login.html",
    "/hospital-list.html",
    "/doctor-details.html",
    "/doctor-yenepoya.html",
    "/doctor-kmc.html",
    "/doctor-indiana.html",
    "/dashboard.html",
    "/appointment-success.html",
    "/my-appointments.html",
    "/admin-login.html",
    "/admin-dashboard.html",
    "/customer-care.html",
    "/about.html",

    "/css/style.css",
    "/js/app.js",
    "/manifest.json",

    "/hospital-bg.jpeg",

    "/images/icon-192.png",
    "/images/icon-512.png",

    "/images/yenepoya.jpg",
    "/images/kmc.jpeg",
    "/images/indiana.jpeg",

    "/images/doctor1.png",
    "/images/doctor2.png",
    "/images/doctor3.png",
    "/images/doctor4.png",
    "/images/doctor5.png",
    "/images/doctor6.png",
    "/images/doctor7.png",
    "/images/doctor8.png",
    "/images/doctor9.png",
    "/images/doctor10.png",
    "/images/doctor11.png",
    "/images/doctor12.png"
];

// Install
self.addEventListener("install", (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate
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
        }).then(() => self.clients.claim())
    );
});

// Fetch
self.addEventListener("fetch", (event) => {

    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {

                const responseClone = response.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });

                return response;

            })
            .catch(() => {
                return caches.match(event.request);
            })
    );

});