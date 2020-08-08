if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/static/sw-demo.js", { scope: "/static" })
      .then((register) => {
        console.log(register.scope)
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
