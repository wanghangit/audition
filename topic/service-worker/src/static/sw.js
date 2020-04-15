var CACHE_NAME = "my-site-cache";
var urlCache = ["/", "css/index.css"];

// 监听 service worker 的 install 事件
self.addEventListener("install", function (event) {
  console.log(`正在安装`)
  // 如果监听到了 service worker 已经安装成功的话，就会调用 event.waitUntil 回调函数
  event.waitUntil(
    // 安装成功后操作 CacheStorage 缓存，使用之前需要先通过 caches.open() 打开对应缓存空间。
    caches.open(CACHE_NAME).then((cache) => {
      console.log(`open cache`);
      // 通过 cache 缓存对象的 addAll 方法添加 precache 缓存
      return cache.addAll(urlCache);
    })
  );
});

self.addEventListener('fetch', function(event){
  event.respondWith(caches.match(event.request).then((res) => {
    // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
    if(res){
      return res
    }
    var req = event.request.clone()
  }))
})
