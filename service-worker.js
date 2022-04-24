/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-24a771c';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./krajina_s_jednorozcem_002.html","./krajina_s_jednorozcem_005.html","./krajina_s_jednorozcem_006.html","./krajina_s_jednorozcem_007.html","./krajina_s_jednorozcem_008.html","./krajina_s_jednorozcem_009.html","./krajina_s_jednorozcem_010.html","./krajina_s_jednorozcem_011.html","./krajina_s_jednorozcem_012.html","./krajina_s_jednorozcem_013.html","./krajina_s_jednorozcem_014.html","./krajina_s_jednorozcem_015.html","./krajina_s_jednorozcem_016.html","./krajina_s_jednorozcem_017.html","./krajina_s_jednorozcem_018.html","./krajina_s_jednorozcem_019.html","./krajina_s_jednorozcem_020.html","./krajina_s_jednorozcem_021.html","./krajina_s_jednorozcem_022.html","./krajina_s_jednorozcem_023.html","./krajina_s_jednorozcem_024.html","./krajina_s_jednorozcem_025.html","./krajina_s_jednorozcem_026.html","./krajina_s_jednorozcem_027.html","./krajina_s_jednorozcem_028.html","./krajina_s_jednorozcem_029.html","./krajina_s_jednorozcem_030.html","./krajina_s_jednorozcem_031.html","./krajina_s_jednorozcem_032.html","./krajina_s_jednorozcem_033.html","./krajina_s_jednorozcem_034.html","./krajina_s_jednorozcem_035.html","./krajina_s_jednorozcem_036.html","./krajina_s_jednorozcem_037.html","./krajina_s_jednorozcem_038.html","./krajina_s_jednorozcem_039.html","./krajina_s_jednorozcem_040.html","./krajina_s_jednorozcem_041.html","./krajina_s_jednorozcem_042.html","./krajina_s_jednorozcem_043.html","./krajina_s_jednorozcem_044.html","./krajina_s_jednorozcem_045.html","./krajina_s_jednorozcem_046.html","./krajina_s_jednorozcem_047.html","./krajina_s_jednorozcem_048.html","./krajina_s_jednorozcem_049.html","./krajina_s_jednorozcem_050.html","./krajina_s_jednorozcem_051.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/obalka_krajina_s_jednorozcem.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
