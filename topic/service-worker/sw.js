var CACHE_NAME = "my-site-cache";
var urlCache = ["/", "/src/demo/css/index.css"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log(`open cache`);
      return cache.addAll(urlCache);
    })
  );
});
