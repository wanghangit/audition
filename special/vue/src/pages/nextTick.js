import Vue from 'vue'
import test from '../components/nextTick/test.vue'

console.log(Vue)

new Vue({
  render: h => h(test),
}).$mount("#root")