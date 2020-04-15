import Vue from 'vue'
import VuexTest from '../components/vuex/VuexTest.vue'
import store from '../components/vuex/store'

console.log(Vue)

new Vue({
  render: h => h(VuexTest),
  store
}).$mount("#root")