const CACHE = 'visor-v1';
const ARCHIVOS = ['./', './index.html', './manifest.json', './icono.svg'];

self.addEventListener('install', evento => {
  evento.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys().then(claves =>
      Promise.all(claves.filter(c => c !== CACHE).map(c => caches.delete(c)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', evento => {
  evento.respondWith(
    caches.match(evento.request).then(respuesta => respuesta || fetch(evento.request))
  );
});
