importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: "/index.html", revision: "1" },
  { url: "/info.html", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/firebase-messaging-sw.js", revision: "1" },
  { url: "/service-worker.js", revision: "1" },

  { url: "/pages/template/nav.html", revision: "1" },

  { url: "/css/materialize.min.css", revision: "1" },

  { url: "/js/api.js", revision: "1" },
  { url: "/js/controller.js", revision: "1" },
  { url: "/js/db.js", revision: "1" },
  { url: "/js/idb.js", revision: "1" },
  { url: "/js/main.js", revision: "1" },
  { url: "/js/nav.js", revision: "1" },
  { url: "/js/materialize.min.js", revision: "1" },

  { url: "/images/icons/icon-72x72.png", revision: "1" },
  { url: "/images/icons/icon-96x96.png", revision: "1" },
  { url: "/images/icons/icon-128x128.png", revision: "1" },
  { url: "/images/icons/icon-144x144.png", revision: "1" },
  { url: "/images/icons/icon-152x152.png", revision: "1" },
  { url: "/images/icons/icon-192x192.png", revision: "1" },
  { url: "/images/icons/icon-384x384.png", revision: "1" },
  { url: "/images/icons/icon-512x512.png", revision: "1" },
  { url: "/images/icons/logo-192-white.png", revision: "1" },

  { url: "/fcm/firebase-logo.png", revision: "1" },
  { url: "/fcm/index.html", revision: "1" },
  { url: "/fcm/main.css", revision: "1" },
  { url: "/fcm/script.js", revision: "1" },
]);

workbox.routing.registerRoute(
  new RegExp("/pages/contents/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "api",
  })
);

// const CACHE_NAME = "Bal_Balan_v6";

// const urlsToCache = [
//   "/",
//   "/pages/template/nav.html",
//   "/index.html",
//   "/pages/contents/beranda.html",
//   "/pages/contents/klasemen.html",
//   "/pages/contents/teamFavorite.html",
//   "/pages/contents/jadwal.html",
//   "/info.html",
//   "/images/icons/icon-72x72.png",
//   "/images/icons/icon-96x96.png",
//   "/images/icons/icon-128x128.png",
//   "/images/icons/icon-144x144.png",
//   "/images/icons/icon-152x152.png",
//   "/images/icons/icon-192x192.png",
//   "/images/icons/icon-384x384.png",
//   "/images/icons/icon-512x512.png",
//   "/images/icons/logo-192-white.png",
//   "/css/materialize.min.css",
//   "/js/materialize.min.js",
//   "/js/nav.js",
//   "/js/api.js",
//   "/js/idb.js",
//   "/js/db.js",
//   "/js/controller.js",
//   "/js/main.js",
//   "/service-worker.js",
//   "/manifest.json",
// ];

// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", function (event) {
//   let base_url = "https://api.football-data.org/";
//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(function (cache) {
//         return fetch(event.request).then(function (response) {
//           cache.put(event.request.url, response.clone());
//           return response;
//         });
//       })
//     );
//   } else {
//     event.respondWith(
//       caches
//         .match(event.request, { ignoreSearch: true })
//         .then(function (response) {
//           return response || fetch(event.request);
//         })
//     );
//   }
// });

// self.addEventListener("activate", function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener("push", function (event) {
//   let body;
//   if (event.data) {
//     body = event.data.text();
//   } else {
//     body = "Push message no payload";
//   }
//   let options = {
//     body: body,
//     icon: "/images/icons/icon-192x192.png",
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1,
//     },
//   };
//   event.waitUntil(
//     self.registration.showNotification("Push Notification", options)
//   );
// });
