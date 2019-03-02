const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

var PRECACHE_URLS = [
	'index1.html',
	'css/main.css',
	'css/planets.css',
	'images/earth.jpg',
	'images/jupiter.png',
	'images/mars.jpg',
	'images/venus.jpg',
	'images/Uranus.jpg',
	'images/saturn.jpg',
	'images/neptune.jpg',
	'images/mercury.jpg',
	'videos/61_2012VenusTransit~small.mp4',
	'videos/215_TransitOfMercury~small.mp4',
	'videos/269_NewScienceFromJupiter~small.mp4',
	'videos/Earth-Observations~small.mp4',
	'videos/First-Spacecraft-Neptune~small.mp4',
	'videos/First-Spacecraft-Uranus~small.mp4',
	'videos/JPL-20180220-MARSf-0001-Whats Inside Mars~small.mp4',
	'videos/Saturn_Rings~small.mp4'];

	// The install handler will precache the above array.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler to grab resources from a cache.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});



