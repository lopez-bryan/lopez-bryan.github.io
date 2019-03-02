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

	// The install handler takes care of precaching the resources we always need.
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

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});



// self.addEventListener('install', function(e) {
// 	e.waitUntil(
// 		caches.open(cacheName).then(function(cache) {
// 			return cache.addAll(cacheFiles);
// 		})
// 	);
// });


// self.addEventListener('activate', function(e) {
// 	console.log("[ServiceWorker] Activated")

// 	e.waitUntil(
// 		caches.keys()then(function(cacheNames) {
// 			return Promise.all(cacheNames.map(function(thisCacheName) {
// 				if (thisCacheName !== cacheName) {
// 					return caches.delete(thisCacheName);
// 				}
// 			}))
// 		}))
// })


// self.addEventListener('fetch', function(e) {
// 	console.log("[ServiceWorker] Fetching", e.request.url);

// 	e.respondWith(
// 		caches.match(e.request).then(function(response) {
// 			if (response)  {
// 				console.log("[ServiceWorker] Found in cache", e.request.url);
// 				return response;
// 			}
// 			var requestClone = e.request.clone();

// 			fetch(requestClone)
// 				.then(function(response) {
// 					if (!response) {
// 						return response;
// 					}

// 					var responseClone = response.clone();
// 					caches.open(cacheName).then(function(cache) {
// 						cache.put(e.request, responseClone);
// 						return response;
// 					});
// 				})
// 				.catch(function(err) {
// 					console.log("Error");
// 				})

// 		}))
// })



