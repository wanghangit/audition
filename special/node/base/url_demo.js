const url = require("url")

const demoUrl = new URL("http://demo.com/hello.html?id=1&status=success")

console.log(demoUrl.href)
console.log(demoUrl.host)
console.log(demoUrl.search)