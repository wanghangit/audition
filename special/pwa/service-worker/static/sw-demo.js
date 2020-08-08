// 初始化安装，缓存要缓存的文件
this.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("chche-open-v1").then((cache) => {
      return cache.addAll(["/", "/test.js", "/test.css"]);
    })
  );
});

// 激活阶段
this.addEventListener("activate", function (event) {
  event.waitUntil(
    Promise.all([
      this.clients.claim(), // 不刷新页面也可以控制页面，拦截请求
      caches.keys().then(function (cacheList) {
        return Promise.all(
          cacheList.map(function (cacheName) {
            if (cacheName !== "chche-open-v1") {
              return caches.delete(cacheName);
            }
          })
        );
      }),
    ])
  );
});
