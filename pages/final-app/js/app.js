
// This registers the service-worker javascript file which contains all the files I want downloaded in the background.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
