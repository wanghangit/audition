const https = require('https')
const Koa = require('koa')
const views = require('koa-view')
const static = require('koa-static')
const fs = require('fs')
const path = require('path')
const router = require("./router")

const app = new Koa()
app.use(
  static(path.resolve(__dirname, "../static/"))
)
app.use(views(path.resolve(__dirname, "../views/"), {extension: 'html'}))

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../../private.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../../mydomain.crt'))
}

app.use(router)

https.createServer(options, app.callback()).listen(443)