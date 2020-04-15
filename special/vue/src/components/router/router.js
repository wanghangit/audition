import HashRouter from './HashRouter'
import HistoryRouter from './HIstoryRouter'

let Vue

class VueRouter{
  static install(_Vue) {
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
    this.mode = options.mode || 'hash'
    // if(mode === 'hash'){
    //   this.router = new HashRouter()
    // }else{
    //   this.router = new HistoryRouter()
    // }
    // 保存路由配置
    this.routeMap = {}
    // 创建响应式对象
    this.app = new Vue({
      data: function(){
        return {
          current: '/'
        }
      }
    })
  }
  init(){
    this.bindEvents()
    this.createRouteMap()
    console.log(this.routeMap)
    this.initComponent()
  }
  bindEvents(){
    if(this.mode === 'hash'){
      window.addEventListener("hashchange", this.onhashchange.bind(this))
      window.addEventListener("load", this.onhashchange.bind(this))
    }else{
      window.addEventListener("popstate", this.onstatechange.bind(this))
      window.addEventListener("load", this.onstatechange.bind(this))
    }
  }
  onstatechange(e){
    console.log(window.location.pathname)
    this.app.current = window.location.pathname
  }
  onhashchange(e){
    console.log(window.location.hash.slice(1))
    this.app.current = window.location.hash.slice(1) || '/'
  }
  createRouteMap(){
    this.$options.routes.map((router) => {
      if(router.children){
        this.createRouteMapBase(router.path, router.children)
      }
      this.routeMap[router.path] = router
    })
  }
  createRouteMapBase(path, children){
    children.map((router) => {
      if(router.children){
        this.createRouteMapBase(path+router.path, router.children)
      }
      this.routeMap[path+router.path] = router
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
        return h('a', {attrs: {href: 'router.html'+this.to}}, this.$slots.default)
      },
    })
    Vue.component("router-view", {
      props: {
        to: {
          type: String
        }
      },
      render: (h) => {
        const Comp = this.routeMap[this.app.current.replace("router.html")].component
        return h(Comp) 
      },
    })
  }
}

export default VueRouter