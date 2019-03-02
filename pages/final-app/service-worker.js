// var cacheName = 'v1';
// var cacheFiles = [
// 	'/index1.html',
// 	'/css/main.css',
// 	'/css/planets.css',
// 	'/images/earth.jpg',
// 	'/images/jupiter.png',
// 	'/images/mars.jpg',
// 	'/images/venus.jpg',
// 	'/images/Uranus.jpg',
// 	'/images/saturn.jpg',
// 	'/images/neptune.jpg',
// 	'/images/mercury.jpg',
// 	'/videos/61_2012VenusTransit~small.mp4',
// 	'/videos/215_TransitOfMercury~small.mp4',
// 	'/videos/269_NewScienceFromJupiter~small.mp4',
// 	'/videos/Earth-Observations~small.mp4',
// 	'/videos/First-Spacecraft-Neptune~small.mp4',
// 	'/videos/First-Spacecraft-Uranus~small.mp4',
// 	'/videos/JPL-20180220-MARSf-0001-Whats Inside Mars~small.mp4',
// 	'/videos/Saturn_Rings~small.mp4'];


// self.addEventListener('install', function(e) {
// 	e.waitUntil(
// 		caches.open(cacheName).then(function(cache) {
// 			return cache.addAll(cacheFiles);
// 		})
// 	);
// });


self.addEventListener('activate', function(e) {
	console.log("[ServiceWorker] Activated")

	e.waitUntil(
		caches.keys()then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {
				if (thisCacheName !== cacheName) {
					return caches.delete(thisCacheName);
				}
			}))
		}))
})


self.addEventListener('fetch', function(e) {
	console.log("[ServiceWorker] Fetching", e.request.url);

	e.respondWith(
		caches.match(e.request).then(function(response) {
			if (response)  {
				console.log("[ServiceWorker] Found in cache", e.request.url);
				return response;
			}
			var requestClone = e.request.clone();

			fetch(requestClone)
				.then(function(response) {
					if (!response) {
						return response;
					}

					var responseClone = response.clone();
					caches.open(cacheName).then(function(cache) {
						cache.put(e.request, responseClone);
						return response;
					});
				})
				.catch(function(err) {
					console.log("Error");
				})

		}))
})



