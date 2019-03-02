var cacheName = 'shell-content';
var filesToCache = [
	'/index1.html',
	'/css/main.css',
	'/css/planets.css',
	'/images/earth.jpg',
	'/images/jupiter.png',
	'/images/mars.jpg',
	'/images/venus.jpg',
	'/images/Uranus.jpg',
	'/images/saturn.jpg',
	'/images/neptune.jpg',
	'/images/mercury.jpg',
	'/videos/61_2012VenusTransit~small.mp4',
	'/videos/215_TransitOfMercury~small.mp4',
	'/videos/269_NewScienceFromJupiter~small.mp4',
	'/videos/Earth-Observations~small.mp4',
	'/videos/First-Spacecraft-Neptune~small.mp4',
	'/videos/First-Spacecraft-Uranus~small.mp4',
	'/videos/JPL-20180220-MARSf-0001-Whats Inside Mars~small.mp4',
	'/videos/Saturn_Rings~small.mp4'];


self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


// self.addEventListener('install', function(e) {
// 	e.waitUntil(
// 		caches.open(cacheName).then(function(cache) {
// 			return cache.addAll(cacheFiles);
// 		})
// 	);
// });


// if ('serviceWorker' in navigator) {

//   navigator.serviceWorker
//     .register('./service-worker.js', { scope: './' })
//     .then(function(registration) {
//       console.log("Service Worker Registered");
//     })
//     .catch(function(err) {
//       console.log("Service Worker Failed to Register", err);
//     })

// }

// // Function to perform HTTP request
// var get = function(url) {
//   return new Promise(function(resolve, reject) {

//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                 var result = xhr.responseText
//                 result = JSON.parse(result);
//                 resolve(result);
//             } else {
//                 reject(xhr);
//             }
//         }
//     };
    
//     xhr.open("GET", url, true);
//     xhr.send();

//   }); 
// };


// get('https://api.nasa.gov/planetary/earth/imagery?api_key=cjBTxLNw84nYoK0xG2rfwFSjwjPZEUFBdPdKeHQp')
//   .then(function(response) {
//     // There is an issue with the image being pulled from the API, so using a different one instead
//     document.getElementsByClassName('targetImage')[0].src = "https://api.nasa.gov/images/earth.png";

//   })
//   .catch(function(err) {
//     console.log("Error", err);
//   })

// if ('serviceWorker' in navigator) {
// 	navigator.serviceWorker
// 		.register('https://lopez-bryan.github.io/pages/final-app/service-worker.js').then(function(registration) {
// 			console.log("Service Worker Registered");
// 		})
// 		.catch(function(err) {
// 			console.log("Service Worker Failed to Register", err);
// 		});
// }

