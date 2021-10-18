const MAX_CACHE = 20;
const staticCache = 'site-static-v1';
const dynamicCache = 'site-dynamic-v1';
const assets = [
  '/',
  '/index.html',
  '/fallback.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  '/img/icons/favicon.ico',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    })
  });
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCache).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCache && key !== dynamicCache)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.indexOf('firestore.googleapis.com') === -1) {
    event.respondWith(
      caches.match(event.request).then(cacheRes => {
        return cacheRes || fetch(event.request).then(fetchRes => {
          return caches.open(dynamicCache).then(cache => {
            cache.put(event.request.url, fetchRes.clone());
            limitCacheSize(dynamicCache, MAX_CACHE);
            return fetchRes;
          })
        })
      }).catch(() => {
        if (event.request.url.indexOf('.html') > -1) {
          return caches.match('/fallback.html');
        }
      })
    );
  }
});
