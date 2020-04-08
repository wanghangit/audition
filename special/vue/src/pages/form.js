import Vue from 'vue'
import ELForm from '../components/el-form/FormTest.vue'

console.log(Vue)

new Vue({
  render: h => h(ELForm),
}).$mount("#root")