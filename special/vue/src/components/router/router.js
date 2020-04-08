let Vue

class VueRouter{
  static install: function (_Vue) {
    Vue = _Vue

    Vue.mixin({
      beforeCreate(){
        if(this.$options.router){
          Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }
  constructor(options){
    // 缓存配置
    this.$options = options
    // 保存路由配置
    this.routeMap = {}
    // 创建响应式对象
    this.app = new Vue({
      data: function(){
        return '/'
      }
    })
  }
  init(){
    this.bindEvents()
    this.createRouteMap()
    this.initComponent()
  }
  bindEvents(){
    window.addEventListener("hashchange", this.onhashchange.bind(this))
    window.addEventListener("load", this.onhashchange.bind(this))
  }
  onhashchange(e){
    this.app.current = window.location.hash.slice(1) || '/'
  }
  createRouteMap(){
    this.$options.routes.map((router) => {
      this.routeMap[router.path] = router
    })
  }
  initComponent(){
    Vue.component("router-link", {
      props: {
        to: {
          type: String
        }
      },
      render(h) {
        return h()
      },
    })
  }
}