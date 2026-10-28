const cache = 'aldia-v1';
const basicos = ['./', './index.html', 'manifest.webmanifest'];
self.addEventListener('install', function (evento) {
    evento.waitUntil(
        caches.open(cache).then(function (cache) {
            return cache.addAll(basicos);
        })
    );
});

self.addEventListener('activate', function (evento) {
    evento.waitUntil(
        caches.keys().then(function (nombres) {
            return Promise.all(nombres.map(function (nombre) {
                if (nombre !== cache) return caches.delete(nombre);
                }));
        })
        );
    });

self.addEventListener('fetch', function (evento) {
    evento.respondWith(
        fetch(evento.request)
        .then(function (respuesta) {
            const copia = respuesta.clone();
            caches.open(cache).then(function (cache) {
                cache.put(evento.request, copia);
            });
            return respuesta;
        })
        .catch(function () {
            return caches.match(evento.request);
        })
    );
});