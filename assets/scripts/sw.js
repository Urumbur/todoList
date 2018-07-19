const CACHE_NAME = 'app-cache';
 
const urlsToCache = [
  './../../index.html',
  './../../style.css',
  './newscript.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
    }));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
      return response ? response : fetch(event.request);
    }));
  });