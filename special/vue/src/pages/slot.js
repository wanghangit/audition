import Vue from 'vue'
import Test from '../components/slot/test'

console.log(Vue)

new Vue({
  render: h => h(Test),
}).$mount("#root")