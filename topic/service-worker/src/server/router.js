const Router = require("koa-router")

const router = new Router()

router.get("/", (ctx) => {
  return ctx.render("index")
})

module.exports = router.routes()