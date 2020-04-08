import Vue from 'vue'
import Home from '../components/router/Home'
import About from '../components/router/About'
import List from '../components/router/List'
import Detail from '../components/router/Detail'

import Router from '../components/router/router'

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    component: Home,
    children: [{
      path: '/list',
      component: List
    }, {
      path: '/detail/:id',
      component: Detail
    }]
  }, {
    path: '/about',
    component: About
  }]
})