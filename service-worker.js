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

  { url: "/fcm/fcm-logo.png", revision: "1" },
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
