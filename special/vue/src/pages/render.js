import Vue from 'vue'
import RenderTest from '../components/render/RenderTest.vue'

console.log(Vue)

new Vue({
  render: h => h(RenderTest),
}).$mount("#root")